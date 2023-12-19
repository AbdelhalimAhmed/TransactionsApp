import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from './styles';
import ROUTES from '../../navigation/routes';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppDispatch, useSymptomsSelector } from '../../store/hooks';
import { FloatingButton, SymptomList } from '../../components';
import { Symptom, removeSymptom } from '../../store/symptomsSlice';

type SymptomsProps = NativeStackScreenProps<RootStackParamList, ROUTES.SYMPTOMS>;

function Symptoms() {
  const { navigate } = useNavigation<SymptomsProps['navigation']>();
  const { symptomsEntities } = useSymptomsSelector();
  const dispatch = useAppDispatch();

  const handleDeleteSymptom = (symptom: Symptom) => {
    dispatch(removeSymptom(symptom))
  }

  return (
    <>
      <SymptomList symptoms={symptomsEntities} onDeleteSymptom={handleDeleteSymptom} />
      {Boolean(symptomsEntities.length) && <FloatingButton onClickButton={() => navigate(ROUTES.CREATE_SYMPTOM)} />}
    </>
  );
}

export default Symptoms;
