//Rich Hichkey Refeactrso using embeedings from his code + talk data to fefctator your code
      //1. Responsibiltiy - -- talk to st0rk kabout maze navigation differnt paridigms liek kapil seeeing above maze vs running int o walls 
      //2. responsitlbity =collects all comments - and stores them in /data/intermediate_representation/rich_hickey.json
      // focus = CLJS + study light table + any cool clj project liek datomic.  
       // focus = metric get entire repo down to 10mb - each file only 15-45 lines - self driving -semi-autonomous robots - all visualizaitons in obs.
       // theorem = 151 files = anything - if contain probalblitliy = reality creation  -probablity manipualtion  = contain chaos by tune correct variable.
//we want a magic terminal in observable - for fun --- 100x100 terminal of all robots - sensors + dsahobards + whatever - 200 cars - 
import fs from 'fs' 
import { $ } from "bun";
//uber style guide - git visuzler
const output_file_location = "/home/adnan/data/intermediate_representation/rich_hickey.json"
const invariants = ["move import imports to top", "remove comments"] //find all .cursorinsuctions 
export async function Rich_Hickey_Refactor(file_name) {
    const file_contents = fs.readFileSync(file_name, 'utf8');
    
    const refactored_code = await $`ollama prompt "rewrite this code in a way that is more readable and easier to understand. ${file_contents}. --- also please follow these invariants if they seem useful in tihis context tyvm. "` ;

    let output_file_contents = fs.readFileSync(output_file_location).toString().length < 5 ? JSON.parse(fs.readFileSync(output_file_location)) : {};
    output_file_contents[Date.now()] = {refactored_code, previous_code: file_contents}
    fs.writeFileSync(output_file_location, JSON.stringify(output_file_contents))
}

export async function re_organize_file_system_simple(prompt) {
    //const directory = "/home/adnan/homelab_status_page/web-ui/";

    //const command = `find ./" --exclude node_modules --exclude .git --exclude .vscode --exclude .cursorignore --exclude .cursorrules --exclude .cursorignore --exclude .cursorrules --exclude .cursorignore --exclude .cursorrules`;


    //const command = `ls -r ~/homelab_status_page/web-ui/*`;
    //const command = `l`;

    //const directory_structure = await $`ls -d ./`.text().catch(error => console.error('Error:', error));
    //console.log(directory_structure);
    //const file_list = await $`find "$(pwd)" -maxdepth 5 -not -path "node_modules/*"`.text().catch(error => console.error('Error:', error));
   
    const file_list = await $`find "$(pwd)" -maxdepth 5 -not -path "*/node_modules/*"`.text().catch(error => console.error('Error:', error));
    //const directory_structure = await $`find "$(pwd)" -maxdepth 5 --exclude node_modules`.text().catch(error => console.error('Error:', error));


    const files = file_list.split("\n").forEach(_ => {
        //paralelel 
        //paralelle llm --> rewrite html/go into react and use my deisgn isysmte
    })
    console.log(files);


}


import { chromium } from 'playwright';
//import ollama from 'ollama'
const vit = () => {}
//     



async function fix_deisgn (url) {
    //find api or make one - whateve
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    // await page.goto(url);
    // const screenshotPath = 'screenshot.png';
    // await page.screenshot({ path: screenshotPath });
    // await browser.close();

    //./screenshot.png
    // let prompt = "describe this image"
    // prompt = 'describe any css-visual-design issues with this react tailwind web app';
    // //const annotation = await $`ollama prompt "Annotate this screenshot and provide a 5-line description of any design flaws from the perspective of a UI-designer. ${screenshotPath}"`.text();
    // const example_from_net = await $`ollama run llava "${prompt}: ${screenshotPath}"`.text();

    const res = await ollama.chat({
        model: 'llava',
        messages: [{
            role: 'user',
                content: 'Describe this image:'
                images: ['Screenshot from 2024-10-19 23-42-30.png']
        }]
    })

        console.log(res.message.content)

    //console.log(example_from_net);
}
//netcat - image to display for jetson fixing 
//give miranda a lightsaber - >
// tool support with 1 m tools -> | ls | sc -l yay -1m alias 

//simplify file - delete dead code - move comments to output. 
// estimate probaiblity that refeactor is correct.
//if less than 75% -> yield to supervise 
//else ask more knoweldable bro GPT.


if (process.argv[0].includes('bun')) {
    //fix_deisgn('http://gpu.jerboa-kokanue.ts.net/');
    //fix_deisgn('http://localhost:8001/');
    // const file_name = process.argv[1]
    // if (!file_name) throw new Error("No file name provided")
    // else Main_Rich_Hickey_Refactor(file_name);

    //console.log(await re_organize_file_system_simple(""))


    //Rich_Hickey_Refactor()
    //re_organize_file_system_simple // this should move all htmls to /web-ui/views/ - convert them to good react.jsx + tailwind.  --- design
}
