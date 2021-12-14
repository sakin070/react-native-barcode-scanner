import React, { useEffect, useState } from 'react'
import {Text, View,TouchableOpacity} from 'react-native'
import {auth, db} from "../../firebase/config";
import { setDoc, doc} from "firebase/firestore";
import {signOut} from "firebase/auth";
import styles from './styles'
import {AuthContext} from "../../providers/AuthProvider";
import {BarCodeScanner} from "expo-barcode-scanner";
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen(props) {

    const { logout } = React.useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);

    const getPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }
    useEffect(() => {
        getPermission();
    }, [])

    const homeSignOut = () => {
        signOut(auth).then(() => {
            logout();
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setDoc(doc(db,'barcodes',data),{ type, data }).then(
            () => setScanning(false)
        )
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
            {!scanning ?
                <TouchableOpacity onPress={() => setScanning(true)}>
                    <AntDesign name="camera" size={24} color="black" />
                    <Text>Click to Scan</Text>
                </TouchableOpacity>
                :
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={styles.absoluteFillObject}
                />
            }
        </View>
    )
}
