import React, { useState,useEffect } from "react";
import {View,Image,TextInput, TouchableOpacity,Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {auth,db} from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import styles from './styles'
import {AuthContext} from "../../providers/AuthProvider";

export default function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = React.useContext(AuthContext);

    const onFooterLinkPress = () => {
        props.navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        signInWithEmailAndPassword(auth,email,password)
            .then((response) => {
                const uid = response.user.uid
                getDoc(doc(db,'users',uid))
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        setEmail('')
                        setPassword('')
                        signIn()
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }
    return(
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}
                                     keyboardShouldPersistTaps="always">
                <Image style={styles.logo} source={ require('../../../assets/ess-logo.png')} />
                <TextInput style={styles.input}
                           placeholder='E-mail'
                           placeholderTextColor="#aaaaaa"
                           onChangeText={(text) => setEmail(text)}
                           value={email}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                />

               <TextInput   style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
               />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
