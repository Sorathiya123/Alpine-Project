import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import contact_bg from "../assets/images/contact-bg.png";
import API_Call from "../Components/API_Call";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
  const { fetchData } = API_Call();
  let imagesArray = [];

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData("banner?page=contact");
        data.forEach(element => {
          element.images.forEach(image => {
            imagesArray.push(image.url);
          });
        });
        setHeroImages(imagesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert("The form has been submitted successfully");
          navigate('/');
        }
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
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

  const photos = [
    { src: "https://source.unsplash.com/800x768/?home" },
    { src: "https://source.unsplash.com/800x508/?wall" },
    { src: "https://source.unsplash.com/800x768/?Building" },
    { src: "https://source.unsplash.com/800x508/?mall" },
    { src: "https://source.unsplash.com/800x768/?hall" },
    { src: "https://source.unsplash.com/800x508/?Buildings" },
    { src: "https://source.unsplash.com/800x768/?mall" },
    { src: "https://source.unsplash.com/800x508/?home" },
  ];

  return (
    <>
      <style>
        {`
          @keyframes scroll-horizontal {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-80%);
            }
          }
          .scrolling-images-horizontal {
            animation: scroll-horizontal 30s linear infinite;
          }
          @keyframes scroll-opposite-horizontal {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(80%);
            }
          }
          .scrolling-images-opposite-horizontal {
            animation: scroll-opposite-horizontal 30s linear infinite;
          }
        `}
      </style>

      <div className="w-full lg:hidden">
        <div className="flex flex-col h-[300px] relative overflow-x-auto no-scrollbar">
          <div className="flex gap-3 mb-2 scrolling-images-opposite-horizontal">
            {heroImages.length > 0 ? (
              heroImages.map((image, index) => (
                <React.Fragment key={index}>
                  <img
                    src={image}
                    alt=""
                    className="h-[130px] w-[90px] mb-5"
                  />
                </React.Fragment>
              ))
            ) : (
              "Loading"
            )}
          </div>
          <div className="flex flex-row gap-3 mb-2 scrolling-images-horizontal">
            {heroImages.length > 0 ? (
              heroImages.slice().reverse().map((image, index) => (
                <React.Fragment key={index}>
                  <img
                    src={image}
                    alt=""
                    className="h-[130px] w-[90px] mb-5"
                  />
                </React.Fragment>
              ))
            ) : (
              "Loading"
            )}
          </div>
        </div>
      </div>

      <div
        className="md:flex justify-center items-center w-full relative lg:bottom-28 md:bottom-1 bottom-0 sm:bottom-5 mb-2 md:mb-0"
        style={{
          backgroundImage: `url(${contact_bg})`,
          backgroundPosition: "left",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <style>
          {`
            @keyframes scroll {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-100%);
              }
            }
            .scrolling-images {
              animation: scroll 50s linear infinite;
            }
            .scrolling-images-opposite {
              animation: scroll-opposite 50s linear infinite;
            }
            @keyframes scroll-opposite {
              from {
                transform: translateY(-100%);
              }
              to {
                transform: translateY(0%);
              }
            }
          `}
        </style>
        <div className="md:w-[80%] sm:w-full px-6 md:px-0 flex flex-col-reverse md:flex-row">
          <div className="min-h-[90vh] md:w-[56%] w-full lg:p-5">
            <h1 className="font-audiowide text-3xl pb-6">Contact Us</h1>
            <p className="font-light leading-loose tracking-wider">
              Got a project on your mind?
              <br />
              or
              <br />
              Looking for the opportunity to work at Alpine Architects?
              <br />
              Let’s discuss in detail.
            </p>
            <form className="contact-form mt-4">
              <div className="form-group mb-7 xl:mx-0">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-7 xl:mx-0">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-7 xl:mx-0">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-7 xl:mx-0">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mt-5 m-auto lg:m-0 xl:mx-0">
                <Button text={"Submit"} onClick={handleSubmit} />
              </div>
            </form>
          </div>

          {/* Large screen Sliders */}
          <div className="md:w-[41%] hidden lg:flex relative justify-evenly h-[700px] top-[-40px] overflow-y-auto overflow-x-visible no-scrollbar">
            <div className="flex flex-col gap-y-1 mb-2 md:mb-5 scrolling-images w-[45%]">
              {heroImages.length > 0 ? (
                heroImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt=""
                      className="md:h-[300px] object-cover md:w-full mb-5"
                    />
                  </div>
                ))
              ) : (
                "Loading"
              )}
            </div>
            <div className="flex flex-col gap-y-1 mb-2 md:mb-5 relative -top-16 scrolling-images-opposite w-[45%]">
              {heroImages.length > 0 ? (
                heroImages.slice().reverse().map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt=""
                      className="md:h-[300px] object-cover md:w-full mb-5"
                    />
                  </div>
                ))
              ) : (
                "Loading"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
