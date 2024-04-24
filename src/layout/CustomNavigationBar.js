import React, {useEffect, useState} from 'react'
import { Appbar, Button, Dialog, Portal, Text, List, TextInput, Snackbar, useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native'

import {useSelector, useDispatch} from '../redux/store';
import * as actions from '../redux/slices/data.slice';

const CustomNavigationBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const deviceID = useSelector((state) => state.data.deviceId)
    const currentPage = useSelector((state) => state.data.currentPage)


    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [dialogMode, setDialogMode] = useState("")
    const [text, setText] = useState("")  

    const showDialog = () => setVisible(true);  
    const hideDialog = () => setVisible(false);


    const handleClick = (type) =>{
        setDialogMode(type)
        setMessage("")
        setText(deviceID)
        showDialog()
    }

    const handleSubmit=()=>{
        if(dialogMode == "device"){
            if(text == ""){
                setMessage("Please input DeviceID")
                return
            }else{
                setMessage("")
                dispatch(actions.setDeviceID(text))
            }
        }

        hideDialog()
    }

    const handleTableChange = (type) =>{
        dispatch(actions.setCurrentPage(type))
        hideDialog()
    }

    console.log(deviceID)
    return (
        <View>
            <Appbar
                style={{
                    backgroundColor: theme.colors.elevation.level2,
                }}
            >
                <Appbar.BackAction onPress={() => handleClick("table")} />
                <Appbar.Content 
                    onPress={() => handleClick("table")} 
                    title={currentPage === "other" ? "OTHER" : ( currentPage === "tcr" ? "TCR JAPAN" : "SUPER FORMULA")} />
                <Appbar.Action
                    icon={() => <Text>{deviceID}</Text>}
                    onPress={() => handleClick("device")} 
                />  
            </Appbar>
            {dialogMode !== ""&&
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>{dialogMode == "table" ? "Select Table" : "Select Device"}</Dialog.Title>
                        <Dialog.Content>
                            {dialogMode == "table"&&
                                <List.Section>
                                    <List.Item title="SUPER FORMULA" left={() => <List.Icon icon="folder" />} onPress={() =>handleTableChange("formula")} />
                                    <List.Item title="TCR JAPAN" left={() => <List.Icon icon="folder" />} onPress={() =>handleTableChange("tcr")} />
                                    <List.Item title="OTHER" left={() => <List.Icon icon="folder" />} onPress={() =>handleTableChange("other")} />
                                </List.Section>
                            }

                            {dialogMode == "device"&&
                                <View>
                                    <TextInput
                                        label="Device No"
                                        mode="outlined"
                                        value={text}
                                        onChangeText={setText}
                                    />
                                    {message !== "" &&
                                        <Text variant="bodySmall" style={{color: 'tomato' }} >{message}</Text>
                                    }
                                </View>
                            }
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleSubmit}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            }
        </View>
    );
}


  
export default  CustomNavigationBar