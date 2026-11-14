
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // Fonction de connexion
  const loginUser = async (login, password) => {
    const data = await signIn(login, password);

    setUser(data.visiteur);
    setToken(data.token);

    return data;
  };

  // Fonction de déconnexion
  const logoutUser = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  // Restaurer la session au démarrage
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la restauration de session :",
          error
        );
      } finally {
        setSessionLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        logoutUser,
        sessionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Lire l'utilisateur enregistré
export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

// Lire le token enregistré
export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token || null;
};

// Hook personnalisé
export function useAuth() {
  return useContext(AuthContext);
}
