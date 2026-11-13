import fraisFormStyles from "../styles/fraisFormStyles";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export default function FraisForm() {
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation();

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("Token manquant");

            const user = JSON.parse(await AsyncStorage.getItem("user"));

            const fraisData = {
                anneemois: anneeMois,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
                id_visiteur: user.id_visiteur,
            };

            const response = await fetch(`${API_URL}frais/ajout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fraisData),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || `Erreur HTTP ${response.status}`);
            }

            navigation.navigate("Dashboard");
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.message || "Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={fraisFormStyles.container}>
            <Text style={fraisFormStyles.formTitle}>
                Saisir une note de frais
            </Text>

            <Text>Année-mois :</Text>
            <TextInput
                style={fraisFormStyles.input}
                placeholder="Année-mois (ex: 2023-10)"
                value={anneeMois}
                onChangeText={setAnneeMois}
            />

            <Text>Nombre de justificatifs :</Text>
            <TextInput
                style={fraisFormStyles.input}
                placeholder="Nombre de justificatifs"
                keyboardType="numeric"
                value={nbJustificatifs}
                onChangeText={setNbJustificatifs}
            />

            <Text>Montant saisi :</Text>
            <TextInput
                editable={false}
                style={[fraisFormStyles.input, fraisFormStyles.inputDisabled]}
                value={montant}
            />

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
                <Pressable disabled={loading}>
                    <Text>Frais hors forfait</Text>
                </Pressable>

                <Pressable disabled={loading}>
                    <Text>Frais au forfait</Text>
                </Pressable>
            </View>

            {error ? (
                <Text style={fraisFormStyles.error}>{error}</Text>
            ) : null}

            <Pressable
                onPress={handleSubmit}
                disabled={loading}
                style={fraisFormStyles.button}
            >
                <Text style={fraisFormStyles.buttonText}>
                    {loading ? "Enregistrement..." : "Ajouter"}
                </Text>
            </Pressable>
        </View>
    );

}
