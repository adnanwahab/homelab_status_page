
# students readme for tools related to the course
1. dynamixels, android/iphone camera
2. jetson-containers + jetson_nano + jetson-inference + jetson-stats + jetson-stats-ui + jtop
3. observablehq, jupyter, 
4. sqlite
5. chatGPT / Anthropic
6. blender /spline.app

# Dependenccies
1. jetson-contaienrs (jupyter-notebook, whisper, llama3, llama3.1, )
local python - https://docs.astral.sh/uv/#project-management

Observable Add-ons
1. bun,deno,python,zig
2. cursor_mode as an import (zed-plugin)


```js
function bun_cell() {
    return fs.readdirSync("./", "utf-8");
}

bun(bun_cell)
```

```js

function deno_webgpu_cell() {
    return fs.readdirSync("./", "utf-8");
}

deno(deno_webgpu_cell)
```


```python

def python_cell():
    return os.listdir("./")

python(python_cell)
```

```js

const _= `
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("hello world\n", .{});
}
`

zig(zig_cell)
```




```english_code_gen

print all files in the current directory
```




# running notebooks 
bun run --hot --watch --debug --host 0.0.0.0 --port 3000

import * as Plot from "npm:@observablehq/plot";

deno 

https://deno.com/blog/v2.0

curl -fsSL https://deno.land/install.sh | sh



deno --allow-all template_deno_code.js

uv run example 

-- if necessary - use llama to rewrite user-code with minimal edits - so it works with repo


git clone https://github.com/denoland/webgpu-examples -> user_code/webgpu-examples -> run all 



#public cloud 
derp = robotics foundation model - lerobt+human_prediction 4tb-> 50PB 
| Category                    | Description                                                                                           |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| actions                     | 1TB actions_logs - robots + human doing things (change world state)                                   |
| catoons                     | 1TB cartoon - (youtube, talks, historical events, ) pixels over time                                  |
| comics                      | research papers, mango, books                                                                         |
| embeddings                  | intermediate representation of a transformer - link to [observablehq.com/@robotics-odyssey](https://observablehq.com/@robotics-odyssey/) |
| intermediate_representations| render passes of embeddings before sending to transformer, gpt, llm                                   |
| logs                        | 1TB log = code executing -> std+stdout                                                                |
| sensor_data                 | camera, sound, lidar, radar, satellites, neuralink, tactiles, olfactory, gustatory, vestibular, proprioception |
| text / notes / scribblings  | webPages, (most compact but easiest to misinterpret representation of model of reality - quote BV + Chomsky) |



prediction-planning
audience = 10yr +
each module needs 50 iterations - course launch nov 1 to friends - jan 1 ---- to zoox+waymo+dynamicland not vw
make custom models for - lerobt, flux, karpathy-minigpt

course design - connect SICP+latest research to fun explorable explanations - that drive robot in your house
$141 self driving nanosaur.factory -> abid + raffi
venn diagram - past present future (fantasy reality, shared model reality --- better set theory = visual proof dynamicland.org -> build+maintain using robots???? )

point of robotics odyssey - Combine Creative AI w/ Robotics for Robotic Art like BotNDolly - why? to build dynamicland because it unifies art and science - so theres no more "engineering anything"

books are too difficult to read them all
but the probably closets formula to create like alan kay or bret victor = read 10,000 boooks
i tried that didnt work :( - so i gave up and started to only paint using observablehq's magic paper for bret's magic ink.

how to english->code gen for robotics - llama-artifact -> dynamciland + arcology = future-city

https://criu.org/Main_Page
https://chatgpt.com/c/6716dacc-984c-8013-9f74-b45a37a9f5af
Thanks jwz

20% typescript 
20% python
20% zig
20% ? cuda
20% ?  treasure plaent