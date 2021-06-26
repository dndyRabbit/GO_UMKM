import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../api';

export const PostCard = ({item, navigation}) => {
  return (
    <View
      style={{
        marginBottom: 20,
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => navigation.replace('PostDetails', {item})}
        activeOpacity={0.9}>
        <Image
          source={{uri: `${BASE_URL}/${item.image}`}}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#fff', 'transparent']}
          style={{
            position: 'absolute',
            bottom: 59,
            padding: 10,

            paddingLeft: 15,
            paddingRight: 15,
            borderTopRightRadius: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Rp.{item.harga}</Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#fff', 'transparent']}
          style={{
            position: 'absolute',
            bottom: 20,
            padding: 10,

            paddingLeft: 15,
            paddingRight: 15,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 10,
          }}>
          <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
            {item.title}
          </Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 2}}
          colors={['#fff', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 10,
              color: '#000',
              marginRight: 10,
            }}>
            Views: 999+
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 10, color: '#000'}}>
            Likes: {item.likes.length}
          </Text>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            maxWidth: '80%',
          }}>
          <Icon name="map-marker-outline" color="#99CEA4" size={20} />
          <Text numberOfLines={1} style={{color: '#AAAAAA', fontSize: 12}}>
            {item.alamatLengkap}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
