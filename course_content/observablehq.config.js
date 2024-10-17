export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Robotics-Odyssey",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "1. Perception",
      pages: [
        { name: "Object Detection", path: "perception/object-detection" },
        { name: "Camera Calibration", path: "perception/camera-calibration" },
        { name: "Vision Transformers", path: "perception/vision-transformers" },
      ],
    },
    {
      name: "2. Planning & Prediction",
      pages: [
        { name: "Motion Trajectory Prediction", path: "planning/motion-prediction" },
        { name: "LLMs vs Classical Planning", path: "planning/llms-vs-classical" },
      ],
    },
    {
      name: "3. Simulation and UI",
      pages: [
        { name: "Unreal Engine and Isaac ROS", path: "simulation-ui/unreal-isaac" },
        { name: "Sim2Real Generalization", path: "simulation-ui/sim2real" },
        { name: "Manipulation Policy Evaluation", path: "simulation-ui/policy-evaluation" },
        { name: "Robotics Learning", path: "simulation-ui/robot-learning-simulation-and-environment-and-trajectory-planning" },
        { name: "Environment and Trajectory Planning", path: "simulation-ui/environment-and-trajectory-planning" },
      ],
    },

    {
      name: "4. Hardware",
      pages: [
        { name: "Assembly", path: "hardware/assembly-disassembly" },
        { name: "Kinematics and Dynamics", path: "hardware/kinematics-dynamics" },

        { name: "Preventative Maintenance", path: "hardware/preventative-maintenance" },
  
      ],
    },
    {
      name: "5. Real World Applications",
      pages: [
        { name: "Cat Food", path: "cat-food" },
        { name: "Agriculture and Logistics", path: "agri-logistics" },
        { name: "House Building and Gardening", path: "house-garden" },
        { name: "Science & Math Magic", path: "science-math-magic" },
      ],
    },

    // course_content/src/Hardware.md
    // course_content/src/Perception.md
    // course_content/src/Planning---Prediction.md
    // course_content/src/Real-World-Applications.md
    // course_content/src/Simulation-and-UI.md
    {
      name: "creative ai",
      pages: [
        { name: "Hardware", path: "hardware" },
        { name: "Perception", path: "perception" },
        { name: "Planning---Prediction", path: "Planning---Prediction" },
        { name: "Real-World-Applications", path: "Real-World-Applications" },
        { name: "Simulation-and-UI", path: "Simulation-and-UI" },
      ],
    },
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "ocean-floor", // try "light", "dark", "slate", etc.
  //header: "make cube of worrydream for all things", // what to show in the header (HTML)
  footer: "Robotics Odyssey", // what to show in the footer (HTML)
  sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  //search: true, // activate search
  linkify: true, // convert URLs in Markdown to links
  globalStyleSheets: [
    // "https://unpkg.com/open-props/normalize.min.css",
    "https://raw.githubusercontent.com/adnanwahab/homelab_status_page/refs/heads/main/public/css/output.css",
    "public/css/obs-edits.css",
  ],
  typographer: true, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
};

// // Window 1

// https://shop.raise3d.com/checkouts/cn/Z2NwLXVzLWNlbnRyYWwxOjAxSkE0Q0VONlM1Ujc1TU1HUTlUM0dQUjFF/payment
// https://observablehq.com/framework/
// https://observablehq.com/settings
// https://observablehq.com/documentation/data/databases/overview
// https://observablehq.com/@jwolondon/what-is-your-four-digit-pin
// https://observablehq.com/@mbostock

// https://github.com/observablehq/framework/tree/main/examples/api/src/data
// https://github.com/observablehq/framework/blob/main/examples/plot/src/index.md
// https://github.com/adnanwahab/framework/tree/main/examples/plot
// http://localhost:3000/#analyzing-web-logs
// https://observablehq.com/@roboticsuniversity/agent-dashboard
// https://www.linkedin.com/in/raffaello-bonghi/
// https://www.linkedin.com/in/robotics-university/
// https://zed.dev/docs/
// https://observablehq.com/@christophe-yamahata/industrial-robot-irb-120
// chrome://history/
// https://chromewebstore.google.com/detail/list-all-tabs/iklkoalaepbjckknpnklbipmplnipcid?hl=en
// https://chromewebstore.google.com/detail/tab-copy/micdllihgoppmejpecmkilggmaagfdmb

// Window 2

// https://reflect.app/g/awahab/93832131a5134678aa1205c020c82d86
// https://chatgpt.com/c/670c079e-356c-8013-b7d2-1e86009f9c05
// https://tailwindcss.com/docs/installation
// http://localhost:8080/

// // See https://observablehq.com/framework/config for documentation.
// export default {
//   // The app’s title; used in the sidebar and webpage titles.
//   title: "Robotics-Odyssey",

//   // The pages and sections in the sidebar. If you don’t specify this option,
//   // all pages will be listed in alphabetical order. Listing pages explicitly
//   // lets you organize them into sections and have unlisted pages.
//   // pages: [
//   //   {
//   //     name: "Perception",
//   //     pages: [
//   //       {name: "Dashboard", path: "/example-dashboard"},
//   //       {name: "Report", path: "/example-report"}
//   //     ]
//   //   }
//   // ],

//   // Content to add to the head of the page, e.g. for a favicon:
//   head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

//   // The path to the source root.
//   root: "src",

//   // Some additional configuration options and their defaults:
//   theme: "ocean-floor", // try "light", "dark", "slate", etc.
//   //header: "make cube of worrydream for all things", // what to show in the header (HTML)
//   footer: "(DynamicLand.org+SICP+Zoox+Seinfeld)**2=Zootopia = Golden Chocobo", // what to show in the footer (HTML)
//   sidebar: true, // whether to show the sidebar
//   // toc: true, // whether to show the table of contents
//   // pager: true, // whether to show previous & next links in the footer
//   // output: "dist", // path to the output root for build
//   search: true, // activate search
//   linkify: true, // convert URLs in Markdown to links
//   globalStyleSheets: [],
//   // typographer: false, // smart quotes and other typographic improvements
//   // cleanUrls: true, // drop .html from URLs
// };

// See https://observablehq.com/framework/config for documentation.

