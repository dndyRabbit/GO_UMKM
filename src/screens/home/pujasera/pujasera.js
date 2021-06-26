import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import {SearchRuko} from '../../../components/search';
import {PostComponent} from '../../../components/postComponent';
import {PostCard} from '../../../components/postCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../../../api';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {SIZES} from '../../../constants';
import {AuthContext} from '../../../context/AuthProvider';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Pujasera = ({navigation}) => {
  const [selectedCategories, setSelectedCategories] = useState('Terdekat');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const {setLikedPosts, pujaseraPosts, setPujaseraPosts} =
    useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(async () => {
    console.log(pujaseraPosts);
    axios
      .get(`${BASE_URL}/posts/pujasera`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(respone => {
        setPujaseraPosts(respone.data.listOfPosts);
        setLikedPosts(
          respone.data.likedPosts.map(like => {
            return like.postId;
          }),
        );
      });
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const onChangeCategories = value => {
    console.log(value);
    setSelectedCategories(value);
  };

  const RenderHeader = () => {
    return (
      <View style={{width: SIZES.width, paddingHorizontal: 10}}>
        <SearchRuko navigation={navigation} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Pujasera</Text>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{width: SIZES.width, padding: 30, paddingTop: 10}}>
        {pujaseraPosts.map((item, index) => {
          return <PostCard item={item} key={index} navigation={navigation} />;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <RenderHeader />
        <PostComponent
          change={onChangeCategories}
          selected={selectedCategories}
        />
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default Pujasera;
