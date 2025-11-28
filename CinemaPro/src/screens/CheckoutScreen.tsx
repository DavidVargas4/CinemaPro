import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearBooking } from '../store/bookingSlice';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

export const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useAppDispatch();
  const { snacksTotal, snackList } = route.params || {};
  const user = useAppSelector(state => state.user);
  const booking = useAppSelector(state => state.booking);
  const numTickets = booking.selectedSeats.length;
  const ticketTotal = numTickets * booking.ticketPrice;
  const snacksTotalNum = parseFloat(route.params?.snacksTotal || '0');
  const grandTotal = (ticketTotal + snacksTotalNum).toFixed(2);

  // datos para el QR personalizado
  const reservationData = JSON.stringify({
    u: user.name,
    m: booking.movieTitle,
    time: booking.showtime, 
    type: booking.experience, 
    s: booking.selectedSeats,
    total: `$${grandTotal}`
  });

  // URL de la API de QR para Expo Go
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(reservationData)}`;

  const handleFinish = () => {
    dispatch(clearBooking());
    
    Alert.alert('¡Gracias!', 'Te esperamos en el cine.', [
      { text: 'Volver al Inicio', onPress: () => navigation.navigate('Main') }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Tu Ticket Digital</Text>
        <Text style={styles.subtitle}>Presenta este código en taquilla</Text>

        {/* TICKET CARD */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.movieTitle}>{booking.movieTitle}</Text>
            <Text style={styles.cinemaName}>Cinema Pro - {booking.hall}</Text>
          </View>

          {/* Código QR */}
          <View style={styles.qrContainer}>
            <Image 
              source={{ uri: qrUrl }} 
              style={styles.qrImage} 
            />
            <Text style={styles.qrLabel}>Reserva: #CP-{Math.floor(Math.random() * 10000)}</Text>
          </View>

          <View style={styles.dashedLine} />

          {/* Detalles */}
          <View style={styles.detailsContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Experiencia:</Text>
              <Text style={[styles.value, booking.experience === 'VIP' && {color: colors.secondary}]}>
                {booking.experience}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Función:</Text>
              <Text style={styles.value}>{booking.showtime} hrs</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Asientos ({numTickets}):</Text>
              <Text style={styles.value}>{booking.selectedSeats.join(', ')}</Text>
            </View>
            
            {/* Lista de Snacks (si hay) */}
            {snackList && snackList.length > 0 && (
              <View style={styles.snacksSection}>
                <Text style={styles.label}>Snacks Agregados:</Text>
                {snackList.map((item: string, index: number) => (
                  <Text key={index} style={styles.snackItem}>• {item}</Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.dashedLine} />

          {/* Totales */}
          <View style={styles.totalContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Snacks:</Text>
              <Text style={styles.value}>${snacksTotal}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Boletos (Estimado):</Text>
              <Text style={styles.value}>$15.00</Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
              <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
              <Text style={styles.totalValue}>
                ${(parseFloat(snacksTotal || '0') + 15).toFixed(2)}
              </Text>
            </View>
            <Text style={styles.disclaimer}>Pagarás en mostrador</Text>
          </View>

        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton title="Finalizar y Salir" onPress={handleFinish} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20, paddingBottom: 100 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 16, color: colors.textDim, textAlign: 'center', marginBottom: 30 },
  
  // Estilo tipo Ticket Físico
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  ticketHeader: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  movieTitle: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  cinemaName: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  
  qrContainer: { padding: 30, alignItems: 'center', backgroundColor: 'white' },
  qrImage: { width: 180, height: 180 },
  qrLabel: { color: '#333', marginTop: 10, fontSize: 12, fontWeight: 'bold' },

  dashedLine: {
    height: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 1,
  },

  detailsContainer: { padding: 20 },
  snacksSection: { marginTop: 10 },
  snackItem: { color: '#555', fontSize: 14, marginLeft: 10 },

  totalContainer: { padding: 20, backgroundColor: '#f9f9f9' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { color: '#666', fontSize: 14 },
  value: { color: '#000', fontSize: 14, fontWeight: '600' },
  
  totalLabel: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: colors.secondary, fontSize: 20, fontWeight: 'bold' },
  disclaimer: { textAlign: 'center', color: '#999', fontSize: 10, marginTop: 10 },

  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20 },
});