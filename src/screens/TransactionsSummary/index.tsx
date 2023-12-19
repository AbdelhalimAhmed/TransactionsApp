import React, { useState } from 'react';

import { useAppDispatch, useTransactionsSelector } from '../../store/hooks';
import { StyledText, TransactionList } from '../../components';
import { Transaction, TransactionType, removeTransaction } from '../../store/transactionsSlice';
import Animated, { FadeInRight } from 'react-native-reanimated';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { TransactionsTypeArray } from '../CreateTransaction';
import { View } from 'react-native';
import useMonthlySummary from '../../utils/useMonthlySummary';


function TransactionsSummary() {
  const { transactionsEntities } = useTransactionsSelector();
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
