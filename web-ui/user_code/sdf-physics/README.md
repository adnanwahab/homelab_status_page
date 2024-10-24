# SDF Physics

A WebGPU rigid body dynamics simulator where all geometry and constraints are specified by implicit signed distance functions.

For project history, check the [log](LOG.md).

# Development

Clone this repo, and using node.js/npm run:

```
npm ci
```

Once all dependencies are initialized there are two basic commands:

* `npm run watch`: Sets up a live reloading server for working on the demos
* `npm run build`: Builds all the demos

And one very dangerous command:

* `npm run gh-pages`: Which builds all the files and pushes them to gh-pages

All the code is in `src/demos`, take a look if you are curious

# License
(c) 2023 Mikola Lysenko.  MIT License