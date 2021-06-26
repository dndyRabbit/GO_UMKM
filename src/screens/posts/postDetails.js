import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {SIZES, images} from '../../constants';
import {AuthContext} from '../../context/AuthProvider';
import {UserPosts} from '../../components/otherUserPosts';
import {BlurView} from '@react-native-community/blur';

const PostDetails = ({navigation, route}) => {
  const item = route.params.item;
  const [userPosts, setUserPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState({
    newTitle: `${item.title}`,
    newLB: `${item.luasBangunan}`,
    newLT: `${item.luasTanah}`,
    newFasilitias: `${item.fasilitas}`,
    newAlamatLengkap: `${item.alamatLengkap}`,
    newHarga: `${item.harga}`,
    newDescription: `${item.description}`,
  });

  const {likedPosts, setLikedPosts, setAllPosts, allPosts, user} =
    useContext(AuthContext);

  useEffect(async () => {
    axios
      .get(`${BASE_URL}/posts/byUserId/${item.userId}`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        setUserPosts(res.data.listOfPost);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(item);
  }, []);

  const submitUpdate = async () => {
    setLoading(true);
    let id = item.id;
    console.log(post);
    axios
      .put(
        `${BASE_URL}/posts/update`,
        {...post, id},
        {
          headers: {
            accessToken: await AsyncStorage.getItem('accessToken'),
          },
        },
      )
      .then(res => {
        alert('Post Updated');
        setLoading(false);
        setModalVisible(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const confirmationDelete = () => {
    Alert.alert('Delete Post', 'Are you sure want to delete this Post', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deletePost()},
    ]);
  };

  const deletePost = async () => {
    setLoading(true);
    let id = item.id;
    axios
      .delete(`${BASE_URL}/posts/${id}`, {
        headers: {
          accessToken: await AsyncStorage.getItem('accessToken'),
        },
      })
      .then(respone => {
        setLoading(false);
        navigation.replace('Home');
      })
      .catch(err => console.log(err));
  };

  const likeAPost = async postId => {
    axios
      .post(
        `${BASE_URL}/likes`,
        {postId},
        {
          headers: {
            accessToken: await AsyncStorage.getItem('accessToken'),
          },
        },
      )
      .then(res => {
        setAllPosts(
          allPosts.map(post => {
            if (post.id === postId) {
              if (res.data.liked) {
                return {...post, likes: [...post.likes, 0]};
              } else {
                const likeArray = post.likes;
                likeArray.pop();
                return {...post, likes: likeArray};
              }
            } else {
              return post;
            }
          }),
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter(id => {
              return id !== postId;
            }),
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          width: SIZES.width,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 10, top: 20}}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>Detail Post</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={() => likeAPost(item.id)}>
          <Icon
            name={
              likedPosts.includes(item.id) ? 'thumb-up' : 'thumb-up-outline'
            }
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderContent = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        {/* image post */}
        <Image
          source={{uri: `${BASE_URL}/${item.image}`}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 400,
            borderRadius: 60,
            marginBottom: 5,
            borderTopRightRadius: 10,
          }}
        />

        {/* View, Likes */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 10,
              color: '#000',
              marginRight: 10,
            }}>
            Views: 999+
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 10, color: '#000'}}>
            Likes: {item.likes.length}
          </Text>
        </View>

        {/* title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
          }}>
          {item.title}
        </Text>
        <View style={styles.rulerLine} />

        {/* fasilitas */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Fasilitas</Text>
          <Text style={{color: '#aaaaaa'}}>more</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 5,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '80%',
          }}>
          <Text style={{fontWeight: '500'}}>{item.fasilitas}</Text>
        </View>
        <View style={styles.rulerLine} />

        {/* Type,LB,LT,Etc */}
        <View style={{flexDirection: 'row', width: '100%', marginBottom: 20}}>
          <View style={{width: '40%', paddingVertical: 5}}>
            <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
              Type
            </Text>
            <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
              Luas Bangunan
            </Text>
            <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
              Luas Tanah
            </Text>
          </View>
          <View style={{width: '60%', paddingVertical: 5}}>
            <Text style={{marginBottom: 5, color: '#000'}}>{item.type}</Text>
            <Text style={{marginBottom: 5, color: '#000'}}>
              {item.luasBangunan}
            </Text>
            <Text style={{marginBottom: 5, color: '#000'}}>
              {item.luasTanah}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={{width: '100%', marginBottom: 20}}>
          <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
            Description
          </Text>
          <Text>{item.description}</Text>
        </View>

        {/* Price, Map Details */}
        <View style={{flexDirection: 'row', width: '100%', marginBottom: 20}}>
          <View style={{width: '50%'}}>
            <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
              Price
            </Text>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
              Rp.{item.harga}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{marginBottom: 5, color: '#000', fontWeight: 'bold'}}>
              Maps
            </Text>
            <View
              style={{
                width: '100%',
                height: 130,
                borderWidth: 1,
                borderColor: '#000',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="map-marker-outline"
                size={25}
                color="#99CEA4"
                style={{marginLeft: -5}}
              />
              <Text style={{fontSize: 12, color: '#aaaaaa'}}>
                {item.alamatLengkap}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rulerLine} />

        {/* detail user who post */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#F5F5F5',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: 'https://dyom.gtagames.nl/avatars/avatar16960.png'}}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={{fontWeight: 'bold', color: '#aaaaaa'}}>
              Posted by
            </Text>
            <Text>{item.username}</Text>
            <Text style={{marginTop: 10, fontSize: 12, color: '#aaaaaa'}}>
              Posted on {item.createdAt}
            </Text>
          </View>
        </View>
        <View style={styles.rulerLine} />

        {/* other Post  */}
        <View style={{width: '100%', marginBottom: 40}}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Other post by</Text>
          <Text style={{marginBottom: 10}}>{item.username}</Text>
          <ScrollView horizontal>
            {userPosts.map((item, index) => {
              return (
                <UserPosts item={item} navigation={navigation} key={index} />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <View
        style={{
          alignSelf: 'flex-end',
          width: SIZES.width,
          backgroundColor: '#fff',
          paddingHorizontal: 40,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 8,
        }}>
        {item.userId === user.id ? (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon color="#A9D4B4" name="circle-edit-outline" size={25} />
              <Text style={{color: '#A9D4B4', marginLeft: 5}}>Edit Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => confirmationDelete()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon color="#A9D4B4" name="circle-edit-outline" size={25} />
              <Text style={{color: '#A9D4B4', marginLeft: 5}}>delete Ad</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon color="#A9D4B4" name="wechat" size={25} />
              <Text style={{color: '#A9D4B4', marginLeft: 5}}>Chat Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <Text style={{color: '#A9D4B4', marginRight: 5}}>Report Ad</Text>
              <Icon color="#A9D4B4" name="alert" size={25} />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  function renderEditPost() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 3,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'transparent',
            }}>
            <View
              style={{
                padding: 10,
                width: '80%',
                height: '63%',
                backgroundColor: '#fff',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                Edit Post
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{position: 'absolute', top: 10, right: 10}}>
                <Icon name="close-circle-outline" size={25} color="#A9D4B4" />
              </TouchableOpacity>
              <ScrollView style={{width: '100%'}}>
                {/* Title */}
                <TextInput
                  onChangeText={value => setPost({...post, newTitle: value})}
                  value={post.newTitle}
                  placeholder="Title"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  style={styles.input}
                />

                {/* LB */}
                <TextInput
                  onChangeText={value => setPost({...post, newLB: value})}
                  value={post.newLB}
                  placeholder="Luas Bangunan (m2)"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  keyboardType="number-pad"
                  style={styles.input}
                />

                {/* LT */}
                <TextInput
                  onChangeText={value => setPost({...post, newLT: value})}
                  value={post.newLT}
                  placeholder="Luas Tanah (m2)"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  keyboardType="number-pad"
                  style={styles.input}
                />

                {/* Fasilitas */}
                <TextInput
                  onChangeText={value =>
                    setPost({...post, newFasilitias: value})
                  }
                  value={post.newFasilitias}
                  placeholder="Fasilitas"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  style={styles.input}
                />

                {/* alamatLengkap */}
                <TextInput
                  onChangeText={value =>
                    setPost({...post, newAlamatLengkap: value})
                  }
                  value={post.newAlamatLengkap}
                  placeholder="Alamat Lengkap"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  style={styles.input}
                />

                {/* Harga */}
                <TextInput
                  onChangeText={value => setPost({...post, newHarga: value})}
                  value={post.newHarga}
                  placeholder="Harga"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  keyboardType="number-pad"
                  style={styles.input}
                />

                {/* description */}
                <TextInput
                  onChangeText={value =>
                    setPost({...post, newDescription: value})
                  }
                  value={post.newDescription}
                  placeholder="Deskripsi"
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  style={[styles.input, {marginBottom: 30}]}
                />

                {loading ? (
                  <Image
                    source={images.loading3}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => submitUpdate()}
                    style={{
                      width: '50%',
                      padding: 10,
                      backgroundColor: '#A9D4B4',
                      borderRadius: 50 / 2,
                      alignSelf: 'center',
                    }}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>
                      Update Post
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RenderHeader />
        <RenderContent />
      </ScrollView>
      {modalVisible && renderEditPost()}
      <RenderFooter />
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
    marginVertical: 10,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: `rgba(0,0,0,0.1)`,
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: SIZES.padding,
    alignItems: 'center',
    marginBottom: 10,
    color: '#000',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default PostDetails;
