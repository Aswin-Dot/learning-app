import React from "react";
import { TouchableOpacity, Animated } from "react-native";

import { COLORS } from "../../constants";

const RadioButton = ({ isSelected, onPress }) => {

    const radioAnimated = React.useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary]
    })

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    })

    React.useEffect(() => {
        if(isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 200,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    }, [isSelected])

    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Animated.View
          style={{
            width: "100%",
            height: 5,
            borderRadius: 3,
            backgroundColor: lineColorAnimated
          }}
        />

        <Animated.View
          style={{
            position: "absolute",
            left: radioAnimated,
            width: 25,
            height: 25,
            borderRadius: 15,
            borderWidth: 4,
            borderColor: circleColorAnimated,
            backgroundColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    );
}

export default RadioButton;