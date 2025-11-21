import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white' }}>Pantalla: {name}</Text>
  </View>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Main" component={HomeScreen} />
        
        <Stack.Screen name="Details" children={(props: any) => (
          <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
              {props.route.params?.title || 'Película'}
            </Text>
            <Text style={{ color: '#aaa', padding: 20, textAlign: 'center' }}>
              Sinopsis: Una película increíble que debes ver en cine.
            </Text>
            <View style={{ width: '80%' }}>
              <CustomButton
                title="Reservar Asientos"
                onPress={() => props.navigation.navigate('Booking', { movieTitle: props.route.params.title })}
              />
            </View>
          </View>
        )} />

        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Snacks" children={() => <PlaceholderScreen name="Selección de Snacks" />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}