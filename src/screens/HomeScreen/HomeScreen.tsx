import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth, dbRealTime } from '../../configs/firebaseConfig'
import firebase from 'firebase/auth'
import { LetterCardComponents } from './components/LetterCardComponents';
import { NewLetterComponent } from './components/NewLetterComponent';
import { onValue, ref } from 'firebase/database';
//Interface que nos ayuda a trabajar con los datos del usuario - nombre
interface UserForm{
  name:string
}
//Interface para trabajar la data de la carta 
export interface Letter{
  id:string,
  to: string,
  subject: string,
  message: string
}
export const HomeScreen = () => {
  // hook que nos permite trabajar con los datos del usuario
  const [userForm, setUserForm] = useState<UserForm>({
    name:''
  })
  // Hook usestate que controla la visibilidad del modal NEW LETTER
  const [showModalLetter, setshowModalLetter] = useState(false)
//Hook vinculado con firebase 
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)
  //Hook que toma la lista de cartas
  const [letters, setletters] = useState<Letter[]>([])

  
  //Hook para controlar la visibilidad del modal
  const [showModalProfile, setshowModalProfile] = useState(false)
  //Hook useEffect: Captura la data del usuario logueado
  useEffect(() => {

    setUserAuth(auth.currentUser) // datos del usuario logeado
        setUserForm({name:auth.currentUser?.displayName ?? 'Vacio'})
        getAllLetters()


  }, [])
  //Funcion que toma los datos del formulario y los actualiza
  const handlerUpdateUserForm=(key:string,value:string)=>{
    setUserForm({...userForm, [key]:value})
  }
  //Funcion actualiza la data del usuario logueado
  const handlerUpdateUser=async()=>{
    await updateProfile(userAuth!,{displayName:userForm.name})
    console.log(userForm);
    setshowModalProfile(false)
  }
  //Funcion para tener las cartas almacenadas
  const getAllLetters=()=>{
    const dbRef=ref(dbRealTime,'letters')
    onValue(dbRef,(snapshot)=>{
      const data=snapshot.val()
      const getKeys=Object.keys(data)
      const listLetters: Letter[]=[]
      getKeys.forEach((key)=>{
        const value={...data[key], id:key}
        listLetters.push(value)

      })
      setletters(listLetters)
    })
  }
  
  return (
    <>
    <View style={styles.contentHome}>
        <Avatar.Text size={55} label="CF"/>
        <View>
        <Text variant="bodySmall">Bienvenido</Text>
        <Text variant="labelLarge">{userForm.name} </Text>
        </View>
        <View>
        <IconButton style={styles.iconProfile}
           icon="cog"
          size={20}
          mode='contained'
          onPress={() => setshowModalProfile(true)}
  />
        </View>
        <View>
        <FlatList
        data={letters}
        renderItem={({item}) => <LetterCardComponents letter={item} />}
        keyExtractor={item => item.id}
      />
       </View>
    </View>
          <Portal>
          <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
          <View style={styles.headerModal}> 
          <Text variant='headlineLarge'>Mi perfil</Text>
          <IconButton icon='close' onPress={()=>setshowModalProfile(false)}></IconButton>

          </View>
          <Divider bold/>
          <TextInput
          mode='outlined'
          label='Nombre'
          value={userForm.name}
          onChangeText={(value)=>handlerUpdateUserForm('name',value)}
          />
           <TextInput
          mode='outlined'
          label='Correo'
          value={userAuth?.email!}
          disabled
          />
         <Button mode='contained' onPress={()=>handlerUpdateUser()} >Actualizar</Button>
          </Modal>
        </Portal>
        <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => setshowModalLetter(true)}
  />
   <NewLetterComponent visible={showModalLetter} setVisible={setshowModalLetter} />
        </>
  )
}

