import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'

import { Card, IconButton, Text, Avatar, MD3Colors } from 'react-native-paper';

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';


const optionsPerPage = [2, 3, 4];

const HistoryScreen = () => {
    const dispatch = useDispatch()
    
    const deviceID = useSelector((state) => state.data.deviceId)
    const currentPage = useSelector((state) => state.data.currentPage)
    const histories = useSelector((state) => state.data.todayHistory)

    useEffect(()=>{
        clearHistory()
    }, [deviceID, currentPage])


    const clearHistory = () =>{
        
    }

    const date2str = (date) =>{
        const m_year = date.getFullYear()
        const m_month = date.getMonth()+1
        const m_date = date.getDate()
        const m_hour = date.getHours()
        const m_minute = date.getMinutes()
        const m_second = date.getSeconds()

        return `${m_year}年${m_month > 10 ? m_month : ('0'+m_month)}月${m_date > 10 ? m_date : ('0'+m_date)}日 ${m_hour > 10 ? m_hour : ('0'+m_hour)}:${m_minute > 10 ? m_minute : ('0'+m_minute)}:${m_second > 10 ? m_second : ('0'+m_second)}`
    }

    
    return (
        <SafeAreaView>
            <ScrollView>
                {histories.map(history => (                    
                    <Card key={history.data.Id}>
                        <Card.Title title={`${history.category}`} subtitle={date2str(new Date(history.data.Created))} left={(props) => <Avatar.Icon {...props} icon="folder" />} />
                        <Card.Content>
                            <View style={styles.wrapper}>                                    
                                <View>
                                    <Text variant="bodyMedium">BarCode1: {`${history.data.Barcode1 ? history.data.Barcode1 : "----"}`}</Text>
                                    <Text variant="bodyMedium">BarCode2: {`${history.data.Barcode2 ? history.data.Barcode2 : "----"}`}</Text>
                                    <Text variant="bodyMedium">BarCode3: {`${history.data.Barcode3 ? history.data.Barcode3 : "----"}`}</Text>
                                    <Text variant="bodyMedium">BarCode4: {`${history.data.Barcode4 ? history.data.Barcode4 : "----"}`}</Text>
                                </View>
                                <View>
                                    <Text variant="bodyMedium">CarNo: {`${history.data.Name}`}</Text>
                                    <Text variant="bodyMedium">TeamName: {`${history.data.Team}`}</Text>
                                    <Text variant="bodyMedium">Type: {`${history.data.Type}`}</Text>
                                    <Text variant="bodyMedium">DeviceID: {`${history.data.Device}`}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                ))

                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  codeInputWrapper:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection:"row",
    paddingTop: 16
  },
  wrapper:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection:"row",
    paddingTop: 8
  }
})


export default HistoryScreen;