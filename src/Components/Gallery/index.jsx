import React, { useRef, useEffect, useState } from 'react';
import Button from '../Button';
import './index.css';

import { Link } from 'react-router-dom';
import API_Call from '../API_Call';
export default function Gallery() {
  const galleryRef = useRef(null);
  const { fetchData } = API_Call();
  const [galleryData, setGalleryData] = useState([]);
  let galleryImagesArray = []
  //fetching data 
  const getData = async () => {
    try {
      const data = await fetchData("gallery");

      data?.forEach((element, index) => {
        if (index % 2 == 0) {
          galleryImagesArray.push({ "url": element.verticle_image[0].url, "id": element.id })

        } else {
          galleryImagesArray.push({ "url": element.horizontal_image[0].url, "id": element.id })

        }


      });
      setGalleryData(galleryImagesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {


    getData()
  }, []);




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
  return (
    <div>
      <div className="bg-secondary pt-10 lg:pb-28  pb-1" data-aos="fade-up">
        <div className="inner-cont sm:px-6 is-flex md:w-[80%] w-[90%]">
          <h2 className="text-3xl xl:flex-1 custom-font leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-4xl uppercase">
            Gallery
          </h2>
          <div className="md:text-left mt-4 md:mt-0 btn-fix lg:pr-1">

            <Button text={"View All"} to="/gallery" />

          </div>
        </div>

        <div
          ref={galleryRef}
          className="w-full h-[264px] md:h-[442px] mt-4 md:w-full flex overflow-x-scroll no-scrollbar"
          title='Press left or Right arrow of keyboard'
        >
          {galleryData.map((element, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 ? (
                <img
                  src={element.url}
                  alt=""
                  className="h-full flex-shrink-0 w-[149px] md:w-[250px]"
                />
              ) : (
                <img
                  src={element.url}
                  alt=""
                  className="h-full flex-shrink-0 w-[471px]  md:w-[788px]"
                />
              )}
            </React.Fragment>
          ))}
        </div>


        <div className="flex justify-end btm-btn pr-6 pt-4">

          <Button text={"View All"} to="/gallery" />

        </div>
      </div>
    </div>
  );
}

