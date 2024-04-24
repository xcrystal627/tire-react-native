import React, { useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput, Text, Button, FAB} from 'react-native-paper'

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';

const BarCodeInput = (props) =>{
    const dispatch = useDispatch()
    
    const {barCode1, setBarCode1, barCode2, setBarCode2, barCode3, setBarCode3, barCode4, setBarCode4, message1, message2, message3, message4} = props

    const barcode1_input = useRef()
    const barcode2_input = useRef()
    const barcode3_input = useRef()
    const barcode4_input = useRef()

    const handleBarCode1Change = (text) =>{
        setBarCode1(text)
        if(text.length == 10){
            barcode2_input.current.focus()
        }
    }

    const handleBarCode2Change = (text) =>{
        setBarCode2(text)
        if(text.length == 10){
            barcode3_input.current.focus()
        }
    }

    const handleBarCode3Change = (text) =>{
        setBarCode3(text)
        if(text.length == 10){
            barcode4_input.current.focus()
        }
    }

    const handleBarCode4Change = (text) =>{
        setBarCode4(text)
        // if(text.length == 10){
        //     barcode1_input.current.focus()
        // }
    }

    return(
        <View style={styles.root}>
            
            <TextInput
                label="BarCode1"
                mode="outlined"
                maxLength={15}
                ref={barcode1_input}
                keyboardType={'numeric'}
                contentStyle={{backgroundColor: barCode1.length == 0 ? "transparent" :( (message1 != "" && message1 != "New" ) ? "#09fc0089" : message1 == "New" ? "#ff634788": barCode1.length == 10 ? "#FFA50055" : "#FF634755")}}
                style={{marginBottom: 4}}
                value={barCode1}
                onChangeText={handleBarCode1Change}
            />
            {message1 !== "" &&
                <Text variant="bodySmall" style={{color: 'tomato', textAlign: "right", paddingRight: 8 }} >{message1}</Text>
            }
            <TextInput
                label="BarCode2"
                mode="outlined"
                maxLength={15}
                ref={barcode2_input}
                keyboardType={'numeric'}
                contentStyle={{backgroundColor: barCode2.length == 0 ? "transparent" :( (message2 != "" && message2 != "New" ) ? "#09fc0089" : message2 == "New" ? "#ff634788": barCode2.length == 10 ? "#FFA50055" : "#FF634755")}}
                style={{marginBottom: 4}}
                value={barCode2}
                onChangeText={handleBarCode2Change}
            />
            {message2 !== "" &&
                <Text variant="bodySmall" style={{color: 'tomato', textAlign: "right", paddingRight: 8 }} >{message2}</Text>
            }
            <TextInput
                label="BarCode3"
                mode="outlined"
                maxLength={15}
                ref={barcode3_input}
                keyboardType={'numeric'}
                contentStyle={{backgroundColor: barCode3.length == 0 ? "transparent" :( (message3 != "" && message3 != "New" ) ? "#09fc0089" : message3 == "New" ? "#ff634788": barCode3.length == 10 ? "#FFA50055" : "#FF634755")}}
                style={{marginBottom: 4}}
                value={barCode3}
                onChangeText={handleBarCode3Change}
            />
            {message3 !== "" &&
                <Text variant="bodySmall" style={{color: 'tomato', textAlign: "right", paddingRight: 8 }} >{message3}</Text>
            }
            <TextInput
                label="BarCode4"
                mode="outlined"
                maxLength={15}
                ref={barcode4_input}
                keyboardType={'numeric'}
                contentStyle={{backgroundColor: barCode4.length == 0 ? "transparent" :( (message4 != "" && message4 != "New" ) ? "#09fc0089" : message4 == "New" ? "#ff634788": barCode4.length == 10 ? "#FFA50055" : "#FF634755")}}
                style={{marginBottom: 4}}
                value={barCode4}
                onChangeText={handleBarCode4Change}
            />
            {message4 !== "" &&
                <Text variant="bodySmall" style={{color: 'tomato', textAlign: "right", paddingRight: 8 }} >{message4}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        paddingLeft:8,
        paddingRight:8,
    }
})

export default BarCodeInput