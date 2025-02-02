import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { AnimalStatus, IAnimalData } from "../../interfaces/Animal";
import { AnimalValidator } from "../../Validators/Animal";
import { paramToTitleCase } from "../../helpers/ConvertCases";
import { ZodError } from "zod";

const AnimalCard: React.FC<{ animal: IAnimalData }> = ({
  animal: initialAnimal,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [animal, setAnimal] = useState<IAnimalData>(initialAnimal);
  const [editedAnimal, setEditedAnimal] = useState<IAnimalData>(initialAnimal);
  const [saveMessageVisible, setSaveMessageVisible] = useState(false);

  // Function to get status color
  const getStatusColor = (status: AnimalStatus): string => {
    switch (status) {
      case AnimalStatus.ADOPTED:
        return "bg-green-500";
      case AnimalStatus.IN_REHABILITATION:
        return "bg-yellow-500";
      case AnimalStatus.REHABILITATED:
        return "bg-blue-500";
      case AnimalStatus.RELEASED:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      // Validate the animal data only when saving
      const validatedAnimal =
        AnimalValidator.UpdateableAnimalKeys.parse(editedAnimal);

      // Log the validatedAnimal to check its content
      console.log("Validated Animal Data:", validatedAnimal);

      const response = await axios.put<IAnimalData>(
        `${import.meta.env.VITE_G_API_URL}/put/animal`,
        validatedAnimal,
        {
          headers: {
            id: editedAnimal._id,
          },
          withCredentials: true,
        }
      );
      // Update both the local state and the edited state with the updated animal
      setAnimal(response.data);
      setEditedAnimal(response.data);
      setEditing(false);

      // Show the "Saved!" message
      setSaveMessageVisible(true);
      setTimeout(() => setSaveMessageVisible(false), 3000);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error saving animal data:", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEditedAnimal((prev) => ({
      ...prev,
      status: value as AnimalStatus,
    }));
  };

  const renderDetail = (label: string, value: string | number | undefined) => {
    if (value === undefined || value === "") return null;
    return (
      <p className="text-sm">
        <span className="font-semibold">{label}:</span> {value}
      </p>
    );
  };

  return (
    <div
      className={`bg-gray-100 rounded-lg shadow-md p-4 mb-4 relative transition-all duration-300 ${
        expanded ? "h-auto" : "h-20"
      }`}
    >
      <div
        className={`flex justify-between items-center ${
          expanded ? "mb-4" : ""
        }`}
      >
        <div className="flex items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="mr-2"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <div>
            <h3 className="font-semibold">{animal.name}</h3>
            <p className="text-sm">
              {animal.species} ({animal.sex})
            </p>
          </div>
        </div>
        {editing ? (
          <select
            name="status"
            value={editedAnimal.status}
            onChange={handleStatusChange}
            className={`flex justify-center px-2 py-2 rounded-lg text-white text-md font-['outfit'] ${getStatusColor(
              editedAnimal.status
            )}`}
          >
            {Object.values(AnimalStatus).map((status) => (
              <option
                key={status}
                value={status}
                className={getStatusColor(status)}
              >
                {paramToTitleCase(status)}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`flex justify-center px-2 py-2 rounded-lg text-white text-md font-['outfit'] ${getStatusColor(
              animal.status
            )}`}
          >
            {paramToTitleCase(animal.status)}
          </span>
        )}
      </div>
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {editing ? (
              <>
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    name="name"
                    value={editedAnimal.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Species</span>
                  <input
                    name="species"
                    value={editedAnimal.species}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">Age</span>
                  <input
                    name="age"
                    type="number"
                    value={editedAnimal.age || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">Breed</span>
                  <input
                    name="breed"
                    value={editedAnimal.breed || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">
                    Weight (kg)
                  </span>
                  <input
                    name="weight"
                    type="number"
                    value={editedAnimal.weight || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">
                    Location
                  </span>
                  <input
                    name="location"
                    value={editedAnimal.location || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">
                    Medical Info
                  </span>
                  <textarea
                    name="medicalInfo"
                    value={editedAnimal.medicalInfo || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-['outfit']">Notes</span>
                  <textarea
                    name="notes"
                    value={editedAnimal.notes || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1 font-['outfit']"
                  />
                </label>
              </>
            ) : (
              <>
                {renderDetail("Age", animal.age)}
                {renderDetail("Breed", animal.breed)}
                {renderDetail(
                  "Weight",
                  animal.weight ? `${animal.weight} kg` : undefined
                )}
                {renderDetail("Location", animal.location)}
                {renderDetail("Medical Info", animal.medicalInfo)}
                {renderDetail("Notes", animal.notes)}
                {renderDetail(
                  "Intake Date",
                  animal.intakeDate
                    ? new Date(animal.intakeDate).toLocaleDateString()
                    : undefined
                )}
                {animal.behaviors.length > 0 && (
                  <p className="text-sm">
                    <span className="font-semibold">Behaviors:</span>{" "}
                    {animal.behaviors
                      .map((behavior) => behavior.name)
                      .join(", ")}
                  </p>
                )}
              </>
            )}
            {/* Display the ID when expanded */}
            <p className="text-xs text-gray-500">ID: {animal._id}</p>
          </div>
          <div className="relative lg:h-64">
            {animal.images.length > 0 && (
              <img
                src={animal.images[0]}
                alt={animal.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          {expanded &&
            (editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded font-['outfit']"
                >
                  Save
                </button>
                <button
                  onClick={() => setExpanded(false)}
                  className="bg-red-500 text-white px-3 py-1 rounded font-['outfit']"
                >
                  Close
                </button>
              </>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded font-['outfit']"
                >
                  Edit
                </button>
                <span
                  className={`ml-2 text-green-500 transition-opacity duration-500 font-['outfit'] ${
                    saveMessageVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Saved!
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
