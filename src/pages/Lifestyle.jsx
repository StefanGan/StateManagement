import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveLifestyle,
  setCurrentStep,
} from '../store/slices/questionnaireSlice';
import PageContainer from '../components/PageContainer';
import Question from '../components/Question';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 4;

const Lifestyle = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sunExposure, setSunExposure] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [alcohol, setAlcohol] = useState(null);
  const [error, setError] = useState(null);

  // Get all questionnaire data from Redux store
  const {healthConcerns, dietPreferences, allergies} = useSelector(
    state => state.questionnaire,
  );

  useEffect(() => {
    dispatch(setCurrentStep(CURRENT_STEP));
  }, [dispatch]);

  const validateForm = () => {
    if (!sunExposure || !smoking || !alcohol) {
      setError('Please answer all questions');
      return false;
    }
    return true;
  };

  const handleFinish = () => {
    if (!validateForm()) return;

    // Save lifestyle data
    const lifestyleData = {
      sunExposure,
      smoking,
      alcohol,
    };
    dispatch(saveLifestyle(lifestyleData));

    // Prepare final data for logging for (print)
    const finalData = {
      healthConcerns: {
        selectedConcerns: healthConcerns.map((concern, index) => ({
          priority: index + 1,
          ...concern,
        })),
      },
      dietPreferences: {
        selectedDiet: dietPreferences,
      },
      allergies: {
        selectedAllergies: allergies,
      },
      lifestyle: lifestyleData,
    };

    // Log the final data
    console.log('\n=== User Questionnaire Summary ===\n');

    // Log Health Concerns with Priority
    console.log('1. Health Concerns (in priority order):');
    finalData.healthConcerns.selectedConcerns.forEach(concern => {
      console.log(`   ${concern.priority}. ${concern.name}`);
    });

    console.log('\n2. Diet Preference:');
    console.log(`   ${finalData.dietPreferences.selectedDiet?.name || 'None'}`);

    console.log('\n3. Allergies:');
    if (finalData.allergies.selectedAllergies.length > 0) {
      finalData.allergies.selectedAllergies.forEach(allergy => {
        console.log(`   - ${allergy.name}`);
      });
    } else {
      console.log('   No allergies selected');
    }

    console.log('\n4. Lifestyle:');
    console.log(`   - Limited sun exposure: ${sunExposure}`);
    console.log(`   - Smoking: ${smoking}`);
    console.log(`   - Alcohol consumption: ${alcohol} drinks per week`);

    console.log('\n=== End of Summary ===\n');

    // Navigate back to Welcome
    navigation.navigate('Welcome');
  };

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <Button
        title="Get my personalized vitamin"
        onPress={handleFinish}
        disabled={!sunExposure || !smoking || !alcohol}
      />
    </View>
  );

  return (
    <PageContainer
      progress={(CURRENT_STEP / TOTAL_STEPS) * 100}
      footer={renderFooter()}>
      <Question
        title="Is your daily exposure to sun limited?"
        required={true}
        error={error}>
        <RadioButton
          value="yes"
          selected={sunExposure === 'yes'}
          onPress={setSunExposure}
        />
        <RadioButton
          value="no"
          selected={sunExposure === 'no'}
          onPress={setSunExposure}
        />
      </Question>

      <Question
        title="Do you currently smoke (tobacco or marijuana)?"
        required={true}
        error={error}>
        <RadioButton
          value="yes"
          selected={smoking === 'yes'}
          onPress={setSmoking}
        />
        <RadioButton
          value="no"
          selected={smoking === 'no'}
          onPress={setSmoking}
        />
      </Question>

      <Question
        title="On average, how many alcoholic beverages do you have in a week?"
        required={true}
        error={error}>
        <RadioButton
          value="0-1"
          selected={alcohol === '0-1'}
          onPress={setAlcohol}
        />
        <RadioButton
          value="2-5"
          selected={alcohol === '2-5'}
          onPress={setAlcohol}
        />
        <RadioButton
          value="5+"
          selected={alcohol === '5+'}
          onPress={setAlcohol}
        />
      </Question>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
});

export default Lifestyle;
