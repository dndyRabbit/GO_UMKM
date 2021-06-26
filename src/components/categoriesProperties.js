import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {SIZES, images} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CategoriesProperties = ({navigation}) => {
  return (
    <View style={{width: SIZES.width, padding: 10}}>
      <Text style={{marginBottom: 20, fontSize: 16, color: '#45BDC6'}}>
        Categories Property
      </Text>
      <ScrollView horizontal contentContainerStyle={{marginHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Ruko')}
          style={{alignItems: 'center', marginRight: 30}}>
          <Icon name="domain" size={25} color="#A9D4B4" />
          <Text style={{color: '#4FAA67'}}>Ruko</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Pujasera')}
          style={{alignItems: 'center', marginRight: 30}}>
          <Icon name="home-modern" size={25} color="#A9D4B4" />
          <Text style={{color: '#4FAA67'}}>Pujasera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Lapak')}
          style={{alignItems: 'center', marginRight: 30}}>
          <Icon name="warehouse" size={25} color="#A9D4B4" />
          <Text style={{color: '#4FAA67'}}>Lapak</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center', marginRight: 30}}>
          <Icon name="help-circle-outline" size={25} color="#A9D4B4" />
          <Text style={{color: '#4FAA67'}}>Unknown</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', marginRight: 30}}>
          <Icon name="help-circle-outline" size={25} color="#A9D4B4" />
          <Text style={{color: '#4FAA67'}}>Unknwon</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
