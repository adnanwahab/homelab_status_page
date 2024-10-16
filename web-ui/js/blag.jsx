
// the wizards are humans too -- shodan was right.
function Blog () {  
  let focus = {
    "sensors": ["zed-2i", "realsense", "roomba", "lidar", "camera"],
    "manipulators": ["trossen", "gello", "shadow"],
    "locomotion": ["roomba", "segway", "wheelchair"],
    "tools": [],
    "foundation_models": ["llama", "gpt", "gemini", "claude"]
  }





  return (

  
  <div class="bg-slate-900 font-white">
    <div
      class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-full"
    >
      <div class="w-[108rem] flex-none flex justify-end">
        <picture>
          <source
            srcset="
              https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif
            "
            type="image/avif"
          />
          <img
            src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png"
            alt=""
            class="w-[90rem] flex-none max-w-none block"
            decoding="async"
          />
        </picture>
      </div>
    </div>
    <div
      class="text-center space-y-5 border-gray-700 border-2-b border-slate-700"
    ></div>
    <div class="flex min-h-full bg-slate-900">
      <div class="flex w-full flex-col">
        <div
          class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12"
        >
          <div
            class="hidden md:relative md:block md:flex-none border-gray-700 border-r-2"
          >
            <div class="absolute inset-y-0 right-0 w-[50vw]"></div>
            <div
              class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"
            ></div>
            <div
              class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"
            ></div>
            <div
              class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-24 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16"
            >
              <nav class="text-base lg:text-sm">
                <ul role="list" class="space-y-9">
                  <li>
                    <ul role="list" class="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
                      <li class="relative">
                        <a
                          class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
                          href="/"
                          >Posts</a
                        >
                      </li>
                      <li class="relative">
                        <a
                          class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                          href="/about"
                          >About</a
                        >
                      </li>

                      <li class="relative">
                        <a
                          class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                          href="https://twitter.com/adnan_wahab_"
                          >Twitter</a
                        >
                      </li>
                      <li class="relative">
                        <a
                          class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                          href="/subscribe"
                          >Subscribe</a
                        >
                      </li>

                      <li class="relative">
                        <a
                          class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                          href="/"
                          >___</a
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div
            class="mt-8 relative flex h-full max-w-full flex-1 flex-col overflow-hidden"
          >
            <div class="bg-gray-900 text-gray-400">
              <div class="container mx-auto px-4">
                <section class="mb-6">
                  <h2 id="memory-updated" class="text-3xl font-bold mb-4">
                    <a id="memory-updated" href="/robotics-odyssey"
                      >Launch: Robotics Odyssey - oct 10 midnight
                      
                      
             
                      <img
              alt=""
              src="https://files.hashirama.blog/static/blog/5.png"
              className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            />
                      
                      </a
                    >
                  </h2>
                  <ul class="list-none pl-0 space-y-2">
                    <li>
                      <a
                        href="/?"
                        class="text-xl text-gray-400 hover:underline"
                      >
                      </a>
                    </li>
                  </ul>
                </section>

                <section class="mb-6">
                  <h2 class="text-3xl font-bold mb-4">
                    Robotics Sensors
                  </h2>
                  <ul class="list-none pl-0 space-y-2">
                    {focus.sensors.map(sensor => (
                      <li>
                        <a
                          href="/?"
                          class="text-xl text-gray-400 hover:underline"
                        >
                          {sensor}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
                <section class="mb-6">
                  <h2 class="text-3xl font-bold mb-4">Robotic Manipulators</h2>
                  <ul class="list-none pl-0 space-y-2">
                    {focus.manipulators.map(manipulator => (
                      <li>
                        <a
                          href="/?"
                        class="text-xl text-gray-400 hover:underline"
                      >
                        {manipulator}
                      </a>
                      <a>https://github.com/wuphilipp/gello_mechanical</a>
                    </li> 
                    ))}
                  </ul> 
                </section>
                <section class="mb-6">
                  <h2 class="text-3xl font-bold mb-4">
                    Robotic Locomotion
                  </h2>
                  <ul class="list-none pl-0 space-y-2">
                    {focus.locomotion.map(locomotion => (
                      <li>
                        <a
                          href="/?"
                        class="text-xl text-gray-400 hover:underline"
                      >
                        {locomotion}
                      </a>
                    </li>
                  ))}
                  </ul>
                </section>

                <section class="mb-6">
                  <h2 class="text-3xl font-bold mb-4">
                   
                  </h2>
                  <ul class="list-none pl-0 space-y-2">
                    {focus.tools.map(tool => (
                      <li>
                        <a
                          href="/?"
                        class="text-xl text-gray-400 hover:underline"
                      >
                        {tool}
                      </a>
                    </li>
                  ))}
                  </ul>
                </section>

                <section class="mb-6">
                  <section class="">
                    <div><a href="/llama-tools">LLama Tools</a></div>
                    <div>
                      <a href="/cgi-tools">Computer Graphics Tools</a>
                    </div>
                    <div>
                      <a href="/hardware-tools">Hardware Tools</a>
                    </div>
                  </section>
                  <a
                    href="/blag-archive"
                    class="border border-gray-600 py-2 px-4 text-gray-400 hover:bg-gray-800 inline-block"
                  >
                    View full archive (174 essays)
                  </a>
                  <section
                    class="py-6 border-t border-gray-700 mt-12 border-t-2"
                  >
                    <h2 class="text-3xl font-bold mb-4 text-gray-400">
                      Get new essays sent to you
                    </h2>
                    <p class="text-xl text-gray-400 mb-4">
                      Subscribe to my receive updates on Robotic Hardware,
                      Published twice weekly.
                    </p>
                    <form action="#" method="post" class="mb-4">
                      <div class="flex space-x-2">
                        <input
                          type="email"
                          placeholder="Your email address"
                          class="flex-1 p-3 bg-gray-800 border border-gray-600 text-gray-400"
                        />
                        <button
                          type="submit"
                          class="bg-green-900 text-white py-2 px-4 hover:bg-green-600"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </section>
                </section>
              </div>
            </div>
          </div>

          <div
            id="display"
            class="relative flex h-full max-w-full flex-1 flex-col overflow-hidden hidden"
          ></div>
        </div>
   
{/* 
        <footer class="border-t border-gray-700 border-2-t">
          <div
            class="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8"
          >
            <div class="flex justify-center space-x-6 md:order-2">
              <a
                href="https://observablehq.com/@adnanwahab?tab=recents"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">observablehq</span>
                <svg
                  role="img"
                  viewBox="0 0 25 28"
                  width="25"
                  height="28"
                  aria-label="Observable"
                  fill="currentColor"
                  style={{ width: "22px" }}
                  class="white"
                >
                  <path
                    d="M12.5 22.6667C11.3458 22.6667 10.3458 22.4153 9.5 21.9127C8.65721 21.412 7.98339 20.7027 7.55521 19.8654C7.09997 18.9942 6.76672 18.0729 6.56354 17.1239C6.34796 16.0947 6.24294 15.0483 6.25 14C6.25 13.1699 6.30417 12.3764 6.41354 11.6176C6.52188 10.8598 6.72292 10.0894 7.01563 9.30748C7.30833 8.52555 7.68542 7.84763 8.14479 7.27274C8.62304 6.68378 9.24141 6.20438 9.95208 5.87163C10.6979 5.51244 11.5458 5.33333 12.5 5.33333C13.6542 5.33333 14.6542 5.58467 15.5 6.08733C16.3428 6.588 17.0166 7.29733 17.4448 8.13459C17.8969 8.99644 18.2271 9.9103 18.4365 10.8761C18.6448 11.841 18.75 12.883 18.75 14C18.75 14.8301 18.6958 15.6236 18.5865 16.3824C18.4699 17.1702 18.2639 17.9446 17.9719 18.6925C17.6698 19.4744 17.2948 20.1524 16.8427 20.7273C16.3906 21.3021 15.7927 21.7692 15.0479 22.1284C14.3031 22.4876 13.4542 22.6667 12.5 22.6667ZM14.7063 16.2945C15.304 15.6944 15.6365 14.864 15.625 14C15.625 13.1073 15.326 12.3425 14.7292 11.7055C14.1313 11.0685 13.3885 10.75 12.5 10.75C11.6115 10.75 10.8688 11.0685 10.2708 11.7055C9.68532 12.3123 9.36198 13.1405 9.375 14C9.375 14.8927 9.67396 15.6575 10.2708 16.2945C10.8688 16.9315 11.6115 17.25 12.5 17.25C13.3885 17.25 14.124 16.9315 14.7063 16.2945ZM12.5 27C19.4031 27 25 21.1792 25 14C25 6.82075 19.4031 1 12.5 1C5.59687 1 0 6.82075 0 14C0 21.1792 5.59687 27 12.5 27Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>

              <a
                href="https://github.com/BotParty"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">GitHub</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.twitch.tv/roboticsodyssey"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Twitch</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M2.089 0L.525 4.175v16.694h5.736V24h3.132l3.127-3.132h4.695l6.26-6.258V0H2.089zm2.086 2.085H21.39v11.479l-3.652 3.652H12l-3.127 3.127v-3.127H4.175V2.085zM9.915 12.522H12v-6.26H9.915v6.26zm5.735 0h2.086v-6.26H15.65v6.26z"
                  />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@Robotics-Odyssey"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">YouTube</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://discord.gg/YVAMRtKj"
                class="text-gray-400 hover:text-gray-500"
                ><span class="sr-only">Discord</span
                ><svg
                  class="w-6 h-6"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Discord Logo"
                >
                  <g clip-path="url(#clip0_1993_195)">
                    <path
                      d="M11.8595 2.62936C10.9397 2.21264 9.96862 1.917 8.97117 1.75C8.83467 1.99146 8.71117 2.23988 8.60118 2.49424C7.5387 2.33581 6.45822 2.33581 5.39574 2.49424C5.28569 2.23991 5.16219 1.99149 5.02575 1.75C4.02766 1.91841 3.05598 2.21475 2.13524 2.63154C0.307332 5.30775 -0.188185 7.9175 0.0595735 10.4902C1.13004 11.2729 2.3282 11.8681 3.60197 12.25C3.88878 11.8683 4.14258 11.4633 4.36066 11.0394C3.94644 10.8863 3.54665 10.6974 3.16591 10.4749C3.26612 10.403 3.36412 10.3289 3.45882 10.257C4.56668 10.7726 5.77586 11.0399 7.00011 11.0399C8.22437 11.0399 9.43354 10.7726 10.5414 10.257C10.6372 10.3344 10.7352 10.4085 10.8343 10.4749C10.4528 10.6978 10.0523 10.887 9.63736 11.0405C9.85518 11.4642 10.109 11.8688 10.3961 12.25C11.6709 11.8696 12.87 11.2747 13.9406 10.4913C14.2314 7.50778 13.444 4.92201 11.8595 2.62936ZM4.67449 8.908C3.98407 8.908 3.41367 8.28798 3.41367 7.52522C3.41367 6.76245 3.96425 6.13699 4.67228 6.13699C5.38032 6.13699 5.94631 6.76245 5.9342 7.52522C5.92209 8.28798 5.37812 8.908 4.67449 8.908ZM9.32574 8.908C8.63422 8.908 8.06602 8.28798 8.06602 7.52522C8.06602 6.76245 8.6166 6.13699 9.32574 6.13699C10.0349 6.13699 10.5965 6.76245 10.5843 7.52522C10.5722 8.28798 10.0294 8.908 9.32574 8.908Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1993_195">
                      <rect width="14" height="14" fill="white"></rect>
                    </clipPath>
                  </defs></svg
              ></a>
            </div>

            <div class="mt-8 md:order-1 md:mt-0">
              <div class="text-sm/6 text-gray-150">
                <a
                  class="text-gray-400 hover:text-gray-500"
                  href="https://en.wikipedia.org/wiki/Silent_protagonist"
                >
                  <a href="/contact" class="text-gray-400 hover:text-gray-500">
                    Contact
                  </a>
                </a>
              </div>
            </div>
          </div>
        </footer> */}



      </div>
    </div>
    </div>
  
    )
}

export default Blog;



{/* 
<html>
      <head>
    <style>
      #memory-updated {
        font-size: 20px;
        font-weight: bold;
        color: silver;
      }

      @keyframes rotateGradient {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }

      #memory-updated:hover {
        animation:
          rainbow 3s infinite,
          fadeInOut 3s forwards;
      }

      @keyframes rainbow {
        0% {
          color: red;
        }
        16% {
          color: orange;
        }
        33% {
          color: yellow;
        }
        50% {
          color: green;
        }
        66% {
          color: blue;
        }
        83% {
          color: indigo;
        }
        100% {
          color: violet;
        }
      }

      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    </style>
    <style type="text/css">
      [vaul-drawer] {
        touch-action: none;
        will-change: transform;
        transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
      }
      [vaul-drawer][vaul-drawer-direction="bottom"] {
        transform: translate3d(0, 100%, 0);
      }
      [vaul-drawer][vaul-drawer-direction="top"] {
        transform: translate3d(0, -100%, 0);
      }
      [vaul-drawer][vaul-drawer-direction="left"] {
        transform: translate3d(-100%, 0, 0);
      }
      [vaul-drawer][vaul-drawer-direction="right"] {
        transform: translate3d(100%, 0, 0);
      }
      .vaul-dragging .vaul-scrollable [vault-drawer-direction="top"] {
        overflow-y: hidden !important;
      }
      .vaul-dragging .vaul-scrollable [vault-drawer-direction="bottom"] {
        overflow-y: hidden !important;
      }
      .vaul-dragging .vaul-scrollable [vault-drawer-direction="left"] {
        overflow-x: hidden !important;
      }
      .vaul-dragging .vaul-scrollable [vault-drawer-direction="right"] {
        overflow-x: hidden !important;
      }
      [vaul-drawer][vaul-drawer-visible="true"][vaul-drawer-direction="top"] {
        transform: translate3d(0, var(--snap-point-height, 0), 0);
      }
      [vaul-drawer][vaul-drawer-visible="true"][vaul-drawer-direction="bottom"] {
        transform: translate3d(0, var(--snap-point-height, 0), 0);
      }
      [vaul-drawer][vaul-drawer-visible="true"][vaul-drawer-direction="left"] {
        transform: translate3d(var(--snap-point-height, 0), 0, 0);
      }
      [vaul-drawer][vaul-drawer-visible="true"][vaul-drawer-direction="right"] {
        transform: translate3d(var(--snap-point-height, 0), 0, 0);
      }
      [vaul-overlay] {
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
      }
      [vaul-overlay][vaul-drawer-visible="true"] {
        opacity: 1;
      }
      [vaul-drawer]::after {
        content: "";
        position: absolute;
        background: inherit;
        background-color: inherit;
      }
      [vaul-drawer][vaul-drawer-direction="top"]::after {
        top: initial;
        bottom: 100%;
        left: 0;
        right: 0;
        height: 200%;
      }
      [vaul-drawer][vaul-drawer-direction="bottom"]::after {
        top: 100%;
        bottom: initial;
        left: 0;
        right: 0;
        height: 200%;
      }
      [vaul-drawer][vaul-drawer-direction="left"]::after {
        left: initial;
        right: 100%;
        top: 0;
        bottom: 0;
        width: 200%;
      }
      [vaul-drawer][vaul-drawer-direction="right"]::after {
        left: 100%;
        right: initial;
        top: 0;
        bottom: 0;
        width: 200%;
      }
      [vaul-handle] {
        display: block;
        position: relative;
        opacity: 0.8;
        margin-left: auto;
        margin-right: auto;
        height: 5px;
        width: 56px;
        border-radius: 1rem;
        touch-action: pan-y;
        cursor: grab;
      }
      [vaul-handle]:active,
      [vaul-handle]:hover {
        opacity: 1;
      }
      [vaul-handle]:active {
        cursor: grabbing;
      }
      [vaul-handle-hitarea] {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: max(100%, 2.75rem);
        height: max(100%, 2.75rem);
        touch-action: inherit;
      }
      [vaul-overlay][vaul-snap-points="true"]:not(
          [vaul-snap-points-overlay="true"]
        ):not([data-state="closed"]) {
        opacity: 0;
      }
      [vaul-overlay][vaul-snap-points-overlay="true"]:not(
          [vaul-drawer-visible="false"]
        ) {
        opacity: 1;
      }
      @media (hover: hover) and (pointer: fine) {
        [vaul-drawer] {
          user-select: none;
        }
      }
    </style>

    <script type="importmap">
      {
        "imports": {
          "three": "https://threejs.org/build/three.webgpu.js",
          "three/tsl": "https://threejs.org/build/three.webgpu.js",
          "three/addons/": "https://threejs.org/examples/jsm/"
        }
      }
    </script>

    <meta
      property="og:title"
      content="Robotics Odyssey - Reimagining Robotics: Merging Systems Thinking and Dynamic Media"
    />
    <meta
      property="og:description"
      content="Explore a new approach to robotics that transcends conventional thinking, inspired by the principles of Alan Kay and Bret Victor. Discover how interconnected systems, dynamic media, and human-centric design can tackle the immense challenges of our time."
    />
    <meta property="og:url" content="https://robtics-odyssey.com" />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://hashirama.blog/static/images/blog/sicp.png"
    />

    <link rel="canonical" href="https://robtics-odyssey.com" />

    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Robotics-Odyssey" />
    <meta itemprop="url" content="https://robtics-odyssey.com" />
    <meta name="twitter:title" content="Robotics-Odyssey" />
    <meta name="twitter:url" content="https://robtics-odyssey.com" />
    <meta
      name="twitter:card"
      content="Reimagining Robotics: Merging Systems Thinking and Dynamic Media"
    />
    <meta
      name="description"
      content="Explore a new approach to robotics that transcends conventional thinking, inspired by the principles of Alan Kay and Bret Victor. Discover how interconnected systems, dynamic media, and human-centric design can tackle the immense challenges of our time."
    />

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Robotics Odyssey</title>

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <link rel="icon" href="/static/images/blog/favicon.svg" />
    <link
      rel="sitemap"
      type="application/xml"
      title="Sitemap"
      href="/sitemap.xml"
    />
    <meta name="description" content="ass" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="language" content="English" />
    <link href="/static/css/output.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="/static/js/htmx.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css"
    />

    <script></script>
  </head>

  <style>
    .animate-rotate {
      opacity: 0;
      transition: opacity 700ms ease-in-out;
    }

    wrapper.loaded {
      opacity: 1;
    }
  </style> */}