import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {resetQuestionnaire} from '../store/slices/questionnaireSlice';

const Welcome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStart = () => {
    // Reset the questionnaire when starting fresh
    dispatch(resetQuestionnaire());
    navigation.navigate('HealthConcerns');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to DailyVita</Text>
        <Text style={styles.subtitle}>
          Hello, we are here to make your life healthier and happier
        </Text>

        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/Medical_Care.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.description}>
          We will ask couple of questions to better understand your vitamin
          need.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3F1',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2D3D54',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5D6B82',
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  illustration: {
    width: '100%',
    height: 240,
  },
  description: {
    fontSize: 16,
    color: '#5D6B82',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Welcome;
