import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Load user from localStorage on refresh
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            setUser(decoded);
            setToken(storedToken);
        }
    }, []);

    // Login function
    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        setToken(token);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}