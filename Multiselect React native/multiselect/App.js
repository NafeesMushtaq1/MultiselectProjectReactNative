/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MultiSelect from './MultiSelect';
const App: () => React$Node = () => {
  var data = [{key: 'key1', label: 'Item 1'}, {key: 'key2', label: 'Item 2'}];
  var selectedItem = '';

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor:'lightblue'}}>
        <Text>Select Multi Options</Text>
        <MultiSelect
          data={data}
          selectedItems={selectedItem}
          onValueChange={itemValue =>
            // eslint-disable-next-line no-undef
            (selectedItem = itemValue)
          }
        />
      </SafeAreaView>
    </>
  );
};

export default App;
