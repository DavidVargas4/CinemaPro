import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const CustomButton = ({ title, onPress, variant = 'primary' }: Props) => {
  const bgColor = variant === 'secondary' ? colors.secondary : colors.primary;
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: bgColor }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
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
  },
  text: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
