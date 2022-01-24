import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Divider, ListItem, LinearProgress } from "react-native-elements";
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

      {/* Videos */}
      <View>
        {dummyData?.course_details?.videos.map((item, index) => (
          <View key={`VideosList-${index}`}>
            <TouchableOpacity onPress={() => console.log(item.title)}>
              <ListItem
                containerStyle={{
                  paddingHorizontal: SIZES.padding,
                  backgroundColor: item?.is_playing
                    ? COLORS.additionalColor11
                    : null,
                }}
              >
                {/* Image */}
                <Image
                  source={
                    item?.is_complete
                      ? icons.completed
                      : item?.is_playing
                      ? icons.play_1
                      : icons.lock
                  }
                  style={{
                    height: 40,
                    width: 40,
                    // tintColor: COLORS.primary,
                    opacity: 1,
                  }}
                  resizeMode="contain"
                />

                {/* Content */}
                <ListItem.Content>
                  <ListItem.Title
                    style={{ ...FONTS.h3, color: appTheme?.textColor }}
                  >
                    {item.title}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{ ...FONTS.body4, color: COLORS.gray40 }}
                  >
                    {item.duration}
                  </ListItem.Subtitle>
                </ListItem.Content>

                {/* Size */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ ...FONTS.body4, color: COLORS.gray40 }}>
                    {item.size}
                  </Text>
                  <Image
                    source={
                      item.is_downloaded ? icons.completed : icons.download
                    }
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 5,
                      tintColor: item.is_downloaded
                        ? COLORS.primary
                        : item.is_lock
                        ? COLORS.gray40
                        : COLORS.black,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </ListItem>
            </TouchableOpacity>

            {item?.is_playing && (
              <LinearProgress
                color={COLORS.primary}
                trackColor={COLORS.additionalColor11}
                value={
                  item?.progress.substring(0, item?.progress.length - 1) / 100
                }
                variant="determinate"
                style={{
                  marginTop: -4,
                  height: 4,
                }}
              />
            )}
          </View>
        ))}
      </View>

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
        <View
          style={{
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding,
          }}
        >
          {dummyData.courses_list_2.map((item, index) => (
            <View key={`PopularCourses2-${item.id}`}>
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

              {index < dummyData.courses_list_2.length - 1 ? (
                <Divider style={{ marginVertical: SIZES.base }} />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { appTheme } = state.theme;

  return { appTheme };
};

export default connect(mapStateToProps)(Chapters);