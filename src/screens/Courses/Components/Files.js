import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  dummyData,
} from "../../../../constants";

const Files = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Students */}
      <View
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ ...FONTS.h2, marginVertical: SIZES.base, fontSize: 25 }}>
          Students
        </Text>

        {/* contents */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: SIZES.base,
          }}
        >
          {dummyData?.course_details?.students.map((item, index) => {
            if (index < 3) {
              return (
                <View
                  key={`Students-${index}`}
                  style={{ marginLeft: index != 0 ? SIZES.base : 0 }}
                >
                  <Image
                    source={item.thumbnail}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                </View>
              );
            }

            if(index > 2 && dummyData?.course_details?.students.length > 3) {
              return (
                <TouchableOpacity
                  key={`Students-${index}`}
                  style={{ marginLeft: SIZES.base }}
                  onPress={() => console.log("See all")}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.primary }}>
                    see all
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>

      {/* Files */}
      <View style={{ marginVertical: SIZES.radius }}>
        <Text
          style={{
            ...FONTS.h2,
            fontSize: 25,
            marginVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
          }}
        >
          Files
        </Text>

        {/* contents */}
        {dummyData?.course_details?.files.map((item, index) => (
          <View key={`Files-${index}`}>
            <TouchableOpacity onPress={() => console.log(item.name)}>
              <ListItem style={{ paddingHorizontal: SIZES.radius, marginVertical: -8 }}>
                {/* Image */}
                <Image
                  source={item.thumbnail}
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 5,
                  }}
                  resizeMode="contain"
                />

                {/* Content */}
                <ListItem.Content>
                  <ListItem.Title style={{ ...FONTS.h3, color: COLORS.black }}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{ ...FONTS.body4, color: COLORS.gray40 }}
                  >
                    {item.author}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    style={{ ...FONTS.body5, color: COLORS.black }}
                  >
                    {item.upload_date}
                  </ListItem.Subtitle>
                </ListItem.Content>

                {/* Size */}
                <Image
                  source={icons.menu}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />
              </ListItem>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Files;
