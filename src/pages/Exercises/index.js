import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable'

const Card = ({ title, description, navigate }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={navigate}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      description={item.description}
      navigate={() => navigation.navigate(item.routeName)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>

        <Text style={{ fontSize: 30, lineHeight: 55, color: 'white', fontWeight: 'bold' }}>Exercícios</Text>
        <Text style={{ fontSize: 30, lineHeight: 35, color: 'white', fontWeight: 'bold' }}>       de</Text>
        <Text style={{ fontSize: 30, lineHeight: 45, color: 'white', fontWeight: 'bold' }}>Respiração</Text>

        <Image
          source={require('../../assets/games.png')}
          style={{
            position: 'absolute',
            bottom: 1,
            right: wp('-20%'),
            width: wp('100%'),
            height: hp('40%'),
            resizeMode: 'contain'
          }}
        />
      </View>

      <Animatable.View style={styles.containerCards} animation='fadeInUp' >
        <View style={styles.cardList}>
          <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Ansiedade') }}>
            <View>
              <Image
                source={require('../../assets/albuns/circle.png')}
                style={styles.capaRelax}
              />
            </View>
            <View>
              <Text style={styles.title}>Controle sua Ansiedade</Text>
            </View>
            <View>
              <Text style={styles.description}>Relaxe e Alivie sua Ansiedade</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Estresse') }}>
            <View>
              <Image
                source={require('../../assets/albuns/square.png')}
                style={styles.stress}
              />
            </View>
            <View>
              <Text style={styles.stressTitle}>Mantenha a Concentração</Text>
            </View>
            <View>
              <Text style={styles.description}>Relaxe e Concentre-se no seu Foco</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  containerHeader: {
    height: hp('40%'),
    backgroundColor: '#556aa9',
    position: 'relative',
    padding: wp('5%'),
  },

  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('-20%')
  },

  card: {
    backgroundColor: '#e8f7fd',
    borderRadius: 8,
    padding: 20,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp('45%'),
    height: hp('31.2%'),
  },

  capaRelax: {
    width: wp('37%'),
    height: hp('16%'),
    borderRadius: 0,
    marginLeft: -3
  },

  stress: {
    width: wp('30%'),
    height: hp('14%'),
    borderRadius: 8,
    marginLeft: 10,
    marginTop: hp('1%')
  },

  title: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    marginTop: 10
  },

  stressTitle: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    marginTop: hp('2.1%')
  },

  description: {
    fontSize: hp('1.60%'),
    marginTop: 10
  },
  titleGame: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: wp('8%'),
  },
  subtitleGame: {
    fontWeight: 'bold',
    color: '#556aa9',
    fontSize: wp('4%')
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('12%')
  }
});

export default App;
