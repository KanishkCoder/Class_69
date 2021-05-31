import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarcodeScanner} from 'expo-barcode-scanner'

export default class Transaction extends React.Component{
constructor(){
    super();
    this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
}

getCameraPermissions=async()=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==="granted"
    })
}
handleBarCodeScanned=async({type,data})=>{
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==='clicked'){
            return(
                <BarCodeScanner 
                onBarcodeScanned={scanned ? undefined: this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText} >
                        {hasCameraPermissions===true? this.state.scannedData : "Request Camera Persmission"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions}>
                        <Text style={styles.displayText} >Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
        }
        


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center' ,
        alignSelf:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    scanButton:{
        backgroundColor:'yellow',
        padding:10,
        margin:10
    }
})