import { useNavigate } from "react-router-dom";

// Hero section of the website (the first thing you see)
const Hero: React.FC = () => {
  // useNavigate hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();

  return (
    <main className="sm:pt-20 flex items-center bg-[#FFFFFF] justify-center min-h-[calc(100vh)] sm:min-h-[calc(100vh)] pt-24 pb-16 lg:pt-0 lg:pb-0 px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content section */}
          <div className="md:w-full mb-8 md:mb-0">
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#101010] leading-tight">
              Rescuing, Rehabilitating, and Rehoming Wildlife and Reptiles.
            </h2>
            <p className="font-['Outfit'] font-regular text-base md:text-lg mt-6 mb-6 font-outfit font-normal">
              Nature's Edge Wildlife and Reptile Rescue, is a non-profit
              dedicated to rehabilitating injured wildlife and providing a safe
              haven for unwanted exotic reptiles. Our mission is to restore
              native species to health, educate the community, and help every
              animal find its place in nature or a loving home.
            </p>
            {/* Buttons for navigation */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-darkestgreen hover:bg-darkergreen text-white px-6 py-2 rounded font-outfit font-medium whitespace-nowrap"
                onClick={() => navigate("/#found")} // Navigate to the "Found an Animal?" section
              >
                Found an Animal?
              </button>
              <button
                className="bg-white text-darkestgreen border border-darkestgreen hover:border-darkergreen hover:text-darkergreen px-6 py-2 rounded font-outfit font-medium whitespace-nowrap"
                onClick={() => navigate("/#donate")} // Navigate to the "Donate" section
              >
                Donate
              </button>
            </div>
          </div>
          {/* Image section */}
          <div className="md:w-full mt-8 md:mt-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1511144241814-c7d501e5239c?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Chameleon"
              className="rounded-lg shadow-lg shadow-[#2020209d] w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
