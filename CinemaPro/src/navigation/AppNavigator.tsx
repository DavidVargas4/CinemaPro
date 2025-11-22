import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme/colors';
import { Text, View } from 'react-native';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SnacksScreen } from '../screens/SnacksScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Snacks" component={SnacksScreen} />
        
        {/* Pantalla de Detalles inline) */}
        <Stack.Screen name="Details" children={(props: any) => (
          <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
              {props.route.params?.title || 'Película'}
            </Text>
            <Text style={{ color: '#aaa', padding: 20, textAlign: 'center' }}>
              Sinopsis: Una película que no te puedes perder.
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
        <Stack.Screen name="Snacks" component={SnacksScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}