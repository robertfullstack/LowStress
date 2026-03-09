import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import * as Animatable from 'react-native-animatable' 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/auth';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form'
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaskedTextInput } from "react-native-mask-text";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  lastName: yup.string().required("Informe seu sobrenome"),
  phone: yup.string().min(11, "O telefone deve conter 11 números!").required("Informe seu telefone"),
  email: yup.string().email("Email Inválido!").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos!").required("Informe sua senha")
})

export default function SignUp() {
  const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(data){
    signUp(data);
  }
  
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <View style={styles.containerHeader}>
      <Animatable.Image
        source={require('../../assets/logo/logoBrancaRoxa.png')}
        style={{width:wp('100%'), height:'100%',}}
        resizeMod='contain'
        animation='fadeInUp'
      />
      </View>
      <KeyboardAwareScrollView style={styles.containerForm} >
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Crie uma conta para que possa relaxar e descansar sua mente</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: {onChange, onBlur, value} }) =>(
            <View style={[styles.inputContainer, {borderWidth: errors.name && 1, borderColor: errors.name && '#ff375b'}]}>
              <Icon name="user" size={hp('3%')} color="#ccc" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          )}
        />
        {errors.name && <Text style={styles.labelError}>{errors.name?.message}</Text>}

        <Controller
          control={control}
          name="lastName"
          render={({ field: {onChange, onBlur, value} }) =>(
            <View style={[styles.inputContainer, {borderWidth: errors.lastName && 1, borderColor: errors.lastName && '#ff375b'}]}>
              <Icon name="id-card-o" size={hp('3%')} color="#ccc" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sobrenome"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          )}
        />
        {errors.lastName && <Text style={styles.labelError}>{errors.lastName?.message}</Text>}

        <Controller
          control={control}
          name="phone"
          render={({ field: {onChange, onBlur, value} }) =>(
            <View style={[styles.inputContainer, {borderWidth: errors.phone && 1, borderColor: errors.phone && '#ff375b'}]}>
              <Icon name="phone" size={hp('3%')} color="#ccc" style={styles.inputIcon} />
              <MaskedTextInput
                mask="(99) 99999-9999"
                style={styles.input}
                placeholder="Telefone"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
              />
            </View>
          )}
        />
        {errors.phone && <Text style={styles.labelError}>{errors.phone?.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field: {onChange, onBlur, value} }) =>(
            <View style={[styles.inputContainer, {borderWidth: errors.email && 1, borderColor: errors.email && '#ff375b'}]}>
              <Icon name="envelope" size={hp('3%')} color="#ccc" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: {onChange, onBlur, value} }) =>(
            <View style={[styles.inputContainer, {borderWidth: errors.password && 1, borderColor: errors.password && '#ff375b'}]}>
              <Icon name="lock" size={hp('3%')} color="#ccc" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignUp)}>
          {
            loadingAuth ? (
              <ActivityIndicator size={22} color='#FFF'/>
            ):(
              <Text style={styles.buttonText}>Cadastrar</Text>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity style={[styles.linkContainer,{marginTop:15}]} onPress={ () => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Já tenho conta cadastrada</Text>
        </TouchableOpacity>

      </KeyboardAwareScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#556aa9'
  },
  containerHeader:{
    width: wp('100%'),
    height: hp('20%'),
    backgroundColor: '#556aa9',
    justifyContent: 'center',
    alignItems: 'center' ,
    padding: wp('2%')
  },
  containerForm: {
    backgroundColor: '#FFF',
    height: hp('80%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 11,
    color: '#2e3f5e',
    marginTop: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7587a8',
    marginBottom: 15,
    marginLeft:15,
    marginRight:15,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: hp('3%'),
    marginHorizontal: wp('8%'),
    width: wp('75%'),
    paddingHorizontal: wp('25%'),
    paddingVertical: hp('1%'),
    borderRadius: 50,
    backgroundColor: '#556aa9'
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    textAlign: 'center',
    fontWeight:'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('8%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  inputIcon: {
    marginRight: wp('3%')
  },
  input: {
    flex: 1,
    fontSize: hp('2.2%')
  },
  labelError:{
    color: '#ff375b',
    fontSize: hp('1.8%'),
    marginHorizontal: wp('8%'),
    marginBottom: hp('1%')
  },
  linkContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    alignItems: 'center'
  },
  link: {
    color: '#a1a1a1',
    fontSize: hp('1.58%')
  }
});
