import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput, Button, FAB} from 'react-native-paper'

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';

const RaceType = (props) =>{
    const dispatch = useDispatch()
    
    const {raceType, setRaceType} = props

    const currentPage = useSelector((state) => state.data.currentPage)
    
    const handleSubmit = () =>{
        
    }

    return(
        <View style={styles.root}>
            <Button
                rippleColor="#FFFFFF88"
                style={{width: "31%", backgroundColor: raceType === "SOFT" ? "tomato" : "gray"}} mode="contained" onPress={() => setRaceType("SOFT")}>
                SOFT
            </Button>
            <Button 
                rippleColor="#FFFFFF88"
                style={{width: "31%", backgroundColor: raceType === "MED" ? "tomato" : "gray"}} mode="contained" onPress={() => setRaceType("MED")}>
                MED
            </Button>
            <Button 
                rippleColor="#FFFFFF88"
                style={{width: "31%", backgroundColor: raceType === "WET" ? "tomato" : "gray"}} mode="contained" onPress={() => setRaceType("WET")}>
                WET
            </Button>
            
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16,
    }
})

export default RaceType