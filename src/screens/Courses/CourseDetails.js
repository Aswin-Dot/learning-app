import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Animated
} from "react-native";
import { Video } from "expo-av";
import * as Sharing from "expo-sharing";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

import {
  TextButton,
  VerticalCourseCart,
  HorizontalCourseCard,
  CategoriesCard,
} from "../../components";
import TopNavigation from "./Navigation/TopNavigation"

import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  images,
  dummyData,
} from "../../../constants";

const CourseDetails = ({ navigation, route }) => {
    const { selectedCourse } = route.params;
    const [playVideo, setPalyVideo] = React.useState(false);

    const openShareDialogAsync = async () => {
      const shareOptions = {
        dialogTitle: selectedCourse.title,
      };

      let sharingAvailable = await Sharing.isAvailableAsync()

      if (sharingAvailable) {
        try {
          const ShareResponse = await Sharing.shareAsync(
            
            shareOptions
          );
          console.log(JSON.stringify(ShareResponse));
        } catch (error) {
          console.log("Error : ", error);
        }
      } else {
        alert("Sharing is'nt available in your device!");
        retrun;
      }
    }

    // Renders
    const renderHeader = () => {

      const renderHeaderComponent = () => {
        return (
          <>
            {/* Back */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.back}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.black,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Favourite and share */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={openShareDialogAsync}>
                <Image
                  source={icons.media}
                  style={{ width: 25, height: 25, tintColor: COLORS.white }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Image
                  source={icons.favourite_outline}
                  style={{ width: 25, height: 25, tintColor: COLORS.white }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        );
      }

      if (playVideo) {
        return (
          <View style={{ 
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.base,
            height: 85,
            backgroundColor: COLORS.black,
            alignItems: "flex-end"
          }}>
            {renderHeaderComponent()}
          </View>
        )
      } else {
        return (
          <View
            style={{
              position: "absolute",
              top: SIZES.height > 800 ? 50 : 25,
              left: 0,
              right: 0,
              flexDirection: "row",
              paddingHorizontal: SIZES.radius,
              zIndex: 1,
            }}
          >
            {renderHeaderComponent()}
          </View>
        );
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        {/* Header */}
        {renderHeader()}

        {/* Video */}
        <View
          style={{
            height: playVideo ? 180 : 265,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.gray90,
          }}
        >
          <ImageBackground
            source={selectedCourse?.thumbnail}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            resizeMode="cover"
          >
            {/* play */}
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => setPalyVideo(true)}
            >
              <Image
                source={icons.play}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.white,
                  marginLeft: 3,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>

          {playVideo && (
            <Video
              source={{
                uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              useNativeControls
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: COLORS.black,
              }}
              shouldPlay
              resizeMode="cover"
            />
          )}
        </View>

        {/* Top Navigation */}
        <TopNavigation selectedCourse={selectedCourse} />
      </View>
    );
};

export default CourseDetails;
