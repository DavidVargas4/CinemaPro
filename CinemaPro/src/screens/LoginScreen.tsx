import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    let valid = true;
    const tempErrors: any = {};

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      tempErrors.email = 'Ingresa un correo válido';
      valid = false;
    }

    if (password.length < 6) {
      tempErrors.password = 'Mínimo 6 caracteres';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Por favor revisa los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')} // ← Esta ruta está bien en tu proyecto
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Cinema Pro</Text>

      <CustomInput
        label="Correo Electrónico"
        placeholder="usuario@cine.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      <CustomInput
        label="Contraseña"
        placeholder="******"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        error={errors.password}
      />

      <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
      <CustomButton title="Crear Cuenta" variant="secondary" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 120, height: 120, marginBottom: 20, tintColor: colors.primary },
  title: { fontSize: 32, color: colors.primary, fontWeight: 'bold', marginBottom: 40 },
});