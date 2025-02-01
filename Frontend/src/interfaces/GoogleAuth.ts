export interface GoogleAuthResponse {
    name: string;
    email: string;
    role: {
        perm_level: number;
        name: string;
    };
    picture: string;
}
