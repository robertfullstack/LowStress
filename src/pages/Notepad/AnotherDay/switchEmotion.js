import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const SwitchEmotion = ({ route }) => {
    const navigation = useNavigation();
    const { selectedButtons, emotionId, symbol, selectedDate } = route.params;

    const handleEmotionSwitch = (selectedButtons, emotionId, symbol) => {
        navigation.navigate('ADWrite', { selectedButtons, emotionId, symbol, selectedDate  });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerEmotion}>
                <Text style={styles.title}> Como você está se sentindo? </Text>
                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#bbf7d0' }]}
                    onPress={() => handleEmotionSwitch(selectedButtons, "radiante", "😀")}
                >
                    <Text style={styles.emotion}>😀</Text>
                    <Text style={styles.text}> Radiante </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#dcfce7' }]}
                    onPress={() => handleEmotionSwitch(selectedButtons,"feliz", "😊")}
                >
                    <Text style={styles.emotion}>😊</Text>
                    <Text style={styles.text}> Feliz </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fafafa' }]}
                    onPress={() => handleEmotionSwitch(selectedButtons, "normal", "😐")}
                >
                    <Text style={styles.emotion}>😐</Text>
                    <Text style={styles.text}> Normal </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fee2e2' }]}
                    onPress={() => handleEmotionSwitch(selectedButtons, "irritado", "😠")}
                >
                    <Text style={styles.emotion}>😠</Text>
                    <Text style={styles.text}> Irritado </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fecaca' }]}
                    onPress={() => handleEmotionSwitch(selectedButtons, "triste", "😥")}
                >
                    <Text style={styles.emotion}>😥</Text>
                    <Text style={styles.text}> Triste </Text>
                </TouchableOpacity>
            </View>
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

export default SwitchEmotion;