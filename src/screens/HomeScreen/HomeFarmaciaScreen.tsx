import React, { useEffect, useState } from 'react';
import { FlatList, View, Image } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'; // Importa la función de logout: signOut
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth';
import { FarmaciaCardComponents } from './components/FarmaciaCardComponents';
import { NewFarmaciaComponent } from './components/NewFarmaciaComponent';
import { onValue, ref } from 'firebase/database';

interface UserForm {
  name: string;
}

export interface Farmacia {
  id: string;
  client: string;
  ill: string;
  treat: string;
}

export const HomeFarmaciaScreen = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
  });

  const [showModalFarmacia, setShowModalFarmacia] = useState(false);
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);

  const [showModalProfile, setShowModalProfile] = useState(false);

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setUserForm({ name: auth.currentUser?.displayName ?? 'Vacio' });
    getAllFarmacias();
  }, []);

  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value });
  };

  const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, { displayName: userForm.name });
    setShowModalProfile(false);
  };

  const getAllFarmacias = () => {
    const dbRef = ref(dbRealTime, 'farmacias');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const farmaciasList: Farmacia[] = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          const value = { ...data[key], id: key };
          farmaciasList.push(value);
        });
      }
      setFarmacias(farmaciasList);
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Utiliza la función signOut para cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <View style={styles.contentHomeFarmacia}>
        <Avatar.Text size={55} label="CF" />
        <View style={styles.userInfo}>
          <View>
            <Text variant="bodySmall">Bienvenido</Text>
            <Text variant="labelLarge">{userForm.name} </Text>
          </View>
          <Image
            source={{ uri: 'https://images.ecestaticos.com/Bosqgwi-bRoiiu2s89AjrlamxUE=/0x70:1716x1040/1338x751/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F8db%2F8b6%2Faa5%2F8db8b6aa54b585253e15f79a68447aeb.jpg' }}
            style={styles.userImage}
          />
        </View>
        <View>
          <IconButton
            style={styles.iconProfile}
            icon="cog"
            size={20}
            mode="contained"
            onPress={() => setShowModalProfile(true)}
          />
        </View>
        <View>
          <FlatList
            data={farmacias}
            renderItem={({ item }) => <FarmaciaCardComponents farmacia={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
        <View style={styles.headerModal}>
          <Text variant="headlineLarge">Mi perfil</Text>
          <IconButton icon="close" onPress={() => setShowModalProfile(false)} />
        </View>
        <Divider bold />
        <TextInput
          mode="outlined"
          label="Nombre"
          value={userForm.name}
          onChangeText={(value) => handlerUpdateUserForm('name', value)}
        />
        <TextInput mode="outlined" label="Correo" value={userAuth?.email!} disabled />
        <Button mode="contained" onPress={() => handlerUpdateUser()}>
          Actualizar
        </Button>
      </Modal>
      <FAB icon="plus" style={styles.fab} onPress={() => setShowModalFarmacia(true)} />
      <NewFarmaciaComponent visible={showModalFarmacia} setVisible={setShowModalFarmacia} />
      <Button onPress={handleLogout}>Cerrar sesión</Button> {/* Agrega el botón de logout */}
    </>
  );
};
