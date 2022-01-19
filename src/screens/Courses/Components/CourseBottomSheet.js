import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";

import {TextButton} from "../../../components";
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  images,
  dummyData,
} from "../../../../constants";

const CourseBottomSheet = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Text>Hello</Text>
        </ScrollView>

        {/* Footer Buttons */}
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: SIZES.radius,
          }}
        >
          <TextButton
            title="Reset"
            titleStyle={{ color: COLORS.black, ...FONTS.h4 }}
            buttonStyle={{
              width: (SIZES.width - SIZES.padding * 3) / 2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.black,
              padding: SIZES.radius,
            }}
            onPress={() => console.log("Reset")}
          />

          <TextButton
            title="Apply"
            titleStyle={{ color: COLORS.white, ...FONTS.h4 }}
            buttonStyle={{
              width: (SIZES.width - SIZES.padding * 3) / 2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              padding: SIZES.radius,
            }}
            onPress={() => console.log("Apply")}
          />
        </View>
      </View>
    );
}

export default CourseBottomSheet;