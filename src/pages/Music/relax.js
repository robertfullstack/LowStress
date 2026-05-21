import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import relaxSongs from "./model/relax";
import { Audio } from 'expo-av';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Relax() {

    const navigation = useNavigation();

    const [songIndex, setSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const soundRef = useRef(null);

    useEffect(() => {
        loadAudio();

        return () => {
            unloadAudio();
        };
    }, []);

    useEffect(() => {
        let interval = null;

        if (soundRef.current) {
            interval = setInterval(async () => {
                try {
                    const status = await soundRef.current.getStatusAsync();

                    if (!status.isLoaded) return;

                    const current = status.positionMillis || 0;
                    const total = status.durationMillis || 0;

                    setCurrentDuration(current);
                    setTotalDuration(total);

                    if (total > 0) {
                        setProgress(current / total);
                    }

                } catch (error) {
                    console.log("Erro ao atualizar progresso:", error);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [songIndex]);

    async function loadAudio(index = songIndex) {
        try {

            if (!relaxSongs[index]) {
                console.log("Música não encontrada");
                return;
            }

            await unloadAudio();

            const { sound } = await Audio.Sound.createAsync(
                relaxSongs[index].url,
                { shouldPlay: false }
            );

            soundRef.current = sound;

        } catch (error) {
            console.log("Erro ao carregar áudio:", error);
        }
    }

    async function unloadAudio() {
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
                soundRef.current = null;
            }
        } catch (error) {
            console.log("Erro ao descarregar áudio:", error);
        }
    }

    async function playSound() {
        try {

            if (!soundRef.current) {
                await loadAudio(songIndex);
            }

            await soundRef.current.playAsync();
            setIsPlaying(true);

        } catch (error) {
            console.log("Erro ao reproduzir áudio:", error);
        }
    }

    async function pauseSound() {
        try {

            if (!soundRef.current) return;

            await soundRef.current.pauseAsync();
            setIsPlaying(false);

        } catch (error) {
            console.log("Erro ao pausar áudio:", error);
        }
    }

    async function handleNext() {

        try {

            const nextSongIndex =
                songIndex + 1 >= relaxSongs.length
                    ? 0
                    : songIndex + 1;

            setIsPlaying(false);
            setProgress(0);

            await loadAudio(nextSongIndex);

            setSongIndex(nextSongIndex);

            await soundRef.current.playAsync();

            setIsPlaying(true);

        } catch (error) {
            console.log("Erro ao trocar música:", error);
        }
    }

    async function handlePrevious() {

        try {

            const previousSongIndex =
                songIndex - 1 < 0
                    ? relaxSongs.length - 1
                    : songIndex - 1;

            setIsPlaying(false);
            setProgress(0);

            await loadAudio(previousSongIndex);

            setSongIndex(previousSongIndex);

            await soundRef.current.playAsync();

            setIsPlaying(true);

        } catch (error) {
            console.log("Erro ao voltar música:", error);
        }
    }

    function formatDuration(duration) {

        if (!duration) {
            return "00:00";
        }

        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.maincontainer}>

                <View style={styles.touchableContainer}>
                    <TouchableOpacity
                        onPress={async () => {
                            await unloadAudio();
                            navigation.navigate('Music');
                        }}
                    >
                        <Ionicons
                            name={
                                Platform.OS === 'ios'
                                    ? 'ios-arrow-back'
                                    : 'md-arrow-back'
                            }
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                <Animatable.Image
                    animation='fadeInDown'
                    style={styles.artwork}
                    source={relaxSongs[songIndex].artwork}
                />

                <Animatable.View animation='fadeInRight'>
                    <Text style={[styles.songContent, styles.songTitle]}>
                        {relaxSongs[songIndex].title}
                    </Text>

                    <Text style={[styles.songContent, styles.songArtist]}>
                        {relaxSongs[songIndex].artist}
                    </Text>
                </Animatable.View>

                <Animatable.View animation='fadeInLeft'>

                    <Slider
                        style={styles.progressBar}
                        value={progress}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTintColor="#FFFFFF"
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        disabled
                    />

                    <View style={styles.progressLevelDuration}>

                        <Text style={styles.progressLabelText}>
                            {formatDuration(currentDuration)}
                        </Text>

                        <Text style={styles.progressLabelText}>
                            {formatDuration(totalDuration)}
                        </Text>

                    </View>

                </Animatable.View>

                <Animatable.View
                    style={styles.musicControlsContainer}
                    animation='fadeInUp'
                >

                    <TouchableOpacity onPress={handlePrevious}>
                        <Ionicons
                            name="play-skip-back-outline"
                            size={45}
                            color="#ffffff"
                        />
                    </TouchableOpacity>

                    {isPlaying ? (
                        <TouchableOpacity onPress={pauseSound}>
                            <Ionicons
                                name="ios-pause-circle"
                                size={80}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={playSound}>
                            <Ionicons
                                name="ios-play-circle"
                                size={80}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={handleNext}>
                        <Ionicons
                            name="play-skip-forward-outline"
                            size={45}
                            color="#ffffff"
                        />
                    </TouchableOpacity>

                </Animatable.View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#556aa9'
    },

    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp('2%')
    },

    touchableContainer: {
        position: 'absolute',
        top: hp('6%'),
        left: wp('6%'),
        zIndex: 10
    },

    artwork: {
        width: wp('85%'),
        height: hp('40%'),
        borderRadius: wp('10%'),
        marginBottom: hp('4%'),
    },

    songContent: {
        textAlign: 'center',
        color: '#EEEEEE',
    },

    songTitle: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
    },

    songArtist: {
        fontSize: wp('4%'),
        marginTop: hp('1%'),
    },

    progressBar: {
        width: wp('85%'),
        height: hp('2%'),
        marginTop: hp('3%'),
    },

    progressLevelDuration: {
        width: wp('85%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('1%'),
    },

    progressLabelText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    musicControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: wp('60%'),
        marginTop: hp('5%'),
    },

});