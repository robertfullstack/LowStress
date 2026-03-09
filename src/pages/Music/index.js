import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable'

const App = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flex: 1, marginTop: hp('8%') }}>
                    <Text style={{ fontSize: 30, lineHeight: 55, color: 'white', fontWeight: 'bold' }}>Músicas</Text>
                    <Text style={{ fontSize: 30, lineHeight: 50, color: 'white', fontWeight: 'bold' }}>   para</Text>
                    <Text style={{ fontSize: 30, lineHeight: 55, color: 'white', fontWeight: 'bold' }}>Relaxar</Text>
                </View>
                <Image
                    source={require('../../assets/music.png')}
                    style={{
                        position: 'absolute',
                        bottom: 1,
                        right: wp('-20%'),
                        width: wp('100%'),
                        height: hp('40%'),
                        resizeMode: 'contain',
                        marginBottom: hp('1.3%')
                    }}
                />

            </View>
            <Animatable.View style={styles.containerCards} animation='fadeInUp' >
                <View style={styles.cardList}>
                    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Relax') }}>
                        <View>
                            <Image
                                source={require('../../assets/albuns/mixRelax.jpg')}
                                style={styles.capaRelax}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Mix Relax</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>Chillpeach, Yan Yan...</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Concentration') }}>
                        <View>
                            <Image
                                source={require('../../assets/albuns/mixConcentration.png')}
                                style={styles.capaRelax}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Mix Concentration</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>Lukrembo, TossedOnion...</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('CalmDown') }}>
                        <View>
                            <Image
                                source={require('../../assets/albuns/mixCalmDown.jpg')}
                                style={styles.capaRelax}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Mix Calm Down</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>Tokyo Rain, Hakaisu...</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Happy') }}>
                        <View>
                            <Image
                                source={require('../../assets/albuns/mixHappy.png')}
                                style={styles.capaRelax}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Mix Happy</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>Chris Brown, Bruno Mars...</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    containerHeader: {
        height: hp('40%'),
        backgroundColor: '#556aa9',
        position: 'relative',
        padding: wp('5%'),
    },
    cardList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCards: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('-2%')
    },
    card: {
        backgroundColor: '#e8f7fd',
        borderRadius: 8,
        padding: 20,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: wp('45%'),
        height: hp('30%'),
        
    },
    capaRelax: {
        width: wp('37%'),
        height: hp('16%'),
        borderRadius: 8,
        marginLeft: -3
    },
    title:{
        fontWeight: 'bold', 
        fontSize: hp('2%'),
        marginTop: 10
    },
    description: {
        fontSize: hp('1.7%'),
        marginTop: 10
    },
});

export default App;
