import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import SymptomCard from './SymptomCard';
import StyledText from './StyledText';

import { Symptom } from '../store/symptomsSlice';
import ROUTES from '../navigation/routes';
import { useAppNavigation } from '../navigation/hooks';
import { SPACING } from '../attributes';
import { useCurrentTheme } from '../utils/customHooks';

interface SymptomListProps {
  symptoms?: Symptom[];
  onDeleteSymptom: (symptom: Symptom) => void
}

const EmptyList = () => {
  const { navigate } = useAppNavigation();
  const { colors } = useCurrentTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={styles.noSymptomsContainer}>
      <Ionicons
        onPress={() => navigate(ROUTES.CREATE_SYMPTOM)}
        name="add-circle"
        suppressHighlighting={true}
        size={44}
        color={colors.primary}
      />
      <StyledText>No Symptoms Found</StyledText>
    </Animated.View>
  )
};

const SymptomList: React.FC<SymptomListProps> = ({
  symptoms,
  onDeleteSymptom
}) => {

  const renderItem = useCallback(
    ({ item }: { item: Symptom }) => (
      <SymptomCard symptom={item} onDeleteSymptom={() => onDeleteSymptom(item)} />
    ),
    [onDeleteSymptom],
  );

  return (
    <FlatList
      data={symptoms}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyList />}
      contentContainerStyle={styles.contentContainerStyle}
      contentInsetAdjustmentBehavior={symptoms?.length ? 'automatic' : 'never'}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: SPACING.s,
  },
  noSymptomsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default SymptomList;
