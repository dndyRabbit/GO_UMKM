import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {SIZES} from '../constants';

const categories = [
  {name: 'Terdekat'},
  {name: 'Termahal'},
  {name: 'Termurah'},
  {name: 'Views'},
  {name: 'Likes'},
];

export const PostComponent = ({change, selected}) => {
  return (
    <View style={{width: SIZES.width, padding: 10, alignItems: 'center'}}>
      <ScrollView horizontal>
        {categories.map((item, index) => (
          <TouchableOpacity
            onPress={() => change(item.name)}
            key={index}
            style={{
              paddingRight: 10,
              marginRight: 10,
            }}>
            <Text
              style={{color: selected === item.name ? '#45BDC6' : '#C4C4C4'}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
