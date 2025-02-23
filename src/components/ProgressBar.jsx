import React from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressBar = ({progress}) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, {width: `${progress}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: '100%',
    backgroundColor: '#2D3D54',
    borderRadius: 2,
  },
});

export default ProgressBar;
