import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/AboutSection";
import FoundAnimalSection from "../components/FoundAnimalSection";
import AdoptAnimalSection from "../components/AdoptAnimalSection";
import DonateSection from "../components/DonateSection";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const homepageLinks = [
    { name: "Found an Animal?", href: "#found" },
    { name: "Adopt an Animal", href: "#adopt" },
    { name: "Donate", href: "#donate" },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        links={homepageLinks}
        title={"Nature's Edge Wildlife and Reptile Rescue"}
      />
      <Hero />
      <About />
      <section id="found">
        <FoundAnimalSection />
      </section>
      <section id="adopt">
        <AdoptAnimalSection />
      </section>
      <section id="donate">
        <DonateSection />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
