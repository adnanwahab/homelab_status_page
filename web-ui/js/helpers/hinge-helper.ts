import { serve } from "bun";
import React from "react";
import ReactDOMServer from "react-dom/server";

// Define your React component
function App() {
  return (
    <div>
      <h1>Hello from React Component!</h1>
      <p>This is rendered on the server using Bun and React.</p>
    </div>
  );
}

// Start the Bun server
serve({
  port: 7001, // You can change the port if needed
  fetch(req) {
    // Render the React component to an HTML string
    const html = ReactDOMServer.renderToString(<App />);

    // Return the full HTML response
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>Bun React Server</title>
</head>
<body>
  <div id="root">${html}</div>
</body>
</html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
});



// start up the android 
// remote command emulator -avd <emulator_name>
// catch screen - rustesk -> save to file  -> finetune - llama for compaitiblity
// vit label frame - objects 
// rust-desk - click the button coordinates 
//  vit label - which screen am i on ? -> click here or type this 


// hi, ask questions, 