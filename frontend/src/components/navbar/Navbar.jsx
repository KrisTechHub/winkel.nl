import React, { useState, useEffect } from "react";
import logo from "../../assets/logo-light.svg";
import Search from './Search';
import SearchBtn from './SearchBtn';
import NavList from "./NavList";
import Logout from '../userForm/Logout';
import { Bars3Icon, CubeIcon ,XMarkIcon, BuildingStorefrontIcon, UserIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon, QueueListIcon, ArrowRightStartOnRectangleIcon, CurrencyEuroIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Collapse, IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Nav.css";


export default function Navbar () {
    const [openNav, setOpenNav] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [openUserDropdown, setOpenUserDropdown] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);


    const dropdownItems = [
      {
          label: "Profile",
          icon: <UserCircleIcon className="dropdown-icon" />,
          link: isLoggedIn ? `/user/profile/${user.uuid}` : '/auth/redirect'
      },
      {
          label: "Orders",
          icon: <QueueListIcon className="dropdown-icon" />,
          link: !user ? 'auth/redirect' : `user/${user.uuid}/orders`
      },
      {
          label: "User Settings",
          icon: <Cog6ToothIcon className="dropdown-icon" />,
          link: '/maintenance'
      },
      {
          label: "Be a Seller",
          icon: <CurrencyEuroIcon className="dropdown-icon" />,
          link: '/seller/register'
      },
      {
          label: "Seller Center",
          icon: <BuildingStorefrontIcon className="dropdown-icon" />,
          link: user ? `/user/profile/${user.uuid}/seller-page` : '/'
      },
      {
        label: "Add product",
        icon: <CubeIcon className="dropdown-icon" />,
        link: '/product/form'
      },
      {
          label: <Logout />,
          icon: <ArrowRightStartOnRectangleIcon className="dropdown-icon" />,
          link: ''
      }
    ];

    const mobileDropdownItems = [
      {
        label: "Favorieten",
        icon: <HeartIcon className="dropdown-icon" />,
        link: isLoggedIn ? `/user/${user.uuid}/favorites` : '/auth/redirect'
      },
      {
        label: "Winkelwagen",
        icon: <ShoppingCartIcon className="dropdown-icon" />,
        link: isLoggedIn ? `/user/${user.uuid}/cart` : '/auth/redirect'
      },
      ...dropdownItems
    ]
    
    useEffect(() => {
        const handleWindowResize = () => {
            setIsMobileScreen(window.innerWidth <= 768);
            setOpenNav(false);
        };

        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);
    
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };

    }, []);

    const handleClick = () => {
      setOpenNav(false);
      setOpenUserDropdown(false)
    }

    // console.log(user.isSeller);

    return (
      <nav className="bg-primary-50  top-0 w-full z-50 fixed">
        <div className="lg:container mx-auto w-full py-1.5 sm:py-2 md:py-4 lg:py-6 text-white">
            <div className="flex w-full">

              {/* HAMBURGER & LOGO */}
              <div className="w-3/12 flex lg:justify-center items-center gap-3 mx-2 lg:mx-0">
                  {/* HAMBURGER ICON */}
                  <div className="flex items-center">
                      <button className="text-inherit focus:bg-transparent active:bg-transparent lg:hidden bg-transparent shadow-none hover:shadow-none border-none hover:bg-transparent hover:text-secondary-400 transition-hover duration-200 ease-in-out"
                          onClick={() => setOpenNav(!openNav)} >
                            {openNav ? (
                              <XMarkIcon className="h-6" strokeWidth={2} />
                            ) : (
                              <Bars3Icon className="h-6" strokeWidth={2} />
                            )}
                      </button>
                  </div>

                  {/* LOGO PLACEHOLDER */}
                  <div className="flex items-center">
                    <Link to={"/"} className="cursor-pointer w-28 lg:w-56" >
                      <img className="w-full" src={logo} alt="" />
                    </Link>
                  </div>
              </div>

              <div className={`w-9/12 mx-3 ${isMobileScreen ? 'flex justify-end' : ''}`}>
                {/* SEARCH AND ICONS */}
                <div className="flex items-center justify-center text-white">

                    {/* SEARCH CONTAINER */}
                    <div className="w-9/12 mx-6">
                        {!isMobileScreen && <Search />}
                    </div>

                    {/* USER ICONS */}
                    <div className={`flex w-3/12 justify-center items-center ${isMobileScreen ? "gap-1" : ""}`} >
                      {isMobileScreen && (
                        <div><SearchBtn /></div>
                      )}

                      { !isMobileScreen ? (
                          <div className="flex justify-center items-center w-full">
                            {/* heart icon */}
                            <Link to={ isLoggedIn ? `/user/${user.uuid}/favorites` : '/auth/redirect' } >
                                <HeartIcon className="nav-icon h-6 lg:h-7" />
                            </Link>
                            {/* cart icon */}
                            <Link to={ isLoggedIn ? `/user/${user.uuid}/cart` : '/auth/redirect' }>
                                <ShoppingCartIcon className="nav-icon h-6 lg:h-7" />
                            </Link>

                            {isLoggedIn ? (
                              <div className="dropdown mt-[-8px] ">
                                  <div className="dropbtn flex lg:gap-1 text-sm lg:text-base login-icon font-bold justify-center items-center">
                                      <UserIcon className="nav-icon h-6 lg:h-7" />
                                      {user.firstname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                  </div>

                                  <div className="dropdown-content">
                                      {dropdownItems.map((item, index) => (
                                          <div key={index}>
                                            <Link to={item.link} onClick={handleClick}>
                                                <div className={`flex gap-2 items-center w-[200px] dropdown-item text-black ${item.link === '' ? '-mt-2' : ''}
                                                    ${user.isSeller && item.label === "Be a Seller" ? "hidden" : "flex"} 
                                                    ${!user.isSeller && (item.label === "Add product" || item.label === "Seller Center") ? "hidden" : "block"}`}>
                                                    {item.icon}
                                                    <p> {item.label} </p>
                                                </div>
                                            </Link>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                            ) : (
                              <Link to={'/user/login'}>
                                <div className="flex lg:gap-1 text-sm lg:text-base login-icon font-bold w-20 lg:w-auto  justify-center items-center">
                                  <UserIcon className="nav-icon h-6 lg:h-7" />
                                  Login
                                </div>
                              </Link>
                            )}
                          </div>

                      ) : (
                          <div>
                            {isLoggedIn ? (
                              <IconButton variant="text" className="text-inherit focus:bg-transparent active:bg-transparent lg:hidden bg-transparent shadow-none hover:shadow-none border-none hover:bg-transparent hover:text-secondary-400 transition-hover duration-200 ease-in-out"
                                    ripple={false} onClick={() => setOpenUserDropdown(!openUserDropdown)} >
                                      {openUserDropdown ? (
                                        <XMarkIcon className="h-5" strokeWidth={2} />
                                      ) : (
                                        <UserIcon className="nav-icon h-5 lg:h-6" strokeWidth={2} />
                                      )}
                              </IconButton> 
                            ) : ( 
                                <Link to={'/user/login'}>
                                  <UserIcon className="nav-icon h-5 lg:h-6" strokeWidth={2} />
                                </Link>
                            )}
                          </div> 
                      )}
                    </div>
                </div>
                
                {/* NAV LISTS */}
                <div className="hidden lg:block mb-[-16px] mx-6 ">
                  <NavList handleClick={handleClick} />
                </div>
              </div>

            </div>
        </div>

        {/* <div className="border-b-[1px] border-primary-300 w-full"></div> */}
        
        {/* HAMBURGER OPTIONS */}
        <Collapse open={openNav} className={openNav ? '!h-[100vh]' : ''}>
          <NavList handleClick={handleClick} />
        </Collapse>

        {/* USER DROPDOWN OPTIONS */}
        <Collapse open={openUserDropdown} className={openUserDropdown ? '!h-[100vh]' : ''} >
          <div className="flex flex-col ps-5">
              { mobileDropdownItems.map((item, index) => (
                      <div key={index}>
                          <Link to={item.link} onClick={handleClick}>
                              <div className={`flex gap-1 lg:gap-2 items-center w-full dropdown-item ${item.link === '' ? '-mt-2' : ''}`}>
                                  {item.icon}
                                  <p className={`text-xs ${item.link === '' ? '-ms-3 lg:-ms-5' : ''}` }> {item.label} </p>
                              </div>
                          </Link>
                      </div>
                  ))
              }
          </div>
        </Collapse>
      </nav>
    );
}