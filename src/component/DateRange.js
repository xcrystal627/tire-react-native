import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput, Text, IconButton, MD3Colors } from 'react-native-paper'

import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

import moment from 'moment';

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';


const DateRange = (props) =>{
    const dispatch = useDispatch()
    
    const {startDate, setStartDate, endDate, setEndDate} = props
    const [open, setOpen] = React.useState(false);
    
    const currentPage = useSelector((state) => state.data.currentPage)
    
    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setStartDate(startDate)
            setEndDate(endDate)
        },
        [setOpen]
    );

    return(
        <View>
            <View style={styles.carInput}>
                <TextInput
                    label="Interval"
                    mode="outlined"
                    style={{flexGrow: 1}}
                    value={`${startDate.getFullYear()}年${startDate.getMonth()+1}月${startDate.getDate()}日 ~ ${endDate.getFullYear()}年${endDate.getMonth()+1}月${endDate.getDate()}日`}
                    readonly
                />
                  <IconButton
                    icon="calendar"
                    iconColor={MD3Colors.error50}
                    style={{marginTop: 10}}
                    size={30}
                    onPress={()=>setOpen(true)}
                />
            </View>

            <DatePickerModal
                mode="range"
                saveLabel='確認'
                locale='en'
                visible={open}
                onDismiss={()=>setOpen(false)}
                startDate={startDate}
                endDate={endDate}
                onConfirm={onConfirm}
            />
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

export default DateRange