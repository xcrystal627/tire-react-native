import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Button, Portal, Dialog, Text } from 'react-native-paper';

import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';

import moment from 'moment';

import CarInfo from '../component/CarInfo';
import RaceType from '../component/RaceType';
import BarCodeInput from '../component/BarCodeInput';
import DateRange from '../component/DateRange';

const CheckScreen = () => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")

    const [carNo, setCarNo] = useState("")
    const [teamName, setTeamName] = useState("")
    const [raceType, setRaceType] = useState("SOFT")
    
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [barCode1, setBarCode1] = useState("")
    const [barCode2, setBarCode2] = useState("")
    const [barCode3, setBarCode3] = useState("")
    const [barCode4, setBarCode4] = useState("")
    
    const [message1, setMessage1] = useState("")
    const [message2, setMessage2] = useState("")
    const [message3, setMessage3] = useState("")
    const [message4, setMessage4] = useState("")

    const deviceID = useSelector((state) => state.data.deviceId)
    const currentPage = useSelector((state) => state.data.currentPage)
    const allow = useSelector((state) => state.data.license)



    useEffect(()=>{
        clearHistory()
      }, [deviceID, currentPage])


    const clearHistory = () =>{
        setCarNo("")
        setTeamName("")
        setRaceType("SOFT")
        clearBarCode()
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const clearBarCode = () =>{
        setBarCode1("")
        setBarCode2("")
        setBarCode3("")
        setBarCode4("")
        setMessage1("")
        setMessage2("")
        setMessage3("")
        setMessage4("")
    }

    const date2str = (date) =>{
        const m_year = date.getFullYear()
        const m_month = date.getMonth()+1
        const m_date = date.getDate()

        return `${m_year}-${m_month > 10 ? m_month : ('0'+m_month)}-${m_date > 10 ? m_date : ('0'+m_date)}`
    }

    const handleSubmit= ()=>{
        if(!allow){
          setMessage("Your License is expired. Please contact developer.")
          setVisible(true)
          return
        }
    
    

        if(teamName == ""){
            setMessage("Please enter the correct Car No.")
            setVisible(true)
            return
        }


        if((barCode1+barCode2+barCode3+barCode4)==""){
            setMessage("Please enter barcode")
            setVisible(true)
            return
        }

        const _newInformation = {
            Name          : carNo*1,
            Team          : teamName,
            Organization  : "F1",
            Barcode1      : barCode1,
            Barcode2      : barCode2,
            Barcode3      : barCode3,
            Barcode4      : barCode4,
            from          : date2str(startDate),
            to            : date2str(endDate),
            Device        : deviceID,
            Type          : raceType,
        }

        
        dispatch(actions.checkInformation(currentPage, _newInformation, ({success, msg, data})=>{
            setMessage(msg)
            setVisible(true)
            if(success){
                if(data.Barcode1 != "New" && data.Barcode1 != "")
                    data.Barcode1 = date2str(new Date(data.Barcode1))
                
                if(data.Barcode2 != "New" && data.Barcode2 != "")
                    data.Barcode2 = date2str(new Date(data.Barcode2))
                
                if(data.Barcode3 != "New" && data.Barcode3 != "")
                    data.Barcode3 = date2str(new Date(data.Barcode3))

                if(data.Barcode4 != "New" && data.Barcode4 != "")
                    data.Barcode4 = date2str(new Date(data.Barcode4))
                
                setMessage1(data.Barcode1)                
                setMessage2(data.Barcode2)
                setMessage3(data.Barcode3)
                setMessage4(data.Barcode4)
            }
        })) 

    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <CarInfo carNo={carNo} setCarNo={setCarNo} teamName={teamName} setTeamName={setTeamName} />
                        <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                        <RaceType raceType={raceType} setRaceType={setRaceType} />
                        <View style={styles.codeInputWrapper}>
                        <View style={{flexGrow: 1}}>
                            <BarCodeInput message1={message1} message2={message2} message3={message3} message4={message4}  barCode1={barCode1} setBarCode1={setBarCode1} barCode2={barCode2} setBarCode2={setBarCode2} barCode3={barCode3} setBarCode3={setBarCode3} barCode4={barCode4} setBarCode4={setBarCode4} />
                        </View>
                        <Button
                            rippleColor="#FFFFFF88"
                            style={{width: 100, height: 200, padding: 0, marginRight: 8, marginLeft:8, display: "flex", justifyContent: "center", alignItems: "center"}} mode="contained" 
                            onPress={handleSubmit}
                            contentStyle={{width: 100, height: 200, fontSize: 20, color: "black"}}>
                            SEND
                        </Button>
                        </View>
                        <View style={{paddingLeft: 50, paddingRight: 50, paddingTop: 16}}>
                        <Button 
                            rippleColor="#FFFFFF88"
                            mode="contained" style={{marginBottom: 16}} 
                            onPress={clearBarCode} >
                            Clear
                        </Button>
                        <Button 
                            rippleColor="#FFFFFF88"
                            mode="contained" style={{marginBottom: 16}} 
                            onPress={clearHistory} >
                            Clear All
                        </Button>
                        </View>
                    </View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
                        <Dialog.Title>Tire Control System</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{message}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>setVisible(false)}>Done</Button>
                        </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
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
})


export default CheckScreen;