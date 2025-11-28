import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';

export const DetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { title, poster, genre, synopsis, hall, duration } = route.params || {};
  
  const handleBook = () => {
    navigation.navigate('Booking', { 
      movieTitle: title,
      hall: hall 
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image 
          source={{ uri: poster || 'https://via.placeholder.com/300x450' }} 
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.tagsRow}>
            <View style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
            
            {/* 2. AQUÍ MOSTRAMOS LA DURACIÓN REAL */}
            {/* Si por error no llega el dato, mostramos N/A */}
            <Text style={styles.duration}>
               {duration || 'N/A'}
            </Text>
          
          </View>

          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.synopsis}>
            {synopsis || 'Descripción no disponible por el momento.'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton title="Seleccionar Asientos" onPress={handleBook} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 100 }, 
  poster: { width: '100%', height: 450 },
  infoContainer: { 
    padding: 20, 
    marginTop: -20, 
    backgroundColor: colors.background, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20 
  },
  title: { color: colors.text, fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  tagsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 15 },
  genreTag: { backgroundColor: '#333', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  genreText: { color: colors.textDim, fontSize: 12 },
  duration: { color: colors.textDim, fontSize: 14 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  synopsis: { 
    color: colors.textDim, 
    lineHeight: 24, 
    fontSize: 15, 
    textAlign: 'justify' 
  },
  
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: '#333' },
});