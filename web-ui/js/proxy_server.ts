import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
//optimizely for agents -> agnets want to view ggoogle accounts -> they do it on your domain - you keep the data
//i f theres erres- you kepe llalaming till this proxy anying
///this kirby star route --- -api 
// // Create an express app
const app = express();
///rewtie open soruce - they mrigestuequwts - you might have to mitm - for good
const proxy_docs = [
    "https://bun.sh/docs/runtime/bunfig#run-bun-auto-alias-node-to-bun", 
    // "https://google.com", 
    // "https://youtube.com", 
    // "https://github.com", 
    "https://openai.com", 
    "https://bun.sh/docs", 
    "https://reflect.app",
    "https://zed.dev/docs/multibuffers",
    // "https://colab.research.google.com/",
    "http://hashirama.blog",
    "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
    "http://llama-tools.com",
    "https://replicate.com/black-forest-labs/flux-1.1-pro",
    "https://x.com/home",
    "https://ai.google.dev/edge/mediapipe/solutions/guide",
    "https://observablehq.com/d/396854ba12551e3a",
    "https://paulgraham.com/swan.html",
    "https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg",
    "https://robertheaton.com/archive/",
    "https://chatgpt.com/c/671358b5-9ffc-8013-bffd-11fd2f7bf1a1",
    "https://www.youtube.com/watch?v=CZim0p_etvM",
    "https://dynamicland.org/2024/FAQ/",
    "https://tailwindcss.com/docs/animation",
    "https://observablehq.com/@mbostock/rainbow-pack",
    "https://worrydream.com/LadderOfAbstraction/",
    "https://reflect.app/g/awahab/19102024",
    "https://developer.nvidia.com/sdk-manager",
    "https://login.nvgs.nvidia.com/v1/error?preferred_nvidia=true&context=reset&theme=Bright&locale=en-US&prompt=default&email=eggnog.wahab@gmail.com&key=eyJhbGciOiJIUzI1NiJ9.eyJzZSI6IjhsQzUiLCJ0b2tlbklkIjoiMTI5NzIwMjUyNzMxMjE2NjkxMiIsImV4cCI6MTcyOTM1MTE5MCwib3QiOiIxMjk3MjAyNTU1NTMyODczNzI4IiwianRpIjoiNTljNjEwZGUtMzg2Zi00ZTYzLWEzNGUtNDdjZDM3ZWQ0N2Q1In0.32bu8bBYxJhTwcoJ-a9uQ1c3IpoarslXbdfUEPzOAtU&client_id=323893095789756813&code=82bea1d181ad43fb993d3af2b432b449&id=c035c24e-ed9e-4e7b-a7e8-faa0caaee637&multipleOrigin=false&isAutoInit=false&jarvis_error=%7B%22error%22:%22CREDENTIALS_EXPIRED%22%7D",
    "https://chatgpt.com/c/6713bf25-6d78-8013-b29b-8ad79f6af262",
    "https://ubuntu.com/download/server/thank-you?version=24.04.1&architecture=amd64&lts=true",
    "https://www.google.com/search?q=ubuntu+2404&rlz=1C5CHFA_enUS1125US1125&oq=ubuntu+2404+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU4NzRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
    "https://github.com/mitchellh/nixos-config",
    "https://resend.com/emails",
    "https://chatgpt.com/c/6713c608-74ec-8013-b77f-7769630cb45f",
    "https://wiki.ubuntu.com/ARM/Server/Install?_gl=1*t9dj9w*_gcl_au*NDc0NDc3NzMuMTcyOTM0NzUxOQ..&_ga=2.99606046.1295490594.1729347516-1204181597.1729347516",
    "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
    "https://www.youtube.com/watch?v=CZim0p_etvM",
    "https://scholar.google.com/",
  ];

  
  
app.use(
  "/deno/youtube",
  createProxyMiddleware({
    target: "https://www.youtube.com", // Target website
    changeOrigin: true, // Needed to make the target domain appear the same
    pathRewrite: { "^/youtube": "" }, // Optional: Remove /youtube prefix when proxying
    onProxyReq(proxyReq, req, res) {
      // Add additional headers if needed
      console.log("youtube proxy");
      proxyReq.setHeader("X-Special-Proxy-Header", "Bun-Proxy");
    },
  })
);

app.use(
  "/deno/https://openai.com",
  createProxyMiddleware({
    target: "https://openai.com", // Target website
    changeOrigin: true, // Needed to make the target domain appear the same
    pathRewrite: { "^/openai": "" }, // Optional: Remove /youtube prefix when proxying
    onProxyReq(proxyReq, req, res) {
      // Add additional headers if needed
      console.log("youtube proxy");
      proxyReq.setHeader("X-Special-Proxy-Header", "Bun-Proxy");
    },
  })
);


// proxy_docs.forEach((url) => {
//   const route = new URL(url).hostname.replace(/\./g, '-'); // Create a unique route based on the hostname
//   app.use(
//     `/${route}`,
//     createProxyMiddleware({
//       target: url,
//       changeOrigin: true,
//       pathRewrite: { [`^/${route}`]: "" },
//       onProxyReq(proxyReq, req, res) {
//         console.log(url, route);

//         proxyReq.setHeader("X-Special-Proxy-Header", "Bun-Proxy");
//       },
//     })
//   );
// });

app.listen(3000, () => {
  console.log("Bun proxy server is running on http://localhost:3000");
});

