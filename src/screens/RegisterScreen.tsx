//rafc
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { auth } from '../configs/firebaseConfig';
import { styles } from '../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
interface RegisterForm{
    email:string;
    password: string;
}

interface MessageSnackBar{
    visible:boolean,
    message: string,
    color:string
}

export const RegisterScreen = () => {
    // Hook de navegacion de vizualizacion de contraseña
    const [hiddenPassword, sethiddenPassword] = useState(true)
    // Hoojtruevegacion
   const navigation=useNavigation()

    //Hook useState: Nos permite trabajar con el estado del formulario
    const [registerForm, setRegisterForm] = useState    <RegisterForm>({
           email:"",
           password:"",
    });
    //Hook useState:manejo de mensajes dinamicos
    const [messageSnackBar, setmessageSnackBar] = useState<MessageSnackBar>({
        visible:false,
        message:"",
        color:"fff"

    })
    //Hook de vizualizar mensajes 
    const [showMessage, setshowMessage] = useState(false);


    //Funcion para actualizar datos del formulario
    const handlerSetRegisterForm = (key:string,value:string) => {
        setRegisterForm({...registerForm, [key]: value})
    };

//Funcion que toma los datos del registro
const handlerRegister= async ()=>{
    if(!registerForm.email || !registerForm.password){
        //cambiar el estado para vizualizar el mensaje
        setmessageSnackBar({visible:true,message:"Complete los campos",color:"#962841"})
        return;

    }

    //Registrar Usuario
    try{
        const response = await createUserWithEmailAndPassword(
            auth,
            registerForm.email,
            registerForm.password

        );
        console.log(response);
        setmessageSnackBar({
            visible:true,
            message:"Registro exito",
            color:"#246317"
        })

    }catch(e){
        console.log(e);
        setmessageSnackBar({
            visible:true,
            message:"No se logro completar pa",
            color:"#962841"
        })
    }



    //console.log(registerForm)
}
  return (
    <View style={styles.content}>
    <Text>Registrate</Text>
    <TextInput
    mode="outlined"
    label="correo"
    placeholder="Escribe tu correo"
    style={styles.inputs}
    onChangeText={(value)=>handlerSetRegisterForm('email',value)}
  />
      <TextInput
    mode="outlined"
    label="contraseña"
    placeholder="Escribe tu contraseña"
    secureTextEntry={hiddenPassword}
    right={<TextInput.Icon icon="eye" onPress={()=>sethiddenPassword(!hiddenPassword)} />}
    style={styles.inputs}
    onChangeText={(value)=>handlerSetRegisterForm('password',value)}
  />
    <Button icon="camera" mode="contained" 
    onPress={() => handlerRegister()}
    style={styles.buttons}>
    Registrarse
  </Button>
  <Snackbar
  visible={messageSnackBar.visible} onDismiss={()=> setmessageSnackBar({...messageSnackBar})}
  style={{backgroundColor:messageSnackBar.color}}>
    {messageSnackBar.message}

  </Snackbar>
  <Text style={styles.textNavigation}
  onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Login"}))}>Ya tenes cuenta inisia sesion</Text>
  </View>
  );
};


