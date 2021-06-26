import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {SIZES, images} from '../constants';
import {SwiperFlatList, Pagination} from 'react-native-swiper-flatlist';

const newImage = [
  images.banner1,
  images.banner2,
  images.banner3,
  images.banner4,
  images.banner5,
  images.banner6,
];
const image = index => ({image: newImage[index % newImage.length]});
const items = Array.from(Array(6)).map((_, index) => image(index));

const CustomPagination = props => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="#A9D4B4"
      paginationActiveColor="#217336"
    />
  );
};

const Swiper = () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      index={0}
      autoplayLoop
      autoplayLoopKeepAnimation
      data={items}
      renderItem={({item, index}) => (
        <ImageBackground
          style={styles.image}
          source={item.image}
          testID={`container_swiper_renderItem_screen_${index}`}></ImageBackground>
      )}
      showPagination
      PaginationComponent={CustomPagination}
      e2eID="container_swiper_renderItem"
    />
  );
};

const BannerSwiper = () => {
  return (
    <View>
      <Swiper />
      <Pagination />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    bottom: 0,
    left: 0,
  },
  pagination: {
    borderRadius: 10,
    color: 'black',
    width: 10,
    height: 10,
    marginRight: -5,
  },
  image: {
    width: SIZES.width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    height: 200,
  },
});

export default BannerSwiper;
