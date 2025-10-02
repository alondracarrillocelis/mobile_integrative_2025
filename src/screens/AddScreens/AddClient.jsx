import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveClient, getClient, updateClient } from "../../api/Clients_api";

const AddClient = ({ navigation, route }) => {
  const [client, setClient] = useState({
    trade_name: "",
    business_type: "Por definir",
    phone_or_cell: "",
    email: "",
    street: "",
    number_: "",
    neigborhood: "",
    postal_code: "",
    city: "",
    country: "México",
    state_: "",
    notes: "",
    contact_name: "",
    contact_title: "",
    contact_area_or_position: "",
    contact_cell_phone: "",
    contact_email: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => {
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      if (!editing) {
        await saveClient(client);
      } else {
        await updateClient(route.params.clientId, client);
      }
      navigation.navigate("Clientes");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al guardar el cliente.");
    }
  };

  const isFormValid = () => {
    return (
      client.trade_name &&
      client.business_type &&
      client.email &&
      client.street &&
      client.number_ &&
      client.city &&
      client.country &&
      client.state_ &&
      client.contact_name &&
      client.contact_cell_phone &&
      client.contact_email
    );
  };

  useEffect(() => {
    if (route.params && route.params.clientId) {
      navigation.setOptions({ title: "Editar Cliente" });
      setEditing(true);
      (async () => {
        const client = await getClient(route.params.clientId);
        setClient(client);
      })();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        {editing ? "Editar Cliente" : "Nuevo Cliente"}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre Comercial"
          value={client.trade_name}
          onChangeText={(text) => handleChange("trade_name", text)}
        />
        <Picker
          selectedValue={client.business_type}
          style={styles.picker}
          onValueChange={(itemValue) =>
            handleChange("business_type", itemValue)
          }
        >
          <Picker.Item label="Por definir" value="Por definir" />
          <Picker.Item label="Comercial" value="Comercial" />
          <Picker.Item label="Equipo médico" value="Equipo médico" />
          <Picker.Item label="Industrial" value="Industrial" />
          <Picker.Item label="Restaurantero" value="Restaurantero" />
          <Picker.Item label="Servicios" value="Servicios" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Teléfono/Celular"
          value={client.phone_or_cell}
          onChangeText={(text) => handleChange("phone_or_cell", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={client.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Calle"
          value={client.street}
          onChangeText={(text) => handleChange("street", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={client.number_}
          onChangeText={(text) => handleChange("number_", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Colonia"
          value={client.neigborhood}
          onChangeText={(text) => handleChange("neigborhood", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código Postal"
          value={client.postal_code}
          onChangeText={(text) => handleChange("postal_code", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={client.city}
          onChangeText={(text) => handleChange("city", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={client.state_}
          onChangeText={(text) => handleChange("state_", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Notas"
          value={client.notes}
          onChangeText={(text) => handleChange("notes", text)}
        />
        <Text style={styles.infoTitle}>Info de Contacto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Contacto"
          value={client.contact_name}
          onChangeText={(text) => handleChange("contact_name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono de Contacto"
          value={client.contact_cell_phone}
          onChangeText={(text) => handleChange("contact_cell_phone", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo de Contacto"
          value={client.contact_email}
          onChangeText={(text) => handleChange("contact_email", text)}
        />
        <Button
          title={editing ? "Actualizar Cliente" : "Guardar Cliente"}
          onPress={handleSubmit}
          disabled={!isFormValid()}
          color="#fff"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#28b4ec",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 15,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#28b4ec",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#28b4ec",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
});

export default AddClient;
