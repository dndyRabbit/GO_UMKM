import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SIZES, images} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../context/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import FormData from 'form-data';

const Verification = ({navigation}) => {
  const [verif, setVerif] = useState({
    image: '',
    status: 'verifying',
  });

  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const uploadKTP = async () => {
    let uploadData = new FormData();
    console.log(verif.image);

    uploadData.append('image', {
      uri: `${verif.image}`,

      type: 'image/jpeg',
      name: 'image.jpg',
    });
    uploadData.append('status', verif.status);
    uploadData.append('fullName', user.fullName);
    setLoading(true);
    console.log(uploadData);
    axios({
      url: `${BASE_URL}/verifies`,
      method: 'POST',
      data: uploadData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        accessToken: await AsyncStorage.getItem('accessToken'),
      },
    })
      .then(res => {
        console.log('Upload Successfully', res.data);
        setVerif({});
        navigation.replace('Waiting');
        setLoading(false);
      })
      .catch(err => {
        console.log('user canceleed', err);
        if (err) {
          alert('Please take a photo of your KTP first, before upload!');
          setLoading(false);
        }
        setLoading(false);
      });
  };

  const pickPhotos = () => {
    ImagePicker.openCamera({
      width: 250,
      height: 180,
      cropping: true,
    })
      .then(image => {
        setVerif({...verif, image: image.path});
      })
      .catch(err => {
        console.log('user canceled', err);
      });
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: SIZES.width,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" color="#45BDC6" size={20} />
        </TouchableOpacity>
        <Text>Verification Profiles</Text>
        <Icon name="help-rhombus-outline" color="#45BDC6" size={25} />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#45BDC6',
              padding: 10,
              paddingHorizontal: 20,
              marginBottom: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: verif.image
                  ? verif.image
                  : 'https://cdn.iconscout.com/icon/free/png-512/id-card-1483446-1256404.png',
              }}
              style={{
                width: 250,
                height: 180,
              }}
              resizeMode="cover"
            />
            {verif.image ? (
              <TouchableOpacity
                onPress={() => pickPhotos()}
                style={{
                  backgroundColor: '#45BDC6',
                  padding: 5,
                  borderRadius: 3,
                  width: 110,
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#fff'}}>Take again</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => pickPhotos()}
                style={{
                  backgroundColor: '#45BDC6',
                  padding: 5,
                  borderRadius: 3,
                  marginBottom: 20,
                  width: 130,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#fff'}}>Take a photo</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Please Upload your KTP
          </Text>
          <Text style={{fontSize: 14, color: '#b1b1b1'}}>
            make sure you upload your photo KTP clearly
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => uploadKTP()}
          style={{
            paddingHorizontal: 20,
            backgroundColor: '#45BDC6',
            padding: 5,
            borderRadius: 3,
          }}>
          <Text style={{fontSize: 14, color: '#fff'}}>Upload your KTP</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      {renderContent()}
      {loading && (
        <View
          style={{
            width: SIZES.width,
            height: SIZES.height,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}>
          <Image
            source={images.loading3}
            style={{
              width: 170,
              height: 170,
              position: 'absolute',
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: SIZES.height,
    width: SIZES.width,
  },
});

export default Verification;
