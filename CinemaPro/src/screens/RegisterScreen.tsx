import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/UserSlice';

import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch(); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    const tempErrors: any = {};
    if (!name.trim()) { tempErrors.name = 'Requerido'; valid = false; }
    if (!email.includes('@')) { tempErrors.email = 'Inválido'; valid = false; }
    if (password.length < 6) { tempErrors.password = 'Mínimo 6 caracteres'; valid = false; }
    if (password !== confirmPassword) { tempErrors.confirmPassword = 'No coinciden'; valid = false; }
    setErrors(tempErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validate()) {
      
      dispatch(setUser({
        name: name,
        email: email
      }));

      
      Alert.alert('Bienvenido', `Cuenta creada para ${name}`, [
        { text: 'Continuar', onPress: () => navigation.replace('Main') }
      ]);
    } else {
      Alert.alert('Error', 'Corrige los campos marcados');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crear Cuenta</Text>
        
        <CustomInput label="Nombre" value={name} onChangeText={setName} error={errors.name} />
        <CustomInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <CustomInput label="Teléfono" value={phone} onChangeText={setPhone} keyboardType="numeric" />
        <CustomInput label="Contraseña" value={password} onChangeText={setPassword} isPassword={true} error={errors.password} />
        <CustomInput label="Confirmar" value={confirmPassword} onChangeText={setConfirmPassword} isPassword={true} error={errors.confirmPassword} />

        <CustomButton title="Registrarse" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{color: colors.textDim}}>¿Ya tienes cuenta? <Text style={{color: colors.secondary}}>Inicia Sesión</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 50 },
  title: { fontSize: 30, fontWeight: 'bold', color: colors.primary, marginBottom: 30, textAlign: 'center' }
});
