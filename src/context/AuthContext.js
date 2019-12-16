import {AsyncStorage} from 'react-native';
import CreateDataContext from './CreateDataContext';
import  trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';


const authReducer = (state,action)=> {
switch(action.type){
    case 'add_error':
        return {...state,errorMessage:action.payload};
      case 'signup':  
      return {errorMessage:'',token: action.payload};
    default:
        return  state;
}

};

//same as below
// const signup = (dispatch) =>{
//     return async ({email, password}) =>{
//    try {
//        const response = await trackerApi.post('/signup',{email,password});
//        //console.log(response.data);
//        await AsyncStorage.setItem('token',response.data.token);
//       dispatch({type: 'signup', payload: response.data.token});
//     } catch (err) {
//        dispatch({type:'add_error',payload:'Something went wrong with the sign up'})
//       // console.log(err.response.data)
//    }  
// }
// }

const signup = (dispatch) => async ({email, password}) =>{
   try {
       const response = await trackerApi.post('/signup',{email,password});
       //console.log(response.data);
       await AsyncStorage.setItem('token',response.data.token);
      dispatch({type: 'signup', payload: response.data.token});
//navigate to main flow
navigate('TrackList');

    } catch (err) {
       dispatch({type:'add_error',payload:'Something went wrong with the sign up'})
      // console.log(err.response.data)
   }  
};






const signin = (dispatch) => {
    return ({email, password}) =>{
        //Try o signin
        //Handle success by updating state
        //Handle failujre by showing error messagr (somehow)
    }
}

const signout = dispatch =>{
    return ()=>{
    //somehow sign out!!!
    };
};

export const { Provider,Context} = CreateDataContext(
    authReducer,
    {signin,signout,signup},
   //{isSignedIn: false,errorMessage:''} 
   {token:null ,errorMessage:''} 


   );
