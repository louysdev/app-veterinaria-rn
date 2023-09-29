import {Text, View} from 'react-native';

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
};

export default function Paciente({item}: PacienteProps) {
  const {paciente, fecha} = item;

  const formatearFecha = (fecha: Date) => {
    console.log('Fecha a cambiar', fecha);
    const nuevaFecha = new Date(fecha);
    console.log('Nueva fecha: ', nuevaFecha);

    return nuevaFecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  console.log('Item en paciente: ', item);
  return (
    <View>
      <Text>{paciente}</Text>
      <Text>{formatearFecha(fecha)}</Text>
    </View>
  );
}
