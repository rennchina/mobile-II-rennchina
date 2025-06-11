import Tabela from '@/components/tabela';
import { SafeAreaView, StyleSheet, Text } from "react-native";


export default function App(...args: []) {
  const headers = ['Nome', 'Idade', 'Cidade'];
  const data = [
    ['Maria', '28', 'São Paulo'],
    ['João', '35', 'Rio de Janeiro'],
    ['Ana', '22', 'Belo Horizonte'],
    ['Carlos', '40', 'Curitiba'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tabela de Pessoas</Text>
      <Tabela headers={headers} data={data} />
    </SafeAreaView>
  );
} 
   
  const styles = StyleSheet.create({ 
   container: { 
 flex: 1, 
     marginTop: 50, 
     padding: 10, 

},  
title: { 
fontSize: 24, 
fontWeight: 'bold', 
marginBottom: 20, 
textAlign: 'center', 
}, 
 }); 
