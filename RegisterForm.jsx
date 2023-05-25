import {StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import {validateEmail} from '../utils/validation'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function RegisterFrom(props) {
  const {changeForm} = props

  const [formData, setFormData] = useState(defaultValue)
  const [formError, setFormError] = useState({})

  const register = ()=>{
    let errors = {}
    
    if(!formData.email || !formData.password || !formData.repeatPassword){
     if(!formData.email) errors.email = true 
     if(!formData.password) errors.password = true
     if(!formData.repeatPassword) errors.repeatPassword = true
    }else if(!validateEmail(formData.email)){
     errors.email = true

    }else if(formData.password !== formData.repeatPassword){
     errors.password = true
     errors.repeatPassword = true
    
    }else if(formData.password.length < 4){
     errors.password = true
     errors.repeatPassword = true
    }else{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential)=> {
          //Signed in
          const user = userCredential.user;
          console.log('Usuario registrado' +user)
       })
       .catch((error)=>{
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log('Error')
       setFormError({
        email:true,
        password:true,
        repeatPassword:true
      
      })
    });
    }
       setFormError(errors)
       //console.log(errors)
       }

  function defaultValue(){
    return {

    email:'',
    password:'',
    repeatPassword: ''

    }
  }


  return (
    <>
      <TextInput 
      style={[styles.textInput, formError.email ? styles.error:'']} 
      placeholder='Correo electrónico' 
      placeholderTextColor='#969696' 
      onChange={(e)=>setFormData({...formData, email: e.nativeEvent.text})}
      />
      <TextInput 
      style={[styles.textInput, formError.password ? styles.error:'']} 
      placeholder='Contraseña' 
      placeholderTextColor='#969696' 
      secureTextEntry={true} 
      onChange={(e)=>setFormData({...formData, password: e.nativeEvent.text})}
      />
      <TextInput 
      style={[styles.textInput, formError.repeatPassword ? styles.error:'']} 
      placeholder='Repetir contraseña' 
      placeholderTextColor='#969696' 
      secureTextEntry={true} 
      onChange={(e)=>setFormData({...formData, repeatPassword: e.nativeEvent.text})}
      />
      <TouchableOpacity onPress={register}>
      <Text style={styles.buttonText}>Regístrate</Text>
      </TouchableOpacity>


      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      
    </>
  )
  }

  const styles = StyleSheet.create({
    buttonText:{
    color: '#fff',
    fontSize:20,
    backgroundColor:'#141415',
    borderRadius:10,
    height:40,
    borderColor:'#141415',
    alignItems:'center'
  },
  textInput:{
    height:60,
    color: '#fff',
    fontSize:18,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#cdcdcd',
    width:'80%',
    backgroundColor:'#0a0a0a',
    marginBottom:30,
    paddingHorizontal:30,
    alignItems:'center'

  },
  login:{
    flex:1,
    justifyContent:'flex-end',
    marginBottom:20,
    alignItems:'center',
    height:20
  },
  error:{
    borderColor:'#940c0c',
    alignItems:'center'
  }
})