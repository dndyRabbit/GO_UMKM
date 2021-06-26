import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {SIZES, images} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Item, Input, Text} from 'native-base';

export const SearchRuko = ({navigation}) => {
  return (
    <View
      style={{
        width: SIZES.width,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginRight: 10, marginLeft: -10}}>
        <Icon name="arrow-left" size={25} />
      </TouchableOpacity>
      <Item
        searchBar
        rounded
        style={{
          width: '85%',
          height: 30,
          borderColor: 'black',
          alignSelf: 'flex-end',
          marginRight: 10,
        }}>
        <Item>
          <Icon
            name="magnify"
            size={20}
            color="#45BDC6"
            style={{marginLeft: 5}}
          />
          <Input placeholder="Find Properties" style={{fontSize: 12}} />
        </Item>
      </Item>
    </View>
  );
};

export const SearchHome = () => {
  return (
    <View
      style={{
        width: SIZES.width,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Item
        searchBar
        rounded
        style={{
          width: '100%',
          height: 30,
          borderColor: 'black',
          alignSelf: 'flex-end',
          marginRight: 10,
        }}>
        <Item>
          <Icon
            name="magnify"
            size={20}
            color="#45BDC6"
            style={{marginLeft: 5}}
          />
          <Input placeholder="Find Properties" style={{fontSize: 12}} />
        </Item>
      </Item>
    </View>
  );
};
