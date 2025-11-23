import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearBooking } from '../store/bookingSlice'; 
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

// tipo base de datos
const SNACKS_DATA = [
  { 
    id: '1', 
    name: 'Palomitas Grandes', 
    price: 8.50, 
    image: 'https://static.vecteezy.com/system/resources/previews/060/363/770/non_2x/classic-popcorn-bucket-filled-with-fresh-popcorn-on-a-transparent-background-perfect-for-movie-nights-popcorn-bucket-isolated-on-background-free-png.png',
    desc: 'Mantequilla extra'
  },
  { 
    id: '2', 
    name: 'Refresco Grande', 
    price: 4.00, 
    image: 'https://st2.depositphotos.com/1000647/5490/i/450/depositphotos_54909353-stock-photo-paper-cups-of-coca-cola.jpg',
    desc: 'Cola, Naranja o Sprite'
  },
  { 
    id: '3', 
    name: 'Nachos con Queso', 
    price: 6.50, 
    image: 'https://i.pinimg.com/736x/09/bf/d8/09bfd8bfa3af3d1a3016fe90f3a0c4ff.jpg',
    desc: 'Jalapeños opcionales'
  },
  { 
    id: '4', 
    name: 'Hot Dog Clásico', 
    price: 5.00, 
    image: 'https://img.freepik.com/free-photo/classic-hot-dog-with-ketchup-mustard-sauce-isolated-white-background_123827-29747.jpg?semt=ais_hybrid&w=740&q=80',
    desc: 'Ketchup y Mostaza'
  },
  { 
    id: '5', 
    name: 'Chocolates', 
    price: 3.50, 
    image: 'https://images.squarespace-cdn.com/content/v1/5a0348fed0e62853587b1d48/1667243912332-1XVQL5UGFWS1K6BCQWVK/reg+size+hershey-01-01.png',
    desc: 'Barra de chocolate con leche'
  },
];
export const SnacksScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user);
  const booking = useAppSelector(state => state.booking);
  

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addItem = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeItem = (id: string) => {
    setCart(prev => {
      const current = prev[id] || 0;
      if (current <= 0) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    SNACKS_DATA.forEach(item => {
      const quantity = cart[item.id] || 0;
      total += item.price * quantity;
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    const snackList = SNACKS_DATA
      .filter(item => cart[item.id] > 0)
      .map(item => `${cart[item.id]}x ${item.name}`);

    const total = calculateTotal();

    navigation.navigate('Checkout', { 
      cart: cart,
      snacksTotal: total,
      snackList: snackList
    });
  };

  const renderItem = ({ item }: any) => {
    const quantity = cart[item.id] || 0;
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            onPress={() => removeItem(item.id)} 
            style={[styles.circleBtn, quantity === 0 && styles.circleBtnDisabled]}
            disabled={quantity === 0}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => addItem(item.id)} style={styles.circleBtn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Confitería</Text>
      <Text style={styles.subtitle}>Completa tu experiencia</Text>

      <FlatList
        data={SNACKS_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>
        <CustomButton 
          title="Confirmar y Pagar" 
          onPress={handleCheckout} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.secondary, paddingHorizontal: 20 },
  subtitle: { fontSize: 16, color: colors.textDim, marginBottom: 20, paddingHorizontal: 20 },
  listContent: { paddingHorizontal: 20, paddingBottom: 120 },
  card: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 12, marginBottom: 15, padding: 10, alignItems: 'center' },
  imageContainer: { width: 60, height: 60, backgroundColor: '#333', borderRadius: 8, padding: 5 },
  image: { width: '100%', height: '100%' },
  infoContainer: { flex: 1, marginLeft: 15 },
  itemName: { color: colors.text, fontWeight: 'bold', fontSize: 16 },
  itemDesc: { color: colors.textDim, fontSize: 12 },
  itemPrice: { color: colors.secondary, fontWeight: 'bold', marginTop: 4 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  circleBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  circleBtnDisabled: { backgroundColor: '#444' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  quantityText: { color: 'white', fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#252525', padding: 20, borderTopWidth: 1, borderTopColor: '#333' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  totalLabel: { color: colors.textDim, fontSize: 18 },
  totalAmount: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});