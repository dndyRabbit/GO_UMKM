import React, {useState} from 'react';
import {Container, Content, Form, Item, Input, Label} from 'native-base';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword,
    newPassword,
  });

  const updateProfile = async () => {
    await axios
      .put(`${BASE_URL}/profile/changePassword`, state, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        alert('Update Profile Successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel error={state.firstName ? false : true}>
            <Label>Old Password</Label>
            <Input
              value={state.oldPassword}
              onChangeText={text => setState({...state, oldPassword: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label>New Password</Label>
            <Input
              value={state.newPassword}
              onChangeText={text => setState({...state, newPassword: text})}
            />
          </Item>
        </Form>
        <TouchableOpacity
          style={{
            marginTop: 50,
            width: width * 0.9,
            height: 40,
            backgroundColor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 5,
          }}
          onPress={() => updateProfile()}>
          <Text style={{color: '#fff'}}>Update Profile</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default ChangePassword;
