import AuthStack from './AuthStack';
import AppStack from './AppStack';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user.status ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
