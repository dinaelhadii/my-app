// import from react-native
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";

// import input-validation-libraries
import { Formik } from 'formik';
import * as yup from 'yup';

// import styles
import { globalStyles } from "../styles/global";

const ReviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4)
        .max(15),
    body: yup.string()
        .required()
        .min(5),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Rating must be a number 1-5.', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        })
})

const ReviewForm = ({ addReview }) => {

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
                            placeholder='Review Title'
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>
                        <TextInput 
                            multiline
                            minHeight={60}
                            style={globalStyles.input}
                            placeholder='Review Body'   
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.body && props.errors.body }</Text>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Rating (1-5)'   
                            placeholderTextColor='#7D7D7D'
                            onChangeText={props.handleChange('rating')}
                            value={props.values.rating}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.rating && props.errors.rating }</Text>
                        <TouchableOpacity style={{alignSelf: 'center'}} onPress={props.handleSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Bewertung hinzufügen</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
     );
}

const styles = StyleSheet.create({
    button: {
        width: 250, 
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#3395ff',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: 'white'
    }
})
 
export default ReviewForm;