import Image from "next/image";
import OurServices from "./components/OurServices";
import WhyChoose from "./components/WhyChoose";
import ContactForm from "./components/ContactForm";
import LandingPage from "./components/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import LoadingAnimation from "./components/LoadingAnimation";

export default function Home() {
  return (
    <div>
      <LoadingAnimation />

      <LandingPage />
      <OurServices />
      <WhyChoose />
      <ContactForm />
      <ScrollToTop />
    </div>
  );
}
