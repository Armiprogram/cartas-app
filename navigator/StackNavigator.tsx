import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../src/screens/LoginScreen';
import { RegisterScreen } from '../src/screens/RegisterScreen';
import { HomeScreen } from '../src/screens/HomeScreen/HomeScreen';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { DetailLetterScreen } from '../src/screens/DetailLetterScreen';

//Interface que define las propiedades de las rutas
interface Routes{
    name:string,
    screen: ()=> JSX.Element,//es un elemento JSX
    headerShow?:boolean,
    title?: string
}
const Stack = createStackNavigator();

export const StackNavigator=()=> {
    //Hook para verificar si está logueado o no
    const [isAuth, setisAuth] = useState(false)
    //Hook para controlar la carga unicial del screen
    const [isLoading, setisLoading] = useState(false)
    //Hook Home useEffect: valida cual es el estado de autenticación
    useEffect(() => {
        setisLoading(true)
        onAuthStateChanged(auth, (user)=>{
            if(user){//Si el usuario está authenticado
                setisAuth(true)

                console.log("Rutas: "+user.email);
            }
            setisLoading(false)
        })

    }, [])
    
    // Arreglo de rutas para el usuario que no esta logeado para el usuario que no está autenticado
    const routesNoauth: Routes[]=[
        {name:"Login", screen: LoginScreen},
        {name:"Register", screen: RegisterScreen}

    ]
      // Arreglo de rutas para el usuario que  esta logeado para el usuario que no está autenticado
      const routesAuth: Routes[]=[
        {name:"Home", screen: HomeScreen},
        {name:"Detail", screen: DetailLetterScreen, headerShow:true, title:'Detalle Carta' }
  
    ]
  return (
    <>
    {
        isLoading ?(

        <View>
        <ActivityIndicator size={35} />
        </View>
        ):(
            <Stack.Navigator> 
        {
            !isAuth?
            routesNoauth.map((item,index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen} />
            ))
            :
            routesAuth.map((item,index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:item.headerShow??false, title: item.title}} component={item.screen} />
            ))
        }

    </Stack.Navigator>
        )
    }
   
    
    </>
  );
}