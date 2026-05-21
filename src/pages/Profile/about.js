import React from 'react';

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as Animatable from 'react-native-animatable';

import {
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const developers = [
  {
    name: 'Andrey de Mendonça',
    role: 'Desenvolvedor',
    image: require('../../assets/desenvolvedores/Andrey.jpeg'),
    github: 'https://github.com/DreyMendonca/',
  },

  {
    name: 'Kaik Silva Sousa',
    role: 'Desenvolvedor',
    image: {
      uri: 'https://avatars.githubusercontent.com/u/102658086?v=4',
    },
    github: 'https://github.com/kaikdev',
  },

  {
    name: 'Robert Guimarães',
    role: 'Desenvolvedor',
    image: {
      uri: 'https://avatars.githubusercontent.com/u/110982032?v=4',
    },
    github: 'https://github.com/robertfullstack',
  },
];

const About = () => {
  const navigation = useNavigation();

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons
            name={
              Platform.OS === 'ios'
                ? 'ios-arrow-back'
                : 'md-arrow-back'
            }
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/logo/logoBrancaRoxa.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Desenvolvedores */}
      <Text style={styles.title}>Desenvolvedores</Text>

      <View style={styles.cardContainer}>
        {developers.map((developer, index) => (
          <Animatable.View
            key={index}
            style={styles.card}
            animation="fadeInRight"
          >
            <Image
              source={developer.image}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={styles.name}>
              {developer.name}
            </Text>

            <Text style={styles.role}>
              {developer.role}
            </Text>

            <View style={styles.icones}>
              <TouchableOpacity
                onPress={() =>
                  handleLinkPress(developer.github)
                }
              >
                <FontAwesome
                  name="github"
                  size={26}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ))}
      </View>

      {/* Sobre */}
      <Text style={styles.title}>Sobre</Text>

      <Text style={styles.text}>
        O aplicativo MindRest representa uma
        ferramenta poderosa para auxiliar as pessoas
        em momentos de crise de ansiedade.
        {'\n\n'}
        Com recursos desenvolvidos especificamente
        para reduzir o estresse e promover a calma
        mental, o aplicativo auxilia os usuários a
        enfrentarem suas ansiedades de maneira mais
        eficaz.
      </Text>

      {/* Tecnologias */}
      <Text style={styles.title}>
        Tecnologias Usadas
      </Text>

      <View style={styles.techContainer}>
        <TouchableOpacity
          onPress={() =>
            handleLinkPress('https://reactnative.dev/')
          }
        >
          <Animatable.View animation="fadeInUp">
            <Image
              source={require('../../assets/logo/reactNativeLogo.png')}
              style={styles.logoReact}
            />
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleLinkPress('https://expo.dev/')
          }
        >
          <Animatable.View animation="fadeInUp">
            <Image
              source={require('../../assets/logo/expoLogo.png')}
              style={styles.logoExpo}
            />
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleLinkPress(
              'https://firebase.google.com/?hl=pt'
            )
          }
        >
          <Animatable.View animation="fadeInUp">
            <Image
              source={require('../../assets/logo/firebaseLogo.png')}
              style={styles.logoFirebase}
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#556aa9',
    paddingBottom: hp('5%'),
    minHeight: hp('100%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%'),
    paddingHorizontal: wp('4%'),
    marginTop: hp('4%'),
  },

  logo: {
    width: wp('80%'),
    height: hp('10%'),
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#fff',
  },

  cardContainer: {
    width: wp('90%'),
  },

  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#8896d7',
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  role: {
    fontSize: 14,
    color: '#DDD',
    marginBottom: hp('1%'),
  },

  icones: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },

  text: {
    width: wp('90%'),
    backgroundColor: '#8896d7',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: hp('3%'),
    lineHeight: 24,
  },

  techContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoReact: {
    width: wp('25%'),
    height: hp('10%'),
    marginHorizontal: wp('2%'),
  },

  logoExpo: {
    width: wp('23%'),
    height: hp('10%'),
    marginHorizontal: wp('2%'),
  },

  logoFirebase: {
    width: wp('25%'),
    height: hp('13%'),
    marginHorizontal: wp('2%'),
  },
});

export default About;