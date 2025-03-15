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