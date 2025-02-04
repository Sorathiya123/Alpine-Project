import './App.css';
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import Gallery from './Pages/Gallery';
import ErrorPage from './Pages/ErrorPage';
import ContactUs from './Pages/ContactUs';
import Blog from './Pages/Blog';
import Portfolio from './Pages/Portfolio';
import OnGoingProjectList from './Pages/OnGoingProjectList';
import AboutUs from './Pages/AboutUs';
import BlogDetailPage from './Pages/BlogDetailPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import Services from './Pages/Services';

import AOS from 'aos';
import 'aos/dist/aos.css';
import OngoingProjectListDetail from './Pages/OngoingProjectListDetail';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true
      },
      {
        path: "/gallery",
        element: <Gallery />,

      },
      {
        path: "/contact",
        element: <ContactUs />,

      },
      {
        path: "/blogs",
        element: <Blog />,

      },
      {
        path: "/portfolio",
        element: <Portfolio />,

      },

      {
        path: "/on-going-project-list",
        element: <OnGoingProjectList />,

      },
      {
        path: "/aboutus",
        element: <AboutUs />,

      }, {
        path: "/blog/:id",
        element: <BlogDetailPage />,

      },
      {
        path: "/project/:id",
        element: <ProjectDetailPage />,

      },
      {
        path: "/services",
        element: <Services />,

      },
      {
        path: "/ongoing-project/:id",
        element: <OngoingProjectListDetail />,

      },
    ],
  },
]);

export default function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100
    });
  }, [])
  return (
    <RouterProvider router={router} />
  )
}