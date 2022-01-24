import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
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

const CommentSection = ({ commentItem, commentOption, replies }) => {
  return (
    <View style={{
      flexDirection: "row",
      marginTop: SIZES.padding
    }}>
      {/* Profile Photo */}
      <Image
        source={commentItem?.profile}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20
        }}
      />

      {/* Name & Comment */}
      <View style={{ flex: 1, marginTop: 3, marginLeft: SIZES.radius }}>
        {/* Name */}
        <Text style={{ ...FONTS.h3 }}>{commentItem?.name}</Text>

        {/* comment */}
        <Text style={{ ...FONTS.body4 }}>{commentItem?.name}</Text>
      </View>

    </View>
  )
}

const Discussions = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Discussions */}
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={item => `Discussions-${item.id}`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 70
          }}
          renderItem={({item, index}) => (
            <CommentSection
              commentItem={item}
              commentOption={
                <View style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                  paddingVertical: SIZES.base,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: COLORS.gray20
                }}>
                  {/* comment */}
                  
                  {/* Like */}

                  {/* Date */}
                </View>
              }
            />
          )}
        />
      </View>

      {/* Footer */}

    </View>
  );
};

export default Discussions;
