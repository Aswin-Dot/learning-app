import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { COLORS, FONTS, SIZES } from "../../constants";

const CategoriesCard = ({ sharedElementPrefix, containerStyle, category, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 150,
        width: 200,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Image Background */}
      <SharedElement
        style={[StyleSheet.absoluteFillObject]}
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
      >
        <Image
          source={category?.thumbnail}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.radius,
          }}
          resizeMode="cover"
        />
      </SharedElement>

      {/* Title */}
      <View
        style={{
          position: "absolute",
          bottom: 35,
          left: 10,
        }}
      >
        <SharedElement
          style={[StyleSheet.absoluteFillObject]}
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
        >
          <Text
            style={{
              position: "absolute",
              ...FONTS.h3,
              color: COLORS.white,
              // bottom: 20,
              // width: "70%",
            }}
          >
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesCard;