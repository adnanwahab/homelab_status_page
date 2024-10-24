import fs from "fs";

async function runOllamaCommand(prompt) {
  try {
    const command = `ollama run llama2 "${prompt}"`;
    
    const result = await Bun.spawn(["sh", "-c", command]).text();
   
    const logEntry = {
      timestamp: new Date().toISOString(),
      prompt: prompt,
      result: result
    };

    const logDir = "/derp/log";
    const logFile = path.join(logDir, "llama.json");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    let logData = [];
    if (fs.existsSync(logFile)) {
      const existingLog = fs.readFileSync(logFile, "utf-8");
      logData = JSON.parse(existingLog);
    }

    logData.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
    return result.trim();
  } catch (error) {
    console.error("Error running Ollama command:", error);
    throw error;
  }
}

export async function handleOllamaRequest(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await runOllamaCommand(prompt);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in handleOllamaRequest:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
