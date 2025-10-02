import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveService, getService, updateService } from "../../api/Services_api";

const AddService = ({ navigation, route }) => {
  const [service, setService] = useState({
    name_: "",
    category_id: "",
    sale_price: "",
    description_: "",
    sat_unit: "",
    sat_code: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => {
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !service.name_ ||
      !service.category_id ||
      !service.sale_price ||
      !service.description_
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      if (editing) {
        await updateService(route.params.serviceId, service);
      } else {
        await saveService(service);
      }
      navigation.navigate("Servicios");
    } catch (error) {
      console.error("Error saving service", error);
    }
  };

  const isFormValid = () => {
    return (
      service.name_ &&
      service.category_id &&
      service.sale_price &&
      service.description_
    );
  };

  useEffect(() => {
    if (route.params && route.params.serviceId) {
      navigation.setOptions({ title: "Editar Servicio" });
      setEditing(true);
      (async () => {
        const service = await getService(route.params.serviceId);
        setService(service);
      })();
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {editing ? "Editar Servicio" : "Nuevo Servicio"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={service.name_}
          onChangeText={(text) => handleChange("name_", text)}
        />
        <Picker
          selectedValue={service.category_id}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange("category_id", itemValue)}
        >
          <Picker.Item label="Elija una Categoria" value="" />
          <Picker.Item label="Categoría 1" value="1" />
          <Picker.Item label="Categoría 2" value="2" />
          <Picker.Item label="Categoría 3" value="3" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Precio de venta"
          value={service.sale_price}
          onChangeText={(text) => handleChange("sale_price", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={service.description_}
          onChangeText={(text) => handleChange("description_", text)}
        />
        <Text style={styles.infoTitle}>Información SAT</Text>
        <TextInput
          style={styles.input}
          placeholder="Unidad SAT"
          value={service.sat_unit}
          onChangeText={(text) => handleChange("sat_unit", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código SAT"
          value={service.sat_code}
          onChangeText={(text) => handleChange("sat_code", text)}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isFormValid() ? "#28b4ec" : "#ccc" },
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>
            {editing ? "Actualizar" : "Guardar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#eaf4f9",
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    color: "#333",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15,
    color: "#555",
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddService;
