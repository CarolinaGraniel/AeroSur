import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import AddVuelo from "./AddVuelo";
import { db } from "../utils/firebase";
import { collection, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import moment from "moment/moment";
import Vuelo from "./Vuelo";
import { async } from "@firebase/util";

export default function ListVuelo(props) {
  const { userUID } = props;
  const [showList, setShowList] = useState(true);
  const [vuelo, setVuelo] = useState([]);
  const [pasatvuelo, setPasatVuelo] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, userUID), orderBy("dateV", "asc"));
      const querySnapshot = await getDocs(q);
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        
        itemsArray.push(data);
        
      });
      formatData(itemsArray);
      
    }
    fetchData();
    setReloadData(false);
  }, [reloadData]);

  const formatData = (items) => {
    let x;
    let z = 0;

    
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });



    const vueloAux1 = [];
    const vueloAux2 = [];
    let vueloTempArray = [];
    let pasatVueloTempArray = [];


    items.forEach((item) => {
      const dateV = new Date(item.dateV.seconds * 1000);
      
      const dateVuelo = moment(dateV);
      const currentYear = moment().get("year");
      
      dateVuelo.set({ year: currentYear });
      
      const diffDate = currentDate.diff(dateVuelo, "days");
      
      const itemTemp = item;
     
      itemTemp.dateV = moment(dateV).format("LL");
      itemTemp.days = diffDate;
      
      if (diffDate <= 0) {
        vueloAux1.push(itemTemp);
        vueloTempArray = [...vueloAux1].sort((b, a) =>
          a.days > b.days ? 1 : a.days < b.days ? -1 : 0
        );
      } else {
        vueloAux2.push(itemTemp);
        pasatVueloTempArray = [...vueloAux2].sort((b, a) =>
          a.days > b.days ? 1 : a.days < b.days ? -1 : 0
        );
      }
    });
   
    setVuelo(vueloTempArray);
    setPasatVuelo(pasatVueloTempArray);
  
  };

  const deleteVuelo = (vuelo) => {
    Alert.alert(
      "Eliminar Vuelo",
      `¿Estás seguro de eliminar el Vuelo de ${vuelo.name} a ${vuelo.lastname} con ${vuelo.diashospedaje} días`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async() =>{
            await deleteDoc(doc(db, userUID, vuelo.id))
            setReloadData(true)
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.view}>
          {vuelo.map((item, index) => (
            <Vuelo
              key={index}
              vuelo={item}
              deleteVuelo={deleteVuelo}
            />
          ))}
          {pasatvuelo.map((item, index) => (
            <Vuelo
              key={index}
              vuelo={item}
              deleteVuelo={deleteVuelo}
            />
          ))}
        </ScrollView>
      ) : (
        <AddVuelo
          userUID={userUID}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}
      <ActionBar setShowList={setShowList} showList={showList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  view: {
    marginTop: 50,
    marginBottom: 100,
  },
});
