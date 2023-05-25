import {StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddVuelo(props) {
  const {userUID, setShowList, setReloadData}=props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateV = date
   
    dateV.setMinutes(0);
    dateV.setSeconds(0);
    console.log(dateV)
    setFormData({ ...formData, dateV });
   
    hideDatePicker();
  };

  const onChange = (e, type) => {
  
    setFormData({ ...formData, [type]: e.trim() });
    
  };

  const onSubmit = async () => {
    let errors = {};
    console.log(formData);
    if (!formData.name || !formData.dateV || !formData.lastname) {
      if (!formData.name) errors.name = true;
      if (!formData.lastname) errors.lastname = true;
      if (!formData.dateV) errors.dateV = true;
     
    } else {
      try {
        const docRef = await addDoc(collection(db, userUID), formData);
        console.log("Document written with ID: ", docRef.id);
        setShowList(true)
        setReloadData(true)
      } catch (e) {
        console.error("Error adding document: ", e);
        setFormError({ name: true, lastname: true, dateV: true});
      }
    }
    setFormError(errors);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formError.name ? styles.errors : ""]}
        placeholder="Lugar de Salida"
        placeholderTextColor={"#969696"}
        onChangeText={(e) => onChange(e, "name")}
      />
      <TextInput
        style={[styles.input, formError.lastname ? styles.errors : ""]}
        placeholder="Lugar de Destino"
        placeholderTextColor={"#969696"}
        onChangeText={(e) => onChange(e, "lastname")}
      />

      <View style={[styles.input, formError.dateV ? styles.errors : ""]}>
        <Text
          style={[
            styles.textDate,
            formData.dateV ? { color: "white" } : "",
          ]}
          onPress={showDatePicker}
        >
          {formData.dateV
            ? moment(formData.dateV).format("LL")
            : "Fecha de Vuelo"}
        </Text>
      </View>
      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.buttonText}>Crear Vuelo</Text>
      </TouchableOpacity>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "84%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    color: "white",
    width: "80%",
    marginBottom: 20,
    backgroundColor: "#18171c",
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  input1: {
      height: 50,
      color: "white",
      width: "80%",
      marginBottom: 20,
      backgroundColor: "#18171c",
      paddingHorizontal: 20,
      borderRadius: 10,
      fontSize: 18,
      borderWidth: 1,
      borderColor: "#cccccc",
    },

    input2: {
      height: 50,
      color: "white",
      width: "80%",
      marginBottom: 20,
      backgroundColor: "#1d1d1d",
      paddingHorizontal: 20,
      borderRadius: 60,
      fontSize: 18,
      borderWidth: 1,
      borderColor: "#fff",
      alignItems:'center'
    },
  textDate: {
    color: "#fff",
    fontSize: 20,
    paddingTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#969696",
    padding: 10
  },
  errors: {
    borderColor: "red",
    borderWidth: 3,
  },
});
