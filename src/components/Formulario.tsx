import {useState} from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

type FormularioProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  setPacientes: (pacientes: any) => void;
  pacientes: any;
};

export default function Formulario({
  modalVisible,
  setModalVisible,
  pacientes,
  setPacientes,
}: FormularioProps) {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  const handleCita = () => {
    // Determinar si hay campos vacios
    if (
      [paciente, propietario, email, telefono, fecha, sintomas].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoPaciente = {
      // Generar un ID en base al fecha
      id: Date.now(),
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    // Agregar el objeto del paciente en el arreglo principal
    setPacientes([...pacientes, nuevoPaciente]);
    // Cerrar modal
    setModalVisible(!modalVisible);
    // Resetear formulario
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenedor}>
        <ScrollView>
          <Text style={styles.titulo}>
            Nueva <Text style={styles.tituloPalabra}>cita</Text>
          </Text>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.botonCancelar}>
            <Text style={styles.botonTextoCancelar}>Cerrar</Text>
          </Pressable>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Nombre del paciente</Text>
            <TextInput
              style={styles.textoInput}
              placeholder="Chau Chau"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Nombre del propietario</Text>
            <TextInput
              style={styles.textoInput}
              placeholder="Felipe"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Correo</Text>
            <TextInput
              style={styles.textoInput}
              placeholder="felipe@gmail.com"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Telefono</Text>
            <TextInput
              style={styles.textoInput}
              placeholder="809-111-2222"
              placeholderTextColor={'#666'}
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Fecha de alta</Text>
            <View style={styles.contenedorFecha}>
              <DatePicker
                date={fecha}
                locale="es"
                mode="date"
                fadeToColor="none"
                textColor="#10B981"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.contenedorCampo}>
            <Text style={styles.etiquetaInput}>Sintomas</Text>
            <TextInput
              style={styles.textoInput}
              placeholder="Dolor muscular"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.botonNuevaCita} onPress={handleCita}>
            <Text style={styles.textoNuevaCita}>Agregar paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#10B981',
    flex: 1,
  },
  titulo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloPalabra: {
    fontWeight: '900',
    color: '#E7F8F2',
  },
  botonCancelar: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: '#0c8a60',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 10,
    marginHorizontal: 4,
  },
  botonTextoCancelar: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Poppins-Regular',
  },
  contenedorCampo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  textoInput: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  etiquetaInput: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  contenedorFecha: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  botonNuevaCita: {
    backgroundColor: '#FFA500',
    padding: 15,
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  textoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
    fontWeight: '900',
    fontSize: 18,
  },
});
