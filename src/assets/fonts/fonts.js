import * as Font from 'expo-font';

export async function loadFonts() {
  await Font.loadAsync({
    'PurpleQueen': require('../../assets/fonts/PurpleQueen.ttf'),
  });
}
