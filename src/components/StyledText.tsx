import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import {
  Color,
  FontSize,
  FontWeight,
  FONT_SIZE,
  FONT_WEIGHT,
} from '../attributes';
import { useCurrentTheme } from '../utils/customHooks';

type StyledTextProps = TextProps & {
  size?: FontSize;
  color?: Color;
  weight?: FontWeight;
  align?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
}

const StyledText: React.FC<StyledTextProps> = ({
  size = 'm',
  color = 'text',
  weight = 'regular',
  align = 'left',
  transform = 'none',
  ...textProps
}) => {
  const { colors } = useCurrentTheme()

  const propStyles = {
    ...FONT_SIZE[size],
    ...FONT_WEIGHT[weight],
    color: colors[color],
    textAlign: align,
    textTransform: transform
  };

  return <Text {...textProps} style={[propStyles, textProps.style]} />;
};

export default StyledText;
