import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable' 


const ChooseEmotion = ({ route }) => {
    const { selectedDate } = route.params;
    const navigation = useNavigation();

    const handleEmotionSwitch = (emotionId, symbol) => {
        navigation.navigate('ADSelectButtons', { emotionId, symbol, selectedDate });
    };

    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerEmotion} animation='fadeInLeft'>
                <Animatable.Text style={styles.title} animation='fadeInDown'> Como você está se sentindo? </Animatable.Text>
                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#bbf7d0' }]}
                    onPress={() => handleEmotionSwitch("radiante", "😀")}
                >
                    <Text style={styles.emotion}>😀</Text>
                    <Text style={styles.text}> Radiante </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#dcfce7' }]}
                    onPress={() => handleEmotionSwitch("feliz", "😊")}
                >
                    <Text style={styles.emotion}>😊</Text>
                    <Text style={styles.text}> Triste </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fafafa' }]}
                    onPress={() => handleEmotionSwitch("normal", "😐")}
                >
                    <Text style={styles.emotion}>😐</Text>
                    <Text style={styles.text}> Normal </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fee2e2' }]}
                    onPress={() => handleEmotionSwitch( "irritado", "😠")}
                >
                    <Text style={styles.emotion}>😠</Text>
                    <Text style={styles.text}> Irritado </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fecaca' }]}
                    onPress={() => handleEmotionSwitch("triste", "😥")}
                >
                    <Text style={styles.emotion}>😥</Text>
                    <Text style={styles.text}> Triste </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8896d7',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('6%'),
        alignItems: 'flex-start'
    },
    containerEmotion: {
        flex: 1,
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonEmotion: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        paddingLeft: wp('4%'),
        backgroundColor: '#428cfd',
        width: wp('90%'),
        height: hp('9%'),
        borderRadius: 10,
    },
    text: {
        fontSize: wp('5%'),
        marginLeft: wp('2.5%'),
        fontWeight: 'bold',
        color: '#556aa9'
    },
    emotion: {
        fontSize: wp('7%'),
    },

});

export default ChooseEmotion;