import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Image,
} from 'react-native';
import {SIZES, images} from '../../constants';
import BannerSwiper from '../../components/bannerSwiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CategoriesProperties} from '../../components/categoriesProperties';
import {SearchHome} from '../../components/search';
import {RecommendationCard} from '../../components/recommendationCard';
import axios from 'axios';
import {BASE_URL} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../../context/AuthProvider';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const {setAllPosts, allPosts, user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  console.log(user);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(async () => {
    setWaiting(true);
    axios
      .get(`${BASE_URL}/auth/auth`, {
        headers: {accessToken: await AsyncStorage.getItem('accessToken')},
      })
      .then(respone => {
        if (respone.data.error) {
          setUser({...user, status: false});
          setWaiting(false);
        } else {
          setUser({
            verifies: respone.data.verifies,
            username: respone.data.username,
            fullName: respone.data.fullName,
            id: respone.data.id,
            status: true,
          });
          setWaiting(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });

    axios
      .get(`${BASE_URL}/posts`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        setAllPosts(res.data.listOfPosts);
        setWaiting(false);
      })
      .catch(err => {
        console.log(err);
        setWaiting(false);
      });

    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const Location = () => {
    return (
      <TouchableOpacity
        style={{
          width: SIZES.width,
          padding: 15,
          paddingBottom: 0,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="google-maps" size={25} color="#76C2AF" />
          <Text style={{marginHorizontal: 5}}>
            Kec. Kby.lama, Kota Jakarta Selatan
          </Text>
          <Icon name="chevron-down" size={20} />
        </View>
      </TouchableOpacity>
    );
  };

  const RenderRecommendationAds = () => {
    return (
      <View style={{width: SIZES.width, padding: 10}}>
        <Text style={{marginBottom: 20, fontSize: 16, color: '#45BDC6'}}>
          Recommendation Properties
        </Text>
        <ScrollView horizontal>
          {allPosts &&
            allPosts.map((item, index) => (
              <RecommendationCard key={index} item={item} />
            ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Location />
        <SearchHome />
        <BannerSwiper />
        <CategoriesProperties navigation={navigation} />
        <View style={styles.rulerLine} />
        <RenderRecommendationAds />
      </ScrollView>

      {waiting && (
        <View
          style={{
            width: SIZES.width,
            height: SIZES.height,
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 10,
          }}>
          <Image
            source={images.loading2}
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              bottom: '43%',
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
  },
  rulerLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C4C4C4',
    width: '70%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default Home;
