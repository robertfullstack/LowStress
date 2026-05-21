import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Modal,
  Share,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { SwiperFlatList } from 'react-native-swiper-flatlist';

const data = [
  { image: require('../../assets/frases/f1.png') },
  { image: require('../../assets/frases/f2.png') },
  { image: require('../../assets/frases/f4.png') },
  { image: require('../../assets/frases/f5.png') },
  { image: require('../../assets/frases/f6.png') },
  { image: require('../../assets/frases/f7.png') },
  { image: require('../../assets/frases/f8.png') },
  { image: require('../../assets/frases/f9.png') },
  { image: require('../../assets/frases/f10.png') },
  { image: require('../../assets/frases/f11.png') },
  { image: require('../../assets/frases/f12.png') },
  { image: require('../../assets/frases/f13.png') },
  { image: require('../../assets/frases/f14.png') },
  { image: require('../../assets/frases/f15.png') },
  { image: require('../../assets/frases/f16.png') },
  { image: require('../../assets/frases/f17.png') },
];

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image
        source={item.image}
        style={styles.slideImage}
      />
    </View>
  );
};

const Slide = () => {
  const windowHeight = useWindowDimensions().height;

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const shareImage = async () => {
    try {
      await Share.share({
        message:
          'Vi essa imagem e lembrei de você! "Direto do App MindRest."',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal Inicial */}
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Image
            source={require('../../assets/albuns/arraste.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>
      </Modal>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            bottom: windowHeight - hp('100%'),
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.footerText}></Text>
        </View>

        <Ionicons
          name="share-outline"
          onPress={shareImage}
          style={styles.shareIcon}
        />
      </View>

      {/* Slides */}
      <SwiperFlatList
        vertical
        autoplay
        autoplayDelay={3}
        autoplayLoop
        index={0}
        showPagination={true}
        paginationStyleItem={{ width: 8, height: 8 }}
        data={data}
        renderItem={({ item }) => <SlideItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  slideContainer: {
    width: wp('100%'),
    height: hp('100%'),
  },

  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  gif: {
    width: wp('70%'),
    height: hp('30%'),
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },

  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  shareIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default Slide;