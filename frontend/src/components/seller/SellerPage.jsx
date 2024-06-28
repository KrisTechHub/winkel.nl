import React, { useState } from 'react';
import logo from '../../assets/logo-dark.svg';
import { Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, Tabs, TabsHeader, TabsBody, Tab, TabPanel} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDownIcon} from '@heroicons/react/24/outline';
import { data } from './sellerpageData';
import ManageProducts from "./ManageProducts";
import ValidatedForm from '../productForm/ValidatedForm';
import Maintenance from '../staticPages/Maintenance';

export default function SellerPage () {
    const user = useSelector(state => state.auth.user);
    const [ open, setOpen ] = useState("products");
    const [ openTab, setOpenTab ] = useState("manageproducts");
    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleTabOpen = (tabCategory) => {
        setOpenTab(tabCategory);
      };

    return (
        <div className='p-8 bg-gray-100'>
            <div className='flex w-full gap-4 justify-start'>
                <div className='bg-white flex flex-col justify-start items-center rounded-xl max-w-[18rem] min-h-[661px] p-4 shadow-xl shadow-blue-gray-900/5'>
                    <div className='text-right py-6'>
                        <img src={logo} alt="" className="w-7/12 ps-6" />
                        <Typography className='font-ArchivoBlack lg:text-3xl -mt-2 text-secondary-500'>
                            <span className="font-ArchivoBlack lg:text-4xl">S</span>
                            eller Centre
                        </Typography>
                    </div>
                    <div className="flex w-full ">
                        <div className="">
                            {data.map((item, index) => (
                                <Accordion  key={index} open={open === item.value} icon={ 
                                    <ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === item.value ? "rotate-180" : ""}`} />  } >
                                    <ListItem className="py-1.5 " selected={open === item.value}>
                                        <AccordionHeader onClick={() => handleOpen(item.value)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <item.icon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography color="black" className="mr-auto font-bold">
                                                {item.label}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                        
                                    <AccordionBody className="py-0">
                                        <List className="p-0 ">
                                            {item.items.map((subItem, idx) => (
                                                <ListItem onClick={() => handleTabOpen(subItem.itemValue)} key={idx} value={subItem.itemValue} 
                                                    className={`${open === subItem.itemValue ? " focus:text-secondary-500 focus:font-bold" : " focus:text-secondary-500 focus:font-bold"} text-[15px] p-2.5 ps-8`}
                                                >
                                                    <ListItemPrefix>
                                                        <subItem.itemIcon className="h-5 w-5" />
                                                    </ListItemPrefix>
                                                    {subItem.itemLabel}
                                                </ListItem>
                                            ))}

                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full '>
                    {openTab === "manageproducts" && <ManageProducts /> }
                    {openTab === "addproducts" && <ValidatedForm /> }
                    {openTab !== "manageproducts" && openTab !== "addproducts" && <Maintenance />}
                </div>
            </div>
        </div>
    );
}