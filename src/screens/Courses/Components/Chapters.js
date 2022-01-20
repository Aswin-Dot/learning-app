import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import { Divider } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  images,
  dummyData,
} from "../../../../constants";
import {
  IconLabel,
  TextButton,
  HorizontalCourseCard,
} from "../../../components";

const Chapters = ({ route, navigation, appTheme }) => {
  const { selectedCourse } = route.params;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Course Details */}
      <View style={{ paddingHorizontal: SIZES.padding }}>
        {/* Title */}
        <View style={{ marginTop: SIZES.radius }}>
          <Text style={{ ...FONTS.h2 }}>{selectedCourse.title}</Text>

          {/* students and duration */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.gray30,
                marginRight: SIZES.base,
                marginTop: 8,
              }}
            >
              33.5k Students
            </Text>
            <IconLabel
              icon={icons.time}
              iconStyle={{
                height: 13,
                width: 13,
                tintColor: COLORS.gray30,
              }}
              label={selectedCourse.duration}
              labelStyle={{ ...FONTS.body4, color: COLORS.gray30 }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Profile name and image */}
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={images.profile}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              resizeMode="cover"
            />

            <View style={{ marginLeft: SIZES.base }}>
              <Text style={{ ...FONTS.h3 }}>{selectedCourse.instructor}</Text>
              <Text style={{ ...FONTS.body3, color: COLORS.gray50 }}>
                UI/UX Designer
              </Text>
            </View>
          </View>

          {/* Button */}
          <TextButton
            title="Follow +"
            titleStyle={{ color: COLORS.white, ...FONTS.h4 }}
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: COLORS.primary,
              paddingHorizontal: SIZES.radius,
              paddingVertical: 3,
            }}
            onPress={() => console.log("Follow")}
          />
        </View>
      </View>

      <Divider style={{ marginVertical: SIZES.radius }} />

      {/* Popular Courses */}
      <View
        style={{
          marginVertical: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.radius,
          }}
        >
          {/* Title */}
          <Text style={{ ...FONTS.h2 }}>Popular Courses</Text>

          {/* Button */}
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.radius,
              paddingVertical: 5,
              backgroundColor: COLORS.primary,
              borderRadius: 30,
            }}
          >
            <Text style={{ ...FONTS.body4, color: COLORS.white }}>see all</Text>
          </TouchableOpacity>
        </View>

        {/* Courses */}
        <FlatList
          data={dummyData.courses_list_2}
          listKey="PopularCourses2"
          keyExtractor={(item) => `PopularCourses2-${item.id}`}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              appTheme={appTheme}
              course={item}
              containerStyle={{
                marginBottom: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate("CourseDetails", { selectedCourse: item })
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: SIZES.base }} />
          )}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { appTheme } = state.theme;

  return { appTheme };
};

export default connect(mapStateToProps)(Chapters);