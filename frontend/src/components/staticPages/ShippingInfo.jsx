import React from 'react';
import { Typography, Card } from '@material-tailwind/react';

export default function ShippingInfo () {

    return (
        <div className='m-8 lg:m-24'>
            <div className='flex flex-col text-center md:gap-4 font-FamiljenGroteskMedium tracking-wider'>
                <Typography className='text-xl md:text-3xl font-bold'>Shipping Information</Typography>
                <Typography>Ship from Global (1-3 days for processing)</Typography>
                <Card className="h-full w-full mt-6">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className=" border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography className='font-bold'>Shipping Method</Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography className='font-bold'>Shipping Time</Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography className='font-bold'>Costs</Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='p-4'>
                                    <Typography>STANDARD SHIPPING</Typography>
                                </td>
                                <td className='p-4'>
                                    <Typography>Estimated to be delivered on 28/04/2024 - 30/04/2024.</Typography>
                                </td>
                                <td className='p-4'>
                                    <Typography>€12,00</Typography>
                                    <Typography><span className='font-bold'>Free</span> - on orders over €199</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <div className='flex flex-col gap-2 text-gray-700 text-left pt-4'>
                    <Typography>
                        * In most cases, the package will be delivered within the estimated time of arrival. However, the actual delivery date may be affected 
                        by flight arrangements, weather conditions and other external factors. Please refer to the tracking information for the most accurate delivery date.
                    </Typography>
                    <Typography>
                        If you found that: 1) your package has not been delivered within the specified time; 2) the tracking information shows that the package has been 
                        delivered but you have not received it; or 3) your package includes missing/incorrect items, please contact customer service within 45 days of the payment date so that the aforementioned issues can be addressed. For other orders, products, and logistics-related issues, make sure to contact customer service within 90 days of the payment date.
                    </Typography>
                    <Typography>
                        * Please click the "Confirm Delivery" button within 6 months (from the date of shipment). After that, the button will turn gray and cannot be used to get additional points.
                    </Typography>
                    <Typography className='text-red-700 font-bold'>
                        We're improving our delivery process to make your packages even safer, so there may be a 2-4 day delay in processing your orders.
                    </Typography>
                </div>
            </div>
        </div>
    );
}