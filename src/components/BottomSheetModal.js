import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomSheet } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import TextButton from "./TextButton";
import {
  COLORS,
  FONTS,
  SIZES,
} from "../../constants";

const BottomSheetModal = ({ children, isVisible, Close, title }) => {
    return (
      <BottomSheet
        isVisible={isVisible}
        modalProps={{
          statusBarTranslucent: true,
          onRequestClose: () => Close(),
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginBottom: SIZES.base,
            height: 40,
            width: 40,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={Close}
        >
          <Entypo name="cross" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <View
          style={{
            height: SIZES.height * 0.85,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h2 }}>{title}</Text>
          </View>

          {/* Contents */}
          {children}
        </View>
      </BottomSheet>
    );
};

export default BottomSheetModal;