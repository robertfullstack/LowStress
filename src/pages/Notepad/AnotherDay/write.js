import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConnection';
import { AuthContext } from '../../../context/auth';
import * as Animatable from 'react-native-animatable'; 

const Write = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [todayActivity, setTodayActivity] = useState('');
  const [todayFeelings, setTodayFeelings] = useState('');
  const [todayThoughts, setTodayThoughts] = useState('');
  const [todayLearn, setTodayLearn] = useState('');
  const [todayGrateful, setTodayGrateful] = useState('');
  const { selectedButtons, emotionId, symbol, selectedDate } = route.params;
  const registrosRef = collection(db, 'Registros');

  //Salvando no banco de dados
  const handleSave = async () => {
    try {
      // Crie um objeto com os dados a serem salvos
      const registroData = {
        formattedDate: selectedDate,
        selectedButtons: selectedButtons,
        emotionId: emotionId,
        symbol: symbol,
        todayActivity: todayActivity,
        todayFeelings: todayFeelings,
        todayThoughts: todayThoughts,
        todayLearn: todayLearn,
        todayGrateful: todayGrateful,
        userID: user.uid
      };

      // Adicione os dados à coleção 'Registros'
      const docRef = await addDoc(registrosRef, registroData);
      setModalVisible(true);
    } catch (error) {
      alert('Erro ao adicionar documento: ', error);
    }
  };


  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const buttonBack = (emotionId, symbol) => {
    navigation.navigate('ADSelectButtons', { emotionId, symbol, selectedDate });
  };

  const handleEmotionSwitch = (selectedButtons, emotionId, symbol) => {
    navigation.navigate('ADSwitchEmotion', { selectedButtons, emotionId, symbol, selectedDate });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.touchableContainer}>
          <TouchableOpacity onPress={() => buttonBack(emotionId, symbol)}>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24} color="#556aa9" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll}>

        <Animatable.View style={styles.containerSelections} animation='fadeInLeft'>

          <Text style={styles.text}>{selectedDate}</Text>

          <View style={styles.headerWrite}>

            <View style={styles.emoticons}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => handleEmotionSwitch(selectedButtons, emotionId, symbol)}
              >
                <Text style={styles.buttonEmoticon}>{symbol}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.selection}>

              <View style={styles.containerOptions}>
                {selectedButtons.map((text, id) => (
                  <View style={styles.selectedOptions} key={id}>
                    <Text style={styles.textOptions}>{text}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.buttonSwitch} onPress={() => buttonBack(emotionId, symbol)}>
                <Text style={styles.textSwitch}>Mudar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Animatable.View>

        <Animatable.View style={styles.containerWrite} animation='fadeInLeft'>
          <Text style={styles.questionText}>Como foi o seu dia?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused, { textAlignVertical: 'top', }]}
            placeholder="Hoje eu..."
            onChangeText={(text) => setTodayActivity(text)}
            value={todayActivity}
            onFocus={handleFocus}
            onBlur={handleBlur}
            numberOfLines={5}
            maxHeight={100}
            multiline={true}
          />

          <Text style={styles.questionText}>Quais emoções e sentimentos gerou em você?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Resposta..."
            onChangeText={(text) => setTodayFeelings(text)}
            value={todayFeelings}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Text style={styles.questionText}>Quais pensamentos estiveram mais presentes hoje?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Resposta..."
            onChangeText={(text) => setTodayThoughts(text)}
            value={todayThoughts}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Text style={styles.questionText}>O que você aprendeu hoje?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Resposta..."
            onChangeText={(text) => setTodayLearn(text)}
            value={todayLearn}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Text style={styles.questionText}>Pelo o que você é grato(a) hoje?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Resposta..."
            onChangeText={(text) => setTodayGrateful(text)}
            value={todayGrateful}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxHeight={80}
            multiline={true}
          />
        </Animatable.View>

      </ScrollView>

      <Animatable.View style={styles.footer} animation='fadeInUp'>
        <TouchableOpacity style={styles.buttonFooter} onPress={handleSave}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Diário Salvo com Sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Notepad');
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8896d7'
  },
  scroll: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttonFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: hp('5%'),
    borderRadius: 50,
    backgroundColor: '#3c4383',
    marginEnd: wp('2.5%'),
  },
  header: {
    height: hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginStart: wp('4%'),
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  containerSelections: {
    marginTop: hp('1%'),
    flex: 1
  },
  text: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginStart: wp('3%'),
    color: 'white'
  },
  headerWrite: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('1%')
  },
  emoticons: {
    paddingRight: wp('5%'),
    paddingLeft: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundButton: {
    height: hp('7%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonEmoticon: {
    fontSize: wp('8.5%'),
  },
  selection: {
    flex: 1
  },
  selectedOptions: {
    backgroundColor: '#a3a8d6',
    height: hp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('2%'),
    padding: wp('4%'),
    borderRadius: 30,
    margin: wp('0.5%'),
  },
  buttonSwitch: {
    backgroundColor: '#556aa9',
    width: wp('18%'),
    borderRadius: 50,
    paddingVertical: wp('3%'),
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSwitch: {
    color: '#fcfcfc',
  },
  textOptions: {
    color: 'white',
    fontWeight: 'bold'
  },
  containerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  containerWrite: {
    flex: 1,
    padding: hp('2.5%'),
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#556aa9',
    borderWidth: wp('0.3%'),
    borderColor: 'gray',
    borderRadius: 4,
    padding: hp('1.2%'),
    marginVertical: wp('3.5%'),
    fontSize: hp('2%'),
    color: '#333',
  },
  questionText: {
    fontSize: hp('2%'),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
    marginTop: hp('2%'),
  },

  inputFocused: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#556aa9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },


});

export default Write;
