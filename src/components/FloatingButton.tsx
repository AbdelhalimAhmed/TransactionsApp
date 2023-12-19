import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, SPACING } from '../attributes';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingButtonProps {
  onClickButton: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClickButton }) => {
  return (
    <AnimatedPressable onPress={onClickButton} entering={FadeInDown.delay(700)} style={styles.button}>
      <Ionicons
        name="add"
        suppressHighlighting={true}
        size={40}
        color={COLORS.white}
      />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.primary,
    right: SPACING.l,
    bottom: SPACING.xxl
  }
})
export default FloatingButton;
