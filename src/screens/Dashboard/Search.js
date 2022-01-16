import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";

const Search = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        containerStyle={{
          marginVertical: 25,
          marginHorizontal: 25,
        }}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      {/* <Text>Search</Text> */}
    </View>
  );
};

export default Search;
