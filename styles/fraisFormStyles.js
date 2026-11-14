// components/fraisFormStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  formTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  smallButtonRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  smallbutton: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});
