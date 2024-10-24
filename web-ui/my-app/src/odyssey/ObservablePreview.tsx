import React from "react";

function ObservablePreview() {
  return (
    <div className="overflow-hidden" style={{height: "50vh"}}>
    <iframe className="h-full w-full" src="http://localhost:3000"></iframe>

      {/* <div className="pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl"> */}
          {/* <h2 className="max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
          A snapshot of your entire sales pipeline.
        </h2> */}
          {/* <div
            className="sm:h-auto sm:w-[76rem] relative  [--radius:theme(borderRadius.xl)]


            flex flex-row"
          > */}
             <iframe
              className="h-full w-full"
              src="http://127.0.0.1:3000"
              ></iframe>




              
            {/* <iframe
              className="h-screen w-1/2 flex-1"
              src="/public/dist/index.html"
            ></iframe> */}
            {/* <img
          alt=""
            src="https://radiant.tailwindui.com/screenshots/app.png"
            className="h-full rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10"
          /> */}

            {/* <div className="h-full w-1/4 flex flex-col justify-center border border-white/10">
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>
              <h1 className="text-blue-500">Hello</h1>

            </div> */}

          {/* </div> */}
        {/* </div>*/}
    {/*   </div> */}
    </div>
  );
}

export default ObservablePreview;


