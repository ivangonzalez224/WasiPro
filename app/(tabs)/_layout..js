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
            <FontAwesome name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Reservas',
          headerShown: false,
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}