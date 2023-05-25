import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Vuelo(props) {
  const { vuelo, deleteVuelo } = props;
  const pasat = vuelo.days > 0 ? true : false;
  const today = vuelo.days == 0 ? true : false;
  
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={[
          styles.card,
          pasat
            ? { backgroundColor: "#e77eb2" }
            : today
            ? { backgroundColor: "#009975" }
            : {},
        ]}
        onPress={()=>deleteVuelo(vuelo)}
      >
        <Text style={styles.text}>
          {vuelo.name} {vuelo.lastname} 
        </Text>
        <Text style={styles.text}>{vuelo.dateV}</Text>
        {pasat && (
          <Text style={[styles.text, styles.days]}>
          {"Vuelo Vencido"}
        </Text>
        )}
        {today && (
          <Text style={[styles.text, styles.days]}>
            {"Hoy es su Vuelo"}
          </Text>
        )}
        {!pasat && !today && (
          <Text style={[styles.text, styles.days]}>
            {"Faltan: " + -vuelo.days + " dias para su vuelo"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    height: "auto",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#72baf3",
  },
  text: {
    color: "white",
    marginTop: 2,
    marginBottom: 3,
    fontWeight: "bold",
    fontSize: 14,
  },
  days: {
    backgroundColor: "#f1e1cd",
    color: "black",
    borderRadius: 5,
    padding: 3,
    fontWeight: "normal",
  },
});
