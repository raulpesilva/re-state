import type { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createGetReState, createReState, createReStateDispatch, createReStateSelect } from '@raulpesilva/re-state';

export const COUNT = 'count';
export const countInitialValue = 0;
export const countStep = 100;

export const useCount = createReState<number>(COUNT, countInitialValue);
export const useCountSelect = createReStateSelect<number>(COUNT);
export const dispatchCount = createReStateDispatch<number>(COUNT);
export const getCount = createGetReState<number>(COUNT);
export const resetCount = (): void => dispatchCount(countInitialValue);

const App = (): JSX.Element => {
  const [count, setCount] = useCount();
  const selectedCount = useCountSelect();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>RE-STATE</Text>
      <Text style={styles.title}>Shared counter</Text>
      <Text style={styles.description}>A small React Native macOS example using shared state.</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Current value</Text>
        <Text style={styles.count}>{selectedCount}</Text>
        <View style={styles.controls}>
          <Pressable
            accessibilityLabel="Decrease count"
            accessibilityRole="button"
            onPress={() => setCount((previousCount) => previousCount - countStep)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>−</Text>
          </Pressable>
          <Text style={styles.inlineValue}>{count}</Text>
          <Pressable
            accessibilityLabel="Increase count"
            accessibilityRole="button"
            onPress={() => dispatchCount((previousCount) => previousCount + countStep)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <Pressable
          accessibilityLabel="Reset count"
          accessibilityRole="button"
          onPress={resetCount}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6fb',
    padding: 32,
  },
  eyebrow: {
    color: '#5271ff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: '#172033',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
  },
  description: {
    color: '#647089',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginTop: 28,
    maxWidth: 420,
    padding: 28,
    shadowColor: '#172033',
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    width: '100%',
  },
  label: {
    color: '#647089',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  count: {
    color: '#172033',
    fontSize: 56,
    fontWeight: '700',
    marginTop: 8,
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5271ff',
    borderRadius: 10,
    height: 42,
    justifyContent: 'center',
    width: 52,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  inlineValue: {
    color: '#172033',
    fontSize: 16,
    fontWeight: '600',
    minWidth: 72,
    textAlign: 'center',
  },
  resetButton: {
    alignItems: 'center',
    borderColor: '#dbe1ee',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#5271ff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default App;
