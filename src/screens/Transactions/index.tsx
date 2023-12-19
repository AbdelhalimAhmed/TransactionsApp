import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ROUTES from '../../navigation/routes';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppDispatch, useTransactionsSelector } from '../../store/hooks';
import { FloatingButton, TransactionList } from '../../components';
import { Transaction, removeTransaction } from '../../store/transactionsSlice';

type TransactionsProps = NativeStackScreenProps<RootStackParamList, ROUTES.SYMPTOMS>;

function Transactions() {
  const { navigate } = useNavigation<TransactionsProps['navigation']>();
  const { transactionsEntities } = useTransactionsSelector();
  const dispatch = useAppDispatch();

  const handleDeleteTransaction = (transaction: Transaction) => {
    dispatch(removeTransaction(transaction))
  }

  return (
    <>
      <TransactionList transactions={transactionsEntities} onDeleteTransaction={handleDeleteTransaction} />
      {Boolean(transactionsEntities.length) && <FloatingButton onClickButton={() => navigate(ROUTES.CREATE_SYMPTOM)} />}
    </>
  );
}

export default Transactions;
