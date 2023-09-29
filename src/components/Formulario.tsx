import {useEffect, useState} from 'react';
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
  cerrarModal: () => void;
  setPacientes: (pacientes: any) => void;
  pacientes: any;
  paciente: any;
  setPaciente: (paciente: any) => void;
};

export default function Formulario({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteEditar,
  setPaciente: setPacienteEditar,
}: FormularioProps) {
  const [id, setId] = useState('');
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

    // Se crear un nuevo paciente, apesar de que se vaya a crear uno nuevo o a editar uno que existe. Debido a que la valiadacion se hara mas tarde
    const nuevoPaciente = {
      id,
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      // Cambia el id del paciente anterior por el nuevo
      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map(
        (pacienteState: {id: string}) => {
          // Si hay 4. Se devuelve el nuevo creado y los otros 3 iguales
          return pacienteState.id === id ? nuevoPaciente : pacienteState;
        },
      );

      setPacientes(pacientesActualizados);
      setPacienteEditar({});
    } else {
      nuevoPaciente.id = Date.now().toString();

      // Agregar el objeto del paciente en el arreglo principal
      setPacientes([...pacientes, nuevoPaciente]);
    }

    // Cerrar modal
    cerrarModal();
    // Resetear formulario
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  // Setear los datos para su edicion

  useEffect(() => {
    if (pacienteEditar && Object.keys(pacienteEditar).length > 0) {
      setId(pacienteEditar.id);
      setPaciente(pacienteEditar.paciente);
      setPropietario(pacienteEditar.propietario);
      setEmail(pacienteEditar.email);
      setTelefono(pacienteEditar.telefono);
      setFecha(pacienteEditar.fecha);
      setSintomas(pacienteEditar.sintomas);
    }
  }, [pacienteEditar]);

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenedor}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteEditar?.id ? 'Editar' : 'Nueva'}{' '}
            <Text style={styles.tituloPalabra}>cita</Text>
          </Text>

          <Pressable
            onPress={() => {
              cerrarModal();
              setPacienteEditar({});
              setId('');
              setPaciente('');
              setPropietario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}
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
            <Text style={styles.textoNuevaCita}>
              {pacienteEditar?.id ? 'Editar' : 'Agregar'} paciente
            </Text>
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
    marginTop: 40,
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
