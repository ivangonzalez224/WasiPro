import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#E65A2C',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notificaciones',
          headerShown: false,
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: 'Reservas',
          headerShown: false,
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-check-o" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E65A2C',
  },
});