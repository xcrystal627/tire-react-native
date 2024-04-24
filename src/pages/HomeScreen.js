import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {StyleSheet,TouchableOpacity, Text,TextInput,Pressable, View, Button, Modal} from 'react-native';  
import tw from 'twrnc';
import {useSelector, useDispatch} from './../redux/store';
import * as actions from './../redux/slices/data.slice';


import HomeButton from '../components/HomeButton';
import setting_icon from '../../assets/setting.PNG'
import btn_super from '../../assets/btn-form.png'
import btn_tcr from '../../assets/btn-tcr.png'
import btn_other from '../../assets/btn-other.png'

const HomeScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const carInformation = useSelector((state) => state.data)
  const [displayModal, setDisplayModal] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  useEffect(()=> {
    const _newInformation = {
      fields : {
        Name          : 12,
        Team          : 'Victor',
        Organization  : "F1",
        Barcode1      : "123",
        Barcode2      : "123",
        Barcode3      : "123",
        Barcode4      : "123",
        Device        : "11",
        Type          : 'SOFT',
      }
    }
    
    // dispatch(actions.collectInformation('formula', _newInformation)) 
    // dispatch(actions.getInformation('formula')) ;
    dispatch(actions.checkInformation('formula', _newInformation)) 
    

  },[])

  console.log(carInformation)

  const handleClick = (table_type) =>{
    navigate("/menu")
  }

  const onTouchSetDeviceID = () => {

  }
  

  return (
      <>
        <div style={tw`flex justify-end items-center pt-6 px-6`}>
          <img src={setting_icon} style={tw`block w-8 h-8 focus:opacity-80`}  
            onClick={() =>setDisplayModal(true)} />
        </div>
        <div style={tw`text-center text-[30px] font-bold mb-[50px]`}>
          Tire Control <br/>
          System
        </div>

        <div style={tw`px-4`}>
          <div style={tw`mb-6`}><HomeButton image={btn_super} onClick={()=>handleClick("super")}/></div>
          <div style={tw`mb-6`}><HomeButton image={btn_tcr} onClick={()=>handleClick("tcr")}/></div>
          <div style={tw`mb-6`}><HomeButton image={btn_other} onClick={()=>handleClick("other")}/></div>
        </div>

      </>
  );
}


export default HomeScreen;