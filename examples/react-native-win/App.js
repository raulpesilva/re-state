import {createReState, createReStateDispatch} from '@raulpesilva/re-state';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const useCount = createReState('count', 0);
const dispatchCount = createReStateDispatch('count');

const App = () => {
  const [count, setCount] = useCount();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
