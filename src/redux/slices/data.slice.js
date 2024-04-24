import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"; 
import axios from 'axios'; 
import {dispatch} from './../store';
 

const initialState = {
  currentPage         : 'formula', // tcr, other, formula
  deviceId            : "99",
  carInformation      : [],
  error               : "",
  databaseInformation : {
    tcr     : {
      BASE_ID     : 'appkWmWVJMYFZvyzZ',
      Authorization   : 'Bearer keyXuXJ5ZGjdPzTSh'
    },
    other   : {
      BASE_ID   : 'appLhpcg7c75rmjRe',
      Authorization   : 'Bearer keyXuXJ5ZGjdPzTSh'
    },
    formula : {
      BASE_ID : 'appFdFeYMKffd0QiL',
      Authorization   : 'Bearer keyXuXJ5ZGjdPzTSh'
    }
  },
  todayHistory        : [],
  license             : false
}  

export const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reset: () => initialState,

    getInformationSuccess: (state, action ) => {
      const data = action.payload.records;
      const carData = data.map(item => {
        return item.fields
      })

      state.carInformation = carData;
      state.currentPage = action.payload.currentPage;
    },

    setDeviceIDSuccess: (state, action) => {
      state.deviceId = action.payload;
    },

    setCurrentPageSuccess: (state, action) => {
      state.currentPage = action.payload
    },

    updateTodayHistory: (state, action ) => {
      state.todayHistory = [...state.todayHistory, action.payload]
    },

    setLicenseSuccess: (state, action) => {
      state.license = action.payload
    },

    hasError: (state, action) => {
      state.error = action.payload
    }
  },
});


export const getInformation = (currentPage) => {
  return async () => {
    try {
      const {BASE_ID, Authorization} = initialState.databaseInformation[currentPage];
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers['Authorization'] = Authorization;

      const response = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/check/`);

      const _data = {
        currentPage : currentPage,
        records     : response.data.records 
      } 

      dispatch(slice.actions.getInformationSuccess(_data));
    } catch (error) {
      if(error.response && error.response.data && error.response.data.msg)
        dispatch(slice.actions.hasError(error.response.data.msg));
      else console.log(error)
    }
  };
}


export const setDeviceID = (id) => {
  return dispatch(slice.actions.setDeviceIDSuccess(id));
}


export const collectInformation = (currentPage, _newInformation, callback) => {
  return async () => {
    try {
      const {BASE_ID, Authorization} = initialState.databaseInformation[currentPage];
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers['Authorization'] = Authorization;

      const response = await axios.post(`https://api.airtable.com/v0/${BASE_ID}/collect/`,  JSON.stringify(_newInformation));
      
      const _checkResult = {
        success     : true,
        msg         : "Collected successfully!"
      }

      callback(_checkResult);

      const _newHistory = {
        category  : "Collect",
        data      : response.data.fields
      }


      dispatch(slice.actions.updateTodayHistory(_newHistory));
    } catch (error) {
      
      const _checkResult = {
        success     : false,
        msg         : "Failed collecting!"
      }

      callback(_checkResult);

      if(error.response && error.response.data && error.response.data.msg)
        dispatch(slice.actions.hasError(error.response.data.msg));
      else console.log(error)
    }
  };
}



export const checkInformation = (currentPage, _inputInformation, callback) => {
  return async () => {
    try {
      
      const {BASE_ID, Authorization} = initialState.databaseInformation[currentPage];
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers['Authorization'] = Authorization;

      let checkResult = {}

      if(_inputInformation['Barcode1'] !== "") {

        const  search_query_1 = generateSearchQueryForCheck(_inputInformation, 'Barcode1');
        const encodedQuery_1 = encodeURIComponent(search_query_1);
  
        const response_1 = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/collect/?filterByFormula=${encodedQuery_1}`);
      
        const result_1 = response_1.data.records.sort((a, b) => new Date(b.fields.Created) - new Date(a.fields.Created));
  
        checkResult.Barcode1 = response_1.data.records && 
                                response_1.data.records[0]&& 
                                response_1.data.records[0].fields['Created'] ? 
                                result_1[0].fields['Created']  : 'New'
      } else {
        checkResult.Barcode1 = "";
      }
      

      if(_inputInformation['Barcode2'] !== "") {

        const  search_query_2 = generateSearchQueryForCheck(_inputInformation, 'Barcode2');
        const encodedQuery_2 = encodeURIComponent(search_query_2);

        const response_2 = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/collect/?filterByFormula=${encodedQuery_2}`);
      
        const result_2 = response_2.data.records.sort((a, b) => new Date(b.fields.Created) - new Date(a.fields.Created));

        checkResult.Barcode2 = response_2.data.records && 
                                response_2.data.records[0]&& 
                                response_2.data.records[0].fields['Created'] ? 
                                result_2[0].fields['Created']  : 'New'
      } else {
        checkResult.Barcode2 = "";
      }

      if(_inputInformation['Barcode3'] !== "") {

        const  search_query_3 = generateSearchQueryForCheck(_inputInformation, 'Barcode3');
        const encodedQuery_3 = encodeURIComponent(search_query_3);

        const response_3 = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/collect/?filterByFormula=${encodedQuery_3}`);
      
        const result_3 = response_3.data.records.sort((a, b) => new Date(b.fields.Created) - new Date(a.fields.Created));

        checkResult.Barcode3 = response_3.data.records && 
                                response_3.data.records[0]&& 
                                response_3.data.records[0].fields['Created'] ? 
                                result_3[0].fields['Created']  : 'New'
      } else {
        checkResult.Barcode3 = "";
      }
      
      
      if(_inputInformation['Barcode4'] !== "") {

        const  search_query_4 = generateSearchQueryForCheck(_inputInformation, 'Barcode4');
        const encodedQuery_4 = encodeURIComponent(search_query_4);

        const response_4 = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/collect/?filterByFormula=${encodedQuery_4}`);
      
        const result_4 = response_4.data.records.sort((a, b) => new Date(b.fields.Created) - new Date(a.fields.Created));

        checkResult.Barcode4 = response_4.data.records && 
                                response_4.data.records[0]&& 
                                response_4.data.records[0].fields['Created'] ? 
                                result_4[0].fields['Created']  : 'New'
      } else {
        checkResult.Barcode4 = "";
      }

      const _checkData = {
        fields : {
          1             : ( checkResult['Barcode1'] == "" || checkResult['Barcode1'] == "New" ) 
                          ? "Barcode1 mismatch" : "Barcode1 matched",

          2             : ( checkResult['Barcode2'] == "" || checkResult['Barcode2'] == "New" ) 
                          ? "Barcode2 mismatch" : "Barcode2 matched",

          3             : ( checkResult['Barcode3'] == "" || checkResult['Barcode3'] == "New" ) 
                          ? "Barcode3 mismatch" : "Barcode3 matched",

          4             : ( checkResult['Barcode4'] == "" || checkResult['Barcode4'] == "New" ) 
                          ? "Barcode4 mismatch" : "Barcode4 matched",

          Barcode1      : _inputInformation['Barcode1'],
          Barcode2      : _inputInformation['Barcode2'],
          Barcode3      : _inputInformation['Barcode3'],
          Barcode4      : _inputInformation['Barcode4'],
          Device        : _inputInformation['Device'],
          Name          : _inputInformation['Name'],
          Organization  : _inputInformation['Organization'],
          Team          : _inputInformation['Team'],
          Type          : _inputInformation['Type']
        }
      }

      axios.post(`https://api.airtable.com/v0/${BASE_ID}/check/`, JSON.stringify(_checkData))
        .then(reponse => {
          
          const _checkResult = {
            success     : true,
            msg         : "Checked successfully!",
            data        : checkResult 
          }

          callback(_checkResult);

          const _newHistory = {
            category  : "Check",
            data      : reponse.data.fields
          }
    
          dispatch(slice.actions.updateTodayHistory(_newHistory));
          
        })
        .catch(err => {
          const _checkResult = {
            success     : false,
            msg         : "Failed checking!",
            data        : {} 
          }
    
          callback(_checkResult);
        })
      
      
    } catch (error) {
      const _checkResult = {
        success     : false,
        msg         : "Failed checking!",
        data        : {} 
      }

      callback(_checkResult);

      if(error.response && error.response.data && error.response.data.msg)
        dispatch(slice.actions.hasError(error.response.data.msg));
      else console.log(error)
    }
  };
}



export const cancelInformation = (currentPage, _newInformation, callback) => {
  return async () => {
    try {

      const {BASE_ID, Authorization} = initialState.databaseInformation[currentPage];
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers['Authorization'] = Authorization;

      const query= generateSearchQueryForCancel(_newInformation)
      const encodedQuery = encodeURIComponent(query);

      const response = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/collect/?filterByFormula=${encodedQuery}`);
      
      if(response.status !== 200 ) {
        const _cancelResult = {
          success     : false,
          msg         : "Failed Cancel!"
        }
        callback(_cancelResult);
      }

      
      const dataForProcess = response.data && response.data.records

      if(dataForProcess.length == 0) {
        const _cancelResult = {
          success     : false,
          msg         : "Nothing to cancel"
        }
        return callback(_cancelResult);
      }

      const allBarcodesToCancel = [_newInformation['Barcode1'],  _newInformation['Barcode2'], 
                                    _newInformation['Barcode3'], _newInformation['Barcode4']] 

      const dataForUpdate = dataForProcess.map(item => {
        const _data = {
          id    : item.id,
          fields : {
            Barcode1    : selectRightValue(allBarcodesToCancel, item.fields['Barcode1']),
            Barcode2    : selectRightValue(allBarcodesToCancel, item.fields['Barcode2']),
            Barcode3    : selectRightValue(allBarcodesToCancel, item.fields['Barcode3']),
            Barcode4    : selectRightValue(allBarcodesToCancel, item.fields['Barcode4']),
          }
        }
        return _data; 
      })


      axios.patch(`https://api.airtable.com/v0/${BASE_ID}/collect/`, {records: dataForUpdate} )
        .then(response => {

          const __newInfo = {
            fields : _newInformation
          }

          axios.post(`https://api.airtable.com/v0/${BASE_ID}/cancel/` , JSON.stringify(__newInfo))
            .then(_response => {
              const _cancelResult = {
                success     : true,
                msg         : "Canceled successfully!"
              }

              const _newHistory = { 
                data : _response.data.fields,
                category : "Cancel"
              }

              dispatch(slice.actions.updateTodayHistory(_newHistory));
              callback(_cancelResult);
            })
            .catch(err => {
              const _cancelResult = {
                success     : false,
                msg         : "Failed calcel table operation!"
              }
              callback(_cancelResult);
            })

        })
        .catch(error => {
          const _cancelResult = {
            success     : false,
            msg         : "Failed calcel!"
          }
          callback(_cancelResult);

        })

    } catch(error) {

      const _cancelResult = {
        success     : false,
        msg         : "Failed calcel!"
      }

      callback(_cancelResult);

      if(error.response && error.response.data && error.response.data.msg)
        dispatch(slice.actions.hasError(error.response.data.msg));
      else console.log(error)
    }
  }
}



export const getTeamNameFromCarId = (currentPage, _name, getTeamName) => {
  return async () => {
    try {
      const {BASE_ID, Authorization} = initialState.databaseInformation[currentPage];
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers['Authorization'] = Authorization;

      const query = `{Name} = "${_name}"`;

      const response = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/car/?filterByFormula=${encodeURIComponent(query)}`);
      
      const _data = {
        carName   :_name,
        teamName  : response.data.records && response.data.records[0]&& response.data.records[0].fields['Team'] ? response.data.records[0].fields['Team']  : ''
      }
      getTeamName(_data);
      return;     
      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.msg) {
        return dispatch(slice.actions.hasError(error.response.data.msg));     
      }
      else console.log(error)
    }
  };
}


export const setCurrentPage = (currentPage) => {
  return dispatch(slice.actions.setCurrentPageSuccess(currentPage));
} 



const generateSearchQueryForCheck = (inputInfo, barcodeNumber) => {
  const { Name, from, to, Type } = inputInfo;
  const  barcode = inputInfo[barcodeNumber]
  return `AND(
    Name="${Name}",
    OR(
      Barcode1="${barcode}",
      Barcode2="${barcode}",
      Barcode3="${barcode}",
      Barcode4="${barcode}"
    ),
    Type="${Type}",
    AND(
      DATETIME_FORMAT(Created, 'YYYY-MM-DD') >= '${from}',
      DATETIME_FORMAT(Created, 'YYYY-MM-DD') <= '${to}'
    )
  )`;
}



const generateSearchQueryForCancel = (inputInfo, barcodeNumber) => {
  const { Name, from, to, Type, Barcode1, Barcode2, Barcode3, Barcode4 } = inputInfo;
  return `AND(
    Name="${Name}",
    OR(
      Barcode1="${Barcode1}",
      Barcode2="${Barcode1}",
      Barcode3="${Barcode1}",
      Barcode4="${Barcode1}",
      Barcode1="${Barcode2}",
      Barcode2="${Barcode2}",
      Barcode3="${Barcode2}",
      Barcode4="${Barcode2}",
      Barcode1="${Barcode3}",
      Barcode2="${Barcode3}",
      Barcode3="${Barcode3}",
      Barcode4="${Barcode3}",
      Barcode1="${Barcode4}",
      Barcode2="${Barcode4}",
      Barcode3="${Barcode4}",
      Barcode4="${Barcode4}"
    )
  )`;
}


const selectRightValue = (array, val) => {
  if(val == undefined) {
    return ""
  } 
  if(array.findIndex(item => item == val) == -1) {
    return val
  } else {
    return ""
  }
}


export const getCurrentTime = () => {
  return async () => {
    try {
      
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Tokyo');
      const date = new Date(response.data.datetime)
      const expireDate = new Date(2023,4,29);
    
      if(date > expireDate) {
        return dispatch(slice.actions.setLicenseSuccess(false));
      } else {
        return dispatch(slice.actions.setLicenseSuccess(true));
      }

    } catch(error) {
      return dispatch(slice.actions.setLicenseSuccess(false))
    }
  }
}
 



export default slice.reducer;