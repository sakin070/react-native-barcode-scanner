import React, { useEffect, useState } from 'react'
import {Button, Text, View,TouchableOpacity} from 'react-native'
import {auth, db} from "../../firebase/config";
import {collection, query, onSnapshot, orderBy, where, serverTimestamp, setDoc, doc, getDocs} from "firebase/firestore";
import {signOut} from "firebase/auth";
import styles from './styles'
import {AuthContext} from "../../providers/AuthProvider";
import {BarCodeScanner} from "expo-barcode-scanner";

export default function HomeScreen(props) {

    const { logout } = React.useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const getPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }
    // const [entityText, setEntityText] = useState('')
    // const [entities, setEntities] = useState([])
    // const entityRef = collection(db,'entities')
    // const userID = props.extraData === null ? '' : props.extraData.id;
    useEffect(() => {
        // updateData()
        getPermission();
    }, [])

    // const  updateData = async () => {
    //     const q = query(entityRef,where("authorID", "==", userID), orderBy('createdAt', 'desc'))
    //     const querySnapshot = await getDocs(q);
    //     const newEntities = []
    //     querySnapshot.forEach(doc => {
    //         const entity = doc.data()
    //         entity.id = doc.id
    //         newEntities.push(entity)
    //     });
    //     if(newEntities.length !== entities.length && newEntities.every((value, index) => value !== entities[index])){
    //         setEntities(newEntities)
    //     }
    // }

    // const onAddButtonPress = () => {
    //     if (entityText && entityText.length > 0) {
    //         const data = {
    //             text: entityText,
    //             authorID: userID,
    //             createdAt:  Date(),
    //         };
    //         setDoc(doc(db,'entities',data.createdAt),data)
    //         .then(_doc => {
    //             setEntityText('')
    //             Keyboard.dismiss()
    //             updateData()
    //         })
    //         .catch((error) => {
    //             alert(error)
    //         });
    //     }
    // }

    const homeSignOut = () => {
        signOut(auth).then(() => {
            logout();
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={homeSignOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            {/*<View style={styles.formContainer}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder='Add new entity'*/}
            {/*        placeholderTextColor="#aaaaaa"*/}
            {/*        onChangeText={(text) => setEntityText(text)}i*/}
            {/*        value={entityText}*/}
            {/*        underlineColorAndroid="transparent"*/}
            {/*        autoCapitalize="none"*/}
            {/*    />*/}
            {/*    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>*/}
            {/*        <Text style={styles.buttonText}>Add</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            {/*{ entities && (*/}
            {/*    <View style={styles.listContainer}>*/}
            {/*        <FlatList*/}
            {/*            data={entities}*/}
            {/*            renderItem={renderEntity}*/}
            {/*            keyExtractor={(item) => item.id}*/}
            {/*            removeClippedSubviews={true}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*)}*/}

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

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
