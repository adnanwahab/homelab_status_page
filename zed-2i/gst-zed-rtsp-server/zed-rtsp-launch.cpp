// /////////////////////////////////////////////////////////////////////////

//
// Copyright (c) 2024, STEREOLABS.
//
// All rights reserved.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// /////////////////////////////////////////////////////////////////////////

#include <gst/gst.h>
#include <gst/gstparse.h>
#include <stdlib.h>

#include <iostream>
#include <string>

#include <gst/rtsp-server/rtsp-server.h>
#include <gst/rtsp/gstrtspconnection.h>

#define DEFAULT_RTSP_PORT "8554"
#define DEFAULT_RTSP_HOST "127.0.0.1"

static char *port = (char *) DEFAULT_RTSP_PORT;
static char *host = (char *) DEFAULT_RTSP_HOST;

static GOptionEntry entries[] = {{"port", 'p', 0, G_OPTION_ARG_STRING, &port, "Port to listen on( default: " DEFAULT_RTSP_PORT ")", "PORT"},
                                 {"address", 'a', 0, G_OPTION_ARG_STRING, &host, "Host address( default: " DEFAULT_RTSP_HOST ")", "HOST"},
                                 {NULL}};

static void client_connected(GstRTSPServer *server, GstRTSPClient *client) {
    GstRTSPConnection *conn = gst_rtsp_client_get_connection(client);
    const gchar *ip_address = gst_rtsp_connection_get_ip(conn);
    g_print(" * Client connected: %s\n", ip_address);
}

int main(int argc, char *argv[]) {
    GMainLoop *loop;
    GstRTSPServer *server;
    GstRTSPMountPoints *mounts;
    GstRTSPMediaFactory *factory;
    GOptionContext *optctx;
    GError *error = NULL;

    optctx =
        g_option_context_new("PIPELINE-DESCRIPTION - ZED RTSP Server, Launch\n\n"
                             "Example: gst-zed-rtsp-server zedsrc ! videoconvert ! 'video/x-raw, format=(string)I420' ! x264enc ! rtph264pay pt=96 name=pay0");
    g_option_context_add_main_entries(optctx, entries, NULL);
    g_option_context_add_group(optctx, gst_init_get_option_group());
    if (!g_option_context_parse(optctx, &argc, &argv, &error)) {
        g_printerr("Error parsing options: %s\n", error->message);
        g_option_context_free(optctx);
        g_clear_error(&error);
        exit(EXIT_FAILURE);
    }
    g_option_context_free(optctx);

    gchar **args;

#ifdef G_OS_WIN32
    args = g_win32_get_command_line();
#else
    args = g_strdupv(argv);
#endif

    // ----> Check launch pipeline correctness
    GstElement *pipeline;
    gchar **argvn;
    // make a null-terminated version of argv
    argvn = g_new0(char *, argc);
    memcpy(argvn, args + 1, sizeof(char *) * (argc - 1));
    { pipeline = (GstElement *) gst_parse_launchv((const gchar **) argvn, &error); }
    g_free(argvn);

    if (!pipeline) {
        if (error) {
            gst_printerr("ERROR - pipeline could not be constructed: %s.\n", GST_STR_NULL(error->message));
            g_clear_error(&error);
        } else {
            gst_printerr("ERROR - pipeline could not be constructed.\n");
        }
        return 1;
    } else if (error) {
        gst_printerr("WARNING: erroneous pipeline: %s\n", GST_STR_NULL(error->message));
        g_clear_error(&error);
        return 1;
    }

    GstElement *payload = gst_bin_get_by_name(GST_BIN(pipeline), "pay0");
    if (!payload) {
        gst_printerr("ERROR - at least a payload with name 'pay0' must be present in the pipeline.\n");
        gst_printerr("Example: zedsrc ! videoconvert ! video/x-raw, format=(string)I420 ! x264enc ! rtph264pay pt=96 name=pay0\n");
        return 1;
    }
    g_object_unref(payload);
    gst_object_unref(pipeline);
    // <---- Check launch pipeline correctness */

    // ----> Create RTSP Server pipeline
    // Note: `gst_rtsp_media_factory_set_launch` requires a GstBin element, the easier way to create it is to enclose
    //       the pipeline in round brackets '(' ')'.
    std::string rtsp_pipeline;
    rtsp_pipeline = "( ";
    for (int i = 1; i < argc; i++) {
        rtsp_pipeline += std::string(argv[i]);
        rtsp_pipeline += " ";
    }
    rtsp_pipeline += ")";

    // std::cout << rtsp_pipeline << std::endl;

    // <---- Create RTSP Server pipeline

    loop = g_main_loop_new(NULL, FALSE);

    /* create a server instance */
    server = gst_rtsp_server_new();
    g_object_set(server, "address", host, NULL);
    g_object_set(server, "service", port, NULL);

    /* get the mount points for this server, every server has a default object
     * that be used to map uri mount points to media factories */
    mounts = gst_rtsp_server_get_mount_points(server);

    /* make a media factory for a test stream. The default media factory can use
     * gst-launch syntax to create pipelines.
     * any launch line works as long as it contains elements named pay%d. Each
     * element with pay%d names will be a stream */
    factory = gst_rtsp_media_factory_new();
    gst_rtsp_media_factory_set_launch(factory, rtsp_pipeline.c_str());
    gst_rtsp_media_factory_set_shared(factory, TRUE);

    /* attach the test factory to the /test url */
    gst_rtsp_mount_points_add_factory(mounts, "/zed-stream", factory);

    /* don't need the ref to the mapper anymore */
    g_object_unref(mounts);

    /* attach the server to the default maincontext */
    gst_rtsp_server_attach(server, NULL);

    g_signal_connect(server, "client-connected", (GCallback) client_connected, NULL);

    /* start serving */
    g_print(" ZED RTSP Server \n");
    g_print("-----------------\n");
    g_print(" * Stream ready at rtsp://%s:%s/zed-stream\n", host, port);
    g_main_loop_run(loop);

    return 0;
}
