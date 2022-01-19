
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Divider,
  LinearProgress,
  ListItem,
} from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// redux
import { connect } from "react-redux";
import { toggleTheme } from "../../redux/Theme/actions";

import { TextButton, RadioButton } from "../../components";
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  images,
  dummyData,
} from "../../../constants";

const Profile = ({ appTheme, toggleTheme }) => {
    const [radio1, setRadio1] = useState(false)
    const [radio2, setRadio2] = useState(false)

    // Select Image
    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }

      setSelectedImage({ localUri: pickerResult.uri });
    };

    // Theme handler
    const toggleThemeHandler = () => {
      if (appTheme?.name == "dark") {
        toggleTheme("light")
      } else {
        toggleTheme("dark")
      }
    }

    // Render component
    const RenderProfile = ({ item, radioButton = false, value, setValue }) => (
      <TouchableOpacity onPress={() => console.log(item.title)}>
        <ListItem containerStyle={{ backgroundColor: appTheme?.backgroundColor1 }}>
          <View
            style={{
              padding: SIZES.radius,
              borderRadius: 30,
              backgroundColor: appTheme?.backgroundColor3,
            }}
          >
            {/* Image */}
            <Image
              source={item.icon}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.primary,
                opacity: 1,
              }}
              resizeMode="contain"
            />
          </View>

          {/* Content */}
          <ListItem.Content>
            {item?.subtitle && (
              <ListItem.Subtitle
                style={{ ...FONTS.body4, color: COLORS.gray40 }}
              >
                {item.subtitle}
              </ListItem.Subtitle>
            )}
            <ListItem.Title style={{ ...FONTS.h3, color: appTheme?.textColor }}>
              {item.title}
            </ListItem.Title>
          </ListItem.Content>

          {/* Icon */}
          {radioButton ? (
            <RadioButton isSelected={value} onPress={() => setValue(!value)} />
          ) : (
            <Entypo
              name="chevron-small-right"
              size={24}
              color={appTheme?.tintColor}
            />
          )}
        </ListItem>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1, backgroundColor: appTheme?.backgroundColor1 }}>
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
          <Text style={{ ...FONTS.h2, color: appTheme?.textColor }}>
            Profile
          </Text>

          <TouchableOpacity onPress={() => toggleThemeHandler()}>
            {appTheme?.name == "light" ? (
              <MaterialIcons
                name="brightness-4"
                size={28}
                color={appTheme?.tintColor}
              />
            ) : (
              <Image
                source={icons.sun}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: appTheme?.tintColor,
                }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Contents */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding,
          }}
        >
          {/* ------------ profile card ------------- */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              paddingVertical: 20,
              borderRadius: SIZES.radius,
              backgroundColor: appTheme?.backgroundColor2,
              alignItems: "center",
            }}
          >
            {/* Profile Image */}
            <TouchableOpacity
              style={{ width: 80, height: 80 }}
              onPress={openImagePickerAsync}
            >
              <Image
                source={
                  selectedImage == null
                    ? images.profile
                    : { uri: selectedImage.localUri }
                }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                  padding: SIZES.base,
                  backgroundColor: COLORS.primary,
                  borderRadius: 25,
                }}
              >
                <Image
                  source={icons.camera}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: COLORS.white,
                  }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>

            {/* Profile info */}
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
              }}
            >
              {/* name */}
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                }}
              >
                Aswin Raj
              </Text>

              {/* Role */}
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.white,
                  marginTop: SIZES.base,
                }}
              >
                React Native Developer
              </Text>

              {/* progress */}
              <View style={{ marginTop: SIZES.radius }}>
                <LinearProgress
                  color={COLORS.primary}
                  trackColor={COLORS.white}
                  value={0.58}
                  variant="determinate"
                  style={{
                    borderRadius: SIZES.radius,
                    height: 8,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                    Overall Progress
                  </Text>
                  <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                    58%
                  </Text>
                </View>
              </View>

              {/* Button */}
              <TextButton
                title="+ Become Member"
                titleStyle={{ color: appTheme?.textColor2, ...FONTS.h4 }}
                buttonStyle={{
                  borderRadius: 30,
                  backgroundColor: appTheme?.backgroundColor4,
                  paddingHorizontal: SIZES.radius,
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  alignItems: "flex-start",
                }}
                onPress={() => console.log("Become Member")}
              />
            </View>
          </View>

          {/* ---------------------- Contents ----------------------- */}
          {/* Detail 1 */}
          <View
            style={{
              marginTop: SIZES.padding,
              padding: SIZES.base,
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray10,
            }}
          >
            <FlatList
              keyExtractor={(item) => `ProfileDetails1-${item.id}`}
              data={dummyData.profile_details1}
              showsHorizontalScrollIndicator={false}
              listKey="ProfileDetails1"
              ItemSeparatorComponent={() => (
                <Divider style={{ width: "90%", alignSelf: "center" }} />
              )}
              renderItem={({ item, index }) => <RenderProfile item={item} />}
            />
          </View>

          {/* Detail 2 */}
          <View
            style={{
              marginTop: SIZES.padding,
              padding: SIZES.base,
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray10,
            }}
          >
            {/* item1 */}
            <RenderProfile item={dummyData.profile_details2[0]} />
            <Divider style={{ width: "90%", alignSelf: "center" }} />

            {/* Item2 */}
            <RenderProfile
              radioButton
              item={dummyData.profile_details2[1]}
              value={radio1}
              setValue={setRadio1}
            />
            <Divider style={{ width: "90%", alignSelf: "center" }} />

            {/* Item3 */}
            <RenderProfile
              radioButton
              item={dummyData.profile_details2[2]}
              value={radio2}
              setValue={setRadio2}
            />
          </View>
        </ScrollView>
      </View>
    );
}

const mapStateToProps = (state) => {
  const { appTheme, error } = state.theme;

  return { appTheme, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: (themeType) => dispatch(toggleTheme(themeType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
