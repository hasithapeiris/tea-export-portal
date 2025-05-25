import React from "react";
import {
  About,
  CallToAction,
  ContactUs,
  Footer,
  MainCarousel,
  Navbar,
} from "../components";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainCarousel />
      <About />
      <CallToAction />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
