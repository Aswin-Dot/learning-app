import React from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import IconLabel from "./IconLabel";

import { COLORS, FONTS, SIZES, icons } from "../../constants";

const HorizontalCourseCard = ({ appTheme, containerStyle, course, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginVertical: SIZES.radius,
          ...containerStyle,
        }}
        onPress={onPress}
      >
        {/* Thumbnail */}
        <ImageBackground
          source={course?.thumbnail}
          style={{
            width: 130,
            height: 130,
            borderRadius: SIZES.radius,
          }}
          imageStyle={{
            borderRadius: SIZES.radius,
          }}
          resizeMode="cover"
        >
          <TouchableOpacity
            style={{
              padding: 6,
              backgroundColor: COLORS.white,
              borderRadius: 6,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Image
              source={icons.favourite}
              style={{
                width: 17,
                height: 17,
                tintColor: course.is_favourite == false && COLORS.gray40,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>

        {/* Course Details */}
        <View
          style={{
            flexShrink: 1,
            marginLeft: SIZES.base,
            justifyContent: "space-evenly",
          }}
        >
          {/* title */}
          <Text style={{ ...FONTS.h4, color: appTheme?.textColor }}>
            {course.title}
          </Text>

          {/* info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ ...FONTS.body5, color: appTheme?.textColor7, marginTop: 5 }}
            >
              By {course.instructor}
            </Text>

            <IconLabel
              icon={icons.time}
              iconStyle={{ height: 12, width: 12, tintColor: appTheme?.textColor7 }}
              label={course.duration}
              labelStyle={{ ...FONTS.body5, color: appTheme?.textColor7 }}
            />
          </View>

          {/* rate && star */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.primary, marginTop: 5 }}>
              ${course.price.toFixed(2)}
            </Text>

            <IconLabel
              icon={icons.star}
              iconStyle={{ height: 15, width: 15 }}
              label={course.ratings}
              labelStyle={{ ...FONTS.h3, color: appTheme?.textColor }}
              containerStyle={{
                marginLeft: 15,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalCourseCard;
