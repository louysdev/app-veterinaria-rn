import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';

interface PacienteState {
  id: string;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<PacienteState[]>([]);

  const nuevaCitaBoton = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Administrador de citas{' '}
        <Text style={styles.tituloPalabra}>Veterinaria</Text>
      </Text>
      <Pressable style={styles.botonCita} onPress={nuevaCitaBoton}>
        <Text style={styles.botonTextoCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientesTexto}>No hay pacientes</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Paciente item={item} />;
          }}
        />
      )}

      <Formulario
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    paddingTop: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  tituloPalabra: {
    fontWeight: '900',
    color: '#10B981',
  },
  botonCita: {
    backgroundColor: '#10B981',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  botonTextoCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
  noPacientesTexto: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
