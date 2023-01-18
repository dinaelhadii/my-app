// Bewertungsformular, welches die Bibliotheken yup und Formik zur Validierung der Nutzereingaben 
// und Darstellung von Fehlermeldungen verwendet. 

// import from react-native
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";

// import input-validation-libraries
import { Formik } from 'formik';
import * as yup from 'yup';

// import styles and components
import { globalStyles } from "../styles/global";
import AppButton from "./AppButton";

// Definiert für jede TextInput-Komponente Bedingungen, die eingehalten werden müssen,
// um die Daten einreichen zu können.
const ReviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4)
        .max(15),
    body: yup.string(),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Bitte eine Zahl zwischen 1-5 eingeben.', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        })
})

const ReviewForm = ({ addReview }) => {
    // Formik nimmt die Namen der TextInput-Komponenten auf und nimmt als Validierungsschema
    // die mit yup definierte Validierung auf. Beim Einreichen der Daten (submit) werden die Inhalte
    // der Felder geleert und es wird die addReview-Funktion aufgerufen (siehe Reviews-Komponente).
    return ( 
        <View>
            <Formik
                initialValues={{ title: '', body: '', rating: ''}}
                validationSchema={ReviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Titel'
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>
                        <TextInput 
                            multiline
                            minHeight={80}
                            style={globalStyles.input}
                            placeholder='Text'   
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.body && props.errors.body }</Text>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Bewertung (1-5)'   
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('rating')}
                            value={props.values.rating}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.rating && props.errors.rating }</Text>
                        
                        <AppButton title={'Bewertung hinzufügen'} pressHandler={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
     );
}

export default ReviewForm;