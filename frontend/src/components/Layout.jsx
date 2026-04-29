import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import LoadingScreen from "./LoadingScreen";

export default function Layout() {
  return (
    <SmoothScroll>
      <div className="grain min-h-screen bg-ink text-cream">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
