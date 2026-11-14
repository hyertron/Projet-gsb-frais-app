// App.js
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FraisAddScreen from "./screens/FraisAddScreen";   // nouveau
import FraisEditScreen from "./screens/FraisEditScreen"; // nouveau
import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // Récupère l'utilisateur connecté au démarrage
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    };
    loadUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Navbar user={user} setUser={setUser} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        {user ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="FraisAdd" component={FraisAddScreen} />
            <Stack.Screen name="FraisEdit" component={FraisEditScreen} />
          </>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}