import Image from "next/image";
import OurServices from "./components/OurServices";
import WhyChoose from "./components/WhyChoose";
import ContactForm from "./components/ContactForm";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
   <div>
    <LandingPage/>
    <OurServices/>
    <WhyChoose/>
    <ContactForm/>
    

   </div>
  );
}
