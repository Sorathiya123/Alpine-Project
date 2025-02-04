import React, { useState, useEffect, useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import services_crousal_bg from "../assets/images/services-crousal-bg.png";
import './Services.css'
import art from "../assets/images/art.jpg";
import art_small from "../assets/images/art_small.jpg";
import API_Call from '../Components/API_Call';
import { useInView } from 'react-intersection-observer';


import { Carousel as Carousel_review } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Services_bg from "../assets/images/Services_bg.png";

import ByTheNumber from '../Components/ByTheNumbers'
export default function Services() {
  const [heroImages, setHeroImages] = useState([]);

  const [testimonials, setTestimonials] = useState([]);
  const { fetchData } = API_Call();
  let imagesArray = [];

  useEffect(() => {
    const getData = async () => {
      try {
         const data = await fetchData("banner?page=services");
        // const byTheNumberData = await fetchData("byTheNumber");
        const testimonialData = await fetchData("testimonial");

        // setByTheNumber(byTheNumberData)
        setTestimonials(testimonialData)
        data.forEach(element => {
          element.images.forEach((image) => {
            imagesArray.push(image.url)
          })
        });
        setHeroImages(imagesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();

  }, []);

  const handleUpArrowClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    handleUpArrowClick();
  })

 
  const responsive_reviews = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef(null);


  useEffect(() => {

    const galleryElement = galleryRef.current;
    let slideTimer; // Define slideTimer outside to be accessible in different scopes

    // Function to handle automatic scrolling animation
    const scrollGallery = () => {
      let scrollAmount = 1; // Adjust scrolling speed as needed
      let direction = 1; // 1 for forward, -1 for reverse
      slideTimer = setInterval(() => {
        galleryElement.scrollLeft += scrollAmount * direction;
        if (galleryElement.scrollLeft + galleryElement.clientWidth >= galleryElement.scrollWidth - 100) {
          // Reverse direction if scrolled to the end
          direction = -1;
        } else if (galleryElement.scrollLeft <= 0) {
          // Change direction to forward if scrolled to the beginning
          direction = 1;
        }
      }, 20); // Adjust scrolling interval as needed


    }
    // Start automatic scrolling animation
    scrollGallery();

    // Pause scrolling animation on mouse enter
    galleryElement.addEventListener('mouseenter', () => {
      clearInterval(slideTimer); // Pause the scrolling animation
    });

    // Resume scrolling animation on mouse leave
    galleryElement.addEventListener('mouseleave', () => {
      // Restart the scrolling animation if it's not already running
      if (slideTimer) {
        scrollGallery();
      }

    });

    // Clear interval when component unmounts
    return () => {
      clearInterval(slideTimer);
    };// Start automatic scrolling animation

    // Support for mouse wheel scrolling


    // Support for touch swipe
    let startX = 0;
    let scrollLeft = 0;
    galleryElement.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX - galleryElement.offsetLeft;
      scrollLeft = galleryElement.scrollLeft;
    });

    galleryElement.addEventListener('touchmove', (event) => {
      const x = event.touches[0].pageX - galleryElement.offsetLeft;
      const walk = (x - startX) * 2; // Adjust sensitivity
      galleryElement.scrollLeft = scrollLeft - walk;
    });
  }, []);

  const AnimatedString = ({ value }) => {
    const [animatedText, setAnimatedText] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        let newText = '';
        for (let i = 0; i < value.length; i++) {
          if (isNaN(value[i])) {
            // Handle letters
            newText += animateLetter(animatedText[i], value[i]);
          } else {
            // Handle numbers
            newText += animateNumber(animatedText[i], value[i]);
          }
        }
        setAnimatedText(newText);
      }, 50); // Adjust speed here

      return () => clearInterval(interval);
    }, [value]);

    // Function to animate letters
    const animateLetter = (currentChar, targetChar) => {
      const startCharCode = currentChar ? currentChar.charCodeAt(0) : 65; // Start from 'A' if currentChar is undefined
      const targetCharCode = targetChar.charCodeAt(0);
      if (startCharCode < targetCharCode) {
        return String.fromCharCode(startCharCode + 1);
      }
      return currentChar;
    };

    // Function to animate numbers
    const animateNumber = (currentChar, targetChar) => {
      const startChar = currentChar ? parseInt(currentChar) : 0; // Start from '0' if currentChar is undefined
      const targetNum = parseInt(targetChar);
      if (startChar < targetNum) {
        return (parseInt(currentChar) + 1).toString();
      }
      return currentChar;
    };

    return <span>{animatedText}</span>;
  };




  // const renderImages = () => {
  //   return (
  //     <div
  //       ref={galleryRef}
  //       className="w-full md:w-full flex items-center justify-center overflow-x-scroll no-scrollbar"
  //       title='Press left or Right arrow of keyboard'
  //     >
  //       {heroImages?.map((image, index) => (
  //         <img
  //           src={image}
  //           alt=""
  //           key={index}
            
  //           className={` h-[245px] mr-4  ${
  //             index % 2 !== 0 ? "mt-20 " : ""
  //           }`}
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  const renderImages = () => {
    return (
      <div
        ref={galleryRef}
        className="w-full md:w-full flex items-center justify-center overflow-x-scroll no-scrollbar"
        title="Press left or Right arrow of keyboard"
      >
        {heroImages?.map((image, index) => (
          <div
            key={index}
            className={`flex-none w-[184px] h-[245px] mr-4 overflow-hidden ${
              index % 2 !== 0 ? "mt-20" : ""
            }`}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-fill"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
    );
  };
  
  
  
  

  const handleSlideChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const Reviews = [
    {
      heading: "MANTHAN MEHTA",
      subHeading:
        "MANAGING DIRECTOR AT JVM SPACES ",
      subersubHeading: "KEY MEMBER IN MCHI CREDAI-THANE",
      body: "Ar. Nitesh Kedare and the entire team at Alpine are doing some fabulous work. We feel truly honoured have collaborated with them.Their designs are state of the art and the best thing is they understand what the client requires and deliver the best product. All the best and keep up the great work. ",
    },
    {
      heading: "MANTHAN MEHTA",
      subHeading:
        "MANAGING DIRECTOR AT JVM SPACES ",
      subersubHeading: "KEY MEMBER IN MCHI CREDAI-THANE",
      body: "Ar. Nitesh Kedare and the entire team at Alpine are doing some fabulous work. We feel truly honoured have collaborated with them.Their designs are state of the art and the best thing is they understand what the client requires and deliver the best product. All the best and keep up the great work.",
    },
    {
      heading: "MANTHAN MEHTA",
      subHeading:
        "MANAGING DIRECTOR AT JVM SPACES ",
      subersubHeading: "KEY MEMBER IN MCHI CREDAI-THANE",
      body: "Ar. Nitesh Kedare and the entire team at Alpine are doing some fabulous work. We feel truly honoured have collaborated with them.Their designs are state of the art and the best thing is they understand what the client requires and deliver the best product. All the best and keep up the great work.",
    },
  ];
  return (
    <>


      <div  className="  relative bg-no-repeat  lg:bottom-48  md:bottom-20 bottom-20 sm:bottom-5 md:bg-center lg:bg-top bg-contain " style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1 )), url(${Services_bg})`
      }}>
        <div className="md:flex pt-32 md:-mt-10 justify-center items-center w-full  p-1  mb-2 md:mb-0">
          <div className="md:w-3/4 sm:w-full px-6 md:px-0">
            <h1 data-aos="fade-down" className="font-audiowide text-3xl  uppercase">Services</h1><br />
            <p data-aos="fade-down" className="font-light leading-loose tracking-wider">
              Embark on a journey of Architectural transformation with Alpine
              Architects. Our specialized services breathe life into conceptual
              visions, crafting stunning and functional spaces across residential,
              commercial, and urban landscapes. Rooted in a commitment to
              aesthetics and sustainability, our expertise elevates every project
              to unparalleled excellence. Explore a spectrum of Architectural
              services that redefine the essence of design.
            </p>
          </div>


        </div>


        {renderImages()}

      </div>


      <div  className="md:flex justify-center items-center w-full lg:-mt-28">
        <div data-aos="fade-down"

          className="md:w-3/4 sm:w-full px-6 md:px-0 mb-20">
          <h2 className="font-audiowide text-2xl mt-0 md:text-3xl pb-6 uppercase ">
            Exclusive Services
          </h2>

          <div className="  flex flex-col md:flex-row gap-4 justify-between mb-50 flex-wrap gap-y-10 text-center">
            <div data-aos="flip-up" class=" pt-8 p-4 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">

              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="hover:text-[#C1AE69]">
                <path d="M0 5.33333V48H16V44H10.6667V40H16V36H5.33333V32H16V28H10.6667V24H16V20H5.33333V16H16V5.33333H20V16H24V10.6667H28V16H32V5.33333H36V16H40V10.6667H44V16H48V0H5.33333C3.91885 0 2.56229 0.561903 1.5621 1.5621C0.561903 2.56229 0 3.91885 0 5.33333ZM8 10.6667C7.29276 10.6667 6.61448 10.3857 6.11438 9.88562C5.61429 9.38552 5.33333 8.70724 5.33333 8C5.33333 7.29276 5.61429 6.61448 6.11438 6.11438C6.61448 5.61429 7.29276 5.33333 8 5.33333C8.70724 5.33333 9.38552 5.61429 9.88562 6.11438C10.3857 6.61448 10.6667 7.29276 10.6667 8C10.6667 8.70724 10.3857 9.38552 9.88562 9.88562C9.38552 10.3857 8.70724 10.6667 8 10.6667Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>

              <div class="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 class="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Residential
              </h3>

              <span class="font-normal   tracking-wider group-hover:text-[#C1AE69] text-center">
                Crafting homes that blend comfort with sophistication, our residential designs are a testament to personalized elegance and functional luxury.
              </span>
            </div>


            <div
              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] w-full bg-white border h-[370px]  hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="54" height="49" viewBox="0 0 54 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.6666 14.0001V8.66675C45.6666 4.26675 42.0666 0.666748 37.6666 0.666748H16.3333C11.9333 0.666748 8.33325 4.26675 8.33325 8.66675V14.0001C3.93325 14.0001 0.333252 17.6001 0.333252 22.0001V35.3334C0.333252 39.7334 3.93325 43.3334 8.33325 43.3334V48.6667H13.6666V43.3334H40.3333V48.6667H45.6666V43.3334C50.0666 43.3334 53.6666 39.7334 53.6666 35.3334V22.0001C53.6666 17.6001 50.0666 14.0001 45.6666 14.0001ZM13.6666 8.66675C13.6666 7.20008 14.8666 6.00008 16.3333 6.00008H37.6666C39.1333 6.00008 40.3333 7.20008 40.3333 8.66675V16.0801C38.7066 17.5467 37.6666 19.6534 37.6666 22.0001V27.3334H16.3333V22.0001C16.3333 19.6534 15.2933 17.5467 13.6666 16.0801V8.66675ZM48.3333 35.3334C48.3333 36.8001 47.1333 38.0001 45.6666 38.0001H8.33325C6.86659 38.0001 5.66659 36.8001 5.66659 35.3334V22.0001C5.66659 20.5334 6.86659 19.3334 8.33325 19.3334C9.79992 19.3334 10.9999 20.5334 10.9999 22.0001V32.6667H42.9999V22.0001C42.9999 20.5334 44.1999 19.3334 45.6666 19.3334C47.1333 19.3334 48.3333 20.5334 48.3333 22.0001V35.3334Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Commercial
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Transforming commercial spaces into dynamic hubs of productivity
                and innovation, our designs marry aesthetics with practicality.
              </span>
            </div>

            <div
              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] w-full bg-white border h-[370px]  hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.2935 45.9601L45.9601 57.2935L32.0935 43.4268L36.8135 38.7068L39.4801 41.3735L46.0668 34.7601L49.8535 38.5468L45.9601 42.3335L48.7868 45.0001L52.5735 41.2668L57.2935 45.9601ZM14.6268 25.8801L0.706787 12.0401L12.0401 0.706787L16.7335 5.42679L10.1468 12.0401L13.0001 14.8668L19.5601 8.25345L23.3468 12.0401L19.5601 15.8001L22.2268 18.4668L14.6268 25.8801ZM34.4935 21.0001L37.0001 23.4801L12.7868 47.6668H10.3335V45.2135L34.4935 21.0001ZM44.1201 5.00012C43.4535 5.00012 42.7601 5.24012 42.2268 5.77345L37.3201 10.6535L47.3201 20.6535L52.2268 15.6668C53.2668 14.6268 53.2668 13.0001 52.2268 11.9068L45.9868 5.77345C45.4801 5.26679 44.8135 5.00012 44.1201 5.00012ZM34.4935 13.4801L5.00012 43.0001V53.0001H15.0001L44.4935 23.4801L34.4935 13.4801Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-4 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Hospitality
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Elevating guest experiences through thoughtfully designed
                spaces, our hospitality designs combine luxury, functionality,
                and aesthetic allure.
              </span>
            </div>

            <div
              data-aos="flip-up"

              class="p-4 pt-8 h-[370px] md:w-[48%] lg:w-[32%] w-full hover:border-[#C1AE69] bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center group">
              <svg width="51" height="54" viewBox="0 0 51 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3333 24.6667H6.99992V43.3334H12.3333V24.6667ZM28.3333 24.6667H22.9999V43.3334H28.3333V24.6667ZM50.9999 48.6667H0.333252V54.0001H50.9999V48.6667ZM44.3333 24.6667H38.9999V43.3334H44.3333V24.6667ZM25.6666 6.69341L39.5599 14.0001H11.7733L25.6666 6.69341ZM25.6666 0.666748L0.333252 14.0001V19.3334H50.9999V14.0001L25.6666 0.666748Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Institutional
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Designing educational and institutional spaces that inspire learning and growth, our creations prioritize functionality and Architectural finesse.
              </span>
            </div>
            <div

              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="64" height="51" viewBox="0 0 64 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6667 0.333252V6.35992L32 9.90659V5.66659H58.6667V45.6666H45.3333V50.9999H64V0.333252H26.6667ZM20 8.33325L0 21.6666V50.9999H40V21.6666L20 8.33325ZM37.3333 10.9999V13.4799L41.6267 16.3333H42.6667V10.9999H37.3333ZM48 10.9999V16.3333H53.3333V10.9999H48ZM20 14.9999L34.6667 24.3333V45.6666H26.6667V29.6666H13.3333V45.6666H5.33333V24.3333L20 14.9999ZM48 21.6666V26.9999H53.3333V21.6666H48ZM48 32.3333V37.6666H53.3333V32.3333H48Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Master Planning
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Envisioning comprehensive master plans that shape communities, our designs integrate sustainability, aesthetics, and thoughtful urban development.

              </span>
            </div>

            <div

              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.0001 59.3334H32.6667V54.0001H38.0001V59.3334ZM48.6667 54.0001H43.3334V59.3334H48.6667V54.0001ZM38.0001 43.3334H32.6667V48.6667H38.0001V43.3334ZM16.6667 54.0001H11.3334V59.3334H16.6667V54.0001ZM16.6667 43.3334H11.3334V48.6667H16.6667V43.3334ZM48.6667 43.3334H43.3334V48.6667H48.6667V43.3334ZM38.0001 32.6667H32.6667V38.0001H38.0001V32.6667ZM48.6667 32.6667H43.3334V38.0001H48.6667V32.6667ZM54.0001 22.0001C55.4146 22.0001 56.7711 22.562 57.7713 23.5622C58.7715 24.5624 59.3334 25.9189 59.3334 27.3334V59.3334H54.0001V27.3334H27.3334V59.3334H22.0001V38.0001H6.00008V59.3334H0.666748V38.0001C0.666748 36.5856 1.22865 35.229 2.22885 34.2288C3.22904 33.2287 4.58559 32.6667 6.00008 32.6667H22.0001V27.3334C22.0001 25.9189 22.562 24.5624 23.5622 23.5622C24.5624 22.562 25.9189 22.0001 27.3334 22.0001V16.6667C27.3334 15.2523 27.8953 13.8957 28.8955 12.8955C29.8957 11.8953 31.2523 11.3334 32.6667 11.3334H38.0001V0.666748H43.3334V11.3334H48.6667C50.0812 11.3334 51.4378 11.8953 52.438 12.8955C53.4382 13.8957 54.0001 15.2523 54.0001 16.6667V22.0001ZM48.6667 22.0001V16.6667H32.6667V22.0001H48.6667Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-4 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Industrial &
                Infrastructure
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Innovative solutions for industrial and infrastructure projects, where functionality meets cutting-edge design for efficient, forward-looking spaces.
              </span>
            </div>
            <div

              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="54" height="48" viewBox="0 0 54 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.9999 32H37.6666V37.3333H42.9999M42.9999 21.3333H37.6666V26.6667H42.9999M48.3332 42.6667H26.9999V37.3333H32.3333V32H26.9999V26.6667H32.3333V21.3333H26.9999V16H48.3332M21.6666 10.6667H16.3333V5.33333H21.6666M21.6666 21.3333H16.3333V16H21.6666M21.6666 32H16.3333V26.6667H21.6666M21.6666 42.6667H16.3333V37.3333H21.6666M10.9999 10.6667H5.66658V5.33333H10.9999M10.9999 21.3333H5.66658V16H10.9999M10.9999 32H5.66658V26.6667H10.9999M10.9999 42.6667H5.66658V37.3333H10.9999M26.9999 10.6667V0H0.333252V48H53.6666V10.6667H26.9999Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>
              <div className="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">
                Landscape &
                Urbanism
              </h3>

              <span className="font-normal tracking-wider group-hover:text-[#C1AE69] text-center">
                Crafting outdoor environments that seamlessly blend with urban landscapes, our landscape designs enhance surroundings with natural beauty
              </span>
            </div>




            <div

              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.6667 24C42.6667 28.9067 38.6667 32.9067 33.76 32.9067C31.3867 32.9067 29.1733 32 27.4933 30.2933L25.8933 28.6933L28.72 25.8933C29.44 26.6667 30.32 27.4667 30.32 27.4667C31.2267 28.4 32.48 28.9067 33.7867 28.9067C36.48 28.9067 38.6667 26.6667 38.6667 24C38.6667 21.3333 36.48 19.0933 33.7867 19.0933C32.48 19.0933 31.2267 19.6267 30.32 20.5333L20.5333 30.2933C18.8533 32 16.6133 32.9067 14.24 32.9067C9.33333 32.9067 5.33333 28.9067 5.33333 24C5.33333 19.0933 9.33333 15.0933 14.24 15.0933C16.6133 15.0933 18.8533 16 20.5333 17.7067L22.1067 19.3067L19.28 22.1333L17.7067 20.5333C16.7733 19.6267 15.5467 19.0933 14.24 19.0933C11.52 19.0933 9.33333 21.3333 9.33333 24C9.33333 26.6667 11.52 28.9067 14.24 28.9067C15.5467 28.9067 16.7733 28.4 17.7067 27.4667L27.4933 17.7067C29.1733 16 31.3867 15.0933 33.76 15.0933C38.6667 15.0933 42.6667 19.0933 42.6667 24ZM48 5.33333V42.6667C48 45.6267 45.6267 48 42.6667 48H5.33333C2.4 48 0 45.6267 0 42.6667V5.33333C0 2.37333 2.37333 0 5.33333 0H42.6667C45.6 0 48 2.37333 48 5.33333ZM42.6667 5.33333H5.33333V42.6667H42.6667V5.33333Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>

              <div className="border-b border-gray-400 w-20 m-5 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">

                Redevelopment
                Projects
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Revitalizing spaces through thoughtful redevelopment, our designs breathe new life into existing structures, marrying modernity with legacy.
              </span>
            </div>





            <div

              data-aos="flip-up"
              class=" p-4 pt-8 md:w-[48%] lg:w-[32%] h-[370px] w-full bg-white border   hover:border-[#C1AE69]  flex flex-col items-center group">
              <svg width="54" height="49" viewBox="0 0 54 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5478 0.333374C12.3592 7.31017 7.0795 12.5899 0.29126 12.5899V16.3611C9.53081 16.5497 16.6961 9.38433 16.319 0.333374H12.5478ZM0.29126 4.67031V8.44153C5.00531 8.25297 8.39942 4.85887 8.39942 0.333374H4.62819C4.25107 2.59612 2.55401 4.29316 0.29126 4.67031ZM53.7085 12.5899C46.9205 12.5899 41.6407 7.31017 41.4519 0.333374H37.6807C37.3037 9.38433 44.469 16.5497 53.7085 16.3611V12.5899ZM53.7085 8.44153V4.67031C51.4458 4.29316 49.7487 2.59612 49.3717 0.333374H45.6005C45.6005 4.85887 48.9946 8.25297 53.7085 8.44153ZM45.6666 48.3334V27H53.6666L26.9999 3.00004L0.33326 27H8.33326V48.3334H45.6666ZM26.9999 10.2L40.3333 22.2V43H13.6666V22.2L26.9999 10.2Z" className="group-hover:fill-[#C1AE69]" fill="white" />
              </svg>

              <div className="border-b border-gray-400 w-20 m-4 group-hover:text-[#C1AE69]"></div>

              <h3 className="font-audiowide text-2xl pb-4 uppercase group-hover:text-[#C1AE69]">

                Exterior Façade
                Design specialist
              </h3>

              <span className="font-normal  tracking-wider group-hover:text-[#C1AE69] text-center">
                Specialized expertise in creating stunning exterior facades, where form meets function to redefine the visual identity of Architectural structures.
              </span>
            </div>



          </div>


        </div>
      </div >
      <div data-aos="fade-down" className="md:flex justify-center  w-full relative md:bottom-12 -bottom-10 sm:bottom-5  mb-2 md:mb-0">
        <div

          className="md:w-3/4 sm:w-full px-6 md:px-0 my-16 ">
          <h1 className="font-audiowide text-3xl pb-6 uppercase" >
            By the Numbers

          </h1>
          <ByTheNumber />
          {/* {
            byTheNumber?.length > 0 && (<div className="  flex flex-col md:flex-row justify-between mb-50 flex-wrap ">
              <div className=" p-4  md:w-[30%] w-full flex flex-col items-center">
                <h3 className="font-audiowide text-1xl text-center  uppercase text-[#C1AE69]">
                  <AnimatedString value={byTheNumber[0].complete_project_area} />
                </h3>

                <h6 className="font-light text-[20px]   tracking-wider text-center">
                  Sq Carpet Area Of Completed Projects
                </h6>
              </div>

              <div className=" p-4  md:w-[30%]  w-full flex flex-col items-center">
                <h3 className="font-audiowide text-center text-1xl uppercase text-[#C1AE69]">
                  {byTheNumber[0].experience}
                </h3>

                <h6 className="font-light text-[20px]   tracking-wider text-center">
                  Years Of Experience
                </h6>
              </div>

              <div className=" p-4  md:w-[30%] w-full flex flex-col items-center">
                <h3 className="font-audiowide text-center text-1xl uppercase text-[#C1AE69]">
                  {byTheNumber[0].ongoing_project_area}
                </h3>

                <h6 className="font-light text-[20px]   tracking-wider text-center">
                  Sq Carpet Area Of Ongoing Projects
                </h6>
              </div>
            </div>)
          } */}
          <div className="flex flex-wrap -mx-4 md:-mx-4 lg:-mx-4 mt-8">
            <div
              data-aos="fade-left"
              className="p-4 pr-0 md:w-full lg:w-[45%]">
              <div className="relative h-[90%]">
                {/* Larger image */}
                <img
                  src={art}
                  alt=""
                  className="w-[80%] h-[100%] object-cover"
                />

                <img
                  src={art_small}
                  alt=""
                  className="w-[40%] h-auto absolute bottom-[-40px] right-[40px]"
                />
              </div>

            </div>
            <div
              data-aos="fade-right"

              className="p-4 md:pl-0 md:w-full lg:w-[55%]">
              <h1 className="font-audiowide leading-9 text-2xl mb-2 mt-4 md:mt-0 ">
                14 YEARS OF ARCHITECTURAL ARTISTRY
              </h1><br />
              <p className="font-light mb-10">
                With a legacy spanning over 14 years, Alpine Architects has been
                a beacon of Architectural innovation. Each year adds to our
                journey of crafting distinctive spaces that harmonize aesthetics
                and functionality. Explore our portfolio and witness the
                evolution of Architectural artistry that defines our commitment
                to excellence.
              </p>

              <div className=" flex flex-row gap-5 mb-2">
                <div>
                  <svg
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17" cy="17.5" r="17" fill="white" />
                    <path
                      d="M28 17.5L25.6 14.7L25.9 11L22.3 10.2L20.4 7L17 8.5L13.6 7L11.7 10.2L8.1 11L8.4 14.7L6 17.5L8.4 20.3L8.1 24L11.7 24.8L13.6 28L17 26.5L20.4 28L22.3 24.8L25.9 24L25.6 20.3L28 17.5ZM23.7 22.4L21 23L19.6 25.4L17 24.3L14.4 25.4L13 23L10.3 22.4L10.5 19.6L8.7 17.5L10.5 15.4L10.3 12.6L13 12L14.4 9.6L17 10.7L19.6 9.6L21 12L23.7 12.6L23.5 15.4L25.3 17.5L23.5 19.6L23.7 22.4ZM21.6 13.1L23 14.5L15 22.5L11 18.5L12.4 17.1L15 19.7L21.6 13.1Z"
                      fill="#131313"
                    />
                  </svg>
                </div>
                <p className="font-light mb-4 xl:flex-1 ">Innovative Designs</p>
              </div>
              <div className="flex flex-row  gap-5 mb-2">
                <svg
                  width="34"
                  height="35"
                  viewBox="0 0 34 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17" cy="17.5" r="17" fill="white" />
                  <path
                    d="M28 17.5L25.6 14.7L25.9 11L22.3 10.2L20.4 7L17 8.5L13.6 7L11.7 10.2L8.1 11L8.4 14.7L6 17.5L8.4 20.3L8.1 24L11.7 24.8L13.6 28L17 26.5L20.4 28L22.3 24.8L25.9 24L25.6 20.3L28 17.5ZM23.7 22.4L21 23L19.6 25.4L17 24.3L14.4 25.4L13 23L10.3 22.4L10.5 19.6L8.7 17.5L10.5 15.4L10.3 12.6L13 12L14.4 9.6L17 10.7L19.6 9.6L21 12L23.7 12.6L23.5 15.4L25.3 17.5L23.5 19.6L23.7 22.4ZM21.6 13.1L23 14.5L15 22.5L11 18.5L12.4 17.1L15 19.7L21.6 13.1Z"
                    fill="#131313"
                  />
                </svg>
                <p className="font-light mb-4 xl:flex-1 ">Client-Centric Approach</p>
              </div>
              <div className="flex flex-row  gap-5 mb-2">
                <svg
                  width="34"
                  height="35"
                  viewBox="0 0 34 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17" cy="17.5" r="17" fill="white" />
                  <path
                    d="M28 17.5L25.6 14.7L25.9 11L22.3 10.2L20.4 7L17 8.5L13.6 7L11.7 10.2L8.1 11L8.4 14.7L6 17.5L8.4 20.3L8.1 24L11.7 24.8L13.6 28L17 26.5L20.4 28L22.3 24.8L25.9 24L25.6 20.3L28 17.5ZM23.7 22.4L21 23L19.6 25.4L17 24.3L14.4 25.4L13 23L10.3 22.4L10.5 19.6L8.7 17.5L10.5 15.4L10.3 12.6L13 12L14.4 9.6L17 10.7L19.6 9.6L21 12L23.7 12.6L23.5 15.4L25.3 17.5L23.5 19.6L23.7 22.4ZM21.6 13.1L23 14.5L15 22.5L11 18.5L12.4 17.1L15 19.7L21.6 13.1Z"
                    fill="#131313"
                  />
                </svg>
                <p className="font-light mb-4 xl:flex-1">Aesthetics & Trends in Check!</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="relative  p-5 pb-16 pt-44 -mb-12" style={{ backgroundImage: ` url(${services_crousal_bg})`, backgroundPosition: "left", backgroundRepeat: "no-repeat", }}>
        <div className="relative -top-16 md:flex flex-col justify-start items-center w-[90%] md:w-[80%] m-auto pt-0 " >
          <h1 className="self-start md:ml-28 font-audiowide text-3xl    uppercase mb-5">Our CLient Say</h1>
          {
            testimonials.length > 0 && (
              <Carousel_review
                swipeable={true}
                draggable={true}
                showDots={false}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={3000}
                status={false}
                responsive={responsive_reviews}
              >
                {testimonials.map((review, index) => (
                  <div
                    key={index}
                    className="w-full mb-10 h-auto md:h-[200px] lg:w-[80%]  overflow-y-hidden lg:overflow-y-auto m-auto  review"

                  >
                    <div className="p-5 bg-[#242424]  min-h-80" >
                      <h3 className="font-audiowide text-left text-[20px] pb-2 uppercase">
                        {review.client_name}
                      </h3>
                      <h3 className="font-light text-left leading-loose tracking-wider">
                        {review.client_designation}
                      </h3>

                      <p className="font-light leading-loose tracking-wider">
                        {review.feedback}
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel_review>

            )
          }

        </div>
      </div>
    </>
  );


}
