import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import { Fontisto, Foundation } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos';
const TAB_KEY = '@tab';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState({});

  useEffect(() => {
    loadTodos();
    loadTab();
  }, []);

  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(TAB_KEY, working);
  };
  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem(TAB_KEY, working);
  };
  const loadTab = async () => {
    const w = await AsyncStorage.getItem(TAB_KEY);
    setWorking(w);
  };
  const onChangeText = (payload) => setText(payload);
  const addTodo = async () => {
    if (text === '') {
      return;
    }
    // save Todo
    const newTodos = {
      ...todos,
      [Date.now()]: { text, working, finished: false },
    };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText('');
  };
  const saveTodos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadTodos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      setTodos(JSON.parse(s));
    }
  };
  const deleteTodo = (key) => {
    Alert.alert('Delete to do', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: "I'm sure",
        onPress: () => {
          const newTodos = { ...todos };
          delete newTodos[key];
          setTodos(newTodos);
          saveTodos(newTodos);
        },
      },
    ]);
  };
  const finishTodo = (key) => {
    const newTodos = { ...todos };
    newTodos[key].finished = true;
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? 'white' : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addTodo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          style={styles.input}
          placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
        />
      </View>
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].working === working ? (
            <View style={styles.todo} key={key}>
              <Text
                style={{
                  ...styles.todoText,
                  textDecorationLine: todos[key].finished
                    ? 'line-through'
                    : 'none',
                  color: todos[key].finished ? theme.grey : 'white',
                }}
              >
                {todos[key].text}
              </Text>
              <View style={styles.todoActions}>
                <TouchableOpacity style={styles.actionsBtn}>
                  <Foundation name="pencil" size={18} color={theme.grey} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionsBtn}
                  onPress={() => finishTodo(key)}
                >
                  <Fontisto name="check" size={18} color={theme.grey} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionsBtn}
                  onPress={() => deleteTodo(key)}
                >
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsBtn: {
    marginLeft: 15,
  },
});
