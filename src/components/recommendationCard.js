import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SIZES} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../api';

export const RecommendationCard = ({item}) => {
  return (
    <View
      style={{
        width: 220,
        padding: 20,
        height: 200,
        backgroundColor: `${'#fff'}`,
        margin: 5,
        borderRadius: 10,
      }}>
      <Image
        source={{
          uri: `${BASE_URL}/${item.image}`,
        }}
        style={{
          width: '100%',
          height: 100,
          borderWidth: 1,
          borderColor: '#A1A1A1',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
      <Text style={{color: '#000', fontWeight: 'bold'}}>Rp. {item.harga}</Text>
      <Text numberOfLines={1} style={{marginBottom: 10}}>
        {item.title}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Icon name="map-marker-outline" size={20} color="#99CEA4" />
        <Text numberOfLines={1} style={{marginLeft: 5, color: '#A1A1A1'}}>
          {item.alamatLengkap}
        </Text>
      </View>
    </View>
  );
};
