import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Chapters, Files, Discussions } from "../Components"

import {
  COLORS,
  FONTS,
} from "../../../../constants";

const Tab = createMaterialTopTabNavigator();

const TopNavigation = ({ selectedCourse }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { ...FONTS.h4, fontSize: 13 },
        tabBarStyle: {
          elevation: 0,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 10 }, // change this for more shadow
          shadowOpacity: 0.4,
          shadowRadius: 6,
          borderBottomColor: COLORS.additionalColor9,
          borderBottomWidth: 1,
        },
        tabBarIndicatorContainerStyle: {
          marginBottom: -1,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarInactiveTintColor: COLORS.black,
        tabBarPressOpacity: "0",
        tabBarPressColor: COLORS.additionalColor13,
      }}
      keyboardDismissMode="on-drag"
    >
      <Tab.Screen
        name="Chapters"
        component={Chapters}
        initialParams={{ selectedCourse }}
      />
      <Tab.Screen name="Files" component={Files} />
      <Tab.Screen name="Discussions" component={Discussions} />
    </Tab.Navigator>
  );
};

export default TopNavigation;