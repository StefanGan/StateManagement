import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveAllergies} from '../store/slices/questionnaireSlice';
import PageContainer from '../components/PageContainer';
import Question from '../components/Question';
import Button from '../components/Button';
import allergiesData from '../data/allergies.json';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 3;

const Allergies = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchText.trim()) {
      const filtered = allergiesData.data.filter(
        allergy =>
          allergy.name.toLowerCase().includes(searchText.toLowerCase()) &&
          !selectedAllergies.some(selected => selected.id === allergy.id),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchText, selectedAllergies]);

  const handleSelectAllergy = allergy => {
    setSelectedAllergies(prev => [...prev, allergy]);
    setSearchText('');
    setSuggestions([]);
  };

  const handleRemoveAllergy = allergyId => {
    setSelectedAllergies(prev => prev.filter(item => item.id !== allergyId));
  };

  const handleNext = () => {
    dispatch(saveAllergies(selectedAllergies));
    navigation.navigate('Lifestyle');
  };

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );

  return (
    <PageContainer
      progress={(CURRENT_STEP / TOTAL_STEPS) * 100}
      footer={renderFooter()}>
      <Question
        title="Write any specific allergeies or sensitivity towards specific things"
        subtitle="(optional)">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Type to search allergies..."
            placeholderTextColor="#5D6B82"
          />
          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map(allergy => (
                <TouchableOpacity
                  key={allergy.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectAllergy(allergy)}>
                  <Text style={styles.suggestionText}>{allergy.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {selectedAllergies.length > 0 && (
          <View style={styles.selectedContainer}>
            <View style={styles.selectedContentContainer}>
              {selectedAllergies.map(allergy => (
                <TouchableOpacity
                  key={allergy.id}
                  style={styles.allergyTag}
                  onPress={() => handleRemoveAllergy(allergy.id)}>
                  <Text style={styles.allergyTagText}>{allergy.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
    marginBottom: 24,
    lineHeight: 32,
  },
  optional: {
    color: '#5D6B82',
    fontSize: 16,
    fontWeight: '400',
  },
  inputContainer: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3D54',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  suggestionItem: {
    padding: 12,
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: '#2D3D54',
  },
  selectedContainer: {
    marginTop: 16,
  },
  selectedContentContainer: {
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#2D3D54',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  allergyTagText: {
    color: 'white',
    fontSize: 14,
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
    width: '75%', // 3/4 for third step
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
});

export default Allergies;
