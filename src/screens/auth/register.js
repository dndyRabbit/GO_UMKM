import React, {useState} from 'react';
import {Container, Content, Form, Item, Input, Label} from 'native-base';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {RenderHeader} from '../../components/authHeader';
import {BASE_URL} from '../../../api';
import {images, SIZES} from '../../constants';

const {width} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registerButton = async () => {
    setLoading(true);

    if (confirmPassword !== state.password) {
      setLoading(false);
      return alert('Password do not match');
    }

    axios.post(`${BASE_URL}/auth/register`, state).then(respone => {
      if (respone.data.error) {
        const error = respone.data.error;
        setLoading(false);
        setError(error);

        console.log(error);
      } else {
        setLoading(false);
        alert('RegisterSuccess');

        navigation.replace('Login');
      }
    });
  };

  const renderRegisterForm = () => {
    return (
      <View>
        <Form>
          {error && (
            <Text
              style={{
                textAlign: 'right',
                fontStyle: 'italic',
                color: 'orange',
                paddingRight: 20,
                marginBottom: -30,
                fontSize: 12,
              }}>
              {error}
            </Text>
          )}
          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Username</Label>
            <Input
              value={state.username}
              onChangeText={text => setState({...state, username: text})}
            />
          </Item>

          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Full Name</Label>
            <Input
              value={state.fullName}
              onChangeText={text => setState({...state, fullName: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Email</Label>
            <Input
              value={state.email}
              onChangeText={text => setState({...state, email: text})}
            />
          </Item>

          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Password</Label>
            <Input
              value={state.password}
              onChangeText={text => setState({...state, password: text})}
            />
          </Item>

          <Item floatingLabel>
            <Label style={{fontSize: 16}}>Confirm Password</Label>
            <Input
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
          </Item>
          {confirmPassword !== state.password ? (
            <Text style={{fontSize: 12, color: 'orange', fontStyle: 'italic'}}>
              *Password do not match!
            </Text>
          ) : null}
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
          onPress={() => registerButton()}>
          <Text style={{color: '#fff'}}>Register</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: '#A1A1A1'}}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#99CEA4', fontStyle: 'italic'}}>Login</Text>
            </TouchableOpacity>{' '}
            Now!
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RenderHeader />
        {renderRegisterForm()}
      </ScrollView>
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
    backgroundColor: '#E4F2F2',
  },
});

export default Register;
