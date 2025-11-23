import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { setMovieTitle, setSelectedSeats } from '../store/bookingSlice';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

const ROW_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const BookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const { movieTitle } = route.params || { movieTitle: 'Película' };

  const dispatch = useAppDispatch();

  // 0: Libre, 1: Ocupado, 2: Seleccionado
  const [seats, setSeats] = useState([
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [0, 2, 2, 0, 0, 0],
  ]);

  const toggleSeat = (rowIndex: number, colIndex: number) => {
    const newSeats = [...seats];
    const currentStatus = newSeats[rowIndex][colIndex];
    
    if (currentStatus === 1) return; // Si está ocupado, ignorar

    newSeats[rowIndex][colIndex] = currentStatus === 0 ? 2 : 0;
    setSeats([...newSeats]);
  };

  const handleContinue = () => {
    // Convertir matriz a lista de asientos
    const selectedSeatsList: string[] = [];

    seats.forEach((row, rowIndex) => {
      row.forEach((status, colIndex) => {
        if (status === 2) {
          const seatName = `${ROW_LETTERS[rowIndex]}${colIndex + 1}`;
          selectedSeatsList.push(seatName);
        }
      });
    });

    if (selectedSeatsList.length === 0) {
      Alert.alert('Atención', 'Por favor selecciona al menos un asiento.');
      return;
    }

    dispatch(setMovieTitle(movieTitle));
    dispatch(setSelectedSeats(selectedSeatsList));

    navigation.navigate('Snacks');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Elige tus asientos</Text>
        <Text style={styles.subtitle}>{movieTitle}</Text>
        
        {/* PANTALLA CINE */}
        <View style={styles.screenContainer}>
          <View style={styles.screenLine} />
          <Text style={styles.screenText}>PANTALLA</Text>
        </View>

        {/* GRID DE ASIENTOS */}
        <View style={styles.gridContainer}>
          {seats.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              <Text style={styles.rowLabel}>{ROW_LETTERS[rowIndex]}</Text>
              <View style={styles.seatsRow}>
                {row.map((status, colIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    onPress={() => toggleSeat(rowIndex, colIndex)}
                    style={[
                      styles.seat,
                      status === 1 && styles.seatOccupied,
                      status === 2 && styles.seatSelected,
                    ]}
                    disabled={status === 1}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.seat}/><Text style={styles.legendText}>Libre</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seat, styles.seatSelected]}/><Text style={styles.legendText}>Tuyo</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seat, styles.seatOccupied]}/><Text style={styles.legendText}>Ocupado</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton 
          title="Continuar a Snacks" 
          onPress={handleContinue} 
        />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20, paddingBottom: 100, alignItems: 'center' },
  title: { color: colors.text, fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { color: colors.textDim, fontSize: 18, marginBottom: 30 },
  
  screenContainer: { alignItems: 'center', marginBottom: 30, width: '100%' },
  screenLine: { 
    width: '80%', height: 5, backgroundColor: colors.primary, 
    borderRadius: 10, marginBottom: 10,
    shadowColor: colors.primary, shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 
  },
  screenText: { color: colors.textDim, fontSize: 10, letterSpacing: 2 },

  gridContainer: { marginBottom: 30 },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rowLabel: { color: colors.textDim, width: 20, fontWeight: 'bold', marginRight: 10 },
  seatsRow: { flexDirection: 'row' },
  
  seat: {
    width: 32, height: 32,
    backgroundColor: '#3A3A3A',
    marginHorizontal: 4,
    borderRadius: 6,
    borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  seatOccupied: { backgroundColor: '#1A1A1A', borderColor: '#333', borderWidth: 1 },
  seatSelected: { backgroundColor: colors.secondary },

  legendContainer: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendText: { color: colors.textDim, fontSize: 12 },

  footer: {
    position: 'absolute', bottom: 0, width: '100%',
    padding: 20, backgroundColor: colors.background,
    borderTopWidth: 1, borderTopColor: '#222'
  }
});