import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import API_Call from '../Components/API_Call';
import { Link, useNavigate } from 'react-router-dom';
export default function OnGoingProjectList() {
    const { fetchData } = API_Call();
    const [allImages, setAllImages] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [displayedImagesCount, setDisplayedImagesCount] = useState(6);
    const [contentList, setContentList] = useState([]);
    const categories = ["All"];
    const navigate = useNavigate();
    const getData = async () => {
        const data = await fetchData("ongoingproject");

        if (data) {
            const allDataImages = data.map((item) => {
                const existedCategory = categories.find(category => category === item.category);
                if (!existedCategory) {
                    categories.push(item.category);
                }

                return {
                    "category": item.category,
                    "vertical_image": item.verticle_image[0]?.url,
                    "horizontal_image": item.horizontal_image[0]?.url,
                    "id": item.id,
                    "project_name": item.project_name
                };
            });
            setDisplayedImagesCount(7)
            setUniqueCategories(categories);
            setAllImages(allDataImages.sort((a, b) => b.id - a.id));
            setFilteredData(allDataImages);
        }
    }

    const filterPhotosByCategory = () => {
        if (activeCategory === "All") {
            setFilteredData(allImages);
        } else {
            const filtered = allImages.filter(item => item.category === activeCategory);
            setFilteredData(filtered);

        }
        setContentList([]);
    };

    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleLoadMoreClick = () => {
        setDisplayedImagesCount(prevCount => prevCount + 7);
        let newLoadedImages = imagesContainer(filteredData, displayedImagesCount)
        setContentList((prevContentList) => [...prevContentList, newLoadedImages]);
    }

    useEffect(() => {
        filterPhotosByCategory();
        setContentList([]);
        setDisplayedImagesCount(6)
    }, [activeCategory]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleUpArrowClick();
    }, []);

    return (
        <>
            <div className='relative  lg:bottom-24 md:bottom-1 bottom-0 sm:bottom-5'>
                <div className="md:flex justify-center items-center w-full mb-4  ">
                    <div className="md:w-3/4 sm:w-full px-6 md:px-3">
                        <h1 data-aos="fade-down" className='font-audiowide text-3xl pb-6 uppercase'>Ongoing projects</h1>
                        <p data-aos="fade-down" className='font-light leading-10 tracking-wider'>
                            Unveil the secrets of design with us—a journey from blueprints to vibrant stories, celebrating Architectural brilliance. Join our odyssey of creativity, where innovation shapes spaces, and every line drawn is a brushstroke on the canvas of urban artistry. Welcome to a realm where passion for design comes to life! </p>
                    </div>
                </div>

               

                {
                    filteredData.length > 0 ? (<div className="md:flex justify-center items-center w-full relative mt-3  ">
                        <div className="md:w-3/4 sm:w-full px-6 md:px-3 py-12 ">



                            {imagesContainer(filteredData, 0)}

                            {contentList.map((content, index) => (
                                <div key={index}>{content}</div>

                            ))}



                            {
                                filteredData.length > displayedImagesCount && (<div className="my-10 flex justify-end">
                                    <Button text={"Load More"} onClick={handleLoadMoreClick} />
                                </div>)
                            }

                        </div>
                    </div>
                    ) : (<div className="flex lg:h-[613px] justify-center items-center m-auto pt-2">
                        <img src="loading-gif.gif" alt="" className='w-[100px] bg-blend-multiply my-44' />

                    </div>)
                }
            </div>
        </>
    );


    function imagesContainer(filteredData, startingIndex = 0) {

        return (
            <div className='flex gap-2 mb-4 flex-wrap m-auto'>

                {filteredData[startingIndex]?.horizontal_image ? (

                    <div
                        data-aos="fade-right"
                        className='w-full relative group lg:w-[67%] lg:h-[479px] h-[200px] '
                        style={{ position: 'relative', cursor: 'pointer' }}

                    >
                        <Link to={`/ongoing-project/${filteredData[startingIndex]?.id}`}>
                            <img
                                className='object-fill h-full transition duration-500 ease-in-out group-hover:opacity-50'
                                src={filteredData[startingIndex]?.horizontal_image}
                                alt={""}
                                style={{ width: "100%", display: "block" }}
                            />
                            <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                <h3 className="ml-2 w-[95%] text-[22px] break-all">{filteredData[startingIndex]?.project_name}</h3>
                                <span className='justify-end mr-2'>
                                    <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                        <g opacity="0.6">
                                            <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </div>
                ):(<div
                    data-aos="fade-right"
                    className='w-full relative group lg:w-[67%]  lg:h-[479px]   xl:h-[479px] h-[200px] '
                    style={{ position: 'relative', cursor: 'pointer' }}

                ></div> )}

                {
                    filteredData[startingIndex + 1]?.vertical_image && (<div data-aos="fade-right" className="w-[48.5%] relative group lg:w-[30%] lg:h-[479px] h-[265px]" style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <Link to={`/ongoing-project/${filteredData[startingIndex + 1]?.id}`}>
                            <img className='object-fill h-full transition duration-500 ease-in-out hover:opacity-50'
                                src={filteredData[startingIndex + 1]?.vertical_image}
                                alt={""}
                                style={{ width: "100%", display: "block", }}

                            />
                            <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                                <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 1]?.project_name}</h3>


                                <span className=' justify-end mr-2'>
                                    <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                        <g opacity="0.6">
                                            <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                        </g>
                                    </svg>
                                </span>

                            </div>
                        </Link>
                    </div >)
                }
                {
                    filteredData[startingIndex + 2]?.vertical_image && (<div data-aos="fade-right" className='w-[48.8%] relative group lg:w-[32%] lg:h-[479px] h-[265px] ' style={{ position: 'relative', cursor: 'pointer' }}  >
                        <Link to={`/ongoing-project/${filteredData[startingIndex + 2]?.id}`}>
                            <img className=' object-fill  h-full transition duration-500 ease-in-out hover:opacity-50'
                                src={filteredData[startingIndex + 2]?.vertical_image}
                                alt={""}
                                style={{ width: "100%", display: "block", }}

                            />
                            <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                                <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 2]?.project_name}</h3>


                                <span className=' justify-end mr-2'>
                                    <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                        <g opacity="0.6">
                                            <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                        </g>
                                    </svg>
                                </span>

                            </div>
                        </Link>
                    </div>)
                }


                {
                    filteredData[startingIndex + 3]?.vertical_image && (<div data-aos="fade-right" className="w-[48.5%] relative group lg:w-[32.1%] lg:h-[479px] h-[265px] " style={{ position: 'relative', cursor: 'pointer' }}   >
                        <Link to={`/ongoing-project/${filteredData[startingIndex + 3]?.id}`}>
                            <img className='object-fill h-full transition duration-500 ease-in-out hover:opacity-50'
                                src={filteredData[startingIndex + 3]?.vertical_image}
                                alt={""}
                                style={{ width: "100%", display: "block", }}

                            />
                            <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                                <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 3]?.project_name}</h3>


                                <span className=' justify-end mr-2'>
                                    <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                        <g opacity="0.6">
                                            <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                        </g>
                                    </svg>
                                </span>

                            </div>
                        </Link>
                    </div>)
                }
                {
                    filteredData[startingIndex + 4]?.vertical_image && (<div data-aos="fade-right" className="w-[48.8%]  relative group lg:w-[32%] lg:h-[479px] h-[265px] " style={{ position: 'relative', cursor: 'pointer' }}   >
                        <Link to={`/ongoing-project/${filteredData[startingIndex + 4]?.id}`}>
                            <img className='object-fill h-full transition duration-500 ease-in-out hover:opacity-50'
                                src={filteredData[startingIndex + 4]?.vertical_image}
                                alt={""}
                                style={{ width: "100%", display: "block", }}

                            />
                            <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                                <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 4]?.project_name}</h3>


                                <span className=' justify-end mr-2'>
                                    <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                        <g opacity="0.6">
                                            <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                        </g>
                                    </svg>
                                </span>

                            </div>
                        </Link>
                    </div>)
                }
                <div className='flex flex-wrap md:gap-1 gap-3 lg:gap-2 w-full'>
                    
                    {
                        filteredData[startingIndex + 5]?.horizontal_image && (
                            <div data-aos="fade-right" className='w-full relative group lg:w-[48.6%]  lg:h-[289px] h-[200px] transition duration-500 ease-in-out hover:opacity-50' style={{ position: 'relative', cursor: 'pointer' }}>
                                <Link to={`/ongoing-project/${filteredData[startingIndex + 5]?.id}`}>
                                    <img className='object-fill h-full transition duration-500 ease-in-out group-hover:opacity-50' src={filteredData[startingIndex + 5]?.horizontal_image} alt={""} style={{ width: "100%", display: "block" }} />
                                    <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                        <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 5]?.project_name}</h3>
                                        <span className='justify-end mr-2'>
                                            <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                                <g opacity="0.6">
                                                    <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </div>)
                    }

                    {
                        filteredData[startingIndex + 6]?.horizontal_image && (
                            <div data-aos="fade-right" className='w-full relative group lg:w-[48.5%] lg:h-[289px] h-[200px] transition duration-500 ease-in-out hover:opacity-50' style={{ position: 'relative', cursor: 'pointer' }}>
                                <Link to={`/ongoing-project/${filteredData[startingIndex + 6]?.id}`}>
                                    <img className='object-fill  transition w-full h-full duration-500 ease-in-out group-hover:opacity-50' src={filteredData[startingIndex + 6]?.horizontal_image} alt={""} style={{ width: "100%", display: "block" }} />
                                    <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                        <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 6]?.project_name}</h3>
                                        <span className='justify-end mr-2'>
                                            <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                                <g opacity="0.6">
                                                    <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )}
                </div>


            </div >

        );
    }
}



