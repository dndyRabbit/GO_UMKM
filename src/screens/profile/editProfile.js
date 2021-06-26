import React, {useState} from 'react';
import {Container, Content, Form, Item, Input, Label} from 'native-base';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

const EditProfile = () => {
  const [state, setState] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    axios
      .put(`${BASE_URL}/profile/editProfile`, state, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(respone => {
        if (respone.data.error) {
          return alert(respone.data.error);
        }
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
          <Item floatingLabel>
            <Label>Fullname</Label>
            <Input
              value={state.fullName}
              onChangeText={text => setState({...state, fullName: text})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Phone</Label>
            <Input
              value={state.phoneNumber}
              onChangeText={text => setState({...state, phoneNumber: text})}
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

export default EditProfile;
