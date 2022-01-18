import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import {
  TextButton,
  CategoriesCard,
  Search as SearchBar
} from "../../components";
import { COLORS, SIZES, FONTS, dummyData } from "../../../constants";


const Search = () => {
  const scrollViewRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  })
  const [selectedSearch, setSelectedSearch] = useState(0);

  // search
  const [search, setSearch] = React.useState("");
  const inputRange = [0, 55];

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [55, 0],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            marginTop: 70,
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardDismissMode="on-drag"
          onScroll={onScroll}
          onScrollEndDrag={(e) => {
            if (
              e.nativeEvent.contentOffset.y > 10 &&
              e.nativeEvent.contentOffset.y < 50
            ) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: 60,
                animated: true,
              });
            }
          }}
        >
          {/* Top Searches */}
          <View style={{ marginTop: SIZES.padding }}>
            <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
              Top Searches
            </Text>
            <FlatList
              horizontal
              data={dummyData.top_searches}
              listKey="TopSearches"
              keyExtractor={(item) => `TopSearches-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: SIZES.radius,
              }}
              renderItem={({ item, index }) => (
                <TextButton
                  title={item.label}
                  titleStyle={{
                    color:
                      selectedSearch == item.id ? COLORS.white : COLORS.gray50,
                    ...FONTS.h3,
                  }}
                  buttonStyle={{
                    borderRadius: SIZES.radius,
                    backgroundColor:
                      selectedSearch == item.id
                        ? COLORS.primary
                        : COLORS.gray10,
                    padding: SIZES.radius,
                    marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                    marginRight:
                      index == dummyData.top_searches.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                  onPress={() => setSelectedSearch(item.id)}
                />
              )}
            />
          </View>

          {/* Browse Category */}
          <View style={{ marginTop: SIZES.padding }}>
            <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
              Browse Category
            </Text>

            <FlatList
              data={dummyData.categories}
              numColumns={2}
              listKey="BrowseCategories"
              keyExtractor={(item) => `BrowseCategories-${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: SIZES.radius,
              }}
              renderItem={({ item, index }) => (
                <CategoriesCard
                  category={item}
                  containerStyle={{
                    height: 130,
                    paddingBottom: SIZES.radius * 1.5,
                    width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                    marginTop: -4,
                    marginLeft:
                      (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
                  }}
                />
              )}
            />
          </View>
        </Animated.ScrollView>

        {/* Search bar */}
        <Animated.View
          style={[
            {
              position: "absolute",
              marginTop: SIZES.radius * 1.5,
              paddingHorizontal: SIZES.padding,
              height: 50,
              backgroundColor: "transparent",
            },
            searchBarAnimatedStyle,
          ]}
        >
          <Shadow radius={SIZES.radius}>
            <SearchBar value={search} setSearch={setSearch} />
          </Shadow>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
