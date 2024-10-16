
---
theme: slate
---

https://101.school/courses/physics-101 - chatbot + twitch chat -> issues commands to queue -

<iframe style="width:100%; height:500px;"  src="https://worrydream.com/LadderOfAbstraction/">
</iframe>



<!-- <iframe class="w-full"src="/proxy_to_threejs_journey">
</iframe> -->



<iframe style="width:100%; height:500px;" src="https://madebyevan.com/webgl-water/">
</iframe>

<!-- 
<iframe width="100%" height="500" frameborder="0" src="https://observablehq.com/embed/@d3/latex?cells=viewof+tex"></iframe> -->


```js echo
Plot.auto(olympians, {x: "weight", y: "height", color: "count"}).plot()
```

This auto mark is equivalent to a rect & bin combination:

```js echo
Plot.rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"})).plot()
```



```js echo
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.delaunayLink(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", stroke: "body_mass_g", strokeWidth: 1.5})
  ]
})
```


```js echo
value = (x, y) =>
  (1 + (x + y + 1) ** 2 * (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2))
  * (30 + (2 * x - 3 * y) ** 2 * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2))
```


```html
<p>
Converting this notebook into a framework presented a few subtleties that needed to be overcome, but the final result is quite similar. As a teaser, the following thumbnail links to a video demonstrating the deployment of this computer graphics animation using the Observable Framework.
<ul>
  <li><a href="https://christophe-yamahata.observablehq.cloud/irb120-animated-with-three-js/" target="_blank">Link the the Framework</a> (Observablehq.cloud)</li>
  <li><a href="https://youtu.be/imaOQ4znJmI" target="_blank">Link to the video</a> (YouTube.com)</li>
</ul>
</p>
```
