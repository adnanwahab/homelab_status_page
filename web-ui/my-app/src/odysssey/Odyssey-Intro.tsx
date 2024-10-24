import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// Since we cannot import at this point, the import statement for d3 is omitted.
//

import * as d3Chromatic from 'https://unpkg.com/d3-scale-chromatic@3.0.0/dist/d3-scale-chromatic.min.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"; // Updated CDN
// import { interpolateTurbo } from "https://unpkg.com/d3-scale-chromatic@3.0.0/dist/d3-scale-chromatic.min.js";

//let https://underscorejs.org/underscore-esm.js

const makeGradient = (t) => 1

//const makeGradient = (t) => interpolateTurbo(t)
//get voice modulator - fft - info theory

const navigation = [
  // { name: 'Product', href: '#' },
  // { name: 'Features', href: '#' },
  // { name: 'Marketplace', href: '#' },
  // { name: 'Company', href: '#' },
]


  import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/react/24/outline'
  import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
  import {
    FaceFrownIcon,
    FaceSmileIcon as FaceSmileIconMini,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
  } from '@heroicons/react/20/solid'
  
  const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIconMini, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

// authenticator only login - otp - no email / password - your phone = good enough - funny QR Code w/ flux
// or tailscale login - key or google login

// https://tailwindui.com/components/application-ui/navigation/command-palettes - probably best one 

// https://tailwindui.com/components/application-ui/forms/form-layouts
function Suggestions_for_Improvement(props) {

    const [selected, setSelected] = useState(moods[5])
  
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {/* <img
            alt=""
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-10 w-10 rounded-full"
          /> */}
        </div>
        <div className="min-w-0 flex-1">
          <form action="#">
            <div className="border-b border-gray-200 focus-within:border-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Add your comment..."
                className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
                defaultValue={''}
                onChange={props.onChange}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-5">
                <div className="flow-root">
                  {/* <button
                    type="button"
                    className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <PaperClipIcon aria-hidden="true" className="h-6 w-6" />
                    <span className="sr-only">Attach a file</span>
                  </button> */}
                </div>
                <div className="flow-root">
                  <Listbox value={selected} onChange={setSelected}>
                    <Label className="sr-only">Your mood</Label>
                    <div className="relative">
                      <ListboxButton className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                        <span className="flex items-center justify-center">
                          {selected.value === null ? (
                            <span>
                              <FaceSmileIconOutline aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
                              <span className="sr-only">Add your mood</span>
                            </span>
                          ) : (
                            <span>
                              <span
                                className={classNames(
                                  selected.bgColor,
                                  'flex h-8 w-8 items-center justify-center rounded-full',
                                )}
                              >
                                <selected.icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-white" />
                              </span>
                              <span className="sr-only">{selected.name}</span>
                            </span>
                          )}
                        </span>
                      </ListboxButton>
  
                      <ListboxOptions
                        transition
                        className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm"
                      >
                        {moods.map((mood) => (
                          <ListboxOption
                            key={mood.value}
                            value={mood}
                            className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <div
                                className={classNames(
                                  mood.bgColor,
                                  'flex h-8 w-8 items-center justify-center rounded-full',
                                )}
                              >
                                <mood.icon
                                  aria-hidden="true"
                                  className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                />
                              </div>
                              <span className="ml-3 block truncate font-medium">{mood.name}</span>
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}




const Thanks = () => {
  return (
    <h1 className="text-white glowing-rainbow-text mx-auto">
     
    </h1>
  );
};

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [startGradient, setStartGradient] = useState(0)
  const [endGradient, setEndGradient] = useState(1)

  // Move these inside the component to ensure they update on re-render
  const from_color = d3.rgb(makeGradient(startGradient)).hex()
  const to_color = d3.rgb(makeGradient(endGradient)).hex()

  // Use a state variable for the gradient string
  const [gradientClass, setGradientClass] = useState('')

  // Update the gradient class when colors change
  useEffect(() => {
    const newGradientClass = `relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] 
      -translate-x-1/2 bg-gradient-to-tr 
      from-[${from_color}] to-[${to_color}] 
      opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]`;
    setGradientClass(newGradientClass);
  }, [from_color, to_color]);

  const handleOnChange = (e) => {
    setSuggestion(e.target.value)

    let start = Math.random()
    let end = Math.random()
    setStartGradient(start)
    setEndGradient(end)
    console.log(from_color, to_color)
  }
  return (
    <div className="bg-white" style={{maxHeight: "100px"}}>
      <header className="absolute inset-x-0 top-0 z-50" >

{/*         
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav> */}

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">


            {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div> */}



          </div>

     
          <div className="text-center">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Last Missing Piece <a href="https://botparty.org" className="text-indigo-600 underline">200k PRs</a> + <a href="https://dynamicland.org" className="text-indigo-600 underline">Dynamicland.org</a>!
            </h1>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p> */}
            <div className="flex items-center justify-end gap-x-6">
              {/* <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a> */}
              {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a> */}
              <Suggestions_for_Improvement onChange={handleOnChange}/>
            </div>
          </div> 


        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className={gradientClass}
          />
        </div>
      </div>
    </div>
  )
}
