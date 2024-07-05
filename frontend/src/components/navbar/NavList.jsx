import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const list2 = [
  {
    label: "Download app",
    action: "/maintenance",
  },
  {
    label: "Find a shop",
    action: "/maintenance",
  },
  {
    label: "Help center",
    action: "/maintenance",
  },
  {
    label: "Shipping Info",
    action: "/shippinginformation",
  },
];

export default function NavList({handleClick}) {
  const user = useSelector(state => state.auth.user);

  const list = [
    {
      label: "New",
      action: "/products/new",
    },
    {
      label: "On Sale",
      action: "/products/on-sale",
    },
    {
      label: "Most buy",
      action: "/products/most-buy",
    },
    {
      label: "Recommended",
      action: "/products/recommended",
    },
    {
      label: "Categories",
      action: "/category/mens-shirts",
    },
    {
      label: "Start selling",
      action: !user ? "/user/register" : "/seller/register",
    },
  ];

  return (
    <div className="text-white navlist flex flex-col lg:flex-row lg:pt-4 h-full lg:justify-between font-FamiljenGroteskMedium">
      <div className="mt-6 flex flex-col lg:flex-row gap-2 xl:gap-6 lg:my-0">
        {list.map((link, idx) => (
          <div key={idx}>
            {user ? (
              <NavLink className={({ isActive }) =>
                  `links lg:py-[9px] font-PoppinsLight text-xs lg:text-sm ${isActive ? 'border-b-4 border-secondary-500' : ''} ${link.label === 'Start selling' && user.isSeller ? 'hidden' : 'inline'}`
                } to={link.action} onClick={handleClick} >
                {link.label}
              </NavLink>
            ) : (
              <NavLink className={({ isActive }) => `links lg:py-[9px] font-PoppinsLight text-xs xl.
              :text-sm ${isActive ? 'border-b-4 border-secondary-500' : ''}`
                } to={link.action} onClick={handleClick} >
                {link.label}
              </NavLink>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col items-center lg:flex-row gap-2 xl:gap-6 lg:my-0">
        {list2.map((link, index) => (
          <div key={index}>
            <NavLink className={({ isActive }) => `link2 font-PoppinsLight lg:text-[10px] xl:text-xs ${isActive ? 'border-b-4 border-secondary-500' : ''}`}
              to={link.action} onClick={handleClick} >
              {link.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

NavList.propTypes = {
  handleClick: PropTypes.func
}
