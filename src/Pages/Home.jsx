
import React from "react";
import HeroSectionSlider from '../Components/Slider'
import Portfolio from "../Components/Portfolio";
import OnGoingProjects from "../Components/OnGoingProjects";
import Gallery from "../Components/Gallery";
import hero from "../assets/images/hero.png"
import About from "../Components/About";
import Blogs from "../Components/Blogs";
import hero_bg from './../assets/images/HomePage/hero-bg.png';
const Home = () => {
    const slidesData = [
        {

            url: `${hero}`,

        },
        {

            url: `${hero}`,

        },
        {

            url: `${hero}`,
        },

        {

            url: `${hero_bg}`,
        },

    ];

    return (
        <>




            <div className="md:flex justify-center z-0   w-full  absolute  lg:top-12 top-28  lg:pr-8  ">
                <div className="lg:w-[80%] m-auto  bg-transparent md:mb-24 mb-12  ">
                    <HeroSectionSlider slides={slidesData} />
                </div>
            </div>




            <About />
            <Portfolio />
            <OnGoingProjects />
            <Gallery />
            <Blogs />

        </>
    );
};

export default Home;
