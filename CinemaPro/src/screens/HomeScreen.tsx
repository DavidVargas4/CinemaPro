import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useAppSelector } from '../store/hooks';

const MOVIES = [
  { 
    id: '1', 
    title: 'Frankenstein', 
    genre: 'Sci-Fi', 
    vip: true, 
    poster: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/08/31180656/frankenstein-2025-poster.jpg',
    synopsis: "En esta reinvención futurista ambientada en 2025, el Dr. Victor Frankenstein utiliza biotecnología prohibida y cibernética avanzada para resucitar a los muertos. Pero su creación, una amalgama de carne y acero, escapa de su control, buscando venganza en una sociedad que lo considera un monstruo. Una historia sobre la ética de la IA y el horror de jugar a ser Dios."
  },
  { 
    id: '2', 
    title: 'Wicked: For Good', 
    genre: 'Drama', 
    vip: false,
    poster: 'https://cdn.cinematerial.com/p/297x/vnc0anwp/wicked-for-good-movie-poster-md.jpg?v=1761059702',
    synopsis: "La historia no contada de las brujas de Oz llega a su clímax emocional. Elphaba, incomprendida por su piel verde, y Glinda, popular y ambiciosa, deben enfrentar las consecuencias de sus decisiones. Mientras fuerzas oscuras amenazan Oz, descubrirán que su amistad las ha cambiado... para siempre."
  },
  { 
    id: '3', 
    title: 'Now You See Me 3', 
    genre: 'Action', 
    vip: true,
    poster: 'https://m.media-amazon.com/images/M/MV5BYmZmZDc1Y2EtMmU2MS00NmMzLTllZmYtNjlkODFkNjZlOGE0XkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg',
    synopsis: "Los Cuatro Jinetes regresan para su acto más audaz hasta la fecha. Con una nueva generación de magos y trucos que desafían la realidad, el equipo debe exponer una conspiración tecnológica global. Pero esta vez, la línea entre la ilusión y la realidad se desdibuja, y el gran truco final podría costarles la vida."
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { name } = useAppSelector(state => state.user);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Details', { 
        movieId: item.id, 
        title: item.title,
        poster: item.poster,
        genre: item.genre,
        synopsis: item.synopsis
      })}
    >
      <Image 
        source={{ uri: item.poster }} 
        style={styles.posterImage} 
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieGenre}>{item.genre}</Text>
        
        {item.vip && (
          <View style={styles.vipTag}>
            <Text style={styles.vipText}>VIP Disponible</Text>
          </View>
        )}
        
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Cartelera</Text>
      
      {/* el nombre atraído de Redux */}
      <Text style={styles.welcomeText}>
        Bienvenido, {name || 'Invitado'}
      </Text>
      
      <FlatList
        data={MOVIES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50, 
    paddingHorizontal: 20,
  },
  headerTitle: { 
    color: colors.text, 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  welcomeText: { 
    color: colors.secondary, 
    fontSize: 18, 
    marginBottom: 20 
  },
  listContent: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    height: 140, 
  },
  posterImage: { 
    width: 100, 
    height: '100%' 
  },
  infoContainer: { flex: 1, padding: 15, justifyContent: 'center' },
  movieTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  movieGenre: { color: colors.textDim, marginTop: 5 },
  vipTag: {
    backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 10,
  },
  vipText: { color: '#000', fontWeight: 'bold', fontSize: 10 },
});