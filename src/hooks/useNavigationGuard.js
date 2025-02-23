import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const useNavigationGuard = (requiredFields, redirectTo) => {
  const navigation = useNavigation();
  const questionnaire = useSelector(state => state.questionnaire);

  useEffect(() => {
    const hasRequiredFields = requiredFields.every(field => {
      const value = questionnaire[field];
      return Array.isArray(value) ? value.length > 0 : value !== null;
    });

    if (!hasRequiredFields) {
      navigation.navigate(redirectTo);
    }
  }, [navigation, requiredFields, redirectTo, questionnaire]);
};
