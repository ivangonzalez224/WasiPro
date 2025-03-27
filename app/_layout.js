import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { login } from '../redux/store';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function MainLayout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await SecureStore.getItemAsync('userData');
      if (userData) {
        dispatch(login());
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, loading, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
        </Stack>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <MainLayout />
      </MenuProvider>
    </Provider>
  );
}
