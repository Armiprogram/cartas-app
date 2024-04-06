import React, { useState } from 'react'
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { LetterCardComponents } from './LetterCardComponents';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database';
//Interface que Indica los props que este componente va a manejar
interface Props{
    visible:boolean,
    setVisible:Function
}
interface LetterForm{
  to: string,
  subject: string,
  message: string
}
export const NewLetterComponent = ({visible,setVisible}:Props) => {
  //Hook que actualiza los datos de nuestro formulario
  const [letterForm, setLetterForm] = useState<LetterForm>({
    to:'',
    subject:'',
    message:''
  })

  // Funcion que capture y actualice los calores del formulario
  const handlerSetLetterForm=(key:string,value:string)=>{
    setLetterForm({...letterForm,[key]:value})
  }
  //Funcion para guardar las cartas
  const handlerSaveLetter= async()=>{
    if(!letterForm.to||!letterForm.subject||!letterForm.message){
      return
    }
    //console.log(letterForm);

    const dbRef = ref(dbRealTime, 'letters')
    const saveLetter=push(dbRef)//ubicación del almacenamiento
    try{
      await set(saveLetter, letterForm)
      //limpiar los valores del formulario
      setLetterForm({
        message:'',
        subject:'',
        to:''
      })

    }catch(e){
      console.log(e);
    }
    setVisible(false)
  }
 
  return (
    <Portal>
    <Modal visible={visible} contentContainerStyle={styles.modalProfile}>
    <View style={styles.headerModal}>
      <Text variant='headlineMedium'>Nueva carta</Text>
      <IconButton icon='close' onPress={()=>setVisible(false)}></IconButton>
      </View>
      <Divider bold/>
      <TextInput label='Para' mode='outlined' 
      onChangeText={(value)=>handlerSetLetterForm('to',value)}/>
       <TextInput label='Asunto' mode='outlined' 
      onChangeText={(value)=>handlerSetLetterForm('subject',value)}/>
       <TextInput label='Mensaje' mode='outlined' 
      onChangeText={(value)=>handlerSetLetterForm('message',value)}
      multiline={true} 
      numberOfLines={7}/>
      <Button style={{marginTop:20}} mode='contained' onPress={()=>handlerSaveLetter()}>Guardar</Button>
    </Modal>
  </Portal>
  )
}
