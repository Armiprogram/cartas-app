import React, { useEffect, useState } from 'react'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { View } from 'react-native';
import { styles } from '../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Farmacia } from './HomeScreen/HomeFarmaciaScreen';
import { dbRealTime } from '../configs/firebaseConfig';
import { ref, remove, update } from 'firebase/database';

export const DetailFarmaciaScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { farmacia } = route.params as { farmacia: Farmacia }; // Casting route.params como { farmacia: Farmacia }

  const [detailForm, setDetailForm] = useState<Farmacia>({
    id:'',
    client:'',
    ill:'',
    treat:''
  })

  useEffect(() => {
    if (farmacia) { // Verificar si farmacia está presente
      setDetailForm(farmacia)
    }
  }, [farmacia]) // Agregar farmacia como dependencia del efecto

  const handlerSetDetailForm = (key:string, value:string) => {
    setDetailForm({...detailForm, [key]:value})
  }

  const handlerUpdateFarmacia = async() => {
    if (!detailForm.id) return; // Asegurarse de que detailForm.id esté presente antes de continuar
    const dbRef = ref(dbRealTime, 'farmacias/' + detailForm.id)
    await update(dbRef, {ill: detailForm.ill, treat: detailForm.treat})
    navigation.goBack()
  }

  const handlerDeleteFarmacia = async() => {
    if (!detailForm.id) return; // Asegurarse de que detailForm.id esté presente antes de continuar
    const dbRef = ref(dbRealTime, 'farmacias/' + detailForm.id)
    await remove(dbRef)
    navigation.goBack()
  }
  
  return (
    <View>
        <View style={styles.contentDetailFarmacia}>
            <Text variant='headlineSmall'>Enfermedad:</Text>
            <TextInput
            value={detailForm.ill}
            onChangeText={(value) => handlerSetDetailForm('ill', value)}
            style={{flex:1}}
            />
        </View>
        <Divider bold/>
        <View>
        <Text variant='bodyLarge'>Cliente: {detailForm.client} </Text>
        </View>
        <Divider bold/>
        <View>
        <Text style={styles.textMessage}>Tratamiento: </Text>
        <TextInput
         value={detailForm.treat}
         multiline={true}
         numberOfLines={7}
         onChangeText={(value) => handlerSetDetailForm('treat', value)}
         />
        </View>
        <Button mode='contained' icon='email-sync' onPress={() => handlerUpdateFarmacia()}>Actualizar</Button>
        <Button mode='contained' icon='email-remove' onPress={() => handlerDeleteFarmacia()}>Eliminar</Button>
    </View> 
  )
}
