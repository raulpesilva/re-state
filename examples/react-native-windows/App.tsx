import { createReState, createReStateDispatch } from '@raulpesilva/re-state';
import type { ReactElement } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const useCount = createReState<number>('count', 0);
const dispatchCount = createReStateDispatch<number>('count');

const App = (): ReactElement => {
  const [count, setCount] = useCount();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>re-state</Text>
      <Text style={styles.subtitle}>React Native Windows</Text>
      <View style={styles.counter}>
        <Pressable
          accessibilityLabel="Decrease count"
          onPress={() => setCount((previousCount) => previousCount - 100)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{count}</Text>
        </View>
        <Pressable
          accessibilityLabel="Increase count"
          onPress={() => dispatchCount((previousCount) => previousCount + 100)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>Each button updates the shared count by 100.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f4f7fb',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#11243d',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#52647a',
    fontSize: 16,
    marginTop: 4,
  },
  counter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 32,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1769aa',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    width: 64,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  valueContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 16,
    minWidth: 96,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  value: {
    color: '#11243d',
    fontSize: 28,
    fontWeight: '700',
  },
  hint: {
    color: '#52647a',
    fontSize: 13,
    marginTop: 20,
  },
});

export default App;
