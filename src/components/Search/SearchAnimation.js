import { Animated } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

export const AnimatedIcon = Animated.createAnimatedComponent(AwesomeIcon);

const animatedValue = new Animated.Value(0);

export const inputAnimationWidth = animatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["100%", "90%"],
});

export const inputAnimationAction = {
  transform: [
    {
      translateX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      }),
    },
  ],
};

export const arrowAnimationAction = {
  transform: [
    {
      translateX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 5],
      }),
    },
  ],
};

export const animatedTransition = Animated.spring(animatedValue, {
  toValue: 1,
  useNativeDriver: false,
});

export const animatedTransitionReset = Animated.spring(animatedValue, {
  toValue: 0,
  useNativeDriver: false, //in the course is true
});
