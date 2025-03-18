import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as SecureStore from 'expo-secure-store';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function MessagesScreen() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Obtener usuario almacenado
    const getUserData = async () => {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        const [user, , id] = JSON.parse(storedData);
        setUsername(user);
        setUserId(id);
      }
    };
    getUserData();

    // Escuchar mensajes en tiempo real desde Firestore
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user,
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const message = newMessages[0];
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    await addDoc(collection(db, 'chats'), {
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: userId,
        name: username,
        avatar: 'https://i.pravatar.cc/150?u=' + userId, // Avatar genérico
      },
    });
  }, [username, userId]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userId, name: username }}
        placeholder="Escribe un mensaje..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
});