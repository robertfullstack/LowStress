import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';

export default function Registers({ data }) {

    const navigation = useNavigation();

    // Proteção contra dados undefined
    if (!data) {
        return null;
    }

    // Garantir array válido
    const registers = Array.isArray(data.selectedButtons)
        ? data.selectedButtons
        : [];

    const handlePress = () => {

        navigation.navigate('Edit', {

            selectedDate: data.formattedDate || '',

            selectedButtons: registers,

            emotionId: data.emotionId || '',

            symbol: data.symbol || '',

            todayActivity: data.todayActivity || '',

            todayFeelings: data.todayFeelings || '',

            todayThoughts: data.todayThoughts || '',

            todayLearn: data.todayLearn || '',

            todayGrateful: data.todayGrateful || '',

            id: data.id || ''
        });
    };

    return (

        <View>

            <TouchableOpacity
                style={styles.container}
                onPress={handlePress}
                activeOpacity={0.8}
            >

                <View style={styles.header}>

                    <Text style={styles.textDate}>
                        {data.formattedDate || 'Sem data'}
                    </Text>

                    <View style={styles.emoticonContainer}>

                        <Text style={styles.emoticon}>
                            {data.symbol || '😐'}
                        </Text>

                    </View>

                </View>

                <View style={styles.containerRegisters}>

                    {registers.length > 0 ? (

                        registers.map((text, index) => (

                            <View
                                key={`${text}-${index}`}
                                style={styles.selectionRegister}
                            >

                                <Text style={styles.textOptions}>
                                    {text}
                                </Text>

                            </View>

                        ))

                    ) : (

                        <Text style={styles.emptyRegister}>
                            Nenhum registro encontrado
                        </Text>

                    )}

                </View>

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#556aa9',
        margin: hp('1%'),
        padding: hp('1%'),
        borderRadius: wp('2%'),
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
        flex: 1
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textDate: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4%')
    },

    emoticonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    emoticon: {
        fontSize: wp('8%')
    },

    containerRegisters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: hp('1%')
    },

    selectionRegister: {
        backgroundColor: '#a3a8d6',
        minHeight: hp('4.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: 30,
        margin: wp('0.5%'),
    },

    textOptions: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    emptyRegister: {
        color: '#dcdcdc',
        marginTop: hp('1%')
    }

});