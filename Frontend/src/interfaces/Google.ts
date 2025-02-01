// Interface representing a Google User's authentication token
export interface GoogleUser {
  access_token: string; // The access token used for authenticating API requests
}

// Interface representing a Google User's profile information
export interface GoogleProfile {
  picture: string; // URL to the user's profile picture
  name: string; // User's full name
  email: string; // User's email address
  authenticated: boolean | null; // Indicates if the user is authenticated, can be null if unknown
}
