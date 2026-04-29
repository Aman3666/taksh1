import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Menu from "@/pages/Menu";
import Experience from "@/pages/Experience";
import Gallery from "@/pages/Gallery";
import Reservations from "@/pages/Reservations";
import Events from "@/pages/Events";
import Testimonials from "@/pages/Testimonials";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="experience" element={<Experience />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="events" element={<Events />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function Shell() {
  return (
    <SmoothScroll>
      <div className="grain min-h-screen bg-ink text-cream">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <ScrollToTop />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
