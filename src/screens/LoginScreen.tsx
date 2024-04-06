import React, { useState } from 'react'
import {  View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
interface LoginForm{
  email:string;
  password: string;
}
interface MessageSnackBar{
  visible:boolean,
  message: string,
  color:string
}

export const LoginScreen = () => {
  // Hooj de navegacion
      // Hook de navegacion de vizualizacion de contraseña
      const [hiddenPassword, sethiddenPassword] = useState(true)
   const navigation=useNavigation()
     //Hook useState: Nos permite trabajar con el estado del formulario
     const [loginForm, setloginForm] = useState    <LoginForm>({
      email:"",
      password:"",
});
      //Hook useState:manejo de mensajes dinamicos
      const [messageSnackBar, setmessageSnackBar] = useState<MessageSnackBar>({
        visible:false,
        message:"",
        color:"fff"

    })
      //Funcion para actualizar datos del formulario
      const handlerSetloginForm = (key:string,value:string) => {
        setloginForm({...loginForm, [key]: value})
    };
    const handlerLogin= async ()=>{
      if(!loginForm.email || !loginForm.password){
        //cambiar el estado para vizualizar el mensaje
        setmessageSnackBar({visible:true,message:"Complete los campos",color:"#962841"})
        return;

    }

    //Registrar Usuario
    try{
        const response = await signInWithEmailAndPassword(
            auth,
            loginForm.email,
            loginForm.password

        );
        console.log(response);

    }catch(e){
        console.log(e);
        setmessageSnackBar({
            visible:true,
            message:"Usuario o contraseña incorrecta",
            color:"#962841"
        })
    }



    //console.log(registerForm)

    }
  return (
    <View style={styles.content}>
    <Text>Inicia Sesion</Text>
    <TextInput
    mode="outlined"
    label="correo"
    placeholder="Escribe tu correo"
    style={styles.inputs}
    onChangeText={(value)=>handlerSetloginForm('email',value)}
  />
      <TextInput
    mode="outlined"
    label="contraseña"
    placeholder="Escribe tu contraseña"
    secureTextEntry={hiddenPassword}
    right={<TextInput.Icon icon="eye" onPress={()=>sethiddenPassword(!hiddenPassword)} />}
    style={styles.inputs}
    onChangeText={(value)=>handlerSetloginForm('password',value)}
  />
    <Button icon="camera" mode="contained" 
    onPress={() => handlerLogin()}
    style={styles.buttons}>
    Iniciar
  </Button>
  <Snackbar
  visible={messageSnackBar.visible} onDismiss={()=> setmessageSnackBar({...messageSnackBar})}
  style={{backgroundColor:messageSnackBar.color}}>
    {messageSnackBar.message}

  </Snackbar>
  <Text style={styles.textNavigation}
  onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Register"}))}>No tienes una cuenta? Registrate</Text>
  </View>
  )
}
