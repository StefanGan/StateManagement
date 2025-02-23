import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveDietPreferences} from '../store/slices/questionnaireSlice';
import PageContainer from '../components/PageContainer';
import Question from '../components/Question';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import dietsData from '../data/Diets.json';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 2;

const DietSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleNext = () => {
    if (selectedDiet) {
      dispatch(saveDietPreferences(selectedDiet));
      navigation.navigate('Allergies');
    }
  };

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
      <Button title="Next" onPress={handleNext} disabled={!selectedDiet} />
    </View>
  );

  return (
    <PageContainer
      progress={(CURRENT_STEP / TOTAL_STEPS) * 100}
      footer={renderFooter()}>
      <Question title="Select the diets you follow" required={true}>
        {dietsData.data.map(diet => (
          <View key={diet.id} style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setSelectedDiet(diet)}>
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radio,
                    selectedDiet?.id === diet.id && styles.radioSelected,
                  ]}>
                  {selectedDiet?.id === diet.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.optionText}>{diet.name}</Text>
              </View>
              {diet.tool_tip && (
                <TouchableOpacity
                  onPress={() =>
                    setActiveTooltip(activeTooltip === diet.id ? null : diet.id)
                  }
                  style={styles.infoButton}>
                  <Text style={styles.infoIcon}>ⓘ</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {activeTooltip === diet.id && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{diet.tool_tip}</Text>
              </View>
            )}
          </View>
        ))}
      </Question>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3F1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3D54',
    marginBottom: 24,
  },
  required: {
    color: '#FF6B6B',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionContainer: {
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2D3D54',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#2D3D54',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2D3D54',
  },
  optionText: {
    fontSize: 16,
    color: '#2D3D54',
    fontWeight: '500',
  },
  infoButton: {
    padding: 4,
  },
  infoIcon: {
    fontSize: 20,
    color: '#5D6B82',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipText: {
    fontSize: 14,
    color: '#5D6B82',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#FFB3B3',
  },
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8F3F1',
    borderRadius: 2,
  },
  progressFill: {
    width: '50%', // 2/4 for second step
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
});

export default DietSelection;
