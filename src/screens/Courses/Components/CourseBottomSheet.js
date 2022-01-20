import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Divider, CheckBox } from "react-native-elements";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import {TextButton} from "../../../components";
import {
  COLORS,
  SIZES,
  FONTS,
  constants,
} from "../../../../constants";

const Section = ({ children, title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.radius,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      <View style={{ marginVertical: SIZES.base }}>
        {children}
      </View>
    </View>
  );
}

const CourseBottomSheet = () => {
  const [createdWithin, setCreatedWithin] = useState(0);
  const [classLevel, setClassLevel] = useState(null);
  const [classType, setClassType] = useState(0);
  const [classLength, setClassLength] = useState([20, 30])

  // Multi Slider
  const TwoPoinSlider = ({
    values,
    min,
    max,
    prefix,
    postfix,
    onValuesChange,
    step,
  }) => {
    return (
      <MultiSlider
        values={values}
        sliderLength={SIZES.width - SIZES.padding * 2 - 40}
        min={min}
        max={max}
        step={step}
        markerOffsetY={20}
        selectedStyle={{
          backgroundColor: COLORS.primary,
        }}
        trackStyle={{
          height:3,
          borderRadius: 10,
          backgroundColor: COLORS.additionalColor4,
        }}
        minMarkerOverlapDistance={50}
        customMarker={(e) => {
          return (
            <View
              style={{
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  marginTop: -10,
                  height: 20,
                  width: 20,
                  borderRadius: 15,
                  borderWidth: 3,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.white,
                  ...styles.shadow,
                }}
              ></View>
              <Text
                style={{
                  marginTop: 5,
                  color: COLORS.darkGray,
                  ...FONTS.body4,
                }}
              >
                {prefix}
                {e.currentValue}
                {postfix}
              </Text>
            </View>
          );
        }}
        onValuesChangeFinish={onValuesChange}
        smoothSnapped={true}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Class type */}
        <Section title="Class Type">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {constants.class_types.map((item, index) => {
              return (
                <View key={`Class-Type-${index}`}>
                  <TouchableOpacity
                    style={{
                      padding: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: SIZES.radius,
                      width: (SIZES.width - SIZES.padding * 3) / 3,
                      backgroundColor:
                        classType == item.id ? COLORS.primary3 : COLORS.additionalColor9,
                      elevation: 2,
                    }}
                    onPress={() => setClassType(item.id)}
                  >
                    <Image
                      source={item.icon}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor:
                          classType == item.id ? COLORS.white : COLORS.gray60,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginTop: SIZES.base,
                        ...FONTS.h4,
                        color:
                          classType == item.id ? COLORS.white : COLORS.gray60,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </Section>

        {/* Class Level */}
        <Section title="Class Level">
          {constants.class_levels.map((item, index) => {
            return (
              <View key={`Class-Level-${index}`}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ ...FONTS.body4 }}>{item.label}</Text>

                  <CheckBox
                    checked={item.id == classLevel ? true : false}
                    checkedIcon="check-square"
                    checkedColor={COLORS.primary3}
                    onPress={() => setClassLevel(item.id)}
                  />
                </View>
                {constants.class_levels.length - 1 > index && <Divider />}
              </View>
            );
          })}
        </Section>

        {/* Created Within */}
        <Section title="Created Within">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {constants.created_within.map((item, index) => {
              return (
                <TextButton
                  title={`${item.label}`}
                  key={`Created-Within-${index}`}
                  onPress={() => setCreatedWithin(item.id)}
                  titleStyle={{
                    color:
                      createdWithin == item.id ? COLORS.white : COLORS.gray60,
                    ...FONTS.h4,
                  }}
                  buttonStyle={{
                    margin: 5,
                    borderRadius: SIZES.radius,
                    backgroundColor:
                      createdWithin == item.id ? COLORS.primary3 : COLORS.white,
                    borderWidth: 1,
                    borderColor:
                      createdWithin == item.id
                        ? COLORS.primary3
                        : COLORS.additionalColor4,
                    padding: SIZES.radius,
                  }}
                />
              );
            })}
          </View>
        </Section>

        {/* Class Length */}
        <Section title="Class Length">
          <View alignItems="center">
            <TwoPoinSlider
              values={classLength}
              min={15}
              max={50}
              step={1}
              postfix="min"
              onValuesChange={(values) => setClassLength(values)}
            />
          </View>
        </Section>
      </ScrollView>

      {/* Footer Buttons */}
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: SIZES.radius,
          paddingHorizontal: SIZES.padding,
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default CourseBottomSheet;