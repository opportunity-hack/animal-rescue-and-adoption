import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handlePrev = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col mx-8 lg:flex-row justify-center items-center gap-4 lg:w-1/2">
      <div className="flex flex-row lg:flex-col lg:items-end justify-center gap-2 lg:gap-2 lg:w-1/6 order-2 lg:order-1 overflow-x-auto lg:overflow-y-auto flex-wrap"></div>
      <img
        src={images[imageIndex]}
        alt="Active Product"
        className="w-full h-full object-cover rounded-xl"
        loading="lazy"
      />
      <button
        className="absolute top-1/2 left-0 ml-1 transform -translate-y-1/2 bg-primarycolor text-secondarycolor p-2 rounded-full hover:bg-secondaryaccent"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-0 transform mr-1 -translate-y-1/2 bg-primarycolor text-secondarycolor p-2 rounded-full hover:bg-secondaryaccent"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
export default ImageSlider;
