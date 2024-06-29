import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import Categories from '../categories/Categories';
import {supportLinks, aboutLinks} from './footerLinks'


export default function Footer () {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

    return (
      <footer className="bg-gray-100 text-gray-600 border-t border-gray-300 w-full mt-12">
        
        <div className="container py-4 md:py-6 lg:py-10 mx-auto">
          <div className="flex flex-wrap justify-between md:text-left text-center">

            {/* HELP & SUPPORT */}
            <div className="lg:w-1/5 md:w-1/3 w-1/2 px-4 flex flex-col items-start p-4">
              <p className="footer-title text-xs lg:text-sm"> HELP & SUPPORT </p>
              <div className='flex flex-col gap-1' >
                {supportLinks.map((link, index) => (
                  <div key={index} >
                    <Link to={link.link} className=''>
                      <p className='text-xs lg:text-base footer-list'> {link.label} </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="hidden md:flex lg:w-1/5 md:w-1/3 px-4 flex-col items-start p-4">
              <p className="footer-title text-xs lg:text-sm"> CATEGORIES </p>
              <div>
                <Categories customizedFont="text-xs lg:text-base" numOfCateg={13} />
              </div>
            </div>

            {/* ABOUT WINKL.NL */}
            <div className="lg:w-1/5 md:w-1/3 w-1/2 px-4 flex flex-col items-start p-4">
              <p className="footer-title text-xs lg:text-sm">
                ABOUT WINKEL.NL
              </p>
              <div className='flex flex-col gap-1' >
                {aboutLinks.map((link, index) => (
                    <div key={index}>
                      <Link to={link.link}>
                        <p className='text-xs lg:text-base footer-list'> {link.label} </p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>

            {/* FOLLOW LINKS */}
            <div className="lg:w-1/5 md:w-1/3 w-1/2 px-4 flex flex-col items-start p-4 -ps-4">
              <p className="footer-title text-xs lg:text-sm">
                FOLLOW US
              </p>
              <div className="list-none flex flex-col justify-center gap-1">
                <div>
                  <a href='https://facebook.com' target='_blank' className="footer-list">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 md:w-5 h-4 md:h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                    <p className='text-xs lg:text-base'>Facebook</p>
                  </a>
                </div>
                <div>
                  <a  href='https://instagram.com' target='_blank' className="footer-list">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 md:w-5 h-4 md:h-5" viewBox="0 0 24 24" >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                    <p className='text-xs lg:text-base'>Instagram</p>
                  </a>
                </div>
                <div>
                  <a  href='https://twitter.com/?lang=en' target='_blank' className="footer-list">
                    <svg fill="currentColor" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" className="w-4 md:w-5 h-4 md:h-5" viewBox="0 0 24 24" >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                    <p className='text-xs lg:text-base'>Twitter</p>
                  </a>
                </div>
                <div>
                  <a  href='https://linkedin.com/' target='_blank' className="footer-list">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-4 md:w-5 h-4 md:h-5" viewBox="0 0 24 24" >
                      <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" ></path>
                      <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                    <p className='text-xs lg:text-base'>LinkedIn</p>
                  </a>
                </div>
              </div>
            </div>

            {/* OTHER LINKS */}
            <div className="lg:w-1/5 md:w-1/3 w-1/2 px-4 flex flex-col items-start p-4 ">
              <div className="list-none grid gap-1">
                <li>
                  <a href='/maintenance' className="footer-list">
                    <svg fill="none" stroke="currentColor" strokeWidth="0.5" className="w-4 md:w-5 h-4 md:h-5" viewBox="0 0 24 24" >
                      <path
                        d="M8 2C6.34315 2 5 3.34315 5 5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V5C19 3.34315 17.6569 2 16 2H8ZM7 5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V5ZM10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H10Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <p className='text-xs lg:text-base'>Download the app</p>
                  </a>
                </li>
                <li>
                <a href='/maintenance' className="footer-list">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 md:w-5 h-4 md:h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                    <p className='text-xs lg:text-base'>#WinkelNederland</p>
                  </a>
                </li>
                <li>
                <a href='/maintenance' className="footer-list">
                    <svg
                      fill="currentColor"
                      className="w-4 md:w-5 h-4 md:h-5"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256,0C159.969,0,82.125,77.859,82.125,173.906C82.125,269.938,236.797,512,256,512 c19.219,0,173.875-242.063,173.875-338.094C429.875,77.859,352.031,0,256,0z M256,240.406c-36.719,0-66.5-29.781-66.5-66.5 c0-36.75,29.781-66.531,66.5-66.531s66.516,29.781,66.516,66.531C322.516,210.625,292.719,240.406,256,240.406z"></path>
                    </svg>
                    <p className='text-xs lg:text-base'>Find a store</p>
                  </a>
                </li>
                <li>
                <a href='/maintenance' className="footer-list">
                    <svg
                      className="w-4 md:w-5 h-4 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M16.696,55.652C7.479,55.652,0,63.131,0,72.348v150.261h75.818c-5.71-9.837-9.036-21.22-9.036-33.391 c0-36.826,29.956-66.783,66.783-66.783c12.179,0,23.565,3.326,33.391,9.055V55.652H16.696z"></path>{" "}
                      <path d="M233.739,155.826c-18.413,0-33.391,14.978-33.391,33.391v16.696c0,5.718,0.581,11.299,1.682,16.696h31.709 c18.413,0,33.391-14.978,33.391-33.391S252.152,155.826,233.739,155.826z"></path>{" "}
                      <path d="M133.565,155.826c-18.413,0-33.391,14.978-33.391,33.391s14.978,33.391,33.391,33.391h31.709 c1.101-5.397,1.682-10.978,1.682-16.696v-16.696C166.957,170.804,151.978,155.826,133.565,155.826z"></path>{" "}
                      <path d="M495.304,55.652H200.348v75.837c9.826-5.728,21.212-9.055,33.391-9.055c36.826,0,66.783,29.956,66.783,66.783 c0,12.171-3.326,23.554-9.036,33.391H512V72.348C512,63.131,504.521,55.652,495.304,55.652z"></path>{" "}
                      <path d="M83.478,322.783c-9.217,0-16.696-7.479-16.696-16.696c0-9.217,7.479-16.696,16.696-16.696 c27.228,0,51.378-13.161,66.625-33.391h-16.538H0v183.652c0,9.217,7.479,16.696,16.696,16.696h150.261v-169.06 C145.747,309.101,116.244,322.783,83.478,322.783z"></path>{" "}
                      <path d="M233.739,256h-16.538c15.248,20.231,39.397,33.391,66.625,33.391c9.217,0,16.696,7.479,16.696,16.696 c0,9.217-7.479,16.696-16.696,16.696c-32.766,0-62.269-13.682-83.478-35.495v169.06h294.956c9.217,0,16.696-7.479,16.696-16.696 V256H233.739z M428.522,389.565h-77.913c-9.217,0-16.696-7.479-16.696-16.696s7.479-16.696,16.696-16.696h77.913 c9.217,0,16.696,7.479,16.696,16.696S437.739,389.565,428.522,389.565z M428.522,322.783h-77.913 c-9.217,0-16.696-7.479-16.696-16.696c0-9.217,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.479,16.696,16.696 C445.217,315.304,437.739,322.783,428.522,322.783z"></path>{" "}
                    </svg>
                    <p className='text-xs lg:text-base'>Gift card/certificate</p>
                  </a>
                </li>
                <li className="footer-list">
                  <svg fill="currentColor" viewBox="796 796 200 200" className="w-4 md:w-5 h-4 md:h-5" >
                    <path d="M973.166,818.5H818.833c-12.591,0-22.833,10.243-22.833,22.833v109.333c0,12.59,10.243,22.833,22.833,22.833h154.333 c12.59,0,22.834-10.243,22.834-22.833V841.333C996,828.743,985.756,818.5,973.166,818.5z M896,961.5h-77.167 c-5.973,0-10.833-4.859-10.833-10.833V841.333c0-5.974,4.86-10.833,10.833-10.833H896V961.5z M978.58,872.129 c-0.547,9.145-5.668,27.261-20.869,39.845c4.615,1.022,9.629,1.573,14.92,1.573v12c-10.551,0-20.238-1.919-28.469-5.325 c-7.689,3.301-16.969,5.325-28.125,5.325v-12c5.132,0,9.924-0.501,14.366-1.498c-8.412-7.016-13.382-16.311-13.382-26.78h11.999 c0,8.857,5.66,16.517,14.884,21.623c4.641-2.66,8.702-6.112,12.164-10.351c5.628-6.886,8.502-14.521,9.754-20.042h-49.785v-12 h22.297v-11.986h12V864.5h21.055c1.986,0,3.902,0.831,5.258,2.28C977.986,868.199,978.697,870.155,978.58,872.129z"></path>
                    <path d="M839.035,914.262l-4.45,11.258h-15.971l26.355-61.09h15.971l25.746,61.09h-16.583l-4.363-11.258H839.035z M852.475,879.876l-8.902,22.604h17.629L852.475,879.876z"></path>
                  </svg>
                  <select className='text-xs lg:text-base ms-[-5px] bg-transparent' 
                      name="Country/Language"             
                      value={selectedLanguage}
                      onChange={handleChange}>
                    <option value="" disabled  hidden>
                      Country/Language
                    </option>
                    <option value="arabic">Arabic</option>
                    <option value="bengali">Bengali</option>
                    <option value="bhojpuri">Bhojpuri</option>
                    <option value="chinese">Cantonese</option>
                    <option value="dutch">Dutch</option>
                    <option value="english">English</option>
                    <option value="filipino">Filipino</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="haua">Hausa</option>
                    <option value="hindi">Hindi</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="italian">Italian</option>
                    <option value="japanese">Japanese</option>
                    <option value="javanese">Javanese</option>
                    <option value="kannada">Kannada</option>
                    <option value="korean">Korean</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="mandarin">Mandarin Chinese</option>
                    <option value="marathi">Marathi</option>
                    <option value="pashto">Pashto</option>
                    <option value="persian">Persian</option>
                    <option value="polish">Polish</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="russian">Russian</option>
                    <option value="southern min">Southern Min</option>
                    <option value="spanish">Spanish</option>
                    <option value="sundanese">Sundanese</option>
                    <option value="swahili">Swahili</option>
                    <option value="telugu">Telugu</option>
                    <option value="tamil">Tamil</option>
                    <option value="thai">Thai</option>
                    <option value="turkish">Turkish</option>
                    <option value="urdu">Urdu</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="xhosa">Xhosa</option>
                    <option value="wu">Wu Chinese</option>
                  </select>
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 w-full">
          <div className="container py-8 md:py-14 flex flex-wrap mx-auto justify-center items-center">
            <div className="flex md:flex-nowrap flex-wrap flex-col justify-center items-center md:items-start md:justify-start font-PoppinsLight">
                <h1 className="text-base lg:text-2xl text-secondary-400 font-bold">
                Always be the first to know
                </h1>
                <p className="leading-7 xl:mb-2 text-xs md:text-sm lg:text-base text-gray-600">
                Sign up for our newsletter full of surprising promotions and the latest products!
                </p>
                <input type="text" name="footer-field" placeholder="Your e-mail adress" 
                  className="mb-2 md:mb-3 mt-1 w-1/2 lg:w-64 xl:w-96 h-6 lg:h-9 xl:h-10 text-xs md:text-base bg-gray-100 bg-opacity-50 rounded-[3px] md:rounded-[5px] lg:rounded-lg border border-secondary-400 focus:ring-2 focus:bg-transparent focus:ring-orange-900 focus:border-orange-900 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button className="w-1/2 lg:w-64 xl:w-96 h-6 md:h-8 lg:h-9 xl:h-10 text-xs md:text-base mb-1 md:mb-2 text-white bg-secondary-500 border-0 rounded-[3px] md:rounded-[5px] lg:rounded-lg lg:px-6 focus:outline-none hover:bg-secondary-500 transition-hover duration-200 ease-in-out">
                Subscribe to Newsletter
                </button>
                <div>
                  <a href="" className="text-gray-500 text-xs md:text-sm lg:text-base text-left pr-2 lg:pr-5"> Terms of Service </a>
                  |
                  <a href=""  className="text-gray-500 text-xs md:text-sm lg:text-base md:mt-0 mt-2 pl-2 lg:pl-5 sm:text-left text-center" >
                  Privacy Policy
                  </a>
                </div>
            </div>
            <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full md:w-auto">
              <img className="mx-auto h-6 md:h-10 lg:h-14" src={logo} alt="" />
            </span>
          </div>
        </div>

        <div className="bg-secondary-400 w-full py-2 lg:py-2 h-12 md:h-full text-white">
          <div className="container mx-auto flex flex-col text-xs lg:text-sm font-PoppinsLight gap-1">
            <p> © 2024 Winkel.nl — All rights reserved. </p>
            <span> Developed and designed by Kristine Marie Joy Macawile Algario </span>
          </div>
        </div>
      </footer>
    );
}