import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

export default function AddNumberScreen() {
  const db = useSQLiteContext();
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function adicionarContato() {
    if (nome.trim().length < 3) {
      setMensagem("O nome precisa ter pelo menos 3 caracteres!");
      return;
    }

    if (numero.trim().length < 9) {
      setMensagem("O número precisa ter pelo menos 8 dígitos!");
      return;
    }

    await db.runAsync(
      "INSERT INTO contatos (nome, numero) VALUES (?, ?);",
      [nome.trim(), numero.trim()]
    );

    setMensagem("Contato salvo!");

    // limpa campos
    setNome("");
    setNumero("");

    // redireciona após 800ms (efeito visual melhor)
    setTimeout(() => {
      router.push("/Lista");
    }, 800);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Número:</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        placeholder="Digite o número"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarContato}>
        <Text style={styles.buttonText}>Adicionar Número</Text>
      </TouchableOpacity>

      {mensagem !== "" && <Text style={styles.msg}>{mensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 5, alignSelf: "flex-start", marginLeft: 15 },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: { backgroundColor: "#37B6FF", width: 300, paddingVertical: 15, borderRadius: 50, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  msg: { marginTop: 15, color: "green", fontSize: 16, fontWeight: "bold" },
});
