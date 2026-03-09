import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loadingAuth } = useContext(AuthContext);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.containerHeader}>
        <Animatable.Text animation='fadeInLeft' delay={500} style={styles.message}>Bem-vindo(a)</Animatable.Text>
        <Animatable.Image
          source={require('../../assets/vetorSignIn.png')}
          style={{ width: '100%', height: '100%', alignSelf: 'center' }}
          resizeMod='contain'
          animation='fadeInUp'
        />
      </View>
      <ScrollView style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder='Digite seu email...'
          style={styles.input}
          keyboardType="email-address"
        />

        <View>
          <Text style={styles.title}>Senha</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={!showPassword}
              placeholder='Digite sua senha...'
              style={[styles.input, styles.passwordInput]}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={togglePasswordVisibility}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color='#a1a1a1' />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          {
            loadingAuth ? (
              <ActivityIndicator size={22} color='#FFF' />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonRegister, { marginTop: '6%' }]} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#556aa9'
  },
  containerHeader: {
    flex: 1,
    marginTop: hp('3%'),
    marginBottom: hp('6%'),
    paddingStart: wp('5%'),
    paddingEnd: wp('5%')
  },
  message: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    paddingStart: wp('5%'),
    paddingEnd: wp('5%')
  },
  title: {
    fontSize: hp('2%'),
    marginTop: hp('3%'),
    fontWeight: 'bold'
  },
  input: {
    borderBottomWidth: 1,
    height: hp('5%'),
    marginBottom: hp('3%'),
    fontSize: hp('2%')
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordInput: {
    flex: 1
  },
  passwordToggle: {
    position: 'absolute',
    right: 0,
    paddingBottom: hp('2%')
  },
  button: {
    backgroundColor: '#556aa9',
    width: wp('75%'),
    borderRadius: 50,
    paddingVertical: wp('2.5%'),
    marginTop: hp('1.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: hp('3%'),
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1',
    fontSize: hp('2%')
  },
  icon: {
    position: 'absolute',
    top: hp('1%'),
    right: wp('2%'),
    zIndex: 1
  },
  KeyboardAwareScrollView: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    paddingStart: wp('5%'),
    paddingEnd: wp('5%')
  }
})