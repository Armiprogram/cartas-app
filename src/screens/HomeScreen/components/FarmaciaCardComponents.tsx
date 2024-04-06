import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Farmacia } from '../HomeFarmaciaScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
  farmacia: Farmacia,
}

export const FarmaciaCardComponents = ({farmacia}:Props) => {
  const navigation=useNavigation()

  return (
    <View style={styles.contentDetailFarmacia}>
    <View>
        <Text variant='labelLarge'>Cliente: {farmacia.client} </Text>
        <Text variant='bodyMedium'>Enfermedad: {farmacia.ill} </Text>
    </View>
    <View style={styles.iconLetter}>
    <IconButton 
    icon='email-open'
    size={25}
    onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Detail',params:{farmacia}}))}></IconButton>
    </View>
    </View>
  )
}
