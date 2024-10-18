
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


# TDD for agent-helpers

deno --allow-all user_code/tmp/initial_webgpu_test.js 


git clone --depth=1 https://github.com/mrdoob/three.js.git

https://github.com/mrdoob/three.js


# 20,000 pull-request
1. zed2i + zed.dev
2. three.js
3. trossen-
https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/quickstart.html

rosservice call /vx250/torque_enable "{cmd_type: 'group', name: 'all', enable: true}