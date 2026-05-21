import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SwitchEmotion = ({ route }) => {
    const navigation = useNavigation();

    const selectedButtons = route?.params?.selectedButtons || [];
    const emotionId = route?.params?.emotionId || '';
    const symbol = route?.params?.symbol || '';

    const handleEmotionSwitch = (newEmotionId, newSymbol) => {
        navigation.navigate('Write', {
            selectedButtons,
            emotionId: newEmotionId,
            symbol: newSymbol
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerEmotion}>

                <Text style={styles.title}>
                    Como você está se sentindo?
                </Text>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#bbf7d0' }]}
                    onPress={() => handleEmotionSwitch('radiante', '😀')}
                >
                    <Text style={styles.emotion}>😀</Text>
                    <Text style={styles.text}>Radiante</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#dcfce7' }]}
                    onPress={() => handleEmotionSwitch('feliz', '😊')}
                >
                    <Text style={styles.emotion}>😊</Text>
                    <Text style={styles.text}>Feliz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fafafa' }]}
                    onPress={() => handleEmotionSwitch('normal', '😐')}
                >
                    <Text style={styles.emotion}>😐</Text>
                    <Text style={styles.text}>Normal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fee2e2' }]}
                    onPress={() => handleEmotionSwitch('irritado', '😠')}
                >
                    <Text style={styles.emotion}>😠</Text>
                    <Text style={styles.text}>Irritado</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonEmotion, { backgroundColor: '#fecaca' }]}
                    onPress={() => handleEmotionSwitch('triste', '😥')}
                >
                    <Text style={styles.emotion}>😥</Text>
                    <Text style={styles.text}>Triste</Text>
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
        marginBottom: hp('3%'),
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