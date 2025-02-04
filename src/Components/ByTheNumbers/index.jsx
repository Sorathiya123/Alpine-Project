
import React, { useState, useEffect, useRef } from 'react';
import API_Call from "../API_Call";

const AnimatedNumber = ({ value, inView }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const prevInViewRef = useRef();

    useEffect(() => {
        prevInViewRef.current = inView;
    }, [inView]);

    const prevInView = prevInViewRef.current;

    useEffect(() => {
        let startTimestamp = null;
        const animateValue = (start, end, duration) => {
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const newValue = Math.floor(progress * (end - start) + start);
                setAnimatedValue(newValue);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        if (inView && !prevInView) {
            animateValue(animatedValue, value, 3000);
        } else if (!inView) {
            setAnimatedValue(0); // Reset the animation when out of view
        }
    }, [inView, prevInView, value, animatedValue]);

    return <span style={{ fontSize: '44px' }}>{animatedValue}</span>;
};

export default function index() {
    const { fetchData } = API_Call();
    const [byTheNumber, setByTheNumber] = useState([]);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const byTheNumberData = await fetchData("byTheNumber");
                setByTheNumber(byTheNumberData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Change this threshold according to your requirement
        };

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        }, options);

        const element = document.getElementById('animated-number-component');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div id="animated-number-component">
            {
                byTheNumber?.length > 0 && (
                    <div className="flex flex-col md:flex-row justify-between mb-50 flex-wrap">
                        <div className="p-4 md:w-[30%] w-full flex flex-col items-center">
                            <h3 className="font-audiowide text-1xl text-center uppercase text-[#C1AE69]">
                                <AnimatedNumber value={parseInt(byTheNumber[0].complete_project_area)} inView={inView} />
                                {byTheNumber[0].complete_project_area.match(/[a-zA-Z\s]+/)}
                            </h3>
                            <h6 className="font-light text-[20px] tracking-wider text-center">
                                Sq ft. Carpet Area Of Completed Projects
                            </h6>
                        </div>
                        <div className=" p-4  md:w-[30%]  w-full flex flex-col items-center">
                            <h3 className="font-audiowide text-center text-1xl uppercase text-[#C1AE69]">
                                <AnimatedNumber value={parseInt(byTheNumber[0].experience)} inView={inView} />
                                {byTheNumber[0].experience.match(/[a-zA-Z\s]+/)}
                            </h3>

                            <h6 className="font-light text-[20px]   tracking-wider text-center">
                                Years Of Experience
                            </h6>
                        </div>

                        <div className=" p-4  md:w-[30%] w-full flex flex-col items-center">
                            <h3 className="font-audiowide text-center text-1xl uppercase text-[#C1AE69]">
                                <AnimatedNumber value={parseInt(byTheNumber[0].ongoing_project_area)} inView={inView} />
                                {byTheNumber[0].ongoing_project_area.match(/[a-zA-Z\s]+/)}
                            </h3>

                            <h6 className="font-light text-[20px]   tracking-wider text-center">
                                Sq ft. Carpet Area Of Ongoing Projects
                            </h6>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
