import React from "react";
import { Easing } from "react-native";
import {
  CardStyleInterpolators 
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { CourseListing, CourseDetails } from "../screens";
import MainLayout from "../screens/MainLayout";

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
      return {
          cardStyle: {
              opacity: progress 
          }
      }
  }
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        useNativeDriver: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      detachInactiveScreens={false}
      initialRouteName={"Dashboard"}
    >
      <Stack.Screen name="Dashboard" component={MainLayout} />
      <Stack.Screen
        name="CourseListing"
        component={CourseListing}
        options={() => options}
      />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
