import React, {useState,useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen, RegistrationScreen,LoginScreen} from "./src/screens";
import {auth,db} from "./src/firebase/config";
import { doc,getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {AuthContext} from "./src/providers/AuthProvider";

const Stack = createNativeStackNavigator();

export default function App() {
 const [loading, setLoading] = useState(true);
 const [user, setUser] = useState(null);

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignedOut: false,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignedOut: true,
                    };
            }
        },
        {
            isSignedOut: false,
        }
    );

    useEffect(() => {
        let unsubscribe =  onAuthStateChanged(auth, userInput => {
                if (userInput && user===null) {
                    getDoc(doc(db, 'users', userInput.uid))
                        .then((document) => {
                            const userData = document.data()
                            setLoading(false)
                            setUser(userData)
                        })
                        .catch((error) => {
                            setLoading(false)
                        });
                    if(unsubscribe) {
                        unsubscribe();
                    }
                } else if (loading){
                    setLoading(false)
                }
            });

    });
    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {   dispatch({ type: 'SIGN_IN'});
            },
            logout: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN' });
            },
        }),
        []
    );

    if (loading) {
        return (
            <></>
        )
    }


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {( !state.isSignedOut ?
                            <Stack.Screen name={"Home"}>
                                { props => <HomeScreen {...props} extraData={user}/>}
                            </Stack.Screen>
                            :
                            <>
                                <Stack.Screen name={"Login"} component={LoginScreen}/>
                                <Stack.Screen name={"Registration"} component={RegistrationScreen}/>
                            </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
