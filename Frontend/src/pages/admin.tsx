import React from "react";
import CustomGoogleLogin from "../components/GoogleLogin";
const Admin: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-w-screen min-h-screen justify-center items-center text-center">
        <div className="bg-darkestgreen px-4 py-8 w-96 rounded-lg flex flex-col items-between shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-10">Admin Portal</h1>
          <CustomGoogleLogin />
          <p className="text-white text-md mt-10">
            Nature's Edge Wildlife and Reptile Rescue
          </p>
          <p className="text-white text-md">
            © Copyright {new Date().getFullYear()} Powered by Google OAuth
          </p>
        </div>
      </div>
    </>
  );
};

export default Admin;
