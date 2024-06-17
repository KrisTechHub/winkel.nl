import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';


export default function CategoryBanner ({ bannerData }) {
    const { title, subtitle, description, bannerImg, bgColor } = bannerData;
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const bannerStyle = {
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right'
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
          };
    
          handleWindowResize();
      
          window.addEventListener("resize", handleWindowResize);
          return () => {
              window.removeEventListener("resize", handleWindowResize);
          };
    })
 
    return (
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div style={bannerStyle} className='h-[250px] md:h-[350px] w-full order-1 md:order-2'></div>

        <div className="flex flex-row text-white max-w-full md:w-[375px] order-2 md:order-1">
            <div className='relative top-[-96px] md:top-0'>
                <div className='w-full'>
                    { isMediumScreen && (
                        <svg height="350" viewBox="0 0 1203 701" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1194.78 67.3475L767.186 689.632C763.427 695.029 758.655 698.685 753.471 700.138C748.287 701.592 742.923 700.778 738.056 697.8C733.176 694.882 728.998 689.927 726.049 683.56C723.101 677.192 721.513 669.697 721.487 662.019V39.7337C721.487 29.4187 724.302 19.5261 729.314 12.2323C734.326 4.93847 741.123 0.840881 748.211 0.840881H1175.8C1181.08 0.879209 1186.23 3.18949 1190.6 7.48066C1194.98 11.7718 1198.38 17.8518 1200.39 24.9544C1202.43 32.0372 1202.99 39.8435 1202 47.3883C1201 54.9331 1198.48 61.8783 1194.78 67.3475Z" fill={`${bgColor}`}/>
                            <path d="M755.843 700.842H0L0 0.841797L755.843 0.841797V700.842Z" fill={`${bgColor}`}/>
                            <line x1="10" y1="-10" x2="675.349" y2="-10" transform="matrix(-0.576494 0.817101 -0.86558 -0.500771 1185.3 125.285)" stroke={`${bgColor}`} strokeWidth="20" strokeLinecap="round"/>
                        </svg>
                    )}
                    { !isMediumScreen && (
                        <div className='w-full'>
                            <svg viewBox="0 0 701 229" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-[200px] w-full'>
                                <path d="M67.1856 5.02462L689.471 108.823C694.867 109.736 698.523 110.894 699.977 112.153C701.43 113.411 700.616 114.713 697.638 115.895C694.72 117.08 689.765 118.094 683.398 118.809C677.03 119.525 669.535 119.911 661.857 119.917L39.5718 119.917C29.2567 119.917 19.3642 119.233 12.0704 118.017C4.77655 116.8 0.678955 115.15 0.678955 113.43V9.63069C0.717283 8.34991 3.02756 7.09968 7.31873 6.03755C11.6099 4.97543 17.6899 4.14895 24.7925 3.66226C31.8753 3.16546 39.6816 3.02973 47.2263 3.27219C54.7711 3.51465 61.7164 4.12444 67.1856 5.02462Z" fill={`${bgColor}`}/>
                                <path d="M701 112V229L1 229L1 112L701 112Z" fill={`${bgColor}`}/>
                                <line x1="10" y1="-10" x2="558.154" y2="-10" transform="matrix(0.985648 0.168813 -0.922115 0.386917 125.123 7.3252)" stroke={`${bgColor}`} strokeWidth="20" strokeLinecap="round"/>
                            </svg>

                        </div>
                    )}
                </div>

                <div className='w-full md:w-[450px] ps-6 text-white justify-center text-left absolute top-16 md:top-14 drop-shadow-xl flex flex-col gap-2 md:gap-4'>
                    <h1 className="font-KronaOne text-xl md:text-4xl italic md:bg-black rounded-full -ms-1 ps-4 py-2"> {title} </h1>
                    <h1 className="font-KronaOne text-xs md:text-2xl ">{subtitle}</h1>
                    <p className="font-KronaOne hidden md:block text-xs md:text-base tracking-wider"> {description} </p>
                </div>
            </div>
        </div>
      </div>
    );
}

CategoryBanner.propTypes = {
    bannerData: PropTypes.object
}