import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withDelay,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import { Divider } from "react-native-elements";
import { SharedElement } from "react-navigation-shared-element";

import { HorizontalCourseCard, BottomSheetModal } from "../../components";
import CourseBottomSheet from "./Components/CourseBottomSheet";
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  images,
  dummyData,
} from "../../../constants";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;

const CourseListing = ({ navigation, route, appTheme }) => {
  const [ isVisible, setIsVisible ] = useState(false)
  const { category, sharedElementPrefix } = route.params;
  const flatListRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  //-------------------- Render ----------------
  const renderHeader = () => {
    const inputRange = [0, HEADER_HEIGHT- 50];

    // ANIMATIONS
    const headerSharedValue = useSharedValue(80);

    headerSharedValue.value = withDelay(
      500, 
      withTiming(0, {
        duration: 500,
      })
    );

    // fade in the title and image on screen focused
    const headerFadeAnimationStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    // Make image slide from the bottom on screen focused
    const headerTranslateAnimationStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value,
          },
        ],
      };
    });

    // shrink the hight of the bg to form a header
    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP)
      }
    })

    // To hide title and image on scroll to below
    const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
          }
        ]
      };
    });

    // To add title from above
    const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 120],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    })

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: "hidden",
          },
          headerHeightAnimatedStyle,
        ]}
      >
        <SharedElement
          style={[StyleSheet.absoluteFillObject]}
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>

        {/* Title */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: -70,
              left: 0,
              right: 0,
            },
            headerShowOnScrollAnimatedStyle,
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {category?.title}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 70,
              left: 30,
            },
            headerHideOnScrollAnimatedStyle,
          ]}
        >
          <SharedElement
            style={[StyleSheet.absoluteFillObject]}
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        {/* Back */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 40,
              left: 20,
              width: 50,
              height: 50,
            },
            headerFadeAnimationStyle,
          ]}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              if (scrollY.value >= 0 && scrollY.value <= 200) {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });
                
                setTimeout(() => {
                  headerSharedValue.value = withTiming(
                    80,
                    {
                      duration: 500,
                    },
                    () => {
                      runOnJS(navigation.goBack)();
                    }
                  );
                }, 100);
              } else {
                navigation.goBack();
              }
            }}
          >
            <Image
              source={icons.back}
              style={{
                height: 30,
                width: 30,
                tintColor: COLORS.black,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Category Image */}
        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: "absolute",
              right: 30,
              bottom: -30,
              width: 80,
              height: 160,
            },
            headerFadeAnimationStyle,
            headerTranslateAnimationStyle,
            headerHideOnScrollAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: appTheme?.backgroundColor1 }}>
      {/* Results */}
      <AnimatedFlatlist
        ref={flatListRef}
        data={dummyData.courses_list_2}
        listKey="Results"
        keyExtractor={(item) => `Results-${item.id}`}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 270,
              marginBottom: SIZES.base,
            }}
          >
            {/* Results */}
            <Text
              style={{ flex: 1, ...FONTS.body3, color: appTheme?.textColor }}
            >
              5,761 Results
            </Text>

            {/* Filter Button */}
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => setIsVisible(true)}
            >
              <Image
                source={icons.filter}
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{
          marginTop: SIZES.base,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
        renderItem={({ item, index }) => (
          <HorizontalCourseCard
            appTheme={appTheme}
            course={item}
            containerStyle={{
              marginBottom: SIZES.radius,
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: SIZES.base }} />
        )}
      />

      {/* Header */}
      {renderHeader()}

      {/* Bottom Sheet */}
      <BottomSheetModal isVisible={isVisible} Close={() => setIsVisible(false)} title="Filter">
          <CourseBottomSheet/>
      </BottomSheetModal>
    </View>
  );
};

CourseListing.sharedElements = (route, otherRoute, showing) => {
  const { category, sharedElementPrefix } = route.params;

  return [
    {
      id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
    }
  ]
};

const mapStateToProps = (state) => {
  const { appTheme } = state.theme;

  return { appTheme };
};

export default connect(mapStateToProps)(CourseListing);