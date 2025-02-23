import React, {useState, useCallback, memo, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveHealthConcerns} from '../store/slices/questionnaireSlice';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProgressBar = () => {
  const progressWidth = (CURRENT_STEP / TOTAL_STEPS) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, {width: `${progressWidth}%`}]} />
      </View>
      <Text style={styles.progressText}>
        {CURRENT_STEP} of {TOTAL_STEPS}
      </Text>
    </View>
  );
};

const healthConcerns = [
  {id: '1', name: 'Sleep'},
  {id: '2', name: 'Immunity'},
  {id: '3', name: 'Stress'},
  {id: '4', name: 'Joint Support'},
  {id: '5', name: 'Digestion'},
  {id: '6', name: 'Mood'},
  {id: '7', name: 'Energy'},
  {id: '8', name: 'Hair, Skin, Nails'},
  {id: '9', name: 'Weight Loss'},
  {id: '10', name: 'Fitness'},
  {id: '11', name: 'Special Medical Condition'},
];

const ConcernButton = memo(({concern, isSelected, onPress}) => (
  <TouchableOpacity
    key={concern.id}
    onPress={onPress}
    style={[styles.concernButton, isSelected && styles.concernButtonSelected]}>
    <Text
      style={[
        styles.concernButtonText,
        isSelected && styles.concernButtonTextSelected,
      ]}>
      {concern.name}
    </Text>
  </TouchableOpacity>
));

const HealthConcerns = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const flatListRef = useRef(null);

  const handleConcernSelect = useCallback(concern => {
    try {
      setSelectedConcerns(prevConcerns => {
        const isAlreadySelected = prevConcerns.some(c => c.id === concern.id);

        if (isAlreadySelected) {
          return prevConcerns.filter(c => c.id !== concern.id);
        }

        if (prevConcerns.length < 5) {
          return [...prevConcerns, {...concern}];
        }

        return prevConcerns;
      });
    } catch (error) {
      console.error('Error selecting concern:', error);
    }
  }, []);

  const handleDragEnd = useCallback(({data}) => {
    try {
      if (Array.isArray(data) && data.length > 0) {
        setSelectedConcerns(data);
      }
    } catch (error) {
      console.error('Error during drag end:', error);
    }
  }, []);

  const handleNext = () => {
    dispatch(saveHealthConcerns(selectedConcerns));
    navigation.navigate('DietSelection');
  };

  const renderItem = useCallback(({item, drag, isActive}) => {
    if (!item?.id || !item?.name) return null;

    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={drag}
          delayLongPress={150}
          disabled={isActive}
          style={[
            styles.priorityItem,
            isActive && styles.priorityItemDragging,
          ]}>
          <Text style={styles.priorityText}>{item.name}</Text>
          <View style={styles.dragHandle}>
            <Text style={styles.dragHandleDots}>⋮</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>
        Select the top health concerns
        <Text style={styles.required}>*</Text>
      </Text>
      <Text style={styles.subtitle}>(upto 5)</Text>

      <View style={styles.concernsGrid}>
        {healthConcerns.map(concern => (
          <ConcernButton
            key={concern.id}
            concern={concern}
            isSelected={selectedConcerns.some(c => c.id === concern.id)}
            onPress={() => handleConcernSelect(concern)}
          />
        ))}
      </View>

      {selectedConcerns.length > 0 && (
        <Text style={styles.priorityTitle}>Prioritize</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList
        ref={flatListRef}
        data={selectedConcerns}
        onDragEnd={handleDragEnd}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        dragItemOverflow={true}
        autoscrollThreshold={50}
        dragHitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        activationDistance={20}
      />

      <View style={styles.footer}>
        <ProgressBar />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedConcerns.length === 0 && styles.nextButtonDisabled,
            ]}
            disabled={selectedConcerns.length === 0}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3F1',
  },
  header: {
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
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
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  concernButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2D3D54',
    backgroundColor: 'white',
    marginBottom: 8,
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
    marginBottom: 16,
  },
  priorityItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
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
  priorityItemDragging: {
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    transform: [{scale: 1.02}],
  },
  priorityText: {
    fontSize: 16,
    color: '#2D3D54',
    fontWeight: '500',
    flex: 1,
  },
  dragHandle: {
    padding: 8,
  },
  dragHandleDots: {
    fontSize: 24,
    color: '#2D3D54',
    fontWeight: '600',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
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
  progressContainer: {
    marginBottom: 20,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E8F3F1',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  progressText: {
    color: '#5D6B82',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
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
});

export default HealthConcerns;
