import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { IAnimalData } from "../interfaces/Animal";

// Define the props for the ResponsiveAnimalCarousel component
interface ResponsiveAnimalCarouselProps {
  animals: IAnimalData[]; // Array of animal objects
}

export default function ResponsiveAnimalCarousel({
  animals,
}: ResponsiveAnimalCarouselProps) {
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const numVisible =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      setCurrentIndices(
        Array.from(
          { length: Math.min(numVisible, animals.length) },
          (_, i) => i
        )
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animals.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndices((prev) => prev.map((i) => (i + 1) % animals.length));
    setExpandedIndex(null);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndices((prev) =>
      prev.map((i) => (i - 1 + animals.length) % animals.length)
    );
    setExpandedIndex(null);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  //console.log(animals);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-8 px-8 sm:py-12 sm:px-10 lg:py-16 lg:px-12">
      <div className="flex items-center justify-center gap-4">
        {currentIndices.map((animalIndex, index) => (
          <motion.div
            key={animalIndex}
            className="w-full sm:w-1/2 lg:w-1/3"
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative">
                <motion.div transition={{ type: "spring", stiffness: 300 }}>
                  <img
                    // src={animals[animalIndex].images[0]} // Use the first image from the images array
                    src={
                      "https://pbs.twimg.com/media/F2GWbheXYAAV2_a.jpg:large"
                    }
                    alt={animals[animalIndex].name}
                    className={`w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover ${
                      expandedIndex === index ? "blur-sm" : ""
                    }`}
                  />
                </motion.div>
                <AnimatePresence>
                  {expandedIndex !== index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
                    >
                      <div className="bg-black bg-opacity-50 text-wolfwhite px-3 py-1 rounded-lg">
                        <p className="text-md font-semibold">
                          {animals[animalIndex].name}
                        </p>
                        <p className="text-xs pb-1">
                          {animals[animalIndex].species}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => toggleExpand(index)}
                        className="bg-wolfwhite text-gray-800 rounded-full p-2 shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        aria-label="Show more information"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col p-4 sm:p-6 bg-black bg-opacity-70 text-wolfwhite"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {animals[animalIndex].name}
                          </h3>
                          <p className="text-sm">
                            {animals[animalIndex].species}
                          </p>
                        </div>
                        <div className="text-sm text-right">
                          <p>
                            {animals[animalIndex].age || "Unknown"} years old
                          </p>
                          <p>{animals[animalIndex].breed || "Unknown breed"}</p>
                        </div>
                      </div>
                      <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
                        <p className="text-sm mt-2">
                          Medical Info:{" "}
                          {animals[animalIndex].medicalInfo || "None"}
                        </p>
                        <p className="text-sm mt-2">
                          Location: {animals[animalIndex].location || "Unknown"}
                        </p>
                        <p className="text-sm mt-2">
                          Notes: {animals[animalIndex].notes || "None"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <button className="bg-[#3A4D42] text-wolfwhite px-4 py-2 rounded-md font-outfit font-medium">
                          <a
                            href="https://form.jotform.com/242855970936168"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Adoption Form
                          </a>
                        </button>
                        <motion.button
                          onClick={() => toggleExpand(index)}
                          className="bg-wolfwhite text-gray-800 rounded-full p-2 shadow-md"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          aria-label="Hide information"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {animals.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-wolfwhite text-gray-800 rounded-full p-2 shadow-md -translate-x-1/2"
            aria-label="Previous animal"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-wolfwhite text-gray-800 rounded-full p-2 shadow-md translate-x-1/2"
            aria-label="Next animal"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}
