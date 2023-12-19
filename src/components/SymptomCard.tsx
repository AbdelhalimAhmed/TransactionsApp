import React, { useRef } from 'react';
import { Text, StyleSheet, View, Pressable, Animated } from 'react-native';
import ReAnimated, { FadeInDown, SlideOutLeft } from 'react-native-reanimated';

import { useCurrentTheme } from '../utils/customHooks';
import { SPACING, BORDER_RADIUS, FONT_SIZE, COLORS } from '../attributes';
import { Symptom } from '../store/symptomsSlice';
import StyledText from './StyledText';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

interface SymptomCardProps {
  symptom: Symptom;
  onDeleteSymptom: () => void
}
type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;
type CallbackFn = () => void;

const CARD_HEIGHT = 100;
const AnimatedActionButton = Animated.createAnimatedComponent(Pressable);

// render one action button
const renderRightAction = (
  text: string,
  color: string,
  x: number,
  progress: AnimatedInterpolation,
  onPressButton: CallbackFn
) => {
  const transInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <AnimatedActionButton
      style={[{ backgroundColor: color, transform: [{ translateX: transInterpolate }] }, styles.actionButton]}
      onPress={onPressButton}
    >
      <StyledText>{text}</StyledText>
    </AnimatedActionButton>
  );
};

//action buttons when swipe card
const renderRightActions = (
  progress: AnimatedInterpolation,
  onDelete: CallbackFn,
  onEdit: CallbackFn
) => (
  <View style={styles.actionButtons}>
    {renderRightAction('Edit', COLORS.silver, 160, progress, onEdit)}
    {renderRightAction('Delete', COLORS.red, 80, progress, onDelete)}
  </View>
);

const SymptomCard: React.FC<SymptomCardProps> = ({
  symptom,
  onDeleteSymptom,
}) => {
  const { colors } = useCurrentTheme();
  const swipeCardRef = useRef<Swipeable>(null);

  const handleDeleteSymptom = () => {
    swipeCardRef?.current?.close();
    onDeleteSymptom()
  };

  const handleEditSymptom = () => {
    swipeCardRef?.current?.close();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        ref={swipeCardRef}
        friction={2}
        rightThreshold={30}
        renderRightActions={(progress: AnimatedInterpolation) =>
          renderRightActions(progress, handleDeleteSymptom, handleEditSymptom)
        }
      >
        <ReAnimated.View
          key={symptom.id}
          style={[styles.card, { backgroundColor: colors.symptomCardBg }]}
          entering={FadeInDown.delay(300)}
          exiting={SlideOutLeft.delay(300)}>

          <StyledText weight='bold' numberOfLines={3}>
            {symptom.name}
          </StyledText>
          <StyledText size='s' weight='medium'>
            Date: <Text style={{ color: colors.primary }}>{Intl.DateTimeFormat('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'shortGeneric'
            }).format(new Date(symptom.date))}</Text>
          </StyledText>
          <StyledText size='s' weight='medium'>
            Severity: <Text style={{ color: colors.primary }}>{symptom.severity}</Text>
          </StyledText>
          <StyledText size='s' color='grey' >
            {symptom.description}
          </StyledText>
        </ReAnimated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: SPACING.xs,
    flex: 1,
    minHeight: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    gap: SPACING.xs,
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    width: 160 + SPACING.m,
    borderTopRightRadius: BORDER_RADIUS.m,
    borderBottomRightRadius: BORDER_RADIUS.m,
    overflow: 'hidden',
    margin: SPACING.xs,
    marginLeft: -SPACING.m
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SymptomCard;