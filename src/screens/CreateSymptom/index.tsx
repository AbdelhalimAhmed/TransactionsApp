import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';
import { useCurrentTheme } from '../../utils/customHooks';
import { Input, StyledText } from '../../components';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Symptom, addSymptom } from '../../store/symptomsSlice';
import { useAppDispatch } from '../../store/hooks';

type FormData = {
  name: string;
  date: Date;
  severity: number;
  description: string;
}

const AnimatedButton = Animated.createAnimatedComponent(Button);

const schema = yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  severity: yup.number().required(),
  description: yup.string().max(400).required(),
}).required();

function CreateSymptom() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
      severity: 0,
      date: new Date()
    },
    resolver: yupResolver(schema)
  });
  const { colors } = useCurrentTheme();
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation()

  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple', id: 1 },
    { label: 'Banana', value: 'banana', id: 2 }
  ]);

  const onSubmit = (data: FormData) => {
    //used timestamp here as a unique key, we could consider "id generator" algorithm as well.
    //casting date to string here as redux can't store it as a date, for more info: https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
    dispatch(addSymptom({ ...data, id: Date.now(), date: data.date.toString() }))
    //TODO: add confirmation animation toast here
    goBack()
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={[styles.container, { backgroundColor: colors.symptomCardBg }]}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {/* HEADER */}
        <Animated.View style={styles.header} entering={FadeInDown.delay(400)}>
          <StyledText size='l' weight='bold' align='center'>Enter Symptom details</StyledText>
        </Animated.View>

        {/* NAME INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
              label='Name'
              placeholder="symptom name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name="name"
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

        {/* SEVERITY INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Animated.View style={styles.dropDownContainer} entering={FadeInRight.delay(400)}>
                <StyledText size='s' color='grey'>
                  {"Category"}
                </StyledText>
                <DropDownPicker
                  open={open}
                  style={styles.dropDown}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={onChange}
                  setItems={setItems}
                  listMode={"SCROLLVIEW"}
                />
                <StyledText size='s' color='red'>{error?.message || " "}</StyledText>
              </Animated.View>
            )
          }}
          name="severity"
        />

        {/* DESCRIPTION INPUT */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
              label='Description'
              placeholder="symptom description"
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

export default CreateSymptom;
