import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import store from './src/store';

// Import pages
import Welcome from './src/pages/Welcome';
import HealthConcernsSimple from './src/pages/HealthConcernsSimple';
import DietSelection from './src/pages/DietSelection';
import Allergies from './src/pages/Allergies';
import Lifestyle from './src/pages/Lifestyle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen
              name="HealthConcerns"
              component={HealthConcernsSimple}
            />
            <Stack.Screen name="DietSelection" component={DietSelection} />
            <Stack.Screen name="Allergies" component={Allergies} />
            <Stack.Screen name="Lifestyle" component={Lifestyle} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
