import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, SPACING, } from '../attributes';
import StyledText from './StyledText';
import Animated, { FadeInRight } from 'react-native-reanimated';

type InputProps = TextInputProps & {
  label?: string;
  placeholder?: string;
  error?: string
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  multiline,
  children,
  ...textInputProps
}) => {

  return (
    <Animated.View style={styles.container} entering={FadeInRight.delay(400)}>
      {/* LABEL */}
      {label &&
        <StyledText size='s' color='grey'>
          {label}
        </StyledText>
      }
      <View style={[styles.inputContainer, { minHeight: multiline ? 150 : null }]}>
        {children ||
          <TextInput
            placeholder={placeholder}
            underlineColorAndroid={'transparent'}
            multiline={multiline}
            {...textInputProps}
          />}
      </View>
      <StyledText size='s' color='red'>{error || " "}</StyledText>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xs
  },
  inputContainer: {
    borderColor: COLORS.border,
    alignSelf: 'stretch',
    borderRadius: BORDER_RADIUS.xs,
    padding: SPACING.m,
    marginVertical: SPACING.xs,
    borderWidth: 1
  },

})

export default Input;
