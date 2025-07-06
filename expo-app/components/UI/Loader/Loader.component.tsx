import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface LoaderProps {
  color?: string;
  display?: 'flex' | 'none';
}

const Loader: React.FC<LoaderProps> = ({ color = '#25b09b', display = 'flex' }) => {
  if (display === 'none') return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
