import {Pressable, StyleSheet, Text, View} from 'react-native';
import {formatearFecha} from '../helpers';

type PacienteProps = {
  item: {
    id: string;
    paciente: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
    sintomas: string;
  };
  setModalVisible: (modalVisible: boolean) => void;
  pacienteEditar: (id: string) => void;
  pacienteEliminar: (id: string) => void;
  setModalInformacion: (modalInformacion: boolean) => void;
  setPaciente: (paciente: any) => void;
};

export default function Paciente({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalInformacion,
  setPaciente,
}: PacienteProps) {
  const {paciente, fecha} = item;

  return (
    <Pressable
      onLongPress={() => {
        setModalInformacion(true);
        setPaciente(item);
      }}>
      <View style={styles.contenedor}>
        <Text style={styles.etiquetaPaciente}>Paciente: </Text>
        <Text style={styles.nombrePaciente}>{paciente}</Text>
        <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

        <View style={styles.contenedorBotones}>
          <Pressable
            style={[styles.botonPaciente, styles.botonEditar]}
            onPress={() => {
              pacienteEditar(item.id);
              setModalVisible(true);
            }}>
            <Text style={styles.botonTexto}>Editar</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              pacienteEliminar(item.id);
            }}
            style={[styles.botonPaciente, styles.botonEliminar]}>
            <Text style={styles.botonTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  etiquetaPaciente: {
    color: '#374151',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  nombrePaciente: {
    color: '#10B981',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonPaciente: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botonEditar: {
    backgroundColor: '#F59E0B',
  },
  botonEliminar: {
    backgroundColor: '#EF4444',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
});
