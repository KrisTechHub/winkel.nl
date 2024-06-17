import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import Search from './Search';
import SearchBtn from './SearchBtn';
import NavList from "./NavList";
import Logout from '../userForm/Logout';
import { Bars3Icon, XMarkIcon, UserIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon, ShoppingBagIcon, ArrowRightStartOnRectangleIcon, CurrencyEuroIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
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
          icon: <ShoppingBagIcon className="dropdown-icon" />,
          link: !user ? 'auth/redirect' : `user/${user.uuid}/orders`
      },
      {
          label: "Settings",
          icon: <Cog6ToothIcon className="dropdown-icon" />,
          link: '/maintenance'
      },
      {
          label: "Be a seller",
          icon: <CurrencyEuroIcon className="dropdown-icon" />,
          link: '/maintenance'
      },
      {
          label: <Logout />,
          icon: <ArrowRightStartOnRectangleIcon className="dropdown-icon" />,
          link: '#'
      }
    ];

    const mobileDropdownItems = [
      {
        label: "Favorites",
        icon: <HeartIcon className="dropdown-icon" />,
        link: isLoggedIn ? `/user/${user.uuid}/favorites` : '/auth/redirect'
      },
      {
        label: "Cart",
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

    return (
      <nav className="bg-primary-50 fixed top-0 w-full z-10">
        <div className="container mx-auto py-1.5 sm:py-2 md:py-4 lg:py-6 text-black">
            <div className="flex w-full">

              {/* HAMBURGER & LOGO */}
              <div className="w-3/12 flex lg:justify-center">
                  {/* HAMBURGER ICON */}
                  <div>
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

              <div className="w-9/12 mx-3">
                {/* SEARCH AND ICONS */}
                <div className="flex items-center justify-center text-black">

                    {/* SEARCH CONTAINER */}
                    <div className="w-9/12 mx-6">
                        {!isMobileScreen && <Search />}
                    </div>

                    {/* USER ICONS */}
                    <div className={`flex w-3/12 justify-center items-center ${isMobileScreen && "gap-1" }`} >
                      {isMobileScreen && (
                        <div><SearchBtn /></div>
                      )}

                      { !isMobileScreen ? (
                          <div className="flex justify-center items-center">
                            {/* heart icon */}
                            <Link to={ isLoggedIn ? `/user/${user.uuid}/favorites` : '/auth/redirect' } >
                                <HeartIcon className="nav-icon h-6 lg:h-7" />
                            </Link>
                            {/* cart icon */}
                            <Link to={ isLoggedIn ? `/user/${user.uuid}/cart` : '/auth/redirect' }>
                                <ShoppingCartIcon className="nav-icon h-6 lg:h-7" />
                            </Link>

                            {isLoggedIn ? (
                              <div className="dropdown mt-[-8px]">
                                  <div className="dropbtn flex lg:gap-1 text-sm lg:text-base login-icon font-bold justify-center items-center">
                                      <UserIcon className="nav-icon h-6 lg:h-7" />
                                      {user.firstname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                  </div>

                                  <div className="dropdown-content">
                                      {dropdownItems.map((item, index) => (
                                          <div key={index}>
                                            <Link to={item.link}>
                                                <div className="flex gap-2 items-center w-full dropdown-item">
                                                    {item.icon}
                                                    <p> {item.label} </p>
                                                </div>
                                            </Link>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                            ) : (
                              <Link to={'/user/register'}>
                                <div className="flex lg:gap-1 text-sm lg:text-base login-icon font-bold w-20 lg:w-auto  justify-center items-center">
                                  <UserIcon className="nav-icon h-6 lg:h-7" />
                                  Log in
                                </div>
                              </Link>
                            )}
                          </div>

                      ) : (

                        <div>
                          <IconButton variant="text" className="text-inherit focus:bg-transparent active:bg-transparent lg:hidden bg-transparent shadow-none hover:shadow-none border-none hover:bg-transparent hover:text-secondary-400 transition-hover duration-200 ease-in-out"
                              ripple={false} onClick={() => setOpenUserDropdown(!openUserDropdown)} >
                                {openUserDropdown ? (
                                  <XMarkIcon className="h-5" strokeWidth={2} />
                                ) : (
                                  <UserIcon className="nav-icon h-5 lg:h-6" strokeWidth={2} />
                                )}
                          </IconButton>
                        </div> 
                      )}
                    </div>
                </div>
                
                {/* NAV LISTS */}
                <div className="hidden lg:block mb-[-16px] mx-6 ">
                  <NavList />
                </div>
              </div>

            </div>
        </div>

        {/* <div className="border-b-[1px] border-primary-300 w-full"></div> */}
        
        {/* HAMBURGER OPTIONS */}
        <Collapse open={openNav}>
          <NavList />
        </Collapse>

        {/* USER DROPDOWN OPTIONS */}
        <Collapse open={openUserDropdown}>
          <div className="flex flex-col ps-5">
              {mobileDropdownItems.map((item, index) => (
                  <div key={index}>
                      <Link to={item.link}>
                          <div className="flex gap-2 items-center w-full dropdown-item">
                              {item.icon}
                              <p> {item.label} </p>
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
        </Collapse>
      </nav>
    );
}