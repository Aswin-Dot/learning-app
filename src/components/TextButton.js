import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";

import { COLORS, SIZES } from "../../constants";

const TextButton = ({
  title,
  disabled = false,
  disabledStyle,
  titleStyle,
  buttonStyle,
  containerStyle,
  onPress,
  icon,
  tintColor,
}) => {
  return (
    <View>
      <Button
        title={title}
        disabled={disabled}
        disabledStyle={{
          ...disabledStyle,
        }}
        icon={
          icon ? (
            <Image
              source={icon}
              style={{ height: 20, width: 20, marginRight: SIZES.base, ...tintColor }}
            />
          ) : null
        }
        TouchableComponent={TouchableOpacity}
        type="clear"
        titleStyle={{
          color: COLORS.white,
          ...titleStyle,
        }}
        buttonStyle={{
          borderWidth: 0,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
          ...buttonStyle,
        }}
        containerStyle={{
          ...containerStyle,
        }}
        onPress={onPress}
      />
    </View>
  );
};

export default TextButton;