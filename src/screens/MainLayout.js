import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { Shadow } from "react-native-shadow-2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { FONTS, COLORS, constants, SIZES } from '../../constants';
import { Home, Profile, Search } from "./";

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
    ...bottom_tab,
    ref: React.createRef(),
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = bottom_tabs.map((_, i) => i * SIZES.width)

    const tabIndicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map((measure) => measure.width),
    });

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: "absolute",
                left: 0,
                height: "100%",
                width: tabIndicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onBottomTabPress }) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);

  useEffect(() => {
    let ml = [];

    bottom_tabs.forEach((item) => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });

          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={{ flex: 1, flexDirection: "row" }}>

      {/* Tab indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => onBottomTabPress(index)}
          >
            <Image
              source={item.icon}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />

            <Text style={{ marginTop: 3, color: COLORS.white, ...FONTS.h3 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainLayout = () => {
    const flatListRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    const onBottomTabPress = useCallback((bottomTabIndex) => {
        flatListRef?.current?.scrollToOffset({
            offset: bottomTabIndex * SIZES.width,
        })
    }, []);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {/* Content */}
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 0,
            flexGrow: 1,
          }}
        >
          <Animated.FlatList
            ref={flatListRef}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            data={constants.bottom_tabs}
            keyExtractor={(item) => `Main-${item.id}`}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    height: SIZES.height,
                    width: SIZES.width,
                  }}
                >
                  {item.label == constants.screens.home && <Home />}
                  {item.label == constants.screens.search && <Search />}
                  {item.label == constants.screens.profile && <Profile />}
                </View>
              );
            }}
          />

          {/* bottom tab */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              marginBottom: 20,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
            }}
          >
            <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
              <View
                style={{
                  flex: 1,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary3,
                }}
              >
                <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
              </View>
            </Shadow>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
}

export default MainLayout;