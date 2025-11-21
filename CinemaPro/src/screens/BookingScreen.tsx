import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const movieTitle = route.params?.movieTitle || 'Película';

  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva de Asientos</Text>
      <Text style={styles.subtitle}>{movieTitle}</Text>

      <View style={styles.screenBar} />
      <Text style={styles.screenText}>PANTALLA</Text>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          Asientos seleccionados: {selectedCount}
        </Text>
        <Text style={styles.helperText}>
          Selecciona los asientos que deseas reservar.
        </Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Continuar a Snacks"
          onPress={() => navigation.navigate('Snacks')}
        />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textDim,
    marginBottom: 20,
  },
  screenBar: {
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginVertical: 15,
  },
  screenText: {
    textAlign: 'center',
    color: colors.textDim,
    fontSize: 12,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 10,
  },
  helperText: {
    fontSize: 14,
    color: colors.textDim,
    textAlign: 'center',
  },
  footer: {
    marginBottom: 20,
  },
});
