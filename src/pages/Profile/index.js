import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';

import { AuthContext } from '../../context/auth';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';

import { db } from '../../firebaseConnection';

import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { user, signOut, storageUser, setUser } =
    useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(null);

  const updateProfile = async () => {
    if (!name || !lastName || !phone) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await db.collection('Cadastro').doc(user.uid).update({
        name,
        lastName,
        phone,
      });

      const data = {
        uid: user.uid,
        name,
        lastName,
        phone,
        email: user.email,
      };

      setUser(data);
      storageUser(data);

      setOpen(false);
      setModalVisible(true);

    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permissão negada!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      {image ? (
        <Animatable.View animation="fadeInDown">
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickImage}
          >
            <Image
              style={styles.avatar}
              source={{ uri: image }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={removeImage}
            style={styles.removeButtonView}
          >
            <Text style={styles.removeButtonText}>
              Remover Imagem
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Animatable.View animation="fadeInDown">
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickImage}
          >
            <Text style={styles.uploadText}>+</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Dados usuário */}
      <Animatable.Text
        animation="fadeInDown"
        style={styles.userName}
        numberOfLines={1}
      >
        {user?.name} {user?.lastName}
      </Animatable.Text>

      <Animatable.Text
        animation="fadeInDown"
        style={styles.userEmail}
        numberOfLines={1}
      >
        {user?.email}
      </Animatable.Text>

      {/* Botões */}
      <Animatable.View animation="fadeInLeft">
        <TouchableOpacity
          style={styles.buttonChange}
          onPress={() => setOpen(true)}
        >
          <View style={styles.buttonContent}>
            <Feather
              name="refresh-cw"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />

            <Text style={styles.buttonText}>
              Atualizar perfil
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInRight">
        <TouchableOpacity
          style={styles.buttonAbout}
          onPress={() => navigation.navigate('About')}
        >
          <View style={styles.buttonContent}>
            <Feather
              name="info"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />

            <Text style={styles.buttonText}>Sobre</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp">
        <TouchableOpacity
          style={styles.buttonExit}
          onPress={() => signOut()}
        >
          <View style={styles.buttonContent}>
            <Feather
              name="log-out"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />

            <Text style={styles.buttonText}>Sair</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>

      {/* Modal editar */}
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => setOpen(false)}
          >
            <Feather
              name="arrow-left"
              size={22}
              color="#fff"
            />

            <Text style={styles.buttonText}> Voltar </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={styles.buttonChange}
            onPress={updateProfile}
          >
            <Text style={styles.buttonText}>
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal sucesso */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Dados Atualizados com Sucesso!
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>
                OK
              </Text>
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
    alignItems: 'center',
    backgroundColor: '#8896d7',
  },

  uploadButton: {
    marginTop: '20%',
    backgroundColor: '#fff',
    width: wp('45%'),
    height: hp('21.7%'),
    borderRadius: wp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadText: {
    fontSize: wp('15%'),
    color: '#e52246',
    opacity: 0.4,
  },

  avatar: {
    width: wp('44%'),
    height: hp('21%'),
    borderRadius: wp('25%'),
  },

  userName: {
    marginTop: hp('3%'),
    fontSize: wp('7%'),
    color: '#FFF',
    fontWeight: 'bold',
  },

  userEmail: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    color: '#DDD',
    fontStyle: 'italic',
  },

  buttonExit: {
    marginTop: hp('2%'),
    backgroundColor: '#ff4040',
    width: wp('80%'),
    height: hp('5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonChange: {
    marginTop: hp('2%'),
    backgroundColor: '#428cfd',
    width: wp('80%'),
    height: hp('5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonAbout: {
    marginTop: hp('2%'),
    backgroundColor: '#428cfd',
    width: wp('80%'),
    height: hp('5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: wp('5%'),
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonIcon: {
    marginRight: 5,
  },

  modalContainer: {
    width: wp('100%'),
    height: hp('52%'),
    backgroundColor: '#556aa9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  buttonBack: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: hp('1%'),
    margin: hp('1.5%'),
    fontSize: wp('5%'),
    textAlign: 'center',
  },

  removeButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeButtonText: {
    marginTop: hp('1.5%'),
    fontSize: wp('3%'),
    color: '#FFF',
    fontWeight: 'bold',
  },

  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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

export default ProfileScreen;