import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, { useState } from "react";
import { validateEmail } from "../utils/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};

    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError({ email: true, password: true });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    //console.log("dato: ", e.nativeEvent.text);
    //console.log("Type: ", type);
    setFormData({ ...formData, [type]: e.trim() });
    //console.log(formData);
  };

  function defaultValue() {
    return {
      email: "",
      password: "",
    };
  }

  return (
    <>
      <TextInput
        style={[styles.textInput, formError.email && styles.errors]}
        placeholder="Correo electrónico"
        placeholderTextColor={"#969696"}
        autoCapitalize="none"
        onChangeText={(e) => onChange(e, "email")}
      />
      <TextInput
        style={[styles.textInput, formError.password && styles.errors]}
        placeholder="Contraseña"
        placeholderTextColor={"#969696"}
        secureTextEntry={true}
        onChangeText={(e) => onChange(e, "password")}
      />
      <TouchableOpacity onPress={login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize:20,
    backgroundColor:'#141415',
    borderRadius:10,
    height:40,
    borderColor:'#141415',
    alignItems:'center'
  },
  textInput: {
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
  register: {
    flex:1,
    justifyContent:'flex-end',
    marginBottom:20,
    alignItems:'center',
    height:20
  },
  errors: {
    borderColor: "940c0c",
    borderWidth: 3,
  },
});
