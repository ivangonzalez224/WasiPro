import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function ReservationsScreen() {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Obtener usuario almacenado
    const getUserData = async () => {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        const [user, , id] = JSON.parse(storedData); // Extraer username y id
        setUsername(user);
        setUserId(id);
      }
    };
    getUserData();

    // Simular fetch de opciones de reserva
    setReservations([
      { id: 1, nombre: 'Zona de Eventos 1', diasDisponibles: ['2025-03-20', '2025-03-25'] },
      { id: 2, nombre: 'Zona de Eventos 2', diasDisponibles: ['2025-03-18', '2025-03-22'] },
    ]);
  }, []);

  const handleReserve = async (zona, dia) => {
    if (!username || !userId) {
      Alert.alert('Error', 'No se encontró el usuario, inicia sesión nuevamente.');
      return;
    }

    setLoading(true);
    const scriptReserva = 'https://script.com/exec';

    const formData = new FormData();
    formData.append('reserva-form', 'reserva-was');
    formData.append('dpto', username);
    formData.append('zona', zona);
    formData.append('dia-res', dia);

    try {
      const response = await fetch(scriptReserva, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.result === 'success') {
        Alert.alert('Reserva Confirmada', `Tu reserva en ${zona} para el ${dia} ha sido confirmada.`);
      } else {
        Alert.alert('Error', 'No se pudo realizar la reserva.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al procesar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>
      {loading && <ActivityIndicator size="large" color="#FF6B35" />}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.zoneName}>{item.nombre}</Text>
            <Text style={styles.subtitle}>Días disponibles:</Text>
            {item.diasDisponibles.map((dia) => (
              <TouchableOpacity
                key={dia}
                style={styles.button}
                onPress={() => handleReserve(item.nombre, dia)}
              >
                <Text style={styles.buttonText}>{dia}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#E65A2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFD1B3',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FF6B35',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});