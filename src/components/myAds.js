import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../api';

export const MyAdsCard = ({item, setStatus}) => {
  console.log(item);
  return (
    <View
      style={{
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderLeftWidth: 3,
        borderLeftColor: '#45BDC6',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            flex: 0.9,
            height: 100,
            resizeMode: 'cover',
            borderRadius: 10,
            marginRight: 10,
          }}
          source={{uri: `${BASE_URL}/${item.image}`}}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 14, marginBottom: 10}}>
              {item.title}
            </Text>
            <Text>Rp.{item.harga}</Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Text style={{fontSize: 10}}>Views: 999+</Text>
            <Text style={{fontSize: 10, marginLeft: 5}}>
              Likes: {item.likes.length}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rulerLine} />
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{marginRight: 10}}>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Type
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Luas Bangunan
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Luas Tanah
            </Text>
          </View>

          <View>
            <Text style={{marginBottom: 5, fontSize: 12}}>{item.type}</Text>
            <Text style={{marginBottom: 5, fontSize: 12}}>
              {item.luasBangunan}
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12}}>
              {item.luasTanah}
            </Text>
          </View>
          <View style={styles.rulerLineWall} />
          <View style={{marginRight: 10}}>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Lantai
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Sertifikat
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={{marginBottom: 5, fontSize: 12}}>{item.lantai}</Text>
            <Text numberOfLines={1} style={{marginBottom: 5, fontSize: 12}}>
              {item.sertifikat}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setStatus(item.id)}
        style={{position: 'absolute', bottom: 10, right: 10}}>
        <Text style={{fontSize: 12, fontStyle: 'italic', color: '#45BDC6'}}>
          Mark as Sold
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const MyHistoryCard = ({item}) => {
  console.log(item);
  return (
    <View
      style={{
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderLeftWidth: 3,
        borderLeftColor: '#45BDC6',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', opacity: 0.4}}>
        <Image
          style={{
            flex: 0.9,
            height: 100,
            resizeMode: 'cover',
            borderRadius: 10,
            marginRight: 10,
          }}
          source={{uri: `${BASE_URL}/${item.image}`}}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 14, marginBottom: 10}}>
              {item.title}
            </Text>
            <Text>Rp.{item.harga}</Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Text style={{fontSize: 10}}>Views: 999+</Text>
            <Text style={{fontSize: 10, marginLeft: 5}}>
              Likes: {item.likes.length}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.rulerLine, {opacity: 0.4}]} />
      <View style={{width: '100%', flexDirection: 'row', opacity: 0.4}}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{marginRight: 10}}>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Type
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Luas Bangunan
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Luas Tanah
            </Text>
          </View>

          <View>
            <Text style={{marginBottom: 5, fontSize: 12}}>{item.type}</Text>
            <Text style={{marginBottom: 5, fontSize: 12}}>
              {item.luasBangunan}
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12}}>
              {item.luasTanah}
            </Text>
          </View>
          <View style={styles.rulerLineWall} />
          <View style={{marginRight: 10}}>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Lantai
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: 'bold'}}>
              Sertifikat
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={{marginBottom: 5, fontSize: 12}}>{item.lantai}</Text>
            <Text numberOfLines={1} style={{marginBottom: 5, fontSize: 12}}>
              {item.sertifikat}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setStatus(item.id)}
        style={{position: 'absolute', bottom: 10, right: 10}}>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#45BDC6'}}>
          Sold
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rulerLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C4C4C4',
    width: '100%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  rulerLineWall: {
    borderRightWidth: 0.5,
    borderRightColor: '#C4C4C4',
    height: '100%',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
});
