import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { COLORS, FONTS, SIZES, icons } from "../../constants";

const IconLabel = ({ label, icon, iconStyle, labelStyle, containerStyle }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.base,
          ...containerStyle,
        }}
      >
        <Image
          source={icon}
          style={{
            ...iconStyle,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: SIZES.base,
            textAlign: "left",
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      </View>
    );
};

export default IconLabel;