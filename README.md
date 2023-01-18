# ShoppingSky

Unsere App "ShoppingSky" fokussiert sich auf den E-Commerce. Es soll dem User eine minimalistische und unkomplizierte Plattform bieten, einzukaufen. Zu dem fokussieren wir uns auf Transparenz, indem wir die Bewertungen der User ungefiltert anzeigen.

## Autoren

- Dina El-Hadi
- Munzur Yalcin

## App starten

Die App wird gestartet, indem man den Befehl **"npx expo start"** oder **"npm start"** in das Terminal eingibt.

[Link zum Github Repository](https://github.com/dinaelhadii/my-app.git)

## Anmerkungen

- Es gibt die Warnung zu AsyncStorage: 'AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage'. Selbst nach Installieren des entsprechenden Moduls bleibt die Warnung enthalten.

- Navigiert man von einem ProductDetails-Bildschirm zum Reviews-Bildschirm, erscheint evtl. die Warnung 'Warning: Each child in a list should have a unique "key" prop.'. Jedoch besitzt jedes Element der Liste einen eigenen Key bzw. eine ID. Navigiert man zurück zum ProductDetails-Bildschirm und dann wieder zum Reviews-Bildschirm, so erscheint die Warnung nicht mehr.
