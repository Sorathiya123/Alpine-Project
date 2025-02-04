
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import nav_bg from '../../assets/images/hero-bg.png';
import nav_bg2 from '../../assets/images/hero-bg2.png';
import logo from '../../assets/images/LOGO.png';
import Button from '../Button';
import "./index.css";
import Services_bg from "../../assets/images/Services_bg.png";

export default function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const menuBar = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    // Define menu items and their corresponding routes
    const menuItems = [
        { text: "HOME", route: "/" },
        { text: "ABOUT US", route: "/aboutus" },
        { text: "SERVICES", route: "/services" },
        { text: "PORTFOLIO", route: "/portfolio" },
        { text: "ONGOING PROJECTS", route: "/on-going-project-list" },
        { text: "GALLERY", route: "/gallery" },
        { text: "BLOGS", route: "/blogs" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuBar.current && !menuBar.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuBar = () => {
        menuBar.current.style.opacity = menuOpen ? 0 : 1;
        setMenuOpen(prevState => !prevState);
    }

    const closeMenuBar = () => {
        setMenuOpen(false);
    }

    return (
        <>
            <div className={pathname === "/" ? "lg:bg-contain   bg-top  bg-cover md:h-[400px] h-[400px] lg:h-[105vh] bg-no-repeat bg-[#000000] px-3 relative" : "px-3 bg-cover "}
                style={pathname === "/" ? {
                    backgroundPosition: "right top, left top",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${nav_bg}), url(${nav_bg2})`
                } : pathname === "/services" ? {
                    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${Services_bg})`
                } : {}}

            >

                <div className="flex justify-between md:items-center lg:items-start px-2 md:pl-4 md:pr-0   2xl:w-[100%] ">

                    <span className='mt-8 xl:ml-0 z-50 md:mt-10'><Button text={"Menu"} onClick={toggleMenuBar} /></span>

                    <img src={logo} alt="" className="z-50 mt-6 xl:ml-[79%]   md:pt-1 lg:mt-0 w-[58px] h-[98px] lg:w-[146px] lg:h-[238px] bg-blend-multiply " />
                </div>

                <div ref={menuBar} className={`menu-bar px-2 absolute left-32 top-8 z-50 transition-opacity duration-700 opacity-0 ${!menuOpen ? "hidden" : "block"}`}>
                    <div className="pl-4 border-l-2 pb-3">
                        <img src={logo} alt="" className="pt-2 h-20 xl:mx-0" />
                        <div className="flex flex-col">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.route}
                                    to={item.route}
                                    className={`my-1 xl:mx-0 text-[18px] lg:text[19px] cursor-pointer ${pathname === item.route ? "font-bold text-[19px] lg:text[29px]" : ""}`}
                                    onClick={closeMenuBar}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </div>

                        <Button text={"Contact Us"} onClick={closeMenuBar} to="/contact" />


                    </div>
                </div>
            </div>
        </>
    );
}
