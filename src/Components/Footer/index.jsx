import React, { useState, useEffect } from 'react'
import Button from '../Button';
import { Link } from 'react-router-dom';
import footer1_Bg from '../../assets/images/footer1-bg.png';
import footer2_Bg2 from '../../assets/images/HomePage/footer2-bg2.png';
import footer2_Bg1 from '../../assets/images/footer2-bg1.png';
import logo from '../../assets/images/LOGO.png';
import footer_logo from '../../assets/images/footer-logo.png';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaYoutube, FaPrint, FaFacebook, FaPalfed, FaCopyright, FaPinterest, FaLinkedin } from 'react-icons/fa'
export default function Footer() {
    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {

        const handleResize = () => {

            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);


    return (<>
        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${footer1_Bg})`, backgroundColor: "#131313", backgroundSize: "fill", backgroundRepeat: "no-repeat", backgroundPosition: "100% 100%" }} className='h-[304px] md:h-[590px] xl:bg-cover relative '>
            <div data-aos="fade-left" className='flex items-center justify-center  flex-col h-[304px] md:h-[600px] '  >
                <h3 className='md:text-2xl text-center font-audiowide px-2 lg:mt-4'  >Ready to transform visions into Architectural Marvels</h3>
                <h3 className='md:mb-8 mb-5 text-gray-400 text-[19px] md:text-3xl  font-light tracking-wider' >Connect with us!</h3>
                <Button text={"Lets Talk!"} to="/contact" />

            </div>

        </div>
        <div className='relative bg-[#131313]'>

            <div
                className=" z-20 bg-[#131313]"
                style={
                    windowWidth < 1000
                        ? {
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${footer2_Bg1})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top',
                            minHeight: '250px',
                            color: '#828282',
                            paddingLeft: '10px'
                        }
                        : {
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.0)), url(${footer2_Bg2}), url(${footer2_Bg1})`,
                            backgroundSize: 'cover, contain, contain,cover',
                            backgroundRepeat: 'no-repeat, no-repeat',
                            backgroundPosition: 'left, right bottom',
                            minHeight: '250px',
                            color: '#828282',
                            paddingLeft: '10px'
                        }
                }
            >
                <span className='absolute right-10 lg:right-28 z-50 lg:top-16 top-8'>
                    <Button text={"&uarr;"} onClick={handleUpArrowClick} />
                </span>
                <div className='flex md:min-h-[200px] items-center' style={{

                }}>
                    <div className="flex z-20 flex-col md:flex-row flex-1">
                        <div className="md:basis-1/4 flex items-center  md:justify-end md:pl-10 pl-3">
                            <Link to="/">
                               
                                <img src={footer_logo} alt="" className="mt-12 md:mt-4  h-40 bg-blend-multiply" />

                            </Link>
                        </div>
                        <div className="text-left md:basis-3/4 flex justify-start items-center pl-2 md:pl-0 pt-4">
                            <div className='md:ml-6'>
                                <div className='flex lg:gap-16 gap-y-4 flex-col md:flex-row'>
                                    <p className='flex items-center gap-2 text-[20px]'><FaPhoneAlt className='footer-icon-color' /> +91 9757417069 | +91 9664817975</p>
                                </div>
                                <div className='flex lg:gap-16 gap-y-4 flex-col md:flex-row my-4'>

                                    <p className='flex items-center gap-2 text-[20px]'><FaEnvelope className='footer-icon-color' /> innovate@alpinearchitects.net</p>
                                    <p className='flex items-center gap-2 text-[20px]'><FaEnvelope className='footer-icon-color' /> nitesh@alpinearchitects.net</p></div>
                                <div className='my-3 flex flex-nowrap items-start lg:items-center gap-2'>
                                    <span className='text-[20px] mt-3 md:mt-0 '><FaMapMarkerAlt className='footer-icon-color' /></span>
                                    <p className='text-[20px] pr-8'> 407, Oracle Business Hub, Road no.16/Z, Wagle Estate, Thane (W) 400604</p>
                                </div>
                                <div className='flex gap-5 ml-6 mt-4 md:ml-0 z-20 max-w-[200px]'>
                                    <a href="https://www.instagram.com/alpine_niteshkedare" target='blank'><FaInstagram className='footer-icon-color text-2xl' /></a>
                                    <a href="https://www.youtube.com/channel/UCdRvNSO0jybsN3y47FT9eQA" target='blank'><FaYoutube className='footer-icon-color text-2xl' /></a>
                                    <a href="https://www.linkedin.com/company/alpinearchitects/" target='blank'><FaLinkedin className='footer-icon-color text-2xl' /></a>
                                    <a href="https://www.facebook.com/profile.php?id=61556327483727" target='blank'><FaFacebook className='footer-icon-color text-2xl' /></a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                {/* //will show only on web */}
                <div
                    className="md:w-auto  lg:flex mr-8 hidden items-center justify-center md:pt-12 -pl-8 py-[31px]  "
                ><div className='flex items-center'>
                        <span className='pt-1  mr-1 text-[#828282] text-[12px] '> <FaCopyright width={0.7} /> </span>
                        <h6 className=' mt-1 text-[13px] text-[#828282] lg:text-[13px] '> All Rights Reserved by Alpine Architects Pvt Ltd. | Designed & Developed by Digilligent Marketing X Tech Solutions</h6>

                    </div>
                </div>
                {/* //will show only on mobile */}
                <div
                    className="flex lg:hidden pl-4 pt-[70px] pb-20 z-0 relative bottom-8 -left-2"
                    style={windowWidth < 1000 ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.0)),url(${footer2_Bg2})`, backgroundColor: "#131313", backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "right" } : {}}
                >
                    <span className='pt-1  mr-1 text-[#828282] text-[12px]'> <FaCopyright /> </span>
                    <h6 className='text-left mt-1 text-[13px] text-[#828282] lg:text-[13px] mb-2'> All Rights Reserved by Alpine Architects Pvt Ltd. | Designed & Developed by Digilligent Marketing X Tech Solutions</h6>
                </div>
            </div>



        </div>
    </>
    )
}


