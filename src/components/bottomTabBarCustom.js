import React from 'react';
import {View, TouchableOpacity} from 'react-native';

export const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View
        style={{
          marginHorizontal: 5,
          width: 60,
          marginTop: 2,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginHorizontal: 10,
          width: 55,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: 60,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }
};
