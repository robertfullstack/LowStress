import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const SelectButtons = ({ route }) => {

  const navigation = useNavigation();

  const [selectedButtons, setSelectedButtons] = useState([]);

  const emotionId = route?.params?.emotionId || '';
  const symbol = route?.params?.symbol || '';

  const buttonContinue = () => {
    navigation.navigate('Write', {
      selectedButtons,
      emotionId,
      symbol
    });
  };

  const handleButtonPress = (buttonId) => {

    if (selectedButtons.includes(buttonId)) {

      setSelectedButtons(
        selectedButtons.filter(id => id !== buttonId)
      );

    } else {

      setSelectedButtons([
        ...selectedButtons,
        buttonId
      ]);
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.textHeader}>
          O que te deixou {emotionId}?
        </Text>

        <View style={styles.touchableContainer}>

          <TouchableOpacity onPress={() => navigation.goBack()}>

            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              size={24}
              color="#556aa9"
            />

          </TouchableOpacity>

        </View>

      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* SOCIAL */}
        <Animatable.View
          style={[styles.containerWrite, { marginTop: hp('1%') }]}
          animation='fadeInLeft'
        >

          <Text style={styles.textWrite}>Social</Text>

          <View style={styles.containerButtons}>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Família') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Família')}
            >
              <Text style={styles.textButton}>Família</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Amigos') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Amigos')}
            >
              <Text style={styles.textButton}>Amigos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Escola') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Escola')}
            >
              <Text style={styles.textButton}>Escola</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.containerButtons}>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 2 },
                selectedButtons.includes('Relacionamento') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Relacionamento')}
            >
              <Text style={styles.textButton}>Relacionamento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Trabalho') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Trabalho')}
            >
              <Text style={styles.textButton}>Trabalho</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Outros') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Outros')}
            >
              <Text style={styles.textButton}>Outros</Text>
            </TouchableOpacity>

          </View>

        </Animatable.View>

        {/* SAÚDE */}
        <Animatable.View
          style={styles.containerWrite}
          animation='fadeInLeft'
        >

          <Text style={styles.textWrite}>Saúde</Text>

          <View style={styles.containerButtons}>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Fiquei Disposto') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Fiquei Disposto')}
            >
              <Text style={styles.textButton}>Fiquei Disposto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttons,
                { flex: 1 },
                selectedButtons.includes('Dores Fracas') && styles.selectedButton
              ]}
              onPress={() => handleButtonPress('Dores Fracas')}
            >
              <Text style={styles.textButton}>Dores Fracas</Text>
            </TouchableOpacity>

          </View>

        </Animatable.View>

      </ScrollView>

      <Animatable.View
        style={styles.footer}
        animation='fadeInUp'
      >

        <TouchableOpacity
          style={styles.button}
          onPress={buttonContinue}
        >

          <Text style={styles.textButton}>
            Continuar
          </Text>

        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#8896d7',
    width: wp('100%'),
    height: hp('100%'),
  },

  scroll: {
    flex: 1,
    marginBottom: hp('6%')
  },

  textHeader: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: 'white',
    marginStart: wp('4%'),
  },

  containerWrite: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginStart: wp('2%'),
    marginEnd: wp('2%'),
    marginTop: hp('2%'),
    paddingBottom: hp('1%')
  },

  textWrite: {
    marginStart: wp('2%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'white'
  },

  buttons: {
    height: hp('4.5%'),
    borderRadius: 20,
    backgroundColor: '#556aa9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('1%'),
  },

  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  textButton: {
    fontWeight: 'bold',
    color: 'white'
  },

  selectedButton: {
    backgroundColor: '#a3a8d6',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('35%'),
    height: hp('5%'),
    borderRadius: 50,
    backgroundColor: '#3c4383'
  },

  header: {
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('1%')
  },

  touchableContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginEnd: wp('4%')
  },

});

export default SelectButtons;