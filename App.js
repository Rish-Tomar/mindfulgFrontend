
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignup from './components/LoginSignup';
import  Profile  from './components/Profile.js';
import { NativeRouter, Route,Routes} from "react-router-native";
import { createContext, useReducer, useState } from 'react';
import Context from './Context/Context';

const Stack=createNativeStackNavigator()
export default function App() {
  return (
    <Context>
      <NativeRouter>
        <Routes>
          <Route exact path='/' Component={LoginSignup}></Route>
          <Route path='/profile' Component={Profile}></Route>
        </Routes>
      </NativeRouter>
    </Context>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
