// components/FraisCard.jsx
// La carte ne fait qu'afficher : les actions sont fournies par le parent (Dashboard)
// ⚠ Adapte la partie affichage à ta version existante si les champs diffèrent.
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function FraisCard({ frais, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Note [{frais.id_frais}] Visiteur n°{frais.id_visiteur} - {frais.anneemois}
      </Text>
      <Text>Nombre de justificatifs : {frais.nbjustificatifs}</Text>
      <Text>Montant validé : {frais.montantvalide} €</Text>
      <Text>Etat : {frais.lib_etat ?? frais.id_etat}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.editButton} onPress={() => onEdit(frais.id_frais)}>
          <Text>Modifier</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => onDelete(frais.id_frais)}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 10 },
  editButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#d9534f",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteText: { color: "#d9534f" },
});
