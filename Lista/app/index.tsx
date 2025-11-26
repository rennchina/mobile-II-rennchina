import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Link href="/Lista" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lista Telefônica</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/adicionar" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Número</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:"center", alignItems:"center" },
  button:{ backgroundColor:"#37B6FF", width:280, padding:15, borderRadius:30, marginVertical:10 },
  buttonText:{ color:"#fff", fontSize:18, fontWeight:"bold" }
});
