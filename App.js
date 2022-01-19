import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

import { store } from "./src/redux";

import AppNavigation from "./src/navigation/AppNavigation";

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigation/>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App