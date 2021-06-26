import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {BASE_URL} from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const UserPosts = ({item, navigation}) => {
  console.log(item);
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        marginRight: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetails', {item})}
        style={{
          width: 140,
          height: 100,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: `${BASE_URL}/${item.image}`}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
      <View style={{maxWidth: 140, marginTop: 5}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="map-marker-outline"
            size={20}
            color="#99CEA4"
            style={{marginLeft: -4}}
          />
          <Text numberOfLines={1} style={{fontSize: 12, color: '#aaaaaa'}}>
            {item.alamatLengkap}
          </Text>
        </View>
      </View>
    </View>
  );
};
