import React from "react";
import { TouchableOpacity, View, Image, TextInput } from "react-native";
import { SearchBar } from "react-native-elements";

import {
  COLORS,
  FONTS,
  SIZES, 
  icons
} from "../../constants";

const Search = ({ value, setSearch }) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      width: SIZES.width - (SIZES.padding * 2),
      paddingHorizontal: SIZES.radius,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.white 
    }}>
      <Image
        source={icons.search}
        style={{
          width: 25,
          height: 25,
          tintColor: COLORS.gray40
        }}
      />

      <TextInput
        style={{
          flex: 1,
          marginLeft: SIZES.base,
          ...FONTS.h4
        }}
        value={value}
        placeholder="Search for Topics, Course & Educators"
        placeholderTextColor={COLORS.gray}
        onInputChange={(value) => setSearch(value)}
      />

    </View>
  );
};

export default Search;
