import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../context/AuthProvider';
import {BASE_URL} from '../../../api';
import ImagePicker from 'react-native-image-crop-picker';
import {Type} from '../../components/createPosts';
import {images, SIZES} from '../../constants';
import FormData from 'form-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const CreatePost = ({navigation}) => {
  const [postData, setPostData] = useState({
    type: '',
    title: '',
    luasBangunan: '',
    luasTanah: '',
    fasilitas: '',
    alamatLengkap: '',
    harga: '',
    description: '',
    image: '',
    status: false,
  });
  const [selectedType, setSelectedtype] = useState(null);
  const [verif, setVerif] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    // console.log(user.verifies[0].status);
    console.log(verif);

    if (!user.verifies[0]) {
      console.log('user not verified');
      setVerif(true);
    } else if (user.verifies[0].status === 'verifying') {
      console.log('user is verifying ');
      setVerif(true);
    } else if (user.verifies[0].status === 'verified') {
      console.log('user is verified');
      setVerif(false);
    }

    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const pickPhotos = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPostData({...postData, image: image.path});
    });
  };

  const onSelectedType = value => {
    console.log(value);
    setSelectedtype(value);
    setPostData({...postData, type: value.name});
  };

  const makeAPost = async () => {
    let uploadData = new FormData();
    setUploading(true);
    uploadData.append('type', postData.type);
    uploadData.append('title', postData.title);
    uploadData.append('luasBangunan', postData.luasBangunan);
    uploadData.append('luasTanah', postData.luasTanah);
    uploadData.append('fasilitas', postData.fasilitas);
    uploadData.append('alamatLengkap', postData.alamatLengkap);
    uploadData.append('harga', postData.harga);
    uploadData.append('description', postData.description);
    uploadData.append('image', {
      uri: `${postData.image}`,

      type: 'image/jpeg',
      name: 'postimage.jpg',
    });
    uploadData.append('status', postData.status);

    console.log(uploadData);

    axios({
      url: `${BASE_URL}/posts`,
      method: 'POST',
      data: uploadData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        accessToken: await AsyncStorage.getItem('accessToken'),
      },
    })
      .then(res => {
        alert('Post Successfully!');
        setPostData({});
        setUploading(false);
      })
      .catch(err => {
        alert('Mohon isi semua data terlebih dahulu');
        setUploading(false);
      });
  };

  const renderContent = () => {
    return (
      <View style={{padding: 20, paddingHorizontal: 30, width: SIZES.width}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Create A Post </Text>

        {/* Title */}
        <TextInput
          onChangeText={value => setPostData({...postData, title: value})}
          value={postData.title}
          placeholder="Title"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          style={styles.input}
        />

        {/* pilih Type bangunan */}
        <Type selected={onSelectedType} selectedType={selectedType} />

        {/* Luas Bangunan */}
        <TextInput
          onChangeText={value =>
            setPostData({...postData, luasBangunan: value})
          }
          value={postData.luasBangunan}
          placeholder="Luas Bangunan (m2)"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="number-pad"
          style={styles.input}
        />

        {/* Luas Tanah */}
        <TextInput
          onChangeText={value => setPostData({...postData, luasTanah: value})}
          value={postData.luasTanah}
          placeholder="Luas Tanah (m2)"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="number-pad"
          style={styles.input}
        />

        {/* Fasilitas */}
        <TextInput
          onChangeText={value => setPostData({...postData, fasilitas: value})}
          value={postData.fasilitas}
          placeholder="Fasilitas (kamar tidur, kamar mandi, etc...)"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          style={styles.input}
        />

        {/* Alaamt Lengkap */}
        <TextInput
          onChangeText={value =>
            setPostData({...postData, alamatLengkap: value})
          }
          value={postData.alamatLengkap}
          placeholder="Alamat Lengkap"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          style={styles.input}
        />

        {/* Harga */}
        <TextInput
          onChangeText={value => setPostData({...postData, harga: value})}
          value={postData.harga}
          placeholder="Harga"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="number-pad"
          style={styles.input}
        />

        {/* Deskripsi */}
        <View style={{padding: 5, justifyContent: 'flex-start'}}>
          <TextInput
            onChangeText={value =>
              setPostData({...postData, description: value})
            }
            value={postData.description}
            placeholder="Deskripsi..."
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            multiline={true}
            textAlignVertical="top"
            numberOfLines={10}
            style={styles.inputDesc}
          />
        </View>

        {/* Foto Produk */}
        <View
          style={{
            padding: SIZES.padding,
            marginTop: 10,
            width: '100%',
          }}>
          <Image
            source={{
              uri: postData.image
                ? postData.image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bkZX4V5o8QaYeLVo2nYurPqwOS4hDeVytU5BCz7NOPUC9hLp0vZDYIofJzDBpT2XHhc&usqp=CAU',
            }}
            resizeMode="cover"
            style={styles.inputImage}
          />
          <TouchableOpacity
            onPress={() => pickPhotos()}
            style={{
              width: 115,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#79D3C9',
              borderRadius: 3,
            }}>
            <View
              style={{
                backgroundColor: `${'#79D3C9'}77`,
                width: 100,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#79D3C9',
                borderRadius: 3,
              }}>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontSize: 12,
                  color: '#36645F',
                }}>
                Pick A Picture!
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {uploading ? (
          <Image
            source={images.loading3}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        ) : (
          <TouchableOpacity
            style={{
              marginTop: 20,
              width: width * 0.9,
              height: 40,
              backgroundColor: '#79D3C9',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 5,
            }}
            onPress={() => makeAPost()}>
            <Text style={{color: '#fff'}}>Create A Post</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const VerifCheck = () => {
    return (
      <View
        style={{
          flex: 1,
          width: SIZES.width,
          height: SIZES.height,
          backgroundColor: `rgba(0,0,0,0.7)`,
          position: 'absolute',
          zIndex: 3,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: '#fff',
            marginTop: 40,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Image
            source={images.verif2}
            style={{width: 230, height: 230}}
            resizeMode="contain"
          />
          {!user.verifies[0] ? (
            <Text style={{marginBottom: 20, fontWeight: 'bold', fontSize: 16}}>
              kamu belum verifikasi akun nih :'[
            </Text>
          ) : (
            <Text style={{marginBottom: 20, fontWeight: 'bold', fontSize: 16}}>
              Yeayy sedang diverifikasi :D
            </Text>
          )}

          <Image
            source={images.verif1}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
          {!user.verifies[0] ? (
            <>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Verifikasi akun dulu yuk
              </Text>
              <Text
                style={{marginBottom: 20, fontWeight: 'bold', fontSize: 16}}>
                baru deh pasang iklan :D
              </Text>
            </>
          ) : (
            <>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Akun kamu sedang di verifikasi
              </Text>
              <Text
                style={{marginBottom: 20, fontWeight: 'bold', fontSize: 16}}>
                Sabar yah :D
              </Text>
            </>
          )}
          {!user.verifies[0] ? (
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                backgroundColor: '#79D3C9',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>
                Verifikasi Akun
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                backgroundColor: '#79D3C9',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>
                Go to Home
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{renderContent()}</ScrollView>
      {verif && <VerifCheck />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#b1b1b1',
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: SIZES.padding,
    alignItems: 'center',
    marginBottom: 10,
    color: '#000',
  },
  inputImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#79D3C9',
  },
  inputDesc: {
    width: '100%',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#b1b1b1',
    padding: SIZES.padding,
    alignItems: 'center',
    marginBottom: 10,
    color: '#000',
  },
});

export default CreatePost;
