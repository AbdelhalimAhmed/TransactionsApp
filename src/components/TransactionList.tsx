import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import TransactionCard from './TransactionCard';
import StyledText from './StyledText';

import { Transaction } from '../store/transactionsSlice';
import ROUTES from '../navigation/routes';
import { useAppNavigation } from '../navigation/hooks';
import { SPACING } from '../attributes';
import { useCurrentTheme } from '../utils/customHooks';

interface TransactionListProps {
  transactions?: Transaction[];
  onDeleteTransaction: (transaction: Transaction) => void
}

const EmptyList = () => {
  const { navigate } = useAppNavigation();
  const { colors } = useCurrentTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={styles.noTransactionsContainer}>
      <Ionicons
        onPress={() => navigate(ROUTES.CREATE_SYMPTOM)}
        name="add-circle"
        suppressHighlighting={true}
        size={44}
        color={colors.primary}
      />
      <StyledText>No Transactions Found</StyledText>
    </Animated.View>
  )
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction
}) => {

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionCard transaction={item} onDeleteTransaction={() => onDeleteTransaction(item)} />
    ),
    [onDeleteTransaction],
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyList />}
      contentContainerStyle={styles.contentContainerStyle}
      contentInsetAdjustmentBehavior={transactions?.length ? 'automatic' : 'never'}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: SPACING.s,
  },
  noTransactionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default TransactionList;
