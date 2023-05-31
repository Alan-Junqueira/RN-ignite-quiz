import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor, withTiming } from 'react-native-reanimated'

import { THEME } from '../../styles/theme';
import { styles } from './styles';
import { useEffect } from 'react';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

const PresableAnimated = Animated.createAnimatedComponent(Pressable)

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1)
  const checked = useSharedValue(1)

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR]
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      )
    }
  })


  const handlePressIn = () => {
    scale.value = withSpring(1.1)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked])

  return (
    <PresableAnimated
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={
        [
          styles.container,
          { borderColor: COLOR },
          animatedContainerStyle
        ]
      }
      {...rest}
    >
      <Animated.Text style={
        [
          styles.title,
          animatedTextStyle,
        ]}
      >
        {title}
      </Animated.Text>
    </PresableAnimated>
  );
}