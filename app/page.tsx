import Image from "next/image";
import OurServices from "./components/OurServices";
import WhyChoose from "./components/WhyChoose";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
   <div>
    <OurServices/>
    <WhyChoose/>
    <ContactForm/>

   </div>
  );
}
