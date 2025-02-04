
import { Carousel } from 'react-carousel-minimal';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../Components/Button';
import { FaLocationDot } from "react-icons/fa6";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import detailPage_bg_1 from '../assets/images/DetailPage/detailPage-bg1.png';
import detailPage_bg_2 from '../assets/images/DetailPage/detailPage-bg-2.png';
import { useParams } from 'react-router-dom';
import Carousel_Diversity from '../Components/ProjectDiversityCarousel/Carousel';
import API_Call from '../Components/API_Call';
import { useMediaQuery } from 'react-responsive';
import { useSwipeable } from "react-swipeable";
import { Modal } from 'flowbite-react';
import ReactPlayer from 'react-player';
import { useLocation, Link } from 'react-router-dom';
export default function ProjectDetailPage() {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const carouselRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { id } = useParams();
    const { fetchData, loader } = API_Call();
    const [projectData, setProjectData] = useState();
    const [verticalImagesData, setverticalImagesData] = useState([]);
    const [horizontalImageData, setHorizontalImageData] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const previousPage = queryParams.get('from');
    console.log(previousPage);
    let verticalImages = [];
    let horiontalImages = [];
    const getData = async () => {
        const data = await fetchData(`portfolio/${id}`, "POST");
        return data;
    }

    useEffect(() => {
        getData().then((data) => {
            setProjectData(data)

        });
    }, []);

    useEffect(() => {
        if (projectData) {
            projectData[0]?.verticle_image.forEach((element) => {
                verticalImages.push({
                    image: element.url
                })
            })
            projectData[0]?.horizontal_image.forEach((element) => {
                horiontalImages.push({
                    image: element.url
                })
            })
        }


        setverticalImagesData(verticalImages);
        setHorizontalImageData(horiontalImages);

    }, [projectData])


    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    useEffect(() => {
        handleUpArrowClick();
    }, [])


    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    const handleSlideChange = (index) => {
        setCurrentIndex(index);
    };

    const openModal = (index) => {

        setCurrentPhotoIndex(index);

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextPhoto = () => {

        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % horizontalImageData.length);


    };

    const prevPhoto = () => {

        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + horizontalImageData.length) % horizontalImageData.length);

    };
    const handlers = useSwipeable({
        onSwipedLeft: () => nextPhoto(),
        onSwipedRight: () => prevPhoto(),
    });
    useEffect(() => {
        const handleButtonClick = () => {
            // Get the carousel container element
            const carouselContainer = carouselRef.current.querySelector('.carousel-container');


            // Get the dots container element
            const dotsContainer = carouselContainer.querySelector('.dots');

            // Get all the dot elements
            const dots = dotsContainer.querySelectorAll('.dot');


            // Check if the last dot has the class 'active'
            const lastDotIsActive = dots[dots.length - 1].classList.contains('active');


            if (lastDotIsActive) {


                window.scrollBy({
                    top: 600,
                    behavior: 'smooth'
                });
            }
        };

        // Wait for the next and previous buttons to be rendered
        const waitForButtons = setInterval(() => {
            const nextButton = document.querySelector('.next');


            const prevButton = document.querySelector('.prev');


            if (nextButton && prevButton) {
                clearInterval(waitForButtons);
                nextButton.addEventListener('click', handleButtonClick);
                prevButton.addEventListener('click', handleButtonClick);
            }
        }, 100);

        // Clean up interval on component unmount
        return () => clearInterval(waitForButtons);
    }, []);


    return (
        <>
            {projectData ? (<>
                <div className="md:flex justify-center bg-top  lg:h-[1110px] md:h-[90vh] h-auto w-full relative lg:bottom-44 md:bottom-12 bottom-20 sm:bottom-5  mb-2 md:mb-0  bg-cover bg-rigth py-3" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(13, 13, 13, 0.1)), url(${detailPage_bg_1}),url(${detailPage_bg_2})`, backgroundRepeat: "no-repeat", backgroundPosition: "100% 100%", backgroundSize: "100% 100%" }}>
                    <div className="md:w-3/4 sm:w-full px-6 pt-12 md:px-0">
                        {
                            previousPage == '/' ? (<h6 className='mb-3 mt-3 text-amber-600 text-[#C1AE69] uppercase'><Link to='/' >Home</Link>  &gt; {projectData[0].project_name}</h6>
                            ) : (<h6 className='mb-3 mt-3 text-amber-600 text-[#C1AE69] uppercase'><Link to='/' >Home</Link> &gt;<Link to='/portfolio'>Portfolio</Link>  &gt; {projectData[0].project_name}</h6>
                            )
                        }
                        <div className='flex items-center m-0'>
                            <h3 className='font-audiowide lg:text-2xl text-1xl  uppercase md:mr-8 mr-2'> {projectData[0].project_name}</h3>
                            <p className='font-light flex items-center md:gap-[6px] gap-[2px] flex-nowrap   leading-loose tracking-wider' style={{ marginBottom: "0px !important" }}><FaLocationDot /> {projectData[0].location}</p>
                        </div>
                        <p className='font-light -mt-2 leading-loose tracking-wider'>
                            AREA-    {projectData[0].area}                  </p>


                        <style>{
                            ` @media screen and (min-width: 960px) {
                        .carousel-image{
    width: 450px !important;
    height: 638px !important;
    object-fit: cover;
    border-radius: 0px !important;
  }

  .slick-slide {
    padding: 0 15px; /* Adjust as needed */
  }
}
@media screen and (min-width: 860px) {
    .carousel-image{
width: 350px !important;
height: 638px !important;

}
.slick-slide {
    padding: 0 15px; 
  }

}
`
                        }
                        </style>


                        <div style={{ textAlign: "center", marginBottom: "0px" }}>
                            {verticalImagesData.length > 0 ? (
                                <div ref={carouselRef} style={{
                                    padding: "0 0px"
                                }}>
                                    <Carousel

                                        data={verticalImagesData}
                                        time={2000}
                                        width="950px"
                                        height="500px"
                                        captionStyle={captionStyle}
                                        radius="10px"
                                        slideNumber={false}
                                        slideNumberStyle={slideNumberStyle}
                                        captionPosition="bottom"
                                        automatic={false}
                                        dots={true}
                                        pauseIconColor="white"
                                        pauseIconSize="40px"
                                        slideBackgroundColor="darkgrey"
                                        slideImageFit="fill"
                                        thumbnails={true}
                                        showNavBtn={true}

                                        thumbnailWidth="100px" touchMoveDefaultEvents={true}
                                        style={{
                                            textAlign: "center",
                                            maxWidth: "950px",
                                            maxHeight: "500px",
                                            margin: "40px auto",
                                            borderRadius: "0px"
                                        }}
                                    />
                                </div>

                            ) : (
                                <div className="flex h-[50vh]  justify-center items-center m-auto pt-[40px]">
                                    <img src="loading-gif.gif" alt="" className='w-[100px] md:pt-44 md:my-44' />

                                </div>)}

                        </div>

                    </div>
                </div>


                <div className="md:flex md:mt-32 justify-center items-center w-full  pt-3" >
                    <div className="md:w-3/4 sm:w-full px-6 md:px-0 lg:-mt-64 ">
                        {horizontalImageData.length > 0 && (
                            <AliceCarousel
                                // autoPlay
                                infinite
                                activeIndex={0}
                                autoPlayInterval={7000}
                                buttonsDisabled
                                dotsDisabled
                                mouseTracking
                                slideToIndex={currentIndex}
                                disableButtonsControls
                                onSlideChanged={handleSlideChange}
                            >
                                {[...Array(Math.ceil(horizontalImageData.length / (isMobile ? 4 : 6)))].map((_, index) => (
                                    <div key={index} className='flex flex-wrap justify-center items-center md:gap-y-3 gap-y-1 gap-x-1 lg:gap-x-2 '>
                                        {horizontalImageData.slice(index * (isMobile ? 4 : 6), (index + 1) * (isMobile ? 4 : 6)).map((data, imgIndex) => (
                                            <img

                                                onClick={() => openModal(imgIndex)}
                                                key={imgIndex}
                                                src={data.image}
                                                alt={`Image ${index * (isMobile ? 4 : 6) + imgIndex + 1}`}
                                                className={`w-[48%] lg:w-[32%] h-[89px] cursor-pointer  md:h-[186px] object-fill `}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </AliceCarousel>
                        )}

                    </div>


                </div>
                {
                    projectData[0].url && (
                        <div className='md:w-[73%] w-[85%] m-auto pt-1 pb-20 md:h-[584px] h-[300px]'>
                            <ReactPlayer url={projectData[0].url} width={"100%"} height={"100%"} controls />

                        </div>)
                }
                <Carousel_Diversity category={projectData[0].category} id={projectData[0].id} page="projectdetail" />
            </>) : (<div className="flex lg:h-[613px] justify-center items-center m-auto pt-2">
                <img src="loading-gif.gif" alt="" className='w-[150px] bg-blend-multiply my-44' />

            </div>)}



            <Modal show={isModalOpen} onClose={closeModal} size="4xl" className="backdrop-blur-lg min-h-[100vh] z-50 padding-0" {...handlers}>
                <Modal.Body>
                    <div className="relative padding-0">
                        <span className='absolute top-0 right-0 z-50 p-2 '><Button text={"&times;"} onClick={closeModal} /></span>
                        <div className="lg:pt-0 pt-36 flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center  w-full mt-8 top-22">
                                <span className='absolute left-3 md:left-2 z-40 hidden lg:block '><Button text={"←"} onClick={prevPhoto} /></span>




                                <img src={horizontalImageData[currentPhotoIndex]?.image} alt="Modal" className="max-w-full w-[100%] lg:w-[85%]  md:h-[85vh] max-h-[700px]  h-[200px]   object-fill" />


                                <span className=' absolute right-3 md:right-[16px] z-40 hidden lg:block'><Button text={"→"} onClick={nextPhoto} /></span>
                            </div>
                            <div className="text-center">

                                {currentPhotoIndex + 1} / {horizontalImageData.length}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}




