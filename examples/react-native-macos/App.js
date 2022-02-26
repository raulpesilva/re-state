import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  createReState,
  createReStateSelect,
  createReStateDispatch,
  createGetReState,
} from '@raulpesilva/re-state';

export const COUNT = 'count';
export const countInitialValue = 0;

export const useCount = createReState(COUNT, countInitialValue);
export const useCountSelect = createReStateSelect(COUNT);
export const dispatchCount = createReStateDispatch(COUNT);
export const getCount = createGetReState(COUNT);
export const resetCount = () => dispatchCount(countInitialValue);

const App = () => {
  const [count, setCount] = useCount();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => setCount(prev => prev - 100)}
          style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <View style={styles.wrapperCount}>
          <Text style={styles.count}>{count}</Text>
        </View>
        <Pressable
          onPress={() => dispatchCount(prev => prev + 100)}
          style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <Pressable onPress={resetCount} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0099ff',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
  },
  wrapperCount: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default App;
