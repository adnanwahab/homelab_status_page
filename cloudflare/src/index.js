let script = ``

const html = `
<!doctype html>
<html lang="en">
  <head>
    <div>
      <meta
        property="og:title"
        content="Robotics Odyssey - Reimagining Robotics: Merging Systems Thinking and Dynamic Media"
      />
      <meta
        property="og:description"
        content="Explore a new approach to robotics that transcends conventional thinking, inspired by the principles of Alan Kay and Bret Victor. Discover how interconnected systems, dynamic media, and human-centric design can tackle the immense challenges of our time."
      />
      <meta property="og:url" content="https://robtics-odyssey.com" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://hashirama.blog/static/images/blog/sicp.png"
      />

      <link rel="canonical" href="https://robtics-odyssey.com" />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Robotics-Odyssey" />
      <meta itemprop="url" content="https://robtics-odyssey.com" />
      <meta name="twitter:title" content="Robotics-Odyssey" />
      <meta name="twitter:url" content="https://robtics-odyssey.com" />
      <meta
        name="twitter:card"
        content="Reimagining Robotics: Merging Systems Thinking and Dynamic Media"
      />
      <meta
        name="description"
        content="Explore a new approach to robotics that transcends conventional thinking, inspired by the principles of Alan Kay and Bret Victor. Discover how interconnected systems, dynamic media, and human-centric design can tackle the immense challenges of our time."
      />

      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>Robotics Odyssey</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <link rel="icon" href="/static/images/blog/favicon.svg" />
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      />
      <meta name="language" content="English" />
      <!-- <script src="/static/js/htmx.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css"
      /> -->
    </div>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 3D Perspective Animation</title>
<style>
      .rainbow-ify {
        animation: rainbow 1s linear infinite;
      }
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }

</style>
    <script type="module" crossorigin >
	
	${script}
	
	/script>
	<
    <link rel="stylesheet" crossorigin href="/assets/index--XokHvAr.css">
	  <script src="https://cdn.tailwindcss.com"></script>

  </head>
  <body >
<div>hi</div>
    <div id="root"></div>
    <div id="app"></div>


  </body>
</html>
`


/**
 * POST /api/submit
 */
export async function onRequestPost(context) {

	
  }
  export default {
	async fetch(request, env, context) {
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html',
			},
		});
	}
  };