import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import IconLabel from "./IconLabel"
import { COLORS, FONTS, SIZES, icons } from "../../constants";

const VerticalCourseCart = ({ containerStyle, course }) => {
    return (
      <TouchableOpacity
        style={{ width: 270, ...containerStyle }}
        onPress={() => console.log("hi")}
      >
        {/* Thumbnail */}
        <Image
          source={course.thumbnail}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 150,
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius,
          }}
        />

        {/* Details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* play */}
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <Image
              source={icons.play}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
                marginLeft: 3,
              }}
              resizeMode="contain"
            />
          </View>

          {/* info */}
          <View style={{ marginLeft: SIZES.radius, flexShrink: 1 }}>
            <Text style={{ ...FONTS.h3 }}>{course.title}</Text>
            <IconLabel
              icon={icons.time}
              iconStyle={{ height: 15, width: 15, tintColor: COLORS.gray60 }}
              label={course.duration}
              labelStyle={{ ...FONTS.body4, color: COLORS.gray60 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default VerticalCourseCart;