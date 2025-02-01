import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the props for the NotLoggedIn component
interface NotLoggedInProps {
  hasUser: boolean; // Indicates if a user is logged in
}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({ hasUser }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const queryClient = useQueryClient(); // React Query client for cache management

  // Determine the title based on the user's login status
  const title = hasUser
    ? "You do not have access to this page"
    : "You are not logged in";

  // Function to handle logout
  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_G_API_URL}/logout`, {}, { withCredentials: true })
    .then(() => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    })
    .then(() => {
      navigate("/admin"); // Redirect to the admin login page
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-darkestgreen px-4 py-8 w-96 rounded-lg flex flex-col items-between shadow-2xl">
        <p className="text-4xl font-bold text-white mb-4 text-center">
          {title}
        </p>
        <p className="text-white text-center mb-4">Please login to continue.</p>
        <button
          onClick={handleLogout} // Trigger logout on button click
          className="bg-white text-darkestgreen px-4 py-2 rounded-md"
        >
          Click here to log in
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
