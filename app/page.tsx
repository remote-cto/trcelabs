import Image from "next/image";
import OurServices from "./components/OurServices";
import WhyChoose from "./components/WhyChoose";
import ContactForm from "./components/ContactForm";
import LandingPage from "./components/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import LoadingAnimation from "./components/LoadingAnimation";

export default function Home() {
  return (
    <main>
      {/* Main content with relative positioning to appear above the canvas */}
      <div className="relative z-10">
        <LoadingAnimation />
        <LandingPage />
        <OurServices />
        <WhyChoose />
        <ContactForm />
        <ScrollToTop />
      </div>
    </main>
  );
}
