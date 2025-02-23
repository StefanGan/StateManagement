import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const RadioButton = ({value, selected, onPress}) => {
  const displayValue =
    typeof value === 'string'
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;

  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => onPress(value)}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{displayValue}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  radioText: {
    fontSize: 16,
    color: '#2D3D54',
  },
});

export default RadioButton;
