import React from "react";



function livekit_agent () {
  return <div>___</div>;
}
function Dashboard({panels}) {
  if (!panels ) return <>no panels... </>

  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {panels.map((panel) => (
            <div key={panel.id} className="relative lg:col-span-4">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden">
                <div className={`container-${panel.id}`}></div>
                {/* <iframe src={`/cgi-backend/${panel.id}`}></iframe> */}
                {panel.component ? <panel.component /> : <iframe src={`/cgi-backend/${panel.id}`}></iframe>}

                <div className="p-10 pt-4">{panel.title}</div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;