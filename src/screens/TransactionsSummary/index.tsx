import React from 'react';

import { StyledText } from '../../components';
import styles from './styles';
import { View } from 'react-native';
import useMonthlySummary from '../../utils/useMonthlySummary';


function TransactionsSummary() {
  const { monthlyExpenseSummary, monthlyIncomeSummary } = useMonthlySummary()

  return (
    <>
      <View style={styles.card}>
        <StyledText size='m'>Your current month income: </StyledText>
        <StyledText size='l' align='center' weight='bold'>{monthlyIncomeSummary}$</StyledText>
      </View>
      <View style={styles.card}>
        <StyledText size='m'>Your current month expense: </StyledText>
        <StyledText size='l' align='center' weight='bold'>{monthlyExpenseSummary}$</StyledText>
      </View>
    </>
  );
}

export default TransactionsSummary;
