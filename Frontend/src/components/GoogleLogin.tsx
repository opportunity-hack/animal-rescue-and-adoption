import { useState, useEffect } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/useUser";
import { GoogleAuthResponse } from "../interfaces/GoogleAuth";
import axios from "axios";
import { GoogleProfile } from "../interfaces/Google";

function CustomGoogleLogin() {
  const [user, setUser] = useState<CredentialResponse | null>(null);
  const { data: profile } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (profile && profile.data) navigate("/admin/dashboard");
  }, [profile, navigate]);

  // if user logins, we need to decode the credential to get their profile
  useEffect(() => {
    if (!user?.credential || !user.clientId) return;

    const sendLoginDataToBackend = async (
      credential: string,
      client_id: string
    ) => {
      await axios.post<GoogleAuthResponse>(
        `${import.meta.env.VITE_G_API_URL}/google-auth`,
        { credential, client_id },
        { withCredentials: true }
      );

      // Invalidate and refetch user query
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      //server side google auth response validated + client side rendering of authentication
      //setProfile({email, name, picture, authenticated: role.perm_level > 5});
      await setTimeout(() => {
        //navigate("/admin/dashboard");
      }, 10000);
    };

    try {
      console.log("About to decode");
      jwtDecode(user.credential) as GoogleProfile;

      //Update the profile state to feel faster (client side)
      //optional

      console.log("Decoded... Setting profile");
      //setProfile({email, name, picture, authenticated: null});

      //Send data to backend for validation and role access
      console.log("Profile set... Sending to backend");
      sendLoginDataToBackend(user.credential, user.clientId);

      console.log("Sent to backend");
    } catch (error) {
      console.log("Error decoding credential:", error);
    }
  }, [user, navigate, queryClient]);

  return (
    <div>
      {!profile && (
        <div className="max-w-96 flex items-center justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => setUser(credentialResponse)}
            onError={() => console.log("Login Failed")}
          />
        </div>
      )}
    </div>
  );
}

export default CustomGoogleLogin;
