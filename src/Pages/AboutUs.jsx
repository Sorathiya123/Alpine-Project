import React, { useEffect, useState } from "react";
import aboutUs_hero from "../assets/images/aboutUs-hero.png";
import male_owner from "../assets/images/male-Owner.jpg";
import female_owner from "../assets/images/female-Owner.jpg";
import about_bg from "../assets/images/about-bg.png";
import OnGoingProjects from "../Components/OnGoingProjects";
import studio from "../assets/images/studio-aboutUsSeaction.jpg";
import featured from "../assets/images/featured.jpg";
import { useSwipeable } from "react-swipeable";
import { Modal } from "flowbite-react";
import Button from "../Components/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import API_Call from "../Components/API_Call";
const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function AboutUs() {



  const [studioImages, setStudioImages] = useState();
  const [featured, setfeatured] = useState([]);
  const { fetchData } = API_Call();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData("studio");
        const featuredData = await fetchData("featured");
        // console.log(featuredData);

        setStudioImages(data);
        setfeatured(featuredData);
        // console.log(featuredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();

  }, []);













  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const openModal = (index) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => nextPhoto(),
    onSwipedRight: () => prevPhoto(),
  });
  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % featured.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + featured.length) % featured.length);
  };
  const handleUpArrowClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    handleUpArrowClick();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
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

  return (
    <>
      <div className="md:flex justify-center items-center w-full relative lg:bottom-28 md:bottom-1 bottom-0 sm:bottom-5 mb-2 md:mb-0">
        <div className="md:w-3/4 w-full px-6 lg:px-0">
          <div>
            <h1
              data-aos="fade-down"
              className="font-audiowide text-3xl pb-6 uppercase"
            >
              About Us
            </h1>
            <p
              data-aos="fade-down"
              className="font-light leading-loose tracking-wider"
            >
              Alpine Architects: Shaping Future Cityscapes In the dynamic realm
              of Architecture, where structures echo innovation and creativity,
              Alpine Architects stands as a pioneer in avant-garde design. Beyond
              bricks and mortar, it's a fusion of creativity, functionality, and
              forward-thinking. Central to Alpine Architects is a fundamental
              belief: Architecture is dynamic. As society advances, our
              buildings must evolve. The firm prioritizes constant refinement of
              its design ethos, aligning with evolving societal needs,
              technological progress, and aesthetic trends. Welcome to a
              visionary world, where each project embodies Architectural
              excellence.{" "}
            </p>
          </div>
          <div className="flex  flex-wrap-reverse mt-24">
            <div className=" md:pr-5 md:w-[65%]" data-aos="fade-left">
              <h1 className="font-audiowide text-3xl pb-4 uppercase">
                Our Story
              </h1>
              <p className="font-light  tracking-wider">
                Alpine's experience spans over 14 Years of Architectural
                Artistry, crafting spaces that harmonize aesthetics and
                functionality. From residential masterpieces to pioneering
                commercial designs, our journey reflects growth, evolution, and
                an unwavering commitment to excellence.
              </p><br />
              <p className="font-light  tracking-wider">
                {" "}
                Alpine Architects isn't just a design firm; it's a catalyst for
                change. Crafting buildings ahead of their time, we contribute to
                cityscapes, community engagement, and economic growth. Our
                designs thrive, adding value and enriching lives. With technical
                prowess, creative genius, and a commitment to pushing
                boundaries, we create harmonious Architectural marvels. Ruby's
                detail-oriented innovation and Nitesh's artistic vision form a
                dynamic duo, leading a team of committed professionals.
              </p><br />
              <p className="font-light  tracking-wider">
                Together, we push boundaries, creating Architectural excellence.
                As we forge ahead, one thing is clear: the best is yet to come
                from Alpine Architects.
              </p>
            </div>
            <div data-aos="fade-right" className="md:w-[35%] ">
              <img src={aboutUs_hero} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="pl-4 border-l-2 mb-16 mt-8" data-aos="fade-right">
            <h1 className="font-audiowide text-3xl pb-4 uppercase">Vision</h1>
            <p className="font-light leading-loose tracking-wider">
              Our vision is to be a transformative force in the Architectural
              landscape, crafting buildings that enrich urban life and stand as
              symbols of progress. Alpine Architects envisions a future where it
              remains at the forefront of Architectural innovation.
            </p>
          </div>
          <div className="pl-4 border-l-2 mb-10" data-aos="fade-left">
            <h1 className="font-audiowide text-3xl pb-4 uppercase">
              DESIGN PROCESS
            </h1>
            <p className="font-light leading-loose tracking-wider">
              The Architectural design process is a multifaceted journey that
              involves a series of steps, considerations, and iterations to
              transform a concept into a tangible structure.{" "}
            </p>
          </div>
          <div data-aos="fade-down" className="px-1 md:px-0">
            <div className="flex relative border-style left-bottom md:px-10 px-5 mt-20">
              <h3
                className=" absolute -left-6 p-1 text-9xl opacity-75 "
                style={{ textShadow: "-6px 5px 6px gray" }}
              >
                1
              </h3>
              <div className="w-full lg:w-3/4 lg:pr-16">
                <h1 className="font-audiowide text-2xl pb-3 uppercase">
                  Project Brief & Initial Consultation
                </h1>
                <p className="font-light leading-loose tracking-wider block pb-[30px] ">
                  {" "}
                  <span className="font-bold">
                    {" "}
                    Understanding Client Needs:
                  </span>{" "}
                  meeting with the client to understand their requirements,
                  aspirations, budget constraints, and timeline.
                  <span className="font-bold">
                    {" "}
                    <br /> Site Analysis:
                  </span>{" "}
                  Conducting a thorough analysis of the site, considering
                  factors such as topography, climate, context, and regulatory
                  requirements.
                  <span className="font-bold">
                    {" "}
                    <br /> Code Research:
                  </span>{" "}
                  Review local zoning laws, building codes, and regulations to
                  ensure compliance.
                </p>
              </div>
              <div className=" md:block opacity-50 absolute md:relative w-1/4 mt-4 left-20 md:left-0 ">
                <svg
                  className="m-auto"
                  width="168"
                  height="151"
                  viewBox="0 0 168 151"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  opacity={0.3}
                >
                  <path
                    d="M38.8371 0.666748C38.2478 22.4692 21.7487 38.9683 0.5354 38.9683V50.7535C29.409 51.3428 51.8007 28.951 50.6222 0.666748H38.8371ZM0.5354 14.2197V26.0047C15.2668 25.4155 25.8734 14.8089 25.8734 0.666748H14.0883C12.9098 7.73783 7.60648 13.0411 0.5354 14.2197ZM167.464 38.9683C146.252 38.9683 129.753 22.4692 129.162 0.666748H117.377C116.199 28.951 138.591 51.3428 167.464 50.7535V38.9683ZM167.464 26.0047V14.2197C160.393 13.0411 155.09 7.73783 153.912 0.666748H142.127C142.127 14.8089 152.733 25.4155 167.464 26.0047ZM142.333 150.667V84.0001H167.333L84 9.00008L0.666651 84.0001H25.6667V150.667H142.333ZM84 31.5001L125.667 69.0001V134H42.3333V69.0001L84 31.5001Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className="flex relative border-style right-bottom md:px-10 px-5  mt-10">
              <h3
                className=" absolute -right-7 -top-8 p-1 text-9xl opacity-75 "
                style={{ textShadow: "-6px 5px 6px gray" }}
              >
                2
              </h3>
              <div className="opacity-50 md:block absolute md:relative w-1/4 left-20 mt-4 md:left-0 ">
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  opacity={0.3}
                >
                  <path
                    d="M0 16.6667V150H50V137.5H33.3333V125H50V112.5H16.6667V100H50V87.5H33.3333V75H50V62.5H16.6667V50H50V16.6667H62.5V50H75V33.3333H87.5V50H100V16.6667H112.5V50H125V33.3333H137.5V50H150V0H16.6667C12.2464 0 8.00716 1.75595 4.88155 4.88155C1.75595 8.00716 0 12.2464 0 16.6667ZM25 33.3333C22.7899 33.3333 20.6702 32.4554 19.1074 30.8926C17.5446 29.3298 16.6667 27.2101 16.6667 25C16.6667 22.7899 17.5446 20.6702 19.1074 19.1074C20.6702 17.5446 22.7899 16.6667 25 16.6667C27.2101 16.6667 29.3298 17.5446 30.8926 19.1074C32.4554 20.6702 33.3333 22.7899 33.3333 25C33.3333 27.2101 32.4554 29.3298 30.8926 30.8926C29.3298 32.4554 27.2101 33.3333 25 33.3333Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="w-full md:w-3/4 md:pr-16">
                <h1 className="font-audiowide text-2xl pb-3 uppercase">
                  Conceptual Design (Schematic Design)
                </h1>
                <p className="font-light leading-loose tracking-wider block pb-[30px]">
                  {" "}
                  <span className="font-bold">
                    {" "}
                    Ideation & Brainstorming:
                  </span>{" "}
                  Generating preliminary design concepts, sketches, and diagrams
                  that explore various spatial arrangements, forms, and
                  relationships.
                  <span className="font-bold">
                    {" "}
                    <br /> <br /> Preliminary Drawings:
                  </span>{" "}
                  Developing initial drawings, renderings, and 3D models to
                  visualize the concept and communicate ideas to the client.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-down"
              className="flex relative border-style left-bottom md:px-10 px-9  mt-10"
            >
              <h3
                className=" absolute -left-6 p-1 text-9xl opacity-75 "
                style={{ textShadow: "-6px 5px 6px gray" }}
              >
                3
              </h3>
              <div className="w-full md:w-3/4 md:pr-16">
                <h1 className="font-audiowide text-2xl pb-3 uppercase">
                  Design Development
                </h1>
                <p className="font-light pl-3 leading-loose tracking-wider block pb-[30px]">
                  {" "}
                  <span className="font-bold">
                    Refinement of Concepts:
                  </span>{" "}
                  Refining the selected design concept based on feedback from
                  the client, consultants
                  <span className="font-bold">
                    {" "}
                    <br /> Technical Considerations:
                  </span>
                  Incorporating structural, mechanical, electrical, and plumbing
                  (MEP) systems, sustainability strategies, and other technical
                  considerations into the design.
                </p>
              </div>
              <div className="opacity-50 md:block absolute md:relative w-1/4 mt-4 left-20 md:left-0 ">
                <svg
                  width="168"
                  height="150"
                  viewBox="0 0 168 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  opacity={0.3}
                >
                  <path
                    d="M134 100H117.333V116.667H134M134 66.6667H117.333V83.3333H134M150.667 133.333H84V116.667H100.667V100H84V83.3333H100.667V66.6667H84V50H150.667M67.3334 33.3333H50.6667V16.6667H67.3334M67.3334 66.6667H50.6667V50H67.3334M67.3334 100H50.6667V83.3333H67.3334M67.3334 133.333H50.6667V116.667H67.3334M34 33.3333H17.3334V16.6667H34M34 66.6667H17.3334V50H34M34 100H17.3334V83.3333H34M34 133.333H17.3334V116.667H34M84 33.3333V0H0.666687V150H167.333V33.3333H84Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div
              data-aos="fade-down"
              className="flex relative border-style-right md:px-10 px-5  mt-10"
            >
              <h3
                className=" absolute -right-7 top-18 p-1 text-9xl opacity-75 "
                style={{ textShadow: "-6px 5px 6px gray" }}
              >
                4
              </h3>
              <div className="opacity-50 md:block absolute md:relative w-1/4 mt-4 left-20 md:left-0 ">
                <svg
                  width="178"
                  height="178"
                  viewBox="0 0 178 178"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  opacity={0.3}
                >
                  <path
                    d="M177.417 142L142 177.417L98.6667 134.083L113.417 119.333L121.75 127.667L142.333 107L154.167 118.833L142 130.667L150.833 139L162.667 127.333L177.417 142ZM44.0834 79.25L0.583374 36L36 0.583374L50.6667 15.3334L30.0834 36L39 44.8334L59.5 24.1667L71.3334 36L59.5 47.75L67.8334 56.0834L44.0834 79.25ZM106.167 64L114 71.75L38.3334 147.333H30.6667V139.667L106.167 64ZM136.25 14C134.167 14 132 14.75 130.333 16.4167L115 31.6667L146.25 62.9167L161.583 47.3334C164.833 44.0834 164.833 39 161.583 35.5834L142.083 16.4167C140.5 14.8334 138.417 14 136.25 14ZM106.167 40.5L14 132.75V164H45.25L137.417 71.75L106.167 40.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="w-full md:w-3/4 md:pr-16">
                <h1 className="font-audiowide text-3xl pb-3 uppercase">
                  Construction Documentation
                </h1>
                <p className="font-light leading-loose tracking-wider block pb-[30px]">
                  {" "}
                  <span className="font-bold">
                    Detailed Drawings & Specifications:
                  </span>{" "}
                  Developing comprehensive construction documents, including
                  detailed drawings, specifications, and schedules.
                  <span className="font-bold">
                    {" "}
                    <br />
                    Permitting & Approvals:
                  </span>
                  Obtaining necessary permits and approvals from regulatory
                  authorities, ensuring compliance with building codes, zoning
                  regulations, and other legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-aos="fade-down"
        className="md:flex justify-center items-center w-full bg-cover bg-no-repeat py-3"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(13, 13, 13, 0.1)), url(${about_bg})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="md:w-3/4  w-full px-6 lg:px-0 ">
          <h1 className="font-audiowide text-2xl md:text-3xl pb-6 uppercase">
            Meet the Team behind the Innovation!
          </h1>
          <br />
          <div className="flex flex-col md:flex-row mb-16">
            <div className="w-full md:w-[45%] bg-[#242424]">
              <img
                src={male_owner}
                alt="Owner Image"
                className="w-[100%] m-auto   object-cover h-[400px] lg:h-auto"
              />
              <div className="p-4 ">
                <h3 className="font-audiowide text-2xl  uppercase ">
                  Nitesh Kedare
                </h3>
                <p className="font-light leading-loose tracking-wider">
                  Principal Architect
                </p>
              </div>
            </div>
            <div className="w-full md:w[55%] md:pl-8">
              <p className="font-light leading-loose tracking-wider">
                Nitesh Kedare began his Architectural journey in Mumbai at The
                Academy of Architecture in 2011, honing his skills and
                establishing the foundation for a remarkable career. His
                commitment to excellence is evident in thoughtfully curated
                designs that seamlessly fulfill client aspirations.
                <br /><br />

                Nitesh Kedare's unique approach, marked by a deep aesthetic
                appreciation, transformative capabilities, and unwavering
                dedication, sets him apart in Architecture. Each project he
                guides showcases innovation and impactful outcomes. Early
                collaborations with Architects Hafeez Contractor enriched his
                expertise, contributing significantly to various Architectural
                endeavors.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="flex flex-col-reverse   md:flex-row"
          >
            <div className="w-full md:w[55%] md:pr-8">
              <p className="font-light leading-loose tracking-wider">
                Ruby Kedare's Architectural journey began at The Academy of
                Architecture, Mumbai, in 2011. Honing foundational skills and
                cultivating an acute eye for detail, she laid the groundwork for
                a distinguished career. Ruby's innovative designs balance
                sensibility and functionality, creating visually captivating and
                practically functional spaces.
                <br /><br />

                Her problem-solving skills in Architectural design provide
                innovative solutions, enhancing project feasibility. Enriching
                experiences at Khareghat and Associates, alongside industry
                veterans, have shaped her unique Architectural style influenced
                by practical knowledge and insights from diverse projects.
              </p>{" "}
            </div>
            <div className="w-full md:w-[45%] bg-[#242424]">
              <img
                src={female_owner}
                alt="Owner Image"
                className="w-[100%] m-auto  object-cover h-[400px] lg:h-auto"
              />
              <div className="p-4">
                <h3 className="font-audiowide text-2xl uppercase  ">
                  Ruby Kedare
                </h3>
                <p className="font-light leading-loose tracking-wider">
                  Principal Architect
                </p>
              </div>
            </div>
          </div>

          <h1 className="font-audiowide text-2xl mt-16 md:text-3xl mb-3 uppercase">
            Key team members
          </h1>
          <div
            data-aos="fade-down"
            className="flex flex-col gap-y-4 md:flex-row"
          >
            <div className="p-4 basis-1/2 bg-[#242424] md:mr-4">
              <h6 className="font-audiowide md:text-[21px] font-normal  text-[18px]">
                Ashish Patil
              </h6>
              <p className="font-light leading-loose tracking-wider">
                (Project Coordinator) His versatile skilled expertise is in
                making of working drawing and site supervision. He plays a
                crucial role in the seamless working under deadlines.
              </p>
            </div>
            <div className="p-4 basis-1/2 bg-[#242424]">
              <h6 className="font-audiowide font-normal md:text-[21px] text-[18px] ">
                Krunal Darji
              </h6>
              <p className="font-light leading-loose tracking-wider">
                (Architectural Assistant) Proficient in Presentation drawing
                and 3d Visualizing tools. His role combines as one who delivers
                technical drawing with modern technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="md:flex justify-center items-center w-full bg-cover bg-secondary  py-3"
      >
        <div className="lg:w-3/4 md:w-full w-full px-6 lg:px-0 ">
          <div className="pl-4 border-l-2 mb-16 mt-16">
            <h1 className="font-audiowide text-3xl pb-4 uppercase">STUDIO</h1>
            <p className="font-light leading-loose tracking-wider">
              A Collaborative Haven of Creativity & Comfort{" "}
            </p>
          </div>
          {studioImages ? (
            <AutoplaySlider
              className="my-slider w-full lg:h-[490px] md:h-[589px] h-[180px] object-fill mt-3 lg:mt-0 mb-5"
              bullets={false}
              buttons={false}
              play={true}
              interval={2000}
            >
              {
                studioImages?.studio_images.map((image,index) => (

                  <div data-src={image.url} key={index} className="w-full h-full my-6 object-fill " loading="lazy" />

                )

                )
              }



            </AutoplaySlider>) : "Loading"
          }

         
          <p className="font-light leading-loose tracking-wider">
            A Nexus of Innovation and Comfort At the core of Alpine Architects is
            its cutting-edge studio, not merely a workplace but a haven for
            creativity, collaboration, and camaraderie. Conceived to transcend
            the conventional office setting, the studio embodies a second home,
            meticulously designed to inspire and nurture.
            <br />
            The studio pulsates with an energetic and evocative ambiance,
            fostering creativity and vibrancy. Going beyond aesthetics, the
            partners prioritize comfort and well-being. Ergonomic furniture,
            abundant natural light, indoor greenery, and designated spaces for
            relaxation ensure a holistic environment. With this approach, the
            studio becomes a space where team members are not just productive
            but also feel valued, supported, and motivated to deliver their
            best.
          </p>

          <h1 className="font-audiowide text-3xl py-4 uppercase mt-16">featured</h1>

          <Carousel
            autoPlay={false}
            // autoPlaySpeed={6000}
            infinite={false}
            swipeable={true}
            draggable={true}
            showDots={false}
            keyBoardControl={true}
            arrows={false}
            transitionDuration={500}
            containerClass=""
            responsive={responsive}
          >
            {featured.length > 0 ? (
              featured.map((data, index) => (
                <div
                  className=" w-[255px]  h-[360px] relative group"
                  key={index}
                  onClick={() => openModal(index)}
                >

                  <img
                    src={data.featured_imaged}
                    alt="Featured"
                    className="w-full object-fill h-full pr-2 md:pr-0  opacity-100 transition duration-300 ease-in-out group-hover:opacity-30"
                  />
                  <div className='absolute bottom-[0px] md:bottom-[0px] text-white flex justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                    <h3 className='font-light ml-2 bottom-2'>{data.thumbnail_description}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div>"Loading Data"</div>
            )}
          </Carousel>

          <Modal {...handlers}
            show={isModalOpen}
            onClose={closeModal}
            size="4xl"
            className="backdrop-blur-lg min-h-[100vh] w-full z-50 padding-0 "
          >
            {/* <Modal.Body>
              <div className="relative padding-0 w-full">
                <span className='absolute top-0 right-0 z-50 p-2  '>
                  <Button text={"✕"} onClick={closeModal} />
                </span>
                <div className="lg:pt-0 pt-20 flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center  w-full md:mt-8 top-22">
                    <span className='absolute left-3 md:left-6 z-40 hidden lg:block '>
                      <Button text={"←"} onClick={prevPhoto} />
                    </span>
                    <img
                      src={featured.length > 0 ? featured[currentPhotoIndex]?.featured_imaged || "" : ""}
                      alt="Modal"
                      className="max-w-full w-[68%] lg:w-[30%]  md:h-[600px] h-[450px]  object-fill"
                      // className="max-w-full w-[95%] lg:w-[30%]  md:h-[600px] h-[450px]  object-fill"
                    />
                    <span className='absolute right-3 md:right-[13px] z-40 hidden lg:block'>
                      <Button text={"→"} onClick={nextPhoto} />
                    </span>
                  </div>
                  <div className="text-center">
                     {currentPhotoIndex + 1} of {featured.length}
                  </div>
                </div>
              </div>
            </Modal.Body> */}
            <Modal.Body className="m-0">
              <div className="relative padding-0">
                <span className='absolute top-0 right-0 z-50 p-2 '><Button text={"&times;"} onClick={closeModal} /></span>
                <div className="lg:pt-0 pt-20 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center justify-center  w-full md:mt-8 top-22">
                  <span className='absolute left-3 md:left-6 z-40 hidden lg:block '>
                      <Button text={"←"} onClick={prevPhoto} />
                    </span>                    <img
                      src={featured.length > 0 ? featured[currentPhotoIndex]?.featured_imaged || "" : ""}
                      alt="Modal"
                      className="max-w-full w-[68%] lg:w-[30%]  md:h-[600px] h-[450px]  object-fill"

                    />
                    <span className='absolute right-3 md:right-[13px] z-40 hidden lg:block'>
                      <Button text={"→"} onClick={nextPhoto} />
                    </span>                  </div>
                  <div className="text-center">
                    {currentPhotoIndex + 1} of {featured.length}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>





        </div>
      </div>



      <OnGoingProjects />
    </>
  );
}
