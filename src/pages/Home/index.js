import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Modal, Share, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    <Image
      source={item.image}
      style={styles.slideImage}
    />
  );
};

const Slide = () => {
  const windowHeight = useWindowDimensions().height; // Obtém a altura da tela
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const shareImage = async () => {
    try {
      await Share.share({
        message: 'Vi essa imagem e lembrei de você! "Direto do App MindRest."',
        url: data[0].image.uri,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Image
            source={require('../../assets/albuns/arraste.gif')}
            style={{ width: wp('70%'), height: hp('30%'), marginTop: hp('47%') }}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <View style={[styles.footer, { bottom: windowHeight - hp('100%') }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}></Text>
        </View>
        <Ionicons
          name="share-outline"
          onPress={shareImage}
          style={{ fontSize: 30, color: 'white', marginBottom: hp('1%') }}
        />
      </View>

<SwiperFlatList
  autoplay
  autoplayDelay={3}
  vertical
></SwiperFlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: wp('100%'),
    height: hp('100%'),
    position: 'relative',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: hp('1%'),
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;