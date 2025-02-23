import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Question = ({title, required = false, children}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.question}>
        {title}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 32,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3D54',
    marginBottom: 16,
    lineHeight: 28,
  },
  required: {
    color: '#FF6B6B',
  },
});

export default Question;
