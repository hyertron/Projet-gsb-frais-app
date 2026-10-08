import { createContext, useContext, useState } from "react";

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte
export function AuthProvider({ children }) {
    // État local pour stocker l'utilisateur
    // null = non connecté
    const [user, setUser] = useState(null);

    // 3. Fonction de connexion
    const loginUser = (login, password) => {
        // Vérification des identifiants
        if (login === "Andre" && password === "secret") {
            setUser(login);
            return true;
        }

        // Si la connexion échoue
        return false;
    };

    // 4. Fonction de déconnexion
    const logoutUser = () => {
        setUser(null);
    };

    // 5. Valeurs exposées aux composants enfants
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// 6. Hook personnalisé
export function useAuth() {
    return useContext(AuthContext);
}
