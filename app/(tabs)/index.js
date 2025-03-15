import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  { id: '1', message: 'Mantenimiento de ascensor el lunes a las 10 AM.' },
  { id: '2', message: 'Revisión de tuberías programada para mañana.' },
  { id: '3', message: 'Se ha habilitado la reserva del salón de eventos.' },
  { id: '4', message: 'Pago de mantenimiento vence en 3 días.' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notificaciones</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35', // Color del branding
    marginBottom: 15,
  },
  notificationCard: {
    backgroundColor: '#222', // Un gris oscuro para destacar las notificaciones
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationText: {
    color: '#FFF', // Texto blanco
  },
});