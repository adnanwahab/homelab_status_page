import fs from 'fs'
import { join } from "path";
import { OpenAI } from "openai";
///import { onePassword } from "1password";

import { $ } from "bun";


const openai_api_key = await $`op item get OPEN_AI_KEY --fields notesPlain`.text();

const client = new OpenAI({
  apiKey: openai_api_key,
});


  async function sendRequestToChatBot (prompt: string, files?: string[]) {

    // return openai.createCompletion({
    //   model: "o1-mini",
    //   prompt,
    //   //max_tokens: 100,
    // });

    const chatCompletion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });
      return chatCompletion;
}

//151 people, books, cartoons, movies, songs, 


//151 categories of things - 151 apis, 151 tools, 151 libraries, 151 frameworks
// export default function () {


// }
//fs.readFileSync("/home/adnan/homelab_status_page/data/intermediate_representation/micro_zoox/index.json").


const parallel_llm = async (prompt: string) => {
    return await sendRequestToChatBot(prompt);
}
export default parallel_llm




//use llama to sdjust prompt for gpt  - $try to spend 1000 on GPT aloen
//try to spend 1000 on Cloud GPU for serversdie webgpu
/// 1000 for arm parts - out of 20k
