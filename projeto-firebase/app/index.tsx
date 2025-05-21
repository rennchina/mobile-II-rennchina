import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Firebase Config
const firebaseConfig = { 
  apiKey: "AIzaSyCqWOie7YwTJDlZH_29TN5z8vkgvDlpO9Q",
  authDomain: "meu-primeiro-firebase-6d472.firebaseapp.com",
  projectId: "meu-primeiro-firebase-6d472",
  storageBucket: "meu-primeiro-firebase-6d472.firebasestorage.app",
  messagingSenderId: "909767607183",
  appId: "1:909767607183:web:7a6e876216f6ecd87a01fa",
  measurementId: "G-B5WG1XF2ZW"
};

// Inicialização do Firebase (evita inicializar múltiplas vezes)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Tipagem do documento do Firestore
interface NomeItem {
  id: string;
  Nome: string;
  Sobrenome: string;
}

export default function App() {
  const [nomes, setNomes] = useState<NomeItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('nomes');
      const snapshot = await nomesCollection.get();

      const data: NomeItem[] = [];
      snapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          Nome: docData.Nome,
          Sobrenome: docData.Sobrenome
        });
      });

      setNomes(data);
    };

    fetchData();
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lista de Nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Nome} {item.Sobrenome}</Text>
          </View>
        )}
      />
    </View>
  );
}
