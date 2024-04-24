import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput, Button, FAB} from 'react-native-paper'

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';

const CarInfo = (props) =>{
    const dispatch = useDispatch()
    
    const {carNo, setCarNo, teamName, setTeamName} = props

    const currentPage = useSelector((state) => state.data.currentPage)

    useEffect(()=>{
        setTeamName("")
    }, [carNo])
    
    const handleSubmit = () =>{
        dispatch(actions.getTeamNameFromCarId(currentPage, carNo, (data)=>{
            setTeamName(data.teamName)
        })) 
    }

    return(
        <View>
            <View style={styles.carInput}>
                <TextInput
                    label="Car No"
                    mode="outlined"
                    keyboardType={'numeric'}
                    style={{flexGrow: 1}}
                    value={carNo}
                    onChangeText={text => setCarNo(text)}
                />
                 <Button 
                    rippleColor="#FFFFFF88"
                    mode="contained" 
                    style={{marginTop: 5}} 
                    onPress={handleSubmit}>
                    OK
                </Button>
            </View>
            <View style={styles.teamInput}>
                <TextInput
                    label="TeamName"
                    mode="outlined"
                    value={teamName}
                    readonly
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    carInput:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 20,
        gap: 8
    },
    teamInput:{        
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
    }
})

export default CarInfo