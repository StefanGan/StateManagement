import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const getButtonStyle = () => {
    if (variant === 'primary') {
      return [
        styles.button,
        styles.primaryButton,
        disabled && styles.buttonDisabled,
        style,
      ];
    }
    return [styles.button, styles.secondaryButton, style];
  };

  const getTextStyle = () => {
    if (variant === 'primary') {
      return styles.primaryButtonText;
    }
    return styles.secondaryButtonText;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: '#FFB3B3',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
