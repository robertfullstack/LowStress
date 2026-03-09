import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const developers = [
  {
    name: 'Andrey de Mendonça',
    role: 'Desenvolvedor',
    image: require('../../assets/desenvolvedores/Andrey.jpeg'),
    instagram: 'https://www.instagram.com/zdrey.7/',
    github: 'https://github.com/DreyMendonca/',
  },
  {
    name: 'Gustavo de Almeida',
    role: 'Desenvolvedor',
    image: require('../../assets/desenvolvedores/Almeida.jpeg'),
    instagram: 'https://www.instagram.com/gustalmd/',
    github: 'https://github.com/GustAlmd/',
  },
  {
    name: 'Monique Cristine',
    role: 'Designer',
    image: require('../../assets/desenvolvedores/Monique.jpeg'),
    instagram: 'https://www.instagram.com/fxnsxcv/',
    github: 'https://github.com/nickdevhelp/',
  },
  {
    name: 'João Doja',
    role: 'Designer',
    image: require('../../assets/desenvolvedores/Joao.jpeg'),
    instagram: 'https://www.instagram.com/joao_doja_dias/',
    github: 'https://github.com/JoaoADoja/',
  },

  {
    name: 'Gabriel Coutinho',
    role: 'Designer',
    image: require('../../assets/desenvolvedores/coutinho.jpg'),
    instagram: 'https://www.instagram.com/whocourtsy/',
    github: 'https://github.com/GabrielCou/',
  },
];

const App = () => {

  const navigation = useNavigation();

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'row', marginStart:wp('3%') }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile'); }}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/logo/logoBrancaRoxa.png')}
          style={{ width: wp('100%'), height: hp('10%'), flex: 1 }}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Desenvolvedores</Text>
      <ScrollView style={styles.cardContainer}>
        {developers.map((developer, index) => (
          <Animatable.View key={index} style={styles.card} animation='fadeInRight'>
            <Image source={developer.image} style={styles.image} />
            <Text style={styles.name}>{developer.name}</Text>
            <Text style={styles.role}>{developer.role}</Text>
            <View style={styles.icones}>
              <TouchableOpacity style={{ marginRight: wp('1.5%') }} onPress={() => handleLinkPress(developer.instagram)}>
                <Text>
                  <Ionicons name="logo-instagram" size={26} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLinkPress(developer.github)}>
                <Text>
                  <FontAwesome name="github" size={26} color="black" />
                </Text>
              </TouchableOpacity>
            </View>

          </Animatable.View>
        ))}
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.text}>
          O aplicativo MindRest representa uma ferramenta poderosa para auxiliar as pessoas em momentos de crise de ansiedade.
          Com recursos e funcionalidades desenvolvidos especificamente para reduzir o estresse e promover a calma mental,
          o MindRest capacita os usuários a enfrentarem suas ansiedades de maneira mais eficaz, melhorando sua qualidade de vida e bem-estar geral.
          Ao disponibilizar exercícios de respiração, registro de humor, músicas relaxantes, o aplicativo proporciona um ambiente seguro e acolhedor.
        </Text>


      </ScrollView>

      <Text style={[styles.title, { marginBottom: hp('4%') }]}>Tecnologias Usadas</Text>
      <View style={{ flexDirection: 'row', marginBottom: hp('5%'), justifyContent: 'center', textAlign: 'center' }}>
        <TouchableOpacity onPress={() => handleLinkPress('https://reactnative.dev/')}>
          <Animatable.View animation='fadeInUp'>
            <Image source={require('../../assets/logo/reactNativeLogo.png')} style={styles.logoReact} />
          </Animatable.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('https://expo.dev/')}>
          <Animatable.View animation='fadeInUp'>
            <Image source={require('../../assets/logo/expoLogo.png')} style={styles.logoExpo} />
          </Animatable.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('https://firebase.google.com/?hl=pt')}>
          <Animatable.View animation='fadeInUp'>
            <Image source={require('../../assets/logo/firebaseLogo.png')} style={styles.logoFirebase} />
          </Animatable.View>
        </TouchableOpacity>
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#556aa9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff'
  },
  icones: {
    flexDirection: 'row',
    marginTop: hp('1%')
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    padding: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: wp('90%'),
    backgroundColor: '#8896d7',
    color: '#fff'
  },
  cardContainer: {
    flexDirection: 'column',
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    width: wp('90%'),
    backgroundColor: '#8896d7',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  instagramLogo: {
    height: hp('3%'),
    width: wp('5%'),
    marginTop: 8
  },
  githubLogo: {
    height: hp('4%'),
    width: wp('5.4%'),
    marginTop: 8
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    color: '#121212',
  },
  logoReact: {
    width: wp('25%'),
    height: hp('10.8%'),
    marginHorizontal: wp('2%')
  },
  logoExpo: {
    width: wp('23.5%'),
    height: hp('11.3%'),
    marginHorizontal: wp('2%')
  },
  logoFirebase: {
    width: wp('25%'),
    height: hp('16%'),
    marginHorizontal: wp('2%'),
    marginTop: hp('-3%')
  },
});

export default App;
