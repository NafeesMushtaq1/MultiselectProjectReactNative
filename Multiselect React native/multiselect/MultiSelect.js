import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
var deviceHeight = Dimensions.get('window').height;

class MyListItem extends React.PureComponent {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <TouchableHighlight
          onPress={this.props.onPress.bind(this)}
          underlayColor="#616161">
          <Text style={this.props.style}>{this.props.item.label}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    var selected = {};
    if (this.props.selectedItems) {
      var items = this.props.selectedItems.split(',');
      items.forEach(function(item) {
        selected[item] = true;
      });
    }
    this.state = {
      selectedItems: selected,
    };
  }

  onSelectItem(item) {
    var previousItems = this.state.selectedItems;
    var itemState = previousItems[item.key];
    if (!itemState) {
      previousItems[item.key] = true;
    } else {
      var newState = itemState ? false : true;
      previousItems[item.key] = newState;
    }
    this.setState({
      selectedItems: previousItems,
    });
    var allItems = [];
    var joinedItems = Object.keys(previousItems);
    joinedItems.forEach(function(key) {
      if (previousItems[key]) allItems.push(key);
    });
    var selectedItem = null;
    if (allItems.length > 0) selectedItem = allItems.join();
    this.props.onValueChange(selectedItem);
  }

  getStyle(item) {
    try {
      console.log(this.state.selectedItems[item.key]);
      return this.state.selectedItems[item.key]
        ? styles.itemTextSelected
        : styles.itemText;
    } catch (e) {
      return styles.itemText;
    }
  }

  _renderItem = ({item}) => {
    return (
      <MyListItem
        style={this.getStyle(item)}
        onPress={this.onSelectItem.bind(this, item)}
        item={item}
      />
    );
  };
  render() {
    return (
      <View style={styles.rootView}>
        <FlatList
          style={styles.list}
          initialNumToRender={10}
          extraData={this.state}
          data={this.props.data}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    height: deviceHeight / 2,
  },
  itemText: {
    padding: 8,
    color: '#fff',
  },
  itemTextSelected: {
    padding: 8,
    color: '#fff',
    backgroundColor: '#757575',
  },
  list: {
    flex: 1,
  },
});
