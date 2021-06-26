import React from 'react';
import {View, Image} from 'react-native';
import {images, SIZES} from '../constants';

export const RenderHeader = () => {
  return (
    <View style={{width: SIZES.width, padding: 10, flexDirection: 'row'}}>
      <View
        style={{
          width: '60%',
          padding: 5,
        }}>
        <Image
          source={images.logo}
          style={{
            width: 220,
            marginTop: -20,
            marginLeft: -40,
          }}
          resizeMode="contain"
        />
        <Image
          source={images.logo_text}
          style={{width: 200, marginBottom: -20}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          width: '40%',
        }}>
        <Image source={images._1} style={{width: 120}} resizeMode="contain" />
        <Image
          source={images._2}
          style={{width: 100, alignSelf: 'flex-end', marginTop: -20}}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
