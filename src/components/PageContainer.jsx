import React from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import ProgressBar from './ProgressBar';

const PageContainer = ({children, footer, progress}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>

      <View style={styles.footer}>
        {footer}
        <ProgressBar progress={progress} />
      </View>
    </SafeAreaView>
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
});

export default PageContainer;
