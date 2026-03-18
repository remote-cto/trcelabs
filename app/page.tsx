// import Image from "next/image";
// import OurServices from "./components/OurServices";
// import WhyChoose from "./components/WhyChoose";
// import ContactForm from "./components/ContactForm";
// import LandingPage from "./components/LandingPage";
// import ScrollToTop from "./components/ScrollToTop";
// import LoadingAnimation from "./components/LoadingAnimation";
// import Navbar from "./components/Navbar";

export default function Home() {
  return (
    // <main>
    //   {/* Main content with relative positioning to appear above the canvas */}
    //   <div className="relative z-10">
    //     <Navbar/>
    //     <LoadingAnimation />
    //     <LandingPage />
    //     <OurServices />
    //     <WhyChoose />
    //     <ContactForm />
    //     <ScrollToTop />
    //   </div>
    // </main>
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/mainPage.html"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="TRACELABS"
      />
    </div>
  );
}
