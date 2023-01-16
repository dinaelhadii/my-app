// import from react and react-native
import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, } from 'react-native';

// import styles
import { globalStyles } from '../styles/global';

const Blog = () => {
    return ( 
        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 30}} showsVerticalScrollIndicator={false}>
                <Text style={globalStyles.titleText}>Blog des Tages</Text>
                <Text style={globalStyles.sectionText}>Die Clog Slipper von Birkenstock</Text>
                <Text style={[globalStyles.text, {fontSize: 16}]}>Die gemütlichen Sandalen und Slides des deutschen Labels Birkenstock haben 
                    sich schon lange etablieren können und zieren die Füße von unzähligen weiblichen 
                    – und auch männlichen – Fans dieser bequemen Schuhmode. Sie haben so klangvolle 
                    Namen wie Madrid oder Gizeh und Arizona und praktisch jeder hat mindestens eins der 
                    Modelle in seinem Schuhschrank. Das Modell Boston erobert nun die Welt im Sturm. 
                    Bereits 1979 auf den Markt gebracht erfährt das Modell, benannt nach der US-Metropole 
                    an der Ostküste, die Herzen der Modeanhänger. Im Gegensatz zum ursprünglichen Modell 
                    der Sandalen bietet diese Variante einen Schutz für die Zehen und hält dabei schön warm. 
                    So sind die Schuhe praktisch für jedes Wetter geeignet und passen sich den jeweiligen 
                    Erfordernissen individuell an. Die Pantoffel-ähnlichen Schuhe mit dem guten orthopädischen 
                    Fußbett wurden bereits damals gern getragen, sind dann aber erstmal von der Bildfläche 
                    weitestgehend verschwunden. Sie wurden zwar noch von den Anhängern bequemer Schuhe angezogen, 
                    waren aber in den Modemagazinen nicht sichtbar und in den sozialen Netzwerken suchte man sie 
                    ebenfalls vergeblich.
                    Im Herbst/ Winter 2022/ 2023 erfahren die Birkenstock Boston nun einen Aufwärtstrend, 
                    der seinesgleichen sucht. Der Hype um dieses komfortable Schuhmodell könnte spektakulärer 
                    nicht sein und die Preise für die Clog Slipper schießen auf dem Markt in die Höhe. Diese 
                    Entwicklung konnte man 2020 schon bei den Surfer Boots von UGG beobachten und auch dieser 
                    Trend war damals eher ungewöhnlich stark ausgeprägt. Der derzeitige XXL-Trend mit seinen 
                    unzähligen Oversized Looks macht es uns auf jeden Fall äußerst angenehm, stylish und bestens 
                    gewandet auf die Straße oder zur Arbeit zu gehen. Kombiniert mit den trendy Clogs lässt sich 
                    der derzeitige Look absolut perfekt und alltagstauglich kombinieren. Und wenn alle Welt nach 
                    dem Boston Clogs Schuh Trend giert, machen wir auf jeden Fall mit – warum auch nicht?
                </Text>

                <Text style={globalStyles.sectionText}>Der Clogs Trend in der Welt der Promis</Text>
                <Text style={[globalStyles.text, {fontSize: 16}]}>Was derzeit im Trend liegt, darüber informieren uns nicht nur die Modezeitschriften, sondern 
                    vor allem die Influencerinnen in den sozialen Netzwerken. Die Promis sind auch ganz vorn mit dabei, 
                    um uns über die Stilrichtungen und angesagten Modetrends auf dem Laufenden zu halten.
                    Wer folgt nicht seinen Lieblingsschauspielerinnen, Sängerinnen oder anderen prominenten Stars auf 
                    Instagram & Co.?! Sie lassen sich regelmäßig in der neuesten Mode ablichten und tragen, was ihnen 
                    gefällt und was derzeit angesagt ist. Dabei nehmen sie selbstverständlich maßgeblich Einfluss und 
                    bieten die perfekte Plattform, um uns zu sagen, was IN und was OUT ist. Und momentan sind eben die 
                    Boston Clogs absolut im Trend. Wir können also beobachten, wie berühmte Schauspielerinnen wie zum Beispiel 
                    „Twilight“-Darstellerin Kristen Stewart oder Hollywoodschauspielerin Sienna Miller in diesem trendigen 
                    Schuhwerk durch die Metropolen dieser Welt marschieren oder aber auch zu Hause. Ebenso Kaia Gerber, Tochter 
                    von Supermodel Cindy Crawford oder Model Kendall Jenner aus dem Kardashian-Clan sind erklärte Fans des 
                    Boston Clogs Schuh Trends.
                </Text>
                <Text style={globalStyles.sectionText}>Wie wird der Clogs Trend kombiniert?</Text>
                <Text style={[globalStyles.text, {fontSize: 16}]}>Die gute Nachricht ist: Der Clog Slipper kann auch im Winter nach Herzenslust kombiniert werden und es 
                    ist praktisch alles erlaubt, was gefällt. Vor allem mit dem ewigen Klassiker Jeans sind die Clogs perfekt 
                    in Kombination zu tragen. Die Clogs gehören zu den Normcore-Schuhen und sind damit echte Allroundschuhe und 
                    lassen sich herrlich leicht und vielfältig kombinieren. Die Jeans, wahlweise in schönen Blautönen oder 
                    Cremefarben, werden getragen im Wide-leg Style und einem oversized Pullover zu den Pantoffel-anmutenden 
                    Schuhen. Nicht weniger stylish kommen die Clog Slipper mit der inzwischen nicht mehr wegzudenkenden Jogginghose 
                    daher. Vor allem gepaart mit einem hochwertigerem Oberteil wie einem schönen Strickpulli oder einem Poloshirt 
                    wirken sie besonders ansprechend. Und selbstverständlich funktioniert der Boston Clogs Schuh Trend auch 
                    mit einem edleren Zweiteiler ganz hervorragend. In diesem Fall werden die Clog Slipper im Winter mit einer 
                    Bundfaltenhose und einer schönen Bluse kombiniert getragen. So kann der Clogs Trend sogar ins Büro angezogen 
                    werden.Die Boston Slipper machen sich auch absolut perfekt in Kombination mit Mantel und Jeans und sind damit 
                    der ideale Begleiter zum Einkaufsbummel oder dem Kaffeetrinken mit der besten Freundin.
                </Text>
            </ScrollView>
        </View>
     );
}
 
export default Blog;