// import from react and react-native
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// import from firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// import components
import NavBar from './routes/NavBar';
import LoginStack from './routes/LoginStack';

// Zeigt den Splashscreen an. Bild ist unter 'splash.png' im Ordner 'assets' gespeichert.
// Funktion verhindert das Laden der App bzw. sorgt dafür, dass der Splashscreen nicht 'versteckt' wird.
SplashScreen.preventAutoHideAsync();

export default function App() {

  // State-Variablen, die prüfen, ob App geladen ist und ob Nutzer eingeloggt ist.
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // App lädt vor dem Laden der App Schriftarten herunter.
        await Font.loadAsync({
          'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
          'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
          'pacifico-regular': require('./assets/fonts/Pacifico-Regular.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // App wird geladen, wenn Nutzer eingeloggt ist.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
        setAppIsReady(true);
        return unsubscribe;
      }
    }
    prepare();

  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  onLayoutRootView();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <NavBar />
      ) : (
        <LoginStack />
      )}
      <StatusBar></StatusBar>
    </NavigationContainer>
  );
}