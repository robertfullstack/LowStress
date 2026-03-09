import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Registers({ data }) {
    const navigation = useNavigation();
    const registers = data.selectedButtons;

    const handlePress = () => {
        navigation.navigate('Edit', {
            selectedDate: data.formattedDate,
            selectedButtons: data.selectedButtons,
            emotionId: data.emotionId,
            symbol: data.symbol,
            todayActivity: data.todayActivity,
            todayFeelings: data.todayFeelings,
            todayThoughts: data.todayThoughts,
            todayLearn: data.todayLearn,
            todayGrateful: data.todayGrateful,
            id: data.id
        });
    };

    return (
        <View key={data.id}>
            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <View style={styles.header}>
                    <Text style={styles.textDate}>{data.formattedDate}</Text>
                    <View style={styles.emoticonContainer}>
                        <Text style={styles.emoticon}>{data.symbol}</Text>
                    </View>
                </View>
                <View style={styles.containerRegisters}>
                    {registers.map((text, index) => (
                        <View key={index.toString()} style={styles.selectionRegister} >
                            <Text style={styles.textOptions}>{text}</Text>
                        </View>
                    ))}
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

    emoticon: {
        fontSize: wp('8%')
    },

    containerRegisters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    selectionRegister: {
        backgroundColor: '#a3a8d6',
        height: hp('4.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp('2%'),
        padding: wp('4%'),
        borderRadius: 30,
        margin: wp('0.5%'),
    },
});
