import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Layout from "../components/Layout";
import TasksTable from "../components/Tables/TasksTable";
import logoImage from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation correctamente

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation(); // Definir la constante sin conflicto

  // Maneja el cambio de fecha
  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // Restablece la fecha al día de hoy
  const handleResetDate = () => {
    setSelectedDate(new Date());
  };

  return (
    <Layout>
      <Image
        source={logoImage}
        style={styles.logo}
        onError={(error) => console.error("Error al cargar la imagen", error)}
      />
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => handleDateChange(-1)}
        >
          <Text style={styles.dateButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => handleDateChange(1)}
        >
          <Text style={styles.dateButtonText}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetDate}>
          <Text style={styles.resetButtonText}>↻</Text>
        </TouchableOpacity>
      </View>
      <TasksTable
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate("AddTask"); // Usar navigation para la navegación
        }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: "#28a745", // Color verde para el botón de reset
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: "white",
  },
});

export default HomeScreen;
