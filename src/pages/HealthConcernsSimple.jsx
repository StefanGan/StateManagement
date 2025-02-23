import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveHealthConcerns,
  selectFormErrors,
  selectFormProgress,
  setCurrentStep,
} from '../store/slices/questionnaireSlice';
import PageContainer from '../components/PageContainer';
import Question from '../components/Question';
import Button from '../components/Button';
import healthConcernsData from '../data/Healthconcern.json';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;

const HealthConcernsSimple = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useSelector(selectFormErrors);
  const formProgress = useSelector(selectFormProgress);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(setCurrentStep(CURRENT_STEP));
  }, [dispatch]);

  useEffect(() => {
    if (formErrors.healthConcerns) {
      setError(formErrors.healthConcerns);
    }
  }, [formErrors]);

  const handleConcernSelect = concern => {
    setError(null);
    setSelectedConcerns(prev => {
      const isSelected = prev.some(c => c.id === concern.id);
      if (isSelected) {
        return prev.filter(c => c.id !== concern.id);
      }
      if (prev.length >= 5) {
        setError('Maximum 5 health concerns allowed');
        return prev;
      }
      return [...prev, concern];
    });
  };

  const moveItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= selectedConcerns.length) return;

    setSelectedConcerns(prev => {
      const newItems = [...prev];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  };

  const validateForm = () => {
    if (selectedConcerns.length === 0) {
      setError('Please select at least one health concern');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(saveHealthConcerns(selectedConcerns));
      if (!formErrors.healthConcerns) {
        navigation.navigate('DietSelection');
      }
    }
  };

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={selectedConcerns.length === 0}
      />
    </View>
  );

  return (
    <PageContainer
      progress={(CURRENT_STEP / TOTAL_STEPS) * 100}
      footer={renderFooter()}>
      <Question
        title="Select the top health concerns"
        required={true}
        subtitle="(upto 5)"
        error={error}>
        <View style={styles.concernsContainer}>
          {healthConcernsData.data.map(concern => {
            const isSelected = selectedConcerns.some(c => c.id === concern.id);
            return (
              <TouchableOpacity
                key={concern.id}
                onPress={() => handleConcernSelect(concern)}
                style={[
                  styles.concernButton,
                  isSelected && styles.concernButtonSelected,
                  concern.name.length > 12 && styles.concernButtonLarge,
                ]}>
                <Text
                  style={[
                    styles.concernButtonText,
                    isSelected && styles.concernButtonTextSelected,
                  ]}>
                  {concern.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedConcerns.length > 0 && (
          <>
            <Text style={styles.priorityTitle}>Prioritize your concerns</Text>
            <Text style={styles.prioritySubtitle}>Use arrows to reorder</Text>
            {selectedConcerns.map((concern, index) => (
              <View key={concern.id} style={styles.priorityItem}>
                <View style={styles.priorityContent}>
                  <Text style={styles.priorityNumber}>{index + 1}</Text>
                  <Text style={styles.priorityText}>{concern.name}</Text>
                </View>
                <View style={styles.reorderButtons}>
                  <TouchableOpacity
                    style={[
                      styles.reorderButton,
                      index === 0 && styles.reorderButtonDisabled,
                    ]}
                    disabled={index === 0}
                    onPress={() => moveItem(index, index - 1)}>
                    <Text style={styles.reorderButtonText}>↑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.reorderButton,
                      index === selectedConcerns.length - 1 &&
                        styles.reorderButtonDisabled,
                    ]}
                    disabled={index === selectedConcerns.length - 1}
                    onPress={() => moveItem(index, index + 1)}>
                    <Text style={styles.reorderButtonText}>↓</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
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
    marginBottom: 4,
  },
  required: {
    color: '#FF6B6B',
  },
  subtitle: {
    fontSize: 16,
    color: '#5D6B82',
    marginBottom: 24,
  },
  concernsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginTop: 16,
  },
  concernButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2D3D54',
    backgroundColor: 'white',
    margin: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  concernButtonLarge: {
    minWidth: 160,
  },
  concernButtonSelected: {
    backgroundColor: '#2D3D54',
    borderColor: '#2D3D54',
  },
  concernButtonText: {
    color: '#2D3D54',
    fontSize: 14,
    fontWeight: '500',
  },
  concernButtonTextSelected: {
    color: 'white',
  },
  priorityTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3D54',
    marginTop: 32,
    marginBottom: 8,
  },
  selectedList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  priorityItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  priorityText: {
    fontSize: 16,
    color: '#2D3D54',
    fontWeight: '500',
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
  priorityContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  reorderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  reorderButton: {
    padding: 8,
    backgroundColor: '#E8F3F1',
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reorderButtonDisabled: {
    opacity: 0.5,
  },
  reorderButtonText: {
    fontSize: 18,
    color: '#2D3D54',
    fontWeight: '600',
  },
  prioritySubtitle: {
    fontSize: 14,
    color: '#5D6B82',
    marginBottom: 16,
    textAlign: 'center',
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
    backgroundColor: '#E8F3F1', // Light mint background
    borderRadius: 2,
  },
  progressFill: {
    width: '25%', // 1/4 for first step
    height: '100%',
    backgroundColor: '#FF6B6B', // Coral color matching the Next button
    borderRadius: 2,
  },
});

export default HealthConcernsSimple;
