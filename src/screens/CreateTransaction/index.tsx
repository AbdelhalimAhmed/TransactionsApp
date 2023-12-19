import React, { useState } from 'react';
import { Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';
import useCurrentTheme from '../../utils/useCurrentTheme';
import { Input, StyledText } from '../../components';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { TransactionType, addTransaction, transactionsType } from '../../store/transactionsSlice';
import { useAppDispatch } from '../../store/hooks';

type FormData = {
  amount: number;
  transactionType: TransactionType;
  description: string;
  date: string;
}

const AnimatedButton = Animated.createAnimatedComponent(Button);

const schema = yup.object({
  amount: yup.number().positive().required(),
  date: yup.date().required(),
  transactionType: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().max(400),
}).required();

export const TransactionsTypeArray = Object.keys(transactionsType).map((key, index) => ({
  label: transactionsType[key as TransactionType],
  id: index,
  value: key
}))

function CreateTransaction() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: 0,
      description: '',
      transactionType: '',
      category: '',
      date: new Date()
    },
    resolver: yupResolver(schema)
  });
  const { colors } = useCurrentTheme();
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation()

  const [open, setOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    //used timestamp here as a unique key, we could consider "id generator" algorithm as well.
    //casting date to string here as redux can't store it as a date, for more info: https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
    dispatch(addTransaction({
      ...data, id: Date.now(),
      date: data.date.toString(),
    }))
    //TODO: add confirmation animation toast here
    goBack()
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={[styles.container, { backgroundColor: colors.transactionCardBg }]}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {/* HEADER */}
        <Animated.View style={styles.header} entering={FadeInDown.delay(400)}>
          <StyledText size='l' weight='bold' align='center'>Enter Transaction details</StyledText>
        </Animated.View>

        {/* TRANSACTION TYPE INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Animated.View style={styles.dropDownContainer} entering={FadeInRight.delay(400)}>
                <StyledText size='s' color='grey'>
                  {"Transaction Type"}
                </StyledText>
                <DropDownPicker
                  open={open}
                  style={styles.dropDown}
                  value={value as TransactionType}
                  items={TransactionsTypeArray}
                  setOpen={setOpen}
                  onChangeValue={onChange}
                  setValue={onChange}
                  listMode={"SCROLLVIEW"}
                />
                <StyledText size='s' color='red'>{error?.message || " "}</StyledText>
              </Animated.View>
            )
          }}
          name="transactionType"
        />

        {/* CATEGORY INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
              label='Category'
              placeholder="transaction category"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name="category"
        />

        {/* AMOUNT INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
              label='Amount'
              placeholder="transaction amount"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              error={error?.message}
            />
          )}
          name="amount"
        />

        {/* DATE INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Input
                label='Date'
                error={error?.message}
              >
                <DateTimePicker
                  value={value ?? new Date()}
                  mode={'date'}
                  onChange={(_, selectedDate) => {
                    onChange(selectedDate)
                  }}
                  style={styles.dateInput}
                />
              </Input>

            )
          }}
          name="date"
        />

        {/* DESCRIPTION INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
              label='Description'
              placeholder="transaction description"
              multiline
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name="description"
        />

        <AnimatedButton entering={FadeInDown.delay(500)} color={colors.primary} title="Submit" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateTransaction;
