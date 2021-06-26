import React, {useState, useContext} from 'react';
import {Form, Item, Input, Label} from 'native-base';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import axios from 'axios';
import {RenderHeader} from '../../components/authHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../context/AuthProvider';
import {BASE_URL} from '../../../api';
import {SIZES, images} from '../../constants';

const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser, user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const loginButton = async () => {
    setLoading(true);
    const data = {usernameOrEmail, password};
    await axios
      .post(`${BASE_URL}/auth/login`, data)
      .then(respone => {
        if (respone.data.error) {
          setLoading(false);
          alert(respone.data.error);
        } else {
          AsyncStorage.setItem('accessToken', respone.data.token);
          setLoading(false);
          setUser({
            ...user,
            status: true,
          });
        }
      })
      .catch(err => {
        if (err) {
          setLoading(false);
        }
        console.log(err);
      });
  };

  const renderLoginInput = () => {
    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Username or Email</Label>
            <Input
              value={usernameOrEmail}
              onChangeText={text => setUsernameOrEmail(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Password</Label>
            <Input
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </Item>
        </Form>
        <TouchableOpacity
          style={{
            marginTop: 50,
            width: width * 0.5,
            height: 40,
            backgroundColor: '#C7DDCC',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 30,
          }}
          onPress={() => loginButton()}>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: '#A1A1A1'}}>
            Didnt Have an account yet?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#99CEA4', fontStyle: 'italic'}}>
                Register
              </Text>
            </TouchableOpacity>{' '}
            Now!
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <RenderHeader />
          {renderLoginInput()}
        </>
      ) : (
        <View
          style={{
            width: SIZES.width,
            height: SIZES.height,
            position: 'absolute',
            backgroundColor: '#E4F2F2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={images.loading3}
            style={{
              width: 170,
              height: 170,
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
    backgroundColor: '#E4F2F2',
  },
});

export default Login;
