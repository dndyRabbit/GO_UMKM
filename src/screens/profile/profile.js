import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../context/AuthProvider';

const Profile = ({navigation}) => {
  const {setUser, user} = useContext(AuthContext);

  console.log(user);

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    setUser({});
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: '#45BDC6',
          width: SIZES.width,
          height: '35%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            position: 'absolute',
            top: 50,
            left: 20,
            color: '#fff',
          }}>
          Profile
        </Text>
      </View>
    );
  };

  const RenderProfile = () => {
    return (
      <View
        style={{
          width: SIZES.width * 0.9,
          padding: 10,
          backgroundColor: '#A9D4B4',
          marginTop: -80,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: 'https://dyom.gtagames.nl/avatars/avatar16960.png',
              }}
              resizeMode="cover"
              style={{
                width: 80,
                height: 80,
                borderRadius: 80 / 2,
                position: 'absolute',
                top: -60,
              }}
            />
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
                {user.username}
              </Text>
              <Text style={{fontSize: 14, color: '#fff'}}>{user.fullName}</Text>
            </View>
          </View>
          {!user.verifies[0] && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Verification')}
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F1F1F1',
                borderRadius: 5,
                paddingHorizontal: 5,
              }}>
              <Icon name="account-cancel-outline" size={20} color="#000" />
              <Text style={{fontSize: 12, marginLeft: 5}}>Not Verified</Text>
            </TouchableOpacity>
          )}
          {user.verifies[0] && user.verifies[0].status === 'verifying' && (
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F1F1F1',
                borderRadius: 5,
                paddingHorizontal: 5,
              }}>
              <Icon name="account-clock-outline" size={20} color="#000" />
              <Text style={{fontSize: 12, fontStyle: 'italic', marginLeft: 5}}>
                Verifying
              </Text>
            </View>
          )}
          {user.verifies[0] && user.verifies[0].status === 'verified' && (
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#5286F7',
                borderRadius: 5,
                paddingHorizontal: 5,
              }}>
              <Icon name="account-check-outline" size={20} color="#fff" />
              <Text
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  marginLeft: 5,
                  color: '#fff',
                }}>
                Verified
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const RenderContent = () => {
    return (
      <View
        style={{
          width: SIZES.width * 0.9,
          padding: 10,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#A9D4B4',
            borderRadius: 10,
            padding: 10,
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="account-edit" size={20} />
            <Text style={{marginLeft: 10, fontSize: 14}}>Edit Account</Text>
          </View>
          <Icon name="menu-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#A9D4B4',
            borderRadius: 10,
            padding: 10,
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="lock-reset" size={20} />
            <Text style={{marginLeft: 10, fontSize: 14}}>Change Password</Text>
          </View>
          <Icon name="menu-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#A9D4B4',
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="information-variant" size={20} />
            <Text style={{marginLeft: 10, fontSize: 14}}>About</Text>
          </View>
          <Icon name="menu-right" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderLogout = () => {
    return (
      <View
        style={{
          width: SIZES.width * 0.9,
          padding: 10,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#A9D4B4',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text>Logout</Text>
          <Icon name="logout" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      <RenderProfile />
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <RenderContent />
        <RenderLogout />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rulerLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 30,
  },
});

export default Profile;
