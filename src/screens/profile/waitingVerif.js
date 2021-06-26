import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SIZES, images} from '../../constants';

const Waiting = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        alignItems: 'center',
      }}>
      <Image
        source={images.waiting}
        style={{width: '100%', height: 400, resizeMode: 'contain'}}
      />

      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
        Akun kamu sedang kami Verifikasi
      </Text>
      <Text style={{color: '#fff'}}>Mohon tunggu 1x24 jam yahh :D</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Home')}
        style={{
          marginTop: 20,
          padding: 5,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 20,
        }}>
        <Text style={{color: '#000', fontSize: 14}}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Waiting;
