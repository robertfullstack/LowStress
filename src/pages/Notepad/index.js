import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
    Platform,
    ActivityIndicator
} from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import 'moment/locale/pt-br';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Registers from './Registers';

import { db } from '../../firebaseConnection';

import {
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';

import { AuthContext } from '../../context/auth';

import * as Animatable from 'react-native-animatable';

import { FontAwesome } from '@expo/vector-icons';

moment.locale('pt-br');

const expressions = [
    { id: 'radiante', symbol: '😀' },
    { id: 'feliz', symbol: '😊' },
    { id: 'normal', symbol: '😐' },
    { id: 'irritado', symbol: '😠' },
    { id: 'triste', symbol: '😥' },
];

const Notepad = () => {

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);

    const [selectedButton, setSelectedButton] = useState('');

    const [registros, setRegistros] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const [loading, setLoading] = useState(true);

    const registrosRef = collection(db, 'Registros');

    async function fetchRegistros() {

        try {

            if (!user?.uid) {
                return;
            }

            const q = query(
                registrosRef,
                where('userID', '==', user.uid)
            );

            const querySnapshot = await getDocs(q);

            const lista = [];

            querySnapshot.forEach((docItem) => {

                const data = docItem.data();

                lista.push({
                    id: docItem.id,
                    ...data
                });

            });

            setRegistros(lista);

        } catch (error) {

            console.log('Erro ao buscar registros:', error);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {

        fetchRegistros();

    }, [user]);

    const handleRefresh = async () => {

        try {

            setRefreshing(true);

            await fetchRegistros();

        } catch (error) {

            console.log(error);

        } finally {

            setTimeout(() => {
                setRefreshing(false);
            }, 800);

        }
    };

    const handleButtonPress = (emotionId, symbol) => {

        setSelectedButton(emotionId);

        navigation.navigate('SelectButtons', {
            emotionId,
            symbol
        });
    };

    const openDatePicker = () => {
        setShowPicker(true);
    };

    const handleDateChange = (event, date) => {

        setShowPicker(false);

        if (event.type === 'dismissed') {
            return;
        }

        if (date) {

            setSelectedDate(date);

            navigation.navigate('ChooseEmotion', {
                selectedDate: formatDate(date)
            });
        }
    };

    const formatDate = (date) => {

        try {

            return format(
                date,
                "dd 'de' MMMM 'de' yyyy",
                { locale: ptBR }
            );

        } catch (error) {

            return '';

        }
    };

    if (loading) {

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (

        <View style={styles.container}>

            <CalendarStrip
                scrollable
                style={styles.calendar}
                calendarColor={'#556aa9'}
                calendarHeaderStyle={{ color: 'white' }}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                highlightDateNameStyle={{ color: 'yellow' }}
                disabledDateNameStyle={{ color: 'gray' }}
                disabledDateNumberStyle={{ color: 'gray' }}
                iconContainer={{ opacity: 0 }}
                selectedDate={selectedDate}
            />

            <Animatable.View
                style={styles.containerButtons}
                animation='fadeInDown'
            >

                <Text style={styles.textEmoticons}>
                    Como se sente hoje?
                </Text>

                <View style={styles.emoticons}>

                    {expressions.map(({ id, symbol }) => (

                        <TouchableOpacity
                            key={id}
                            style={styles.roundButton}
                            onPress={() =>
                                handleButtonPress(id, symbol)
                            }
                        >

                            <Text style={styles.emotion}>
                                {symbol}
                            </Text>

                        </TouchableOpacity>

                    ))}

                </View>

            </Animatable.View>

            <View style={styles.title}>

                <Animatable.Text
                    style={styles.textDaily}
                    animation="fadeInLeft"
                >
                    Meu Diário
                </Animatable.Text>

                <TouchableOpacity onPress={handleRefresh}>

                    <Animatable.View
                        animation={refreshing ? 'rotate' : undefined}
                        easing="linear"
                        iterationCount={refreshing ? 'infinite' : 1}
                        duration={1000}
                    >

                        <FontAwesome
                            name="refresh"
                            size={24}
                            color="white"
                        />

                    </Animatable.View>

                </TouchableOpacity>

            </View>

            {registros.length > 0 ? (

                <FlatList
                    data={registros}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: wp('1%'),
                        paddingBottom: hp('10%')
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <Registers data={item} />
                    )}
                />

            ) : (

                <Animatable.Text
                    style={styles.emptyText}
                    animation='fadeInLeft'
                >
                    Nenhum registro encontrado.
                </Animatable.Text>

            )}

            <Animatable.View
                style={styles.footer}
                animation='fadeInUp'
            >

                <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={openDatePicker}
                >

                    <Text style={styles.textButton}>
                        Registre o seu dia!
                    </Text>

                </TouchableOpacity>

            </Animatable.View>

            {showPicker && (

                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={
                        Platform.OS === 'android'
                            ? 'calendar'
                            : 'default'
                    }
                    onChange={handleDateChange}
                />

            )}

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#8896d7',
    },

    loadingContainer: {
        flex: 1,
        backgroundColor: '#8896d7',
        justifyContent: 'center',
        alignItems: 'center'
    },

    calendar: {
        height: 100,
        paddingTop: 10,
        paddingBottom: 5,
    },

    containerButtons: {
        width: wp('100%'),
        marginBottom: hp('4%')
    },

    textEmoticons: {
        marginStart: wp('4%'),
        marginTop: wp('5%'),
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: 'white'
    },

    emoticons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: hp('3%')
    },

    roundButton: {
        borderColor: 'white',
        borderWidth: wp('0.2'),
        height: hp('6%'),
        borderRadius: 8,
        backgroundColor: '#556aa9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        paddingHorizontal: wp('4.5%'),
    },

    emotion: {
        fontSize: wp('6%'),
    },

    title: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginBottom: hp('2%')
    },

    textDaily: {
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: 'white'
    },

    emptyText: {
        marginTop: wp('2%'),
        paddingStart: wp('4%'),
        fontSize: hp('1.8%'),
        color: '#eee'
    },

    footer: {
        position: 'absolute',
        bottom: hp('2%'),
        right: wp('2%'),
    },

    buttonFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('40%'),
        height: hp('5.5%'),
        borderRadius: 50,
        backgroundColor: '#3c4383',
    },

    textButton: {
        fontWeight: 'bold',
        color: 'white'
    }

});

export default Notepad;