import React, { useEffect, useState } from 'react'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { View } from 'react-native';
import { styles } from '../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Letter } from './HomeScreen/HomeScreen';
import { dbRealTime } from '../configs/firebaseConfig';
import { ref, remove, update } from 'firebase/database';

export const DetailLetterScreen = () => {
  const navigation=useNavigation()
  //Acceder a los props de navegacion
  const route=useRoute()
  //el texto de abajo es parte del back
  //@ts-ignore 
  const {letter}=route.params 
  //console.log(letter);
  const [detailForm, setdetailForm] = useState<Letter>({
    id:'',
    to:'',
    subject:'',
    message:''

  })
  useEffect(() => {
   setdetailForm(letter)
  }, [])

  //Funcion que permita actualizar la data del formulariio
  const handlerSetDetailForm=(key:string,value:string) => {
    setdetailForm({...detailForm,[key]:value})
  }
  //Funcion que permita actualizar la carta
  const handlerUpdateLetter= async() => {
    //Referencia a la base de datos
    const dbRef=ref(dbRealTime,'letters/'+detailForm.id)
    await update(dbRef,{subject:detailForm.subject, message:detailForm.message})
    navigation.goBack()

    //console.log(detail.Form)
  }
  //Funcion para eliminar la carta 
  const handlerDeleteLetter= async()=>{
    const dbRef=ref(dbRealTime,'letters/'+detailForm.id)
    await remove(dbRef)
    navigation.goBack()
  }
  
  return (
    <View>
        <View style={styles.contentDetailLetter}>
            <Text variant='headlineSmall'>Asunto:</Text>
            <TextInput
            value={detailForm.subject}
            onChangeText={(value)=>handlerSetDetailForm('subject',value)}
            style={{flex:1}}
            />
        </View>
        <Divider bold/>
        <View>
        <Text variant='bodyLarge'>Para:{detailForm.to} </Text>

        </View>
        <Divider bold/>
        <View>
        <Text style={styles.textMessage}>Mensaje: </Text>
        <TextInput
         value={detailForm.message}
         multiline={true}
         numberOfLines={7}
         onChangeText={(value)=>handlerSetDetailForm('message',value)}
         />
        </View>
        <Button mode='contained' icon='email-sync' onPress={()=>handlerUpdateLetter()}>Actualizar</Button>
        <Button mode='contained' icon='email-remove' onPress={()=>handlerDeleteLetter()}>Eliminar</Button>
    </View> 
  )
}
