
// Les parties nouvelles : useFocusEffect, handleEdit, handleDelete, onEdit/onDelete.
import { useState, useCallback } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import FraisCard from "../components/FraisCard";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Recharge la liste à chaque retour sur l'écran (après ajout / modification)
  useFocusEffect(
    useCallback(() => {
      const fetchFrais = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          const storedUser = JSON.parse(await AsyncStorage.getItem("user"));
          setToken(storedToken);
          setUser(storedUser);

          const response = await fetch(
            `${API_URL}frais/liste/${storedUser.id_visiteur}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `Erreur HTTP ${response.status}`);
          }
          setFraisList(await response.json());
        } catch (error) {
          console.error("Erreur:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFrais();
    }, [user, token])
  );

  // Ouverture du formulaire de modification
  function handleEdit(id) {
    navigation.navigate("FraisEdit", { id });
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              const response = await fetch(`${API_URL}frais/suppr`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id_frais: id }),
              });
              if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erreur HTTP ${response.status}`);
              }
              setFraisList((prev) => prev.filter((f) => f.id_frais !== id));
            } catch (error) {
              console.error("Erreur lors de la suppression:", error);
            }
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={fraisList}
        keyExtractor={(item) => String(item.id_frais)}
        renderItem={({ item }) => (
          <FraisCard frais={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<Text>Aucune note de frais.</Text>}
      />
    </View>
  );
}
