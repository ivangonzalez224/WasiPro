import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/store';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, ingresa usuario y contraseña');
      return;
    }

    setLoading(true);
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbzf8ehnVdrs58knmTMO3j-upAQJk8TNAo8BVdDanEsL06WxiRa0TOgdOzs4RMOHpuza/exec';

    const formData = new FormData();
    formData.append('dpto', username);
    formData.append('miseword', password);
    formData.append('form', 'log-wasipro');

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.result === 'success') {
        console.log(result.message);
        // await SecureStore.setItemAsync(
        //   'userData',
        //   JSON.stringify([username, result.dpto, result.id]),
        // );

        // dispatch(login());
        // router.push('/(tabs)');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (_) {
      Alert.alert(
        'Error',
        'No se pudo iniciar sesión correctamente, vuelve a intentarlo',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/topLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Nombre de usuario"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  form: {
    width: '85%',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    fontSize: 19,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});