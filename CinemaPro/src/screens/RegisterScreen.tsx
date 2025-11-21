import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  
  const validate = () => {
    let valid = true;
    const tempErrors: any = {};

    if (!name.trim()) {
      tempErrors.name = 'El nombre es obligatorio';
      valid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      tempErrors.email = 'Ingresa un correo válido';
      valid = false;
    }

    // Teléfono (solo números y longitud mínima)
    const phoneRegex = /^[0-9]{8,12}$/;
    if (!phoneRegex.test(phone)) {
      tempErrors.phone = 'Ingresa un teléfono válido (8-12 dígitos)';
      valid = false;
    }

    // Contraseña (Mínimo 6 caracteres)
    if (password.length < 6) {
      tempErrors.password = 'Mínimo 6 caracteres';
      valid = false;
    }

    // Confirmar Contraseña
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validate()) {
      Alert.alert('¡Éxito!', 'Cuenta creada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Auth') } // Volver al Login
      ]);
    } else {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a Cinema Pro</Text>

        {/* Formulario */}
        <CustomInput
          label="Nombre Completo"
          placeholder="Juan Pérez"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoCapitalize="words"
        />

        <CustomInput
          label="Correo Electrónico"
          placeholder="juan@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Teléfono"
          placeholder="99999999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric" 
          error={errors.phone}
        />

        <CustomInput
          label="Contraseña"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          error={errors.password}
        />

        <CustomInput
          label="Confirmar Contraseña"
          placeholder="******"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword={true}
          error={errors.confirmPassword}
        />

        <View style={styles.buttonContainer}>
          <CustomButton title="Registrarse" onPress={handleRegister} />
        </View>

        {/* Enlace para volver al Login */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footerLink}>
          <Text style={styles.footerText}>
            ¿Ya tienes cuenta? <Text style={styles.linkHighlight}>Inicia Sesión</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textDim,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
  footerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: colors.text,
    fontSize: 14,
  },
  linkHighlight: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
});