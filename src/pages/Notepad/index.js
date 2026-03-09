import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Platform } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { parse, format } from 'date-fns';
import { id, ptBR } from 'date-fns/locale';
import Registers from './Registers';
import { db } from '../../firebaseConnection';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../context/auth';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

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
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedButton, setSelectedButton] = useState('');
    const [registros, setRegistros] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const registrosRef = collection(db, 'Registros');

    const handleRefresh = async () => {
        setRefreshing(true);
        // Aqui você pode fazer uma nova busca pelos registros atualizados
        const fetchRegistros = async () => {
            const querry = query(registrosRef, where('userID', '==', user.uid));
            const querySnapshot = await getDocs(querry);
            const registros = [];
            querySnapshot.forEach((doc) => {
                const { selectedButtons, emotionId, symbol, formattedDate, todayActivity, todayFeelings, todayThoughts, todayLearn, todayGrateful } = doc.data(); // Obter os campos desejados do documento
                registros.push({ id: doc.id, selectedButtons, emotionId, symbol, formattedDate, todayActivity, todayFeelings, todayThoughts, todayLearn, todayGrateful });
            });
            setRegistros(registros);
        };

        fetchRegistros();
        // ...
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    useEffect(() => {
        const fetchRegistros = async () => {
            const querry = query(registrosRef, where('userID', '==', user.uid));
            const querySnapshot = await getDocs(querry);
            const registros = [];
            querySnapshot.forEach((doc) => {
                const { selectedButtons, emotionId, symbol, formattedDate, todayActivity, todayFeelings, todayThoughts, todayLearn, todayGrateful } = doc.data(); // Obter os campos desejados do documento
                registros.push({ id: doc.id, selectedButtons, emotionId, symbol, formattedDate, todayActivity, todayFeelings, todayThoughts, todayLearn, todayGrateful });
            });
            setRegistros(registros);
        };

        fetchRegistros();
    }, [user.uid]);

    const handleButtonPress = (emotionId, symbol) => {
        if (emotionId === selectedButton) {
            setSelectedButton('');
        } else {
            setSelectedButton(emotionId);
            navigation.navigate('SelectButtons', { emotionId, symbol });
        }
    };

    const [date, setDate] = useState(new Date());
    moment.locale('pt-br');

    const openDatePicker = () => {
        setShowPicker(true);
    };


    const handleDateChange = (event, date) => {
        setShowPicker(false);
        if (event.type === 'set' && date !== undefined) {
            const selectedDate = new Date(date);
            navigation.navigate('ChooseEmotion', { selectedDate: formatDate(selectedDate) });
        }
    };

    const formatDate = (date) => {
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                style={{ height: 100, paddingTop: 10, paddingBottom: 5, pointerEvents: 'none' }}
                calendarHeaderStyle={{ color: 'white' }}
                calendarColor={'#556aa9'}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                highlightDateNameStyle={{ color: 'yellow' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ opacity: 0 }}
                locale={{
                    name: 'pt-br',
                    config: {
                        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                        weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_')
                    }
                }}
                selectedDate={date}
            />

            <Animatable.View style={styles.containerButtons} animation='fadeInDown'>
                <Text style={styles.textEmoticons}>Como se sente hoje?</Text>
                <View style={styles.emoticons}>
                    {expressions.map(({ id, symbol }) => (
                        <TouchableOpacity
                            key={id}
                            style={[
                                styles.roundButton,
                                selectedButton === id,
                            ]}
                            onPress={() => handleButtonPress(id, symbol)}
                        >
                            <Text style={styles.emotion}>{symbol}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animatable.View>

            <View style={styles.title}>
                <Animatable.Text style={styles.textDaily} animation="fadeInLeft">
                    Meu Diário
                </Animatable.Text>
                <TouchableOpacity onPress={handleRefresh}>
                    <Animatable.View
                        animation={refreshing ? 'rotate' : ''}
                        easing="linear"
                        iterationCount="infinite"
                        duration={1000}
                    >
                        <FontAwesome name="refresh" size={24} color="white" />
                    </Animatable.View>
                </TouchableOpacity>
            </View>
            {registros && registros.length > 0 ? (
                <FlatList
                    animation='fadeInDown'
                    contentContainerStyle={{ paddingHorizontal: wp('1%') }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    data={registros}
                    renderItem={({ item }) => <Registers data={item} />}
                />
            ) : (
                <Animatable.Text style={styles.emptyText} animation='fadeInLeft' >Nenhum registro encontrado.</Animatable.Text>
            )}

            <Animatable.View style={styles.footer} animation='fadeInUp'>
                <TouchableOpacity style={styles.buttonFooter} onPress={openDatePicker}>
                    <Text style={styles.textButton}>Registre o seu dia!</Text>
                </TouchableOpacity>
            </Animatable.View>

            {showPicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'android' ? 'calendar' : 'default'}
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

    textDaily: {
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: 'white'
    },

    emptyText: {
        marginTop: wp('2%'),
        paddingStart: wp('4%'),
        fontSize: hp('1.8%'),
        color: 'gray'
    },

    emoticons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: '5%'
    },

    roundButton: {
        borderColor: 'white',
        borderWidth: wp('0.2'),
        height: hp('6%'),
        borderRadius: 8,
        backgroundColor: '#556aa9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5.65,
        elevation: 9,
        paddingHorizontal: wp('4.5%'),
    },

    emotion: {
        fontSize: wp('6%'),
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
        width: wp('35%'),
        height: hp('5%'),
        borderRadius: 50,
        backgroundColor: '#3c4383',
        marginEnd: wp('2.5%'),
    },

    textButton: {
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('5%'),
        paddingStart: wp('4%'),
        paddingEnd: wp('4%'),
    }

});

export default Notepad;