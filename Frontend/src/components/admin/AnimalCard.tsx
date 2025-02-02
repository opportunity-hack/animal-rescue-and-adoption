import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { AnimalStatus, IAnimalData } from "../../interfaces/Animal";
import { AnimalValidator } from "../../Validators/Animal";

const AnimalCard: React.FC<{ animal: IAnimalData }> = ({ animal }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState<IAnimalData>(animal);
  const formattedAnimal =
    AnimalValidator.UpdateableAnimalKeys.safeParse(editedAnimal).data;
  console.log(formattedAnimal);
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
      // Assuming you have a method to update the animal
      const response = await axios.put<IAnimalData>(
        `${import.meta.env.VITE_G_API_URL}/animal`,
        formattedAnimal,
        {
          headers: {
            id: editedAnimal._id,
          },
          withCredentials: true,
        }
      );
      // Update the local state with the updated animal
      setEditedAnimal(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error saving animal data:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedAnimal((prev) => ({ ...prev, [name]: value }));
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
      {/* Status badge in the top right corner */}
      <span
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-black text-sm ${getStatusColor(
          animal.status
        )}`}
      >
        {animal.status}
      </span>
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
      </div>
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {editing ? (
              <>
                <input
                  name="name"
                  value={editedAnimal.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="species"
                  value={editedAnimal.species}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="age"
                  type="number"
                  value={editedAnimal.age || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="breed"
                  value={editedAnimal.breed || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="weight"
                  type="number"
                  value={editedAnimal.weight || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="location"
                  value={editedAnimal.location || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="medicalInfo"
                  value={editedAnimal.medicalInfo || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="notes"
                  value={editedAnimal.notes || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
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
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
