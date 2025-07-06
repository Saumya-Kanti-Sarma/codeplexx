import { Stack } from 'expo-router';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function _layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='index' options={{
          headerShown: false
        }} />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='+not-found' />
      </Stack>
    </SafeAreaProvider>
  )
}