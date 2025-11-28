import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean; 
  disabled?: boolean; 
}

export const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false 
}: Props) => {
  
  // Si está cargando o deshabilitado, el botón no debe funcionar
  const isDisabled = loading || disabled;
  const bgColor = variant === 'secondary' ? colors.secondary : colors.primary;

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: bgColor },
        isDisabled && styles.disabledButton // Estilo visual si está deshabilitado
      ]} 
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
  },
  disabledButton: {
    opacity: 0.6, 
  },
  text: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});