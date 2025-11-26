import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function Lista() {
  const db = useSQLiteContext();
  const [contatos, setContatos] = useState([]);

  async function carregarContatos() {
    const result = await db.getAllAsync("SELECT * FROM contatos;");
    setContatos(result);
  }

  async function deletarContato(id: number) {
    await db.runAsync("DELETE FROM contatos WHERE id = ?", [id]);
    carregarContatos();
  }

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista Telefônica</Text>

      <FlatList
        data={contatos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.numero}>{item.numero}</Text>

            <TouchableOpacity
              onPress={() => deletarContato(item.id)}
              style={styles.botaoDeletar}
            >
              <Text style={styles.botaoDeletarTexto}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },

  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  row: {
    flex: 1,
    justifyContent: "space-between",
  },

  card: {
    width: "31%", // 3 colunas com espaçamento
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  nome: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

  numero: { fontSize: 14, color: "#555", marginBottom: 8, textAlign: "center" },

  botaoDeletar: {
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  botaoDeletarTexto: { color: "white", fontWeight: "bold" },
});
