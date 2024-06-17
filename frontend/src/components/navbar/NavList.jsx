import React from 'react';
import { Link } from "react-router-dom";


const list = [
  {
    label: "New In",
    action: "/maintenance",
  },
  {
    label: "On Sale",
    action: "/maintenance",
  },
  {
    label: "Most Buy",
    action: "/maintenance",
  },
  {
    label: "Categories",
    action: "/category/allproducts",
  },
  {
    label: "Start Selling",
    action: "/maintenance",
  },
];

const list2 = [
  {
    label: "Download app",
    action: "/maintenance",
  },
  {
    label: "Find a store",
    action: "/maintenance",
  },
  {
    label: "Help centre",
    action: "/maintenance",
  },
  {
    label: "Shipping",
    action: "/maintenance",
  },
];

export default function NavList () {
    return (
        <div className="text-black navlist flex flex-col lg:flex-row lg:pt-4 justify-between text-base lg:text-[14px] xl:text-base font-FamiljenGroteskMedium">
          <div className="mt-6 mb-2 flex flex-col lg:flex-row gap-2 xl:gap-6 lg:my-0">
            {list.map((link, idx) => (
              <div key={idx}>
                  <Link className='links font-PoppinsLight' to={link.action}> {link.label} </Link>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-col items-center lg:flex-row gap-2 xl:gap-6 lg:my-0 text-base lg:text-xs">
            {list2.map((link, index) => (
              <div key={index}>
                <Link className="link2 font-PoppinsLight" to={link.action}> {link.label} </Link>
              </div>
            ))}
          </div>
        </div>
    );
}