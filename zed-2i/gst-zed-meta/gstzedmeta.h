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

#ifndef GSTZEDMETA_H
#define GSTZEDMETA_H

#include <gst/gst.h>
#include <vector>

G_BEGIN_DECLS

typedef struct _GstZedSrcMeta GstZedSrcMeta;
typedef struct _ZedInfo ZedInfo;
typedef struct _ZedPose ZedPose;
typedef struct _ZedSensors ZedSensors;
typedef struct _ZedImu ZedImu;
typedef struct _ZedMag ZedMag;
typedef struct _ZedEnv ZedEnv;
typedef struct _ZedCamTemp ZedCamTemp;
typedef struct _ZedObjectData ZedObjectData;

struct _ZedInfo {
    gint cam_model;
    gint stream_type;
    guint grab_single_frame_width;
    guint grab_single_frame_height;
};

struct _ZedPose {
    gboolean pose_avail;
    gint pos_tracking_state;
    gfloat pos[3];
    gfloat orient[3];
};

struct _ZedImu {
    gboolean imu_avail;
    gfloat acc[3];
    gfloat gyro[3];
    gfloat temp;
};

struct _ZedMag {
    gboolean mag_avail;
    gfloat mag[3];
};

struct _ZedEnv {
    gboolean env_avail;
    gfloat press;
    gfloat temp;
};

struct _ZedCamTemp {
    gboolean temp_avail;
    gfloat temp_cam_left;
    gfloat temp_cam_right;
};

struct _ZedSensors {
    gboolean sens_avail;
    ZedImu imu;
    ZedMag mag;
    ZedEnv env;
    ZedCamTemp temp;
};

enum class OBJECT_CLASS {
    PERSON = 0,          /**< For people detection */
    VEHICLE = 1,         /**< For vehicle detection. It can be cars, trucks, buses, motorcycles etc */
    BAG = 2,             /**< For bag detection (backpack, handbag, suitcase) */
    ANIMAL = 3,          /**< For animal detection (cow, sheep, horse, dog, cat, bird, etc) */
    ELECTRONICS = 4,     /**< For electronic device detection (cellphone, laptop, etc) */
    FRUIT_VEGETABLE = 5, /**<  For fruit and vegetable detection (banana, apple, orange, carrot, etc) */
    SPORT = 6,           /**<  For sport-related object detection (sportball) */
    LAST
};

enum class OBJECT_SUBCLASS {
    PERSON = 0,       /**< PERSON / PERSON_BODY */
    PERSON_HEAD = 22, /**< PERSON */
    BICYCLE = 1,      /**< VEHICLE */
    CAR = 2,          /**< VEHICLE */
    MOTORBIKE = 3,    /**< VEHICLE */
    BUS = 4,          /**< VEHICLE */
    TRUCK = 5,        /**< VEHICLE */
    BOAT = 6,         /**< VEHICLE */
    BACKPACK = 7,     /**< BAG */
    HANDBAG = 8,      /**< BAG */
    SUITCASE = 9,     /**< BAG */
    BIRD = 10,        /**< ANIMAL */
    CAT = 11,         /**< ANIMAL */
    DOG = 12,         /**< ANIMAL */
    HORSE = 13,       /**< ANIMAL */
    SHEEP = 14,       /**< ANIMAL */
    COW = 15,         /**< ANIMAL */
    CELLPHONE = 16,   /**< ELECTRONICS */
    LAPTOP = 17,      /**< ELECTRONICS */
    BANANA = 18,      /**< FRUIT/VEGETABLE */
    APPLE = 19,       /**< FRUIT/VEGETABLE */
    ORANGE = 20,      /**< FRUIT/VEGETABLE */
    CARROT = 21,      /**< FRUIT/VEGETABLE */
    SPORTSBALL = 23,  /**< SPORT */
    LAST
};

enum class OBJECT_TRACKING_STATE {
    OFF,       /**< The tracking is not yet initialized, the object ID is not usable */
    OK,        /**< The object is tracked */
    SEARCHING, /**< The object couldn't be detected in the image and is potentially occluded, the trajectory is estimated */
    TERMINATE, /**< This is the last searching state of the track, the track will be deleted in the next retreiveObject */
    LAST
};

enum class OBJECT_ACTION_STATE {
    IDLE = 0,   /**< The object is staying static. */
    MOVING = 1, /**< The object is moving. */
    LAST
};

struct _ZedObjectData {
    gint id;

    OBJECT_CLASS label;
    OBJECT_SUBCLASS sublabel;
    OBJECT_TRACKING_STATE tracking_state;
    OBJECT_ACTION_STATE action_state;

    gfloat confidence;

    gfloat position[3];
    gfloat position_covariance[6];

    gfloat velocity[3];

    unsigned int bounding_box_2d[4][2];

    /* 3D bounding box of the person represented as eight 3D points
          1 ------ 2
         /        /|
        0 ------ 3 |
        | Object | 6
        |        |/
        4 ------ 7
    */
    gfloat bounding_box_3d[8][3];

    gfloat dimensions[3];   // 3D object dimensions: width, height, length

    gboolean skeletons_avail;

    gint skel_format;   // indicates if it's 18, 34, 38, or 70 skeleton model

    gfloat keypoint_2d[70][2];   // Negative coordinates -> point not valid
    gfloat keypoint_3d[70][3];   // Nan coordinates -> point not valid

    gfloat head_bounding_box_2d[4][2];
    gfloat head_bounding_box_3d[8][3];
    gfloat head_position[3];
};

struct _GstZedSrcMeta {
    GstMeta meta;

    ZedInfo info;

    ZedPose pose;
    ZedSensors sens;

    gboolean od_enabled;
    guint8 obj_count;
    guint64 frame_id;
    ZedObjectData objects[256];
};

namespace skeleton {

enum class BODY_18_PARTS {
    NOSE = 0,
    NECK = 1,
    RIGHT_SHOULDER = 2,
    RIGHT_ELBOW = 3,
    RIGHT_WRIST = 4,
    LEFT_SHOULDER = 5,
    LEFT_ELBOW = 6,
    LEFT_WRIST = 7,
    RIGHT_HIP = 8,
    RIGHT_KNEE = 9,
    RIGHT_ANKLE = 10,
    LEFT_HIP = 11,
    LEFT_KNEE = 12,
    LEFT_ANKLE = 13,
    RIGHT_EYE = 14,
    LEFT_EYE = 15,
    RIGHT_EAR = 16,
    LEFT_EAR = 17,
    LAST = 18
};

inline int getIdx_18(BODY_18_PARTS part) { return static_cast<int>(part); }

enum class BODY_34_PARTS {
    PELVIS = 0,
    NAVAL_SPINE = 1,
    CHEST_SPINE = 2,
    NECK = 3,
    LEFT_CLAVICLE = 4,
    LEFT_SHOULDER = 5,
    LEFT_ELBOW = 6,
    LEFT_WRIST = 7,
    LEFT_HAND = 8,
    LEFT_HANDTIP = 9,
    LEFT_THUMB = 10,
    RIGHT_CLAVICLE = 11,
    RIGHT_SHOULDER = 12,
    RIGHT_ELBOW = 13,
    RIGHT_WRIST = 14,
    RIGHT_HAND = 15,
    RIGHT_HANDTIP = 16,
    RIGHT_THUMB = 17,
    LEFT_HIP = 18,
    LEFT_KNEE = 19,
    LEFT_ANKLE = 20,
    LEFT_FOOT = 21,
    RIGHT_HIP = 22,
    RIGHT_KNEE = 23,
    RIGHT_ANKLE = 24,
    RIGHT_FOOT = 25,
    HEAD = 26,
    NOSE = 27,
    LEFT_EYE = 28,
    LEFT_EAR = 29,
    RIGHT_EYE = 30,
    RIGHT_EAR = 31,
    LEFT_HEEL = 32,
    RIGHT_HEEL = 33,
    LAST = 34
};

inline int getIdx_34(BODY_34_PARTS part) { return static_cast<int>(part); }

enum class BODY_38_PARTS {
    PELVIS = 0,
    SPINE_1 = 1,
    SPINE_2 = 2,
    SPINE_3 = 3,
    NECK = 4,
    NOSE = 5,
    LEFT_EYE = 6,
    RIGHT_EYE = 7,
    LEFT_EAR = 8,
    RIGHT_EAR = 9,
    LEFT_CLAVICLE = 10,
    RIGHT_CLAVICLE = 11,
    LEFT_SHOULDER = 12,
    RIGHT_SHOULDER = 13,
    LEFT_ELBOW = 14,
    RIGHT_ELBOW = 15,
    LEFT_WRIST = 16,
    RIGHT_WRIST = 17,
    LEFT_HIP = 18,
    RIGHT_HIP = 19,
    LEFT_KNEE = 20,
    RIGHT_KNEE = 21,
    LEFT_ANKLE = 22,
    RIGHT_ANKLE = 23,
    LEFT_BIG_TOE = 24,
    RIGHT_BIG_TOE = 25,
    LEFT_SMALL_TOE = 26,
    RIGHT_SMALL_TOE = 27,
    LEFT_HEEL = 28,
    RIGHT_HEEL = 29,
    // Hands
    LEFT_HAND_THUMB_4 = 30,   // tip
    RIGHT_HAND_THUMB_4 = 31,
    LEFT_HAND_INDEX_1 = 32,   // knuckle
    RIGHT_HAND_INDEX_1 = 33,
    LEFT_HAND_MIDDLE_4 = 34,   // tip
    RIGHT_HAND_MIDDLE_4 = 35,
    LEFT_HAND_PINKY_1 = 36,   // knuckle
    RIGHT_HAND_PINKY_1 = 37,
    LAST = 38
};

inline int getIdx_38(BODY_38_PARTS part) { return static_cast<int>(part); }

enum class BODY_70_PARTS {
    PELVIS = 0,
    SPINE_1 = 1,
    SPINE_2 = 2,
    SPINE_3 = 3,
    NECK = 4,
    NOSE = 5,
    LEFT_EYE = 6,
    RIGHT_EYE = 7,
    LEFT_EAR = 8,
    RIGHT_EAR = 9,
    LEFT_CLAVICLE = 10,
    RIGHT_CLAVICLE = 11,
    LEFT_SHOULDER = 12,
    RIGHT_SHOULDER = 13,
    LEFT_ELBOW = 14,
    RIGHT_ELBOW = 15,
    LEFT_WRIST = 16,
    RIGHT_WRIST = 17,
    LEFT_HIP = 18,
    RIGHT_HIP = 19,
    LEFT_KNEE = 20,
    RIGHT_KNEE = 21,
    LEFT_ANKLE = 22,
    RIGHT_ANKLE = 23,
    LEFT_BIG_TOE = 24,
    RIGHT_BIG_TOE = 25,
    LEFT_SMALL_TOE = 26,
    RIGHT_SMALL_TOE = 27,
    LEFT_HEEL = 28,
    RIGHT_HEEL = 29,
    // Hands
    // Left
    LEFT_HAND_THUMB_1 = 30,
    LEFT_HAND_THUMB_2 = 31,
    LEFT_HAND_THUMB_3 = 32,
    LEFT_HAND_THUMB_4 = 33,   // tip
    LEFT_HAND_INDEX_1 = 34,   // knuckle
    LEFT_HAND_INDEX_2 = 35,
    LEFT_HAND_INDEX_3 = 36,
    LEFT_HAND_INDEX_4 = 37,   // tip
    LEFT_HAND_MIDDLE_1 = 38,
    LEFT_HAND_MIDDLE_2 = 39,
    LEFT_HAND_MIDDLE_3 = 40,
    LEFT_HAND_MIDDLE_4 = 41,
    LEFT_HAND_RING_1 = 42,
    LEFT_HAND_RING_2 = 43,
    LEFT_HAND_RING_3 = 44,
    LEFT_HAND_RING_4 = 45,
    LEFT_HAND_PINKY_1 = 46,
    LEFT_HAND_PINKY_2 = 47,
    LEFT_HAND_PINKY_3 = 48,
    LEFT_HAND_PINKY_4 = 49,
    // Right
    RIGHT_HAND_THUMB_1 = 50,
    RIGHT_HAND_THUMB_2 = 51,
    RIGHT_HAND_THUMB_3 = 52,
    RIGHT_HAND_THUMB_4 = 53,
    RIGHT_HAND_INDEX_1 = 54,
    RIGHT_HAND_INDEX_2 = 55,
    RIGHT_HAND_INDEX_3 = 56,
    RIGHT_HAND_INDEX_4 = 57,
    RIGHT_HAND_MIDDLE_1 = 58,
    RIGHT_HAND_MIDDLE_2 = 59,
    RIGHT_HAND_MIDDLE_3 = 60,
    RIGHT_HAND_MIDDLE_4 = 61,
    RIGHT_HAND_RING_1 = 62,
    RIGHT_HAND_RING_2 = 63,
    RIGHT_HAND_RING_3 = 64,
    RIGHT_HAND_RING_4 = 65,
    RIGHT_HAND_PINKY_1 = 66,
    RIGHT_HAND_PINKY_2 = 67,
    RIGHT_HAND_PINKY_3 = 68,
    RIGHT_HAND_PINKY_4 = 69,
    LAST = 70
};

inline int getIdx_70(BODY_70_PARTS part) { return static_cast<int>(part); }

const std::vector<std::pair<BODY_18_PARTS, BODY_18_PARTS>> BODY_18_BONES{{BODY_18_PARTS::NOSE, BODY_18_PARTS::NECK},
                                                                         {BODY_18_PARTS::NECK, BODY_18_PARTS::RIGHT_SHOULDER},
                                                                         {BODY_18_PARTS::RIGHT_SHOULDER, BODY_18_PARTS::RIGHT_ELBOW},
                                                                         {BODY_18_PARTS::RIGHT_ELBOW, BODY_18_PARTS::RIGHT_WRIST},
                                                                         {BODY_18_PARTS::NECK, BODY_18_PARTS::LEFT_SHOULDER},
                                                                         {BODY_18_PARTS::LEFT_SHOULDER, BODY_18_PARTS::LEFT_ELBOW},
                                                                         {BODY_18_PARTS::LEFT_ELBOW, BODY_18_PARTS::LEFT_WRIST},
                                                                         {BODY_18_PARTS::RIGHT_SHOULDER, BODY_18_PARTS::RIGHT_HIP},
                                                                         {BODY_18_PARTS::RIGHT_HIP, BODY_18_PARTS::RIGHT_KNEE},
                                                                         {BODY_18_PARTS::RIGHT_KNEE, BODY_18_PARTS::RIGHT_ANKLE},
                                                                         {BODY_18_PARTS::LEFT_SHOULDER, BODY_18_PARTS::LEFT_HIP},
                                                                         {BODY_18_PARTS::LEFT_HIP, BODY_18_PARTS::LEFT_KNEE},
                                                                         {BODY_18_PARTS::LEFT_KNEE, BODY_18_PARTS::LEFT_ANKLE},
                                                                         {BODY_18_PARTS::RIGHT_SHOULDER, BODY_18_PARTS::LEFT_SHOULDER},
                                                                         {BODY_18_PARTS::RIGHT_HIP, BODY_18_PARTS::LEFT_HIP},
                                                                         {BODY_18_PARTS::NOSE, BODY_18_PARTS::RIGHT_EYE},
                                                                         {BODY_18_PARTS::RIGHT_EYE, BODY_18_PARTS::RIGHT_EAR},
                                                                         {BODY_18_PARTS::NOSE, BODY_18_PARTS::LEFT_EYE},
                                                                         {BODY_18_PARTS::LEFT_EYE, BODY_18_PARTS::LEFT_EAR}};

const std::vector<std::pair<BODY_34_PARTS, BODY_34_PARTS>> BODY_34_BONES{{BODY_34_PARTS::PELVIS, BODY_34_PARTS::NAVAL_SPINE},
                                                                         {BODY_34_PARTS::NAVAL_SPINE, BODY_34_PARTS::CHEST_SPINE},
                                                                         {BODY_34_PARTS::CHEST_SPINE, BODY_34_PARTS::LEFT_CLAVICLE},
                                                                         {BODY_34_PARTS::LEFT_CLAVICLE, BODY_34_PARTS::LEFT_SHOULDER},
                                                                         {BODY_34_PARTS::LEFT_SHOULDER, BODY_34_PARTS::LEFT_ELBOW},
                                                                         {BODY_34_PARTS::LEFT_ELBOW, BODY_34_PARTS::LEFT_WRIST},
                                                                         {BODY_34_PARTS::LEFT_WRIST, BODY_34_PARTS::LEFT_HAND},
                                                                         {BODY_34_PARTS::LEFT_HAND, BODY_34_PARTS::LEFT_HANDTIP},
                                                                         {BODY_34_PARTS::LEFT_WRIST, BODY_34_PARTS::LEFT_THUMB},
                                                                         {BODY_34_PARTS::CHEST_SPINE, BODY_34_PARTS::RIGHT_CLAVICLE},
                                                                         {BODY_34_PARTS::RIGHT_CLAVICLE, BODY_34_PARTS::RIGHT_SHOULDER},
                                                                         {BODY_34_PARTS::RIGHT_SHOULDER, BODY_34_PARTS::RIGHT_ELBOW},
                                                                         {BODY_34_PARTS::RIGHT_ELBOW, BODY_34_PARTS::RIGHT_WRIST},
                                                                         {BODY_34_PARTS::RIGHT_WRIST, BODY_34_PARTS::RIGHT_HAND},
                                                                         {BODY_34_PARTS::RIGHT_HAND, BODY_34_PARTS::RIGHT_HANDTIP},
                                                                         {BODY_34_PARTS::RIGHT_WRIST, BODY_34_PARTS::RIGHT_THUMB},
                                                                         {BODY_34_PARTS::PELVIS, BODY_34_PARTS::LEFT_HIP},
                                                                         {BODY_34_PARTS::LEFT_HIP, BODY_34_PARTS::LEFT_KNEE},
                                                                         {BODY_34_PARTS::LEFT_KNEE, BODY_34_PARTS::LEFT_ANKLE},
                                                                         {BODY_34_PARTS::LEFT_ANKLE, BODY_34_PARTS::LEFT_FOOT},
                                                                         {BODY_34_PARTS::PELVIS, BODY_34_PARTS::RIGHT_HIP},
                                                                         {BODY_34_PARTS::RIGHT_HIP, BODY_34_PARTS::RIGHT_KNEE},
                                                                         {BODY_34_PARTS::RIGHT_KNEE, BODY_34_PARTS::RIGHT_ANKLE},
                                                                         {BODY_34_PARTS::RIGHT_ANKLE, BODY_34_PARTS::RIGHT_FOOT},
                                                                         {BODY_34_PARTS::CHEST_SPINE, BODY_34_PARTS::NECK},
                                                                         {BODY_34_PARTS::NECK, BODY_34_PARTS::HEAD},
                                                                         {BODY_34_PARTS::HEAD, BODY_34_PARTS::NOSE},
                                                                         {BODY_34_PARTS::NOSE, BODY_34_PARTS::LEFT_EYE},
                                                                         {BODY_34_PARTS::LEFT_EYE, BODY_34_PARTS::LEFT_EAR},
                                                                         {BODY_34_PARTS::NOSE, BODY_34_PARTS::RIGHT_EYE},
                                                                         {BODY_34_PARTS::RIGHT_EYE, BODY_34_PARTS::RIGHT_EAR},
                                                                         {BODY_34_PARTS::LEFT_ANKLE, BODY_34_PARTS::LEFT_HEEL},
                                                                         {BODY_34_PARTS::RIGHT_ANKLE, BODY_34_PARTS::RIGHT_HEEL},
                                                                         {BODY_34_PARTS::LEFT_HEEL, BODY_34_PARTS::LEFT_FOOT},
                                                                         {BODY_34_PARTS::RIGHT_HEEL, BODY_34_PARTS::RIGHT_FOOT}};

const std::vector<std::pair<BODY_38_PARTS, BODY_38_PARTS>> BODY_38_BONES{
    {BODY_38_PARTS::PELVIS, BODY_38_PARTS::SPINE_1},
    {BODY_38_PARTS::SPINE_1, BODY_38_PARTS::SPINE_2},
    {BODY_38_PARTS::SPINE_2, BODY_38_PARTS::SPINE_3},
    {BODY_38_PARTS::SPINE_3, BODY_38_PARTS::NECK},
    // Face
    {BODY_38_PARTS::NECK, BODY_38_PARTS::NOSE},
    {BODY_38_PARTS::NOSE, BODY_38_PARTS::LEFT_EYE},
    {BODY_38_PARTS::LEFT_EYE, BODY_38_PARTS::LEFT_EAR},
    {BODY_38_PARTS::NOSE, BODY_38_PARTS::RIGHT_EYE},
    {BODY_38_PARTS::RIGHT_EYE, BODY_38_PARTS::RIGHT_EAR},
    // Left arm
    {BODY_38_PARTS::SPINE_3, BODY_38_PARTS::LEFT_CLAVICLE},
    {BODY_38_PARTS::LEFT_CLAVICLE, BODY_38_PARTS::LEFT_SHOULDER},
    {BODY_38_PARTS::LEFT_SHOULDER, BODY_38_PARTS::LEFT_ELBOW},
    {BODY_38_PARTS::LEFT_ELBOW, BODY_38_PARTS::LEFT_WRIST},
    {BODY_38_PARTS::LEFT_WRIST, BODY_38_PARTS::LEFT_HAND_THUMB_4},
    {BODY_38_PARTS::LEFT_WRIST, BODY_38_PARTS::LEFT_HAND_INDEX_1},
    {BODY_38_PARTS::LEFT_WRIST, BODY_38_PARTS::LEFT_HAND_MIDDLE_4},
    {BODY_38_PARTS::LEFT_WRIST, BODY_38_PARTS::LEFT_HAND_PINKY_1},
    // Right arm
    {BODY_38_PARTS::SPINE_3, BODY_38_PARTS::RIGHT_CLAVICLE},
    {BODY_38_PARTS::RIGHT_CLAVICLE, BODY_38_PARTS::RIGHT_SHOULDER},
    {BODY_38_PARTS::RIGHT_SHOULDER, BODY_38_PARTS::RIGHT_ELBOW},
    {BODY_38_PARTS::RIGHT_ELBOW, BODY_38_PARTS::RIGHT_WRIST},
    {BODY_38_PARTS::RIGHT_WRIST, BODY_38_PARTS::RIGHT_HAND_THUMB_4},
    {BODY_38_PARTS::RIGHT_WRIST, BODY_38_PARTS::RIGHT_HAND_INDEX_1},
    {BODY_38_PARTS::RIGHT_WRIST, BODY_38_PARTS::RIGHT_HAND_MIDDLE_4},
    {BODY_38_PARTS::RIGHT_WRIST, BODY_38_PARTS::RIGHT_HAND_PINKY_1},
    // Left leg
    {BODY_38_PARTS::PELVIS, BODY_38_PARTS::LEFT_HIP},
    {BODY_38_PARTS::LEFT_HIP, BODY_38_PARTS::LEFT_KNEE},
    {BODY_38_PARTS::LEFT_KNEE, BODY_38_PARTS::LEFT_ANKLE},
    {BODY_38_PARTS::LEFT_ANKLE, BODY_38_PARTS::LEFT_HEEL},
    {BODY_38_PARTS::LEFT_ANKLE, BODY_38_PARTS::LEFT_BIG_TOE},
    {BODY_38_PARTS::LEFT_ANKLE, BODY_38_PARTS::LEFT_SMALL_TOE},
    // Right leg
    {BODY_38_PARTS::PELVIS, BODY_38_PARTS::RIGHT_HIP},
    {BODY_38_PARTS::RIGHT_HIP, BODY_38_PARTS::RIGHT_KNEE},
    {BODY_38_PARTS::RIGHT_KNEE, BODY_38_PARTS::RIGHT_ANKLE},
    {BODY_38_PARTS::RIGHT_ANKLE, BODY_38_PARTS::RIGHT_HEEL},
    {BODY_38_PARTS::RIGHT_ANKLE, BODY_38_PARTS::RIGHT_BIG_TOE},
    {BODY_38_PARTS::RIGHT_ANKLE, BODY_38_PARTS::RIGHT_SMALL_TOE},
};

const std::vector<std::pair<BODY_70_PARTS, BODY_70_PARTS>> BODY_70_BONES{
    {BODY_70_PARTS::PELVIS, BODY_70_PARTS::SPINE_1},
    {BODY_70_PARTS::SPINE_1, BODY_70_PARTS::SPINE_2},
    {BODY_70_PARTS::SPINE_2, BODY_70_PARTS::SPINE_3},
    {BODY_70_PARTS::SPINE_3, BODY_70_PARTS::NECK},
    // Face
    {BODY_70_PARTS::NECK, BODY_70_PARTS::NOSE},
    {BODY_70_PARTS::NOSE, BODY_70_PARTS::LEFT_EYE},
    {BODY_70_PARTS::LEFT_EYE, BODY_70_PARTS::LEFT_EAR},
    {BODY_70_PARTS::NOSE, BODY_70_PARTS::RIGHT_EYE},
    {BODY_70_PARTS::RIGHT_EYE, BODY_70_PARTS::RIGHT_EAR},
    // Left arm
    {BODY_70_PARTS::SPINE_3, BODY_70_PARTS::LEFT_CLAVICLE},
    {BODY_70_PARTS::LEFT_CLAVICLE, BODY_70_PARTS::LEFT_SHOULDER},
    {BODY_70_PARTS::LEFT_SHOULDER, BODY_70_PARTS::LEFT_ELBOW},
    {BODY_70_PARTS::LEFT_ELBOW, BODY_70_PARTS::LEFT_WRIST},
    // Left hand
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_THUMB_1},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_THUMB_2},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_THUMB_3},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_THUMB_4},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_INDEX_1},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_INDEX_2},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_INDEX_3},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_INDEX_4},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_MIDDLE_1},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_MIDDLE_2},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_MIDDLE_3},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_MIDDLE_4},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_PINKY_1},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_PINKY_2},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_PINKY_3},
    {BODY_70_PARTS::LEFT_WRIST, BODY_70_PARTS::LEFT_HAND_PINKY_4},
    // Right arm
    {BODY_70_PARTS::SPINE_3, BODY_70_PARTS::RIGHT_CLAVICLE},
    {BODY_70_PARTS::RIGHT_CLAVICLE, BODY_70_PARTS::RIGHT_SHOULDER},
    {BODY_70_PARTS::RIGHT_SHOULDER, BODY_70_PARTS::RIGHT_ELBOW},
    {BODY_70_PARTS::RIGHT_ELBOW, BODY_70_PARTS::RIGHT_WRIST},
    // Right hand
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_THUMB_1},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_THUMB_2},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_THUMB_3},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_THUMB_4},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_INDEX_1},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_INDEX_2},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_INDEX_3},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_INDEX_4},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_MIDDLE_1},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_MIDDLE_2},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_MIDDLE_3},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_MIDDLE_4},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_PINKY_1},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_PINKY_2},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_PINKY_3},
    {BODY_70_PARTS::RIGHT_WRIST, BODY_70_PARTS::RIGHT_HAND_PINKY_4},
    // Left leg
    {BODY_70_PARTS::PELVIS, BODY_70_PARTS::LEFT_HIP},
    {BODY_70_PARTS::LEFT_HIP, BODY_70_PARTS::LEFT_KNEE},
    {BODY_70_PARTS::LEFT_KNEE, BODY_70_PARTS::LEFT_ANKLE},
    {BODY_70_PARTS::LEFT_ANKLE, BODY_70_PARTS::LEFT_HEEL},
    {BODY_70_PARTS::LEFT_ANKLE, BODY_70_PARTS::LEFT_BIG_TOE},
    {BODY_70_PARTS::LEFT_ANKLE, BODY_70_PARTS::LEFT_SMALL_TOE},
    // Right leg
    {BODY_70_PARTS::PELVIS, BODY_70_PARTS::RIGHT_HIP},
    {BODY_70_PARTS::RIGHT_HIP, BODY_70_PARTS::RIGHT_KNEE},
    {BODY_70_PARTS::RIGHT_KNEE, BODY_70_PARTS::RIGHT_ANKLE},
    {BODY_70_PARTS::RIGHT_ANKLE, BODY_70_PARTS::RIGHT_HEEL},
    {BODY_70_PARTS::RIGHT_ANKLE, BODY_70_PARTS::RIGHT_BIG_TOE},
    {BODY_70_PARTS::RIGHT_ANKLE, BODY_70_PARTS::RIGHT_SMALL_TOE},
};
}   // namespace skeleton

GST_EXPORT
GType gst_zed_src_meta_api_get_type(void);
#define GST_ZED_SRC_META_API_TYPE (gst_zed_src_meta_api_get_type())
#define GST_ZED_SRC_META_INFO     (gst_zed_src_meta_get_info())

#define gst_buffer_get_zed_src_meta(b) ((GstZedSrcMeta *) gst_buffer_get_meta((b), GST_ZED_SRC_META_API_TYPE))

/* implementation */

GST_EXPORT
const GstMetaInfo *gst_zed_src_meta_get_info(void);
#define GST_ZED_SRC_META_INFO (gst_zed_src_meta_get_info())

GST_EXPORT
GstZedSrcMeta *gst_buffer_add_zed_src_meta(GstBuffer *buffer, ZedInfo &info, ZedPose &pose, ZedSensors &sens, gboolean od_enabled, guint8 obj_count,
                                           ZedObjectData *objects, guint64 frame_id);

G_END_DECLS

#endif
