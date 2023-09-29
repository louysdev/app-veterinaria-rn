import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {formatearFecha} from '../helpers';

type InformacionPacienteProps = {
  paciente: any;
  setModalInformacion: (modalInformacion: boolean) => void;
  setPaciente: (paciente: any) => void;
};

export function InformacionPaciente({
  paciente,
  setModalInformacion,
  setPaciente,
}: InformacionPacienteProps) {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Text style={styles.titulo}>
          Informacion <Text style={styles.tituloPalabra}>paciente</Text>
        </Text>

        <Pressable
          style={styles.botonCancelar}
          onPress={() => {
            setModalInformacion(false);
            setPaciente({});
          }}>
          <Text style={styles.botonTextoCancelar}>Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.contenido}>
        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Nombre paciente:</Text>
          <Text style={styles.nombreEtiqueta}>{paciente?.paciente}</Text>
        </View>

        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Propietario:</Text>
          <Text style={styles.nombreEtiqueta}>{paciente?.propietario}</Text>
        </View>

        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Email:</Text>
          <Text style={styles.nombreEtiqueta}>{paciente?.email}</Text>
        </View>

        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Telefono:</Text>
          <Text style={styles.nombreEtiqueta}>{paciente?.telefono}</Text>
        </View>

        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Fecha:</Text>
          <Text style={styles.nombreEtiqueta}>
            {formatearFecha(paciente?.fecha)}
          </Text>
        </View>

        <View style={styles.contenedorCampo}>
          <Text style={styles.etiqueta}>Sintomas:</Text>
          <Text style={styles.nombreEtiqueta}>{paciente?.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#c57f08',
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
  contenido: {
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    // Sombras
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contenedorCampo: {
    marginBottom: 10,
  },
  etiqueta: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  nombreEtiqueta: {
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#334155',
  },
});
