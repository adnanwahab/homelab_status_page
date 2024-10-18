import downloadYoutubeVideo from "./Youtube-helper.js";

export {
    downloadYoutubeVideo
}



function generateUIForEach(observableTitles) {
    return observableTitles.map((item, index) => (
        <div key={index} className="ui-item">
            <h2>{item.title}</h2>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
                Visit {item.title}
            </a>
        </div>
    ));
}

// Example usage
const uiComponents = generateUIForEach([
    { title: "Livekit", href: "https://observablehq.com/@roboticsuniversity/livekit" },
    { title: "Robotics Hardware", href: "https://observablehq.com/@roboticsuniversity/robotics-hardware" },
    { title: "Voxel Painter", href: "https://observablehq.com/@roboticsuniversity/alanthree" },
    { title: "Voxel Notebook", href: "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d" },
]);

export { generateUIForEach, uiComponents };
