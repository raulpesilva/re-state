import { StatusBar } from 'expo-status-bar';
import type { ReactElement } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createGetReState, createReState, createReStateDispatch, createReStateSelect } from '@raulpesilva/re-state';

type Count = number;

export const COUNT = 'count';
export const countInitialValue = 0;

export const useCount = createReState<Count>(COUNT, countInitialValue);
export const useCountSelect = createReStateSelect<Count>(COUNT);
export const dispatchCount = createReStateDispatch<Count>(COUNT);
export const getCount = createGetReState<Count>(COUNT);
export const resetCount = (): void => {
  dispatchCount(countInitialValue);
};

const App = (): ReactElement => {
  const [count, setCount] = useCount();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable onPress={() => setCount((previous) => previous - 100)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <View style={styles.wrapperCount}>
          <Text style={styles.count}>{count}</Text>
        </View>
        <Pressable onPress={() => dispatchCount((previous) => previous + 100)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <Pressable onPress={resetCount} style={styles.resetButton}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    flexDirection: 'row',
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#0099ff',
  },
  resetButton: {
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#0099ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  wrapperCount: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  count: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
