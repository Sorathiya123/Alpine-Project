
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';
import API_Call from '../Components/API_Call';

export default function Blog() {
    const { fetchData } = API_Call();
    const [blogData, setBlogData] = useState([]);
    const [blogsToShow, setBlogsToShow] = useState(6);

    // Fetching data 
    const getData = async () => {
        try {
            const data = await fetchData("blog");


            setBlogData(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleLoadMore = () => {
        // Increase the number of blogs to show by 6
        setBlogsToShow(prev => prev + 6);
    };

    function TruncatedParagraph({ text, maxWords }) {
        if (!text) return null; // If text is undefined or null, return null

        const words = text.split(' ');
        const truncatedText = words.slice(0, maxWords).join(' ');
        const displayText = words.length > maxWords ? truncatedText + '...' : truncatedText;

        return (
            <p className='font-light mb-4'>
                {displayText}
            </p>
        );
    }


    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        handleUpArrowClick();
    }, []);

    return (
        <>
            <div className="md:flex justify-center items-center w-full relative lg:bottom-28 md:bottom-1 bottom-0 sm:bottom-5 mb-2 md:mb-0">
                <div className="md:w-3/4 sm:w-full px-6 md:px-0">
                    <h1 className='font-audiowide text-3xl pb-6 uppercase'>Blogs</h1>
                    <p className='font-light leading-loose tracking-wider'>
                        Delve deeper into the world of design with our insightful blogs. Each post is a window into our commitment to creativity, functionality, and staying ahead in design. Join us in exploring the nuances of Architectural and interior innovation, enriching your understanding of the art we passionately pursue.
                    </p>
                    <div className='flex flex-wrap -mx-4 md:-mx-4 lg:-mx-4 mt-8'>
                        {
                            blogData.length > 0 ? (
                                blogData
                                    .slice(0, blogsToShow)
                                    .sort((a, b) => b.id - a.id)
                                    .map((blog) => (
                                        <div key={blog.id} className='p-4 w-full md:w-1/2 lg:w-1/2'>
                                            <Link to={`/blog/${blog.id}`}>
                                                <img src={blog.hero_image} alt="" className='w-full h-[180px] lg:h-[274px] object-cover mb-4' />
                                                <h1 className='font-audiowide leading-9 text-2xl mb-2 w-full max-w-[100%] text-wrap overflow-hidden whitespace-normal '>
                                                    {blog.title}
                                                </h1>
                                                <TruncatedParagraph text={blog.content} maxWords={25} />
                                            </Link>
                                        </div>
                                    ))
                            ) : (
                                <div className="flex h-[50vh] justify-center items-center m-auto pt-[10px]">
                                    <img src="loading-gif.gif" alt="" className='w-[100px] md:py-44 md:my-44' />
                                </div>
                            )
                        }

                        {/* 

                        {blogData.length > 0 ? (blogData.slice(0, blogsToShow).map(blog =>
                            <div key={blog.id} className='p-4 w-full md:w-1/2 lg:w-1/2'>
                                <Link to={`/blog/${blog.id}`}>
                                    <img src={blog.hero_image} alt="" className='w-full h-[180px] lg:h-[274px] object-cover mb-4' />
                                    <h1 className='font-audiowide leading-9 text-2xl mb-2 w-full max-w-[100%] text-wrap overflow-hidden whitespace-normal '>
                                        {blog.title}
                                    </h1>
                                    <TruncatedParagraph text={blog.content} maxWords={25} />
                                </Link>
                            </div>
                        )) : (<div className="flex h-[50vh]  justify-center items-center m-auto pt-[10px]">
                            <img src="loading-gif.gif" alt="" className='w-[300px] md:py-44 md:my-44' />
                        </div>)
                        } */}
                    </div>
                    {blogData.length > blogsToShow && (
                        <div className='mt-5 flex justify-end'>
                            <Button text={"Load More"} onClick={handleLoadMore} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
