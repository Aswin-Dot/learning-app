import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  TextButton,
  VerticalCourseCart,
  HorizontalCourseCard,
  CategoriesCard,
} from "../../components";

import { FlatList } from "react-native-gesture-handler";

import { COLORS, SIZES, icons, FONTS, images, dummyData } from "../../../constants";

const Home = ({ appTheme }) => {

  const navigation = useNavigation();

  // Render section
  const Section = ({ children, containerStyle, title }) => {
    return (
      <View
        style={{
          marginVertical: SIZES.radius,
          ...containerStyle,
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
          <Text style={{ ...FONTS.h2, color: appTheme?.textColor }}>
            {title}
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.radius,
              paddingVertical: 5,
              backgroundColor: COLORS.primary,
              borderRadius: 30,
            }}
          >
            <Text style={{ ...FONTS.body4, color: appTheme?.textColor4}}>see all</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ ...FONTS.h2, color: appTheme?.textColor }}>
            Hello, Aswin!
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray40 }}>
            Monday, 17th Jan 2022
          </Text>
        </View>

        <TouchableOpacity onPress={() => console.log("Bell icon")}>
          <Image
            source={icons.notification}
            style={{ height: 25, width: 25, tintColor: appTheme?.tintColor }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Contants */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
        }}
      >
        {/* ---------- Start Learning --------------- */}
        <ImageBackground
          source={images.featured_bg_image}
          style={{
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.base,
            alignItems: "flex-start",
            padding: 15,
          }}
          imageStyle={{
            borderRadius: SIZES.radius,
          }}
          resizeMode="cover"
        >
          {/* Info */}
          <View>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
                textTransform: "uppercase",
              }}
            >
              How to
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                ...FONTS.h2,
                color: COLORS.white,
              }}
            >
              Make your brand more visibil with our checklist
            </Text>
            <Text
              style={{
                marginTop: SIZES.radius * 1.5,
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              By Scott Harris
            </Text>
          </View>

          {/* Image */}
          <Image
            source={images.start_learning}
            style={{
              width: "100%",
              height: 100,
              marginTop: SIZES.padding,
            }}
          />

          {/* Button */}
          <TextButton
            title="Start Learning"
            titleStyle={{ color: COLORS.black, ...FONTS.h4 }}
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.radius,
            }}
            onPress={() => console.log("Start Learning")}
          />
        </ImageBackground>

        {/* -------------- Courses --------------- */}
        <FlatList
          horizontal
          overScrollMode="never"
          data={dummyData.courses_list_1}
          listKey="Courses"
          keyExtractor={(item) => `Courses-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          renderItem={({ item, index }) => (
            <VerticalCourseCart
              appTheme={appTheme}
              course={item}
              containerStyle={{
                padding: SIZES.base,
                marginLeft: index == 0 ? SIZES.radius : 0,
                marginRight:
                  index == dummyData.courses_list_1.length - 1
                    ? SIZES.radius
                    : 0,
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: SIZES.base }} />

        {/* ---------------- Categories ----------- */}
        <Section title="Categories">
          <FlatList
            horizontal
            overScrollMode="never"
            data={dummyData.categories}
            listKey="Categories"
            keyExtractor={(item) => `Categories-${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.base,
            }}
            renderItem={({ item, index }) => (
              <CategoriesCard
                category={item}
                onPress={() =>
                  navigation.navigate("CourseListing", {
                    category: item,
                    sharedElementPrefix: "Home",
                  })
                }
                sharedElementPrefix="Home"
                containerStyle={{
                  width: 150,
                  height: 120,
                  marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                  marginRight:
                    index == dummyData.categories.length - 1
                      ? SIZES.padding
                      : 0,
                }}
              />
            )}
          />
        </Section>

        {/* Popular Courses */}
        <Section title="Popular Courses">
          <FlatList
            data={dummyData.courses_list_2}
            listKey="PopularCourses"
            keyExtractor={(item) => `PopularCourses-${item.id}`}
            showsVerticalScrollIndicator={false}
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
        </Section>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { appTheme } = state.theme;

  return { appTheme };
};

export default connect(mapStateToProps)(Home);
