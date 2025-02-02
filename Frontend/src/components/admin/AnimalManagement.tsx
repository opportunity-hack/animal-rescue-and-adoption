import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import SearchBar from "./SearchBar";
import { FilterOptions } from "./SearchBar";
import { IAnimalData } from "../../interfaces/Animal";
import axios from "axios";
// Ensure this matches the FilterOptions type in SearchBar.tsx

interface ExtendedAnimalData extends IAnimalData {
  _id: string;
}

const AnimalManagement: React.FC = () => {
  const [animals, setAnimals] = useState<ExtendedAnimalData[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<ExtendedAnimalData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const animalsPerPage = 9;

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get<IAnimalData[]>(
          `${import.meta.env.VITE_G_API_URL}/get/animals`
        );
        const animals = response.data;
        setAnimals(animals);
        setFilteredAnimals(animals);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []); // Empty dependency array to fetch data once on component mount

  const handleSearch = (query: string, filters: FilterOptions) => {
    const results = animals.filter((animal) => {
      const matchesQuery =
        animal.name.toLowerCase().includes(query.toLowerCase()) ||
        animal.species.toLowerCase().includes(query.toLowerCase()) ||
        animal._id.includes(query);

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip empty filters
        const animalValue = animal[key as keyof ExtendedAnimalData];
        return (
          typeof animalValue === "string" &&
          animalValue.toLowerCase().includes(value.toLowerCase())
        );
      });

      return matchesQuery && matchesFilters;
    });

    setFilteredAnimals(results);
    setCurrentPage(1);
  };

  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = filteredAnimals.slice(
    indexOfFirstAnimal,
    indexOfLastAnimal
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col w-full bg-wolfwhite px-4 md:px-6 lg:px-8 pt-20 pb-20 font-['Montserrat']">
      <h1 className="text-3xl font-bold pb-4">Animal Management</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {currentAnimals.map((animal) => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </div>
      <div className="mt-8 mb-8 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredAnimals.length / animalsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-darkergreen text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AnimalManagement;
