import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { motion } from 'framer-motion';
import About_bg from '../../assets/images/About_bg.png';
import video_img from '../../assets/images/videoImage.png';
import play_circle from '../../assets/images/play-circle.png';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import API_Call from '../API_Call';
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [video_url, setVideo_url] = useState();
  const { fetchData, loader } = API_Call();

  const getData = async () => {
    const data = await fetchData("home");
    setVideo_url(data[0].url);

  }
  useEffect(() => {
    getData();
  }, [])



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);









  return (
    <div
      className='bg-secondary bg-contain bg-left bg-no-repeat  ' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${About_bg})`, backgroundPosition: "left" }}
    >
      <div className=" md:w-[80%] sm:px-6 w-[90%] relative flex mt-[10px] md:mt-6 flex-col items-center lg:flex-row  inner-cont" >
        <div className="flex flex-col items-center justify-center h-[100%] lg:w-[40%] W-[100%] md:flex-col lg:flex-row  md:pb-10 pt-4">
          <div className="relative w-full rounded md:pr-6   md:pb-16   ">
            <ReactPlayer url={video_url} width={"100%"} height={"251px"} controls />

          </div>

        </div>
        <div div className="flex items-center py-3 lg:w-[60%] md:w-full  w-full  md:pb-10 md:pt-10 md:mb-6" >
          <div data-aos="fade-down" className="text-left relative">
            <h2 className="text-3xl custom-font leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-4xl uppercase">
              About us
            </h2>
            <div className="max-w-md mx-auto text-lg text-gray-200  md:text-xl md:max-w-3xl leading-10 font-light tracking-tight">
              <p>
                Alpine Architects: Pioneering Tomorrow's Cityscape
              </p>

              <p className='leading-8 pt-3'>
                In the ever-evolving world of Architecture, where buildings stand as timeless monuments to human innovation and creativity, Alpine Architects emerges as a beacon of avant-garde design principles. The firm is not just about brick and mortar; it's a symphony of creativity, functionality, and futuristic thinking.
              </p><br />
              <p className='hidden md:block leading-8' >
                At the heart of Alpine Architects lies a simple yet profound belief: Architecture is not static. As society progresses, so too must our buildings and spaces. The firm places a premium on continuously upgrading its design ethos, always staying attuned to the shifting sands of societal needs, technological advancements, and aesthetic sensibilities.
              </p>
            </div>
            <div className="md:text-right flex flex-col justify-end items-end md:mb-10">


              <div className="container md:text-center z-50 mb-9  flex justify-end lg:pr-1 ">
                <div className='flex-1'>

                </div>
                <Link> <Button text={"Read More"} to="/aboutus" /></Link>

              </div>

              <h3 className='text-gray-800 font-bold tracking-widest text-[70px] lg:text-[115px]  uppercase opacity-5 absolute bottom-8 md:-bottom-16 md:-right-9 -right-[0%] font-audiowide'>
                About
              </h3>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default About;
