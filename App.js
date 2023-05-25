import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "./src/utils/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Auth from './src/components/Auth';
import { Button } from 'react-native-web';
import ListVuelo from './src/components/ListVuelo';



export default function App() {
  const[user, setUser] = useState(false);
  const [userUID, setUserUID]= useState();
  const auth = getAuth();

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    setUserUID(uid);
    console.log("Usuario Logeado...", user);
    setUser(true);
   
  } else {
   
    console.log("Usuario NO Logeado...", user);
    setUser(false)
  }
});

}, []);

if(user === undefined) return null;


  return (
    

   
    <View style={styles.container}>
      <StatusBar style= "auto"/>
      {user ? <ListVuelo userUID= {userUID}/> : <Auth />}
     
      
    </View>


   
    
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
   
    height: '100%',

  },
});
