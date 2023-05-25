import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


export default function ActionBar(props){
const {showList, setShowList} = props

const auth = getAuth();


const logout = () => {
    signOut(auth)
    .then(() => {
        console.log("Usuario deslogeado");
    })
    .catch((err) => {
        console.log(err.message);
    })
};

return (


        

    <View style={StyleSheet.viewFooter}> 
            
            


        <View style={styles.viewAddDate}>
            <Text style={styles.text1} onPress={()=>setShowList(!showList)}>
              {showList ? 'Nuevo Vuelo' : 'Cancelar Vuelo'} 
            </Text>
        </View>
        
       
        <View style={styles.viewClose}>
            <Text style={styles.text} onPress={logout}> Cerrar Sesión</Text>
        </View>
       

        </View>
    
)}


const styles = StyleSheet.create({
viewFooter:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    width:'200%',
    height: 50,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:30,
    marginBottom:30

},
viewClose:{
    backgroundColor:'#646464',
    borderRadius:10,
    paddingHorizontal:30,
    paddingVertical:10,


},

text:{
    fontSize:20,
    color:'#fff',
    textAlign:'center'
},
text1:{
    fontSize:20,
    color:'#fff',
    textAlign:'center'

},
viewAddDate:{
    backgroundColor:'#9b9b9b',
    borderRadius:10,
    paddingHorizontal:80,
    paddingVertical:10,
    marginBottom:20

        

},



})