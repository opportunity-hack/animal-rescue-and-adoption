import EnhancedAnimalCarousel from "./EnhancedAnimalCarousel";
import { useState, useEffect } from "react";
import Spinner from "./spinner";
import axios from "axios";
import { IAnimalData } from "../interfaces/Animal";

// AdoptAnimalSection component definition
const AdoptAnimalSection: React.FC = () => {
  // State to store the list of animals available for adoption
  const [results, setResults] = useState<IAnimalData[]>([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);

  // Effect to fetch animal data from the API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get<IAnimalData[]>(`${import.meta.env.VITE_G_API_URL}/get/animals`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchAnimals();
  }, []); // Empty dependency array to fetch data once on component mount

  return (
    <section
      className="bg-[#3A4D42] flex items-center justify-center min-h-[calc(100vh)] py-16 lg:py-16 px-16"
      id="adopt" // Section ID for navigation
    >
      <div className="container mx-auto">
        <div className="text-center">
          <h3 className="font-['Montserrat'] font-bold text-4xl text-[#DAD7CE] mb-4">
            Want to Adopt an Animal?
          </h3>
          <p className="font-['Outfit'] text-lg text-[#DAD7CE]">
            If you are interested in adopting an animal, take a look at what we
            currently have, and get in contact with us!
          </p>
        </div>
        {loading ? (
          <Spinner /> // Show a spinner while loading
        ) : results.length > 3 ? (
          <div className="carousel flex justify-center items-center space-x-4">
            <EnhancedAnimalCarousel animals={results} />
          </div>
        ) : (
          <div className="text-center font-bold text-lg text-[#DAD7CE] p-8">
            No animals available for adoption at the moment. Please check back
            later.
          </div>
        )}
      </div>
    </section>
  );
};

export default AdoptAnimalSection;
