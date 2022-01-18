import React from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";

const CategoriesCard = ({ containerStyle, category }) => {
  return (
    <TouchableOpacity onPress={() => console.log("hi")}>
      <ImageBackground
        source={category?.thumbnail}
        style={{
          borderRadius: SIZES.radius,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          justifyContent: "flex-end",
          ...containerStyle,
        }}
        resizeMode="contain"
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            width: "70%",
          }}
        >
          {category.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
