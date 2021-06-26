import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SIZES, images} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categoriesType = [{name: 'Ruko'}, {name: 'Pujasera'}, {name: 'Lapak'}];

export const Type = ({selected, selectedType}) => {
  return (
    <View style={{width: SIZES.width, padding: 10}}>
      <Text style={{fontWeight: 'bold', color: '#000', marginBottom: 10}}>
        Type
      </Text>
      <ScrollView horizontal>
        {categoriesType.map((item, index) => (
          <TouchableOpacity
            onPress={() => selected(item)}
            style={{
              padding: 5,
              paddingHorizontal: 10,

              borderRadius: 20,
              marginRight: 5,
              backgroundColor: selectedType === item ? '#7AD1CB' : '#DBDBDB',
            }}
            key={index}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
