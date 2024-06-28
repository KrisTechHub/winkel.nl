import React from 'react';

export default function Search () {
    return (
          <form action="">
              <label htmlFor="search" className="lg:text-lg h-9 lg:h-11 mx-auto relative w-full flex flex-col md:flex-row items-center bg-white border rounded-full shadow-md focus-within:border-gray-300">
                  <input type="search" id="search-bar" placeholder="Waar bent u naar op zoek?" className="h-9 lg:h-11 px-6 w-full flex-1 outline-none rounded-full" />
                  <button className="w-auto h-auto m-0.5 px-3 lg:px-5 py-1.5 lg:py-2 bg-secondary-400  rounded-[50px] hover:bg-gray-900 hover:border-transparent transition-hover duration-200 ease-in-out active:scale-95 border will-change-transform overflow-hidden relative transition-all disabled:opacity-70">
                      <div className="relative">
                          <div className="flex items-center justify-center absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                            {/* spin */}
                            <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                            </svg>
                          </div>

                          <div className="flex items-center transition-all opacity-1 valid:">
                            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                              <svg className="w-[15px] h-[15px] lg:w-5 lg:h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                              </svg>
                            </span>
                          </div>
                      </div>
                  </button>
              </label>
          </form>
    );
}