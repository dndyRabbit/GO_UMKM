import React, {useEffect, useState, useContext} from 'react';
import {View, Text, useWindowDimensions, ScrollView, Image} from 'react-native';
import {MyAdsCard, MyHistoryCard} from '../../components/myAds';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {BASE_URL} from '../../../api';
import {AuthContext} from '../../context/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {images, SIZES} from '../../constants';

const MyAds = ({navigation}) => {
  const layout = useWindowDimensions();

  const {user} = useContext(AuthContext);

  const [index, setIndex] = React.useState(0);
  const [status] = useState(true);
  const [posts, setPosts] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const [routes] = React.useState([
    {key: 'first', title: 'My Ads'},
    {key: 'second', title: 'History'},
  ]);

  const AdsScene = () => {
    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#F1F1F1', padding: 20}}>
          {posts.map((item, _) => (
            <MyAdsCard key={item.id} item={item} setStatus={markAsSold} />
          ))}
        </View>
      </ScrollView>
    );
  };

  const HistoryScene = () => {
    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#F1F1F1', padding: 20}}>
          {history.map((item, _) => (
            <MyHistoryCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    );
  };

  const markAsSold = async id => {
    setWaiting(true);
    axios
      .put(
        `${BASE_URL}/posts/update/status`,
        {status, id},
        {
          headers: {
            accessToken: await AsyncStorage.getItem('accessToken'),
          },
        },
      )
      .then(res => {
        console.log('set to mark as sold', res.data);
        setWaiting(false);
      })
      .catch(err => {
        console.log(err);
        setWaiting(false);
      });
  };

  const renderScene = SceneMap({
    first: AdsScene,
    second: HistoryScene,
  });

  useEffect(async () => {
    if (!posts) {
      setWaiting(true);
    } else if (!history) {
      setWaiting(true);
    }
    console.log(loading);
    console.log(posts);
    axios
      .get(`${BASE_URL}/posts/byUserId/myAds/${user.id}`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        setPosts(res.data.listOfPost);
        setWaiting(false);
      })
      .catch(err => {
        console.log(err);
        setWaiting(false);
      });

    axios
      .get(`${BASE_URL}/posts/byUserId/history/${user.id}`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        setHistory(res.data.listOfPost);
        console.log(history);
        setWaiting(false);
      })
      .catch(err => {
        console.log(err);
        setWaiting(false);
      });

    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorContainerStyle={{backgroundColor: '#fff'}}
      indicatorStyle={{backgroundColor: '#45BDC6'}}
      renderLabel={({route, focused, color}) => (
        <Text style={{color: focused ? '#45BDC6' : '#BEBEBE'}}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
      {waiting && (
        <View
          style={{
            width: SIZES.width,
            height: SIZES.height,
            position: 'absolute',
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}>
          <Image
            source={images.loading2}
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
      )}
    </>
  );
};

export default MyAds;
