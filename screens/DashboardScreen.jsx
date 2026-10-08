import { View, Text } from "react-native";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View>
      <Navbar />
      <Text>Tableau de bord {user}</Text>
    </View>
  );
}
