import React, { useState } from 'react'
import { Modal, Portal, Text, TextInput, Button, IconButton, Divider } from 'react-native-paper';
import { View } from 'react-native';
import { FarmaciaCardComponents } from './FarmaciaCardComponents';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { styles } from '../../../theme/styles';

interface Props {
    visible:boolean,
    setVisible:Function
}

interface FarmaciaForm {
  client: string,
  ill: string,
  treat: string
}

export const NewFarmaciaComponent = ({visible,setVisible}:Props) => {
  const [farmaciaForm, setFarmaciaForm] = useState<FarmaciaForm>({
    client:'',
    ill:'',
    treat:''
  })

  const handlerSetFarmaciaForm = (key:string, value:string) => {
    setFarmaciaForm({...farmaciaForm, [key]:value})
  }

  const handlerSaveFarmacia = async() => {
    if(!farmaciaForm.client || !farmaciaForm.ill || !farmaciaForm.treat) {
      return
    }

    const dbRef = ref(dbRealTime, 'farmacias')
    const saveFarmacia = push(dbRef);
    try {
      await set(saveFarmacia, farmaciaForm);
      setFarmaciaForm({
        client:'',
        ill:'',
        treat:''
      });
    } catch(e) {
      console.log(e);
    }
    setVisible(false)
  }
 
  return (
    <Portal>
    <Modal visible={visible} contentContainerStyle={styles.modalProfile}>
    <View style={styles.headerModal}>
      <Text variant='headlineMedium'>Nueva Farmacia</Text>
      <IconButton icon='close' onPress={()=>setVisible(false)}></IconButton>
      </View>
      <Divider bold/>
      <TextInput label='Cliente' mode='outlined' 
      onChangeText={(value)=>handlerSetFarmaciaForm('client',value)}/>
       <TextInput label='Enfermedad' mode='outlined' 
      onChangeText={(value)=>handlerSetFarmaciaForm('ill',value)}/>
       <TextInput label='Tratamiento' mode='outlined' 
      onChangeText={(value)=>handlerSetFarmaciaForm('treat',value)}
      multiline={true} 
      numberOfLines={7}/>
      <Button style={{marginTop:20}} mode='contained' onPress={()=>handlerSaveFarmacia()}>Guardar</Button>
    </Modal>
  </Portal>
  )
}
