import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <UserContext>
      <View style={styles.container}>
        <StackNavigator />
      </View>
      <StatusBar />
    </UserContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
