
// import React from "react";
// import AwesomeSlider from 'react-awesome-slider';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import 'react-awesome-slider/dist/styles.css';

// const AutoplaySlider = withAutoplay(AwesomeSlider);

// const HeroSectionSlider = ({ slides }) => {
//     return (
//         <AutoplaySlider
//             className="my-slider w-full lg:h-[85vh] md:h-[350px] h-[220px] object-fill mt-3 lg:mt-0"
//             bullets={true}
//             buttons={false}
//             play={true}
//             interval={2000}
//         >
//             {slides.map((slide, index) => (
//                 <div key={index} data-src={slide.url} className="h-[100%]" />
//             ))}
//         </AutoplaySlider>
//     );
// };

// export default HeroSectionSlider;

import React, { useEffect, useState } from "react";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import API_Call from '../API_Call';
const AutoplaySlider = withAutoplay(AwesomeSlider);

const HeroSectionSlider = ({ slides }) => {
    const [heroImages, setHeroImages] = useState([]);
    const { fetchData } = API_Call();
    let images = [];

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchData("banner?page=home");


                data.forEach(element => {
                  
                    element.images.forEach((image) => {
                        images.push(image.url);
                    });
                
                    
                    element.horizontal_images.forEach((image) => {
                        images.push(image.url);
                    });
                });
                
                setHeroImages(images);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();

    }, []);

    return (
        <>
            {heroImages.length > 0 ? (
                <AutoplaySlider
                    className="my-slider w-full lg:h-[85vh] md:h-[350px] h-[220px]  mt-3 lg:mt-0"
                    bullets={true}
                    buttons={false}
                    play={true}
                    interval={2000}
                >
                    {heroImages.map((image, index) => (
                        <div key={index} data-src={image} className="w-full h-full md:my-6 my-0 " loading="lazy" />
                    ))}
                </AutoplaySlider>
            ) : (
                <div className="w-full flex justify-center items-center"><p className="text-center m-auto mt-4 w-auto">              <img src="loading-gif.gif" alt="" className='w-[70px] bg-blend-multiply my-44' />
                </p></div>
            )}
        </>
    );
};

export default HeroSectionSlider;

