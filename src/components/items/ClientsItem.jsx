import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ClientsItem = ({ client, handleDelete }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log("Edit client", client.id_client);
        navigation.navigate("AddClient", { clientId: client.id_client });
      }}
    >
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{client.id_client}</Text>
        <Text style={styles.tableCell}>{client.trade_name}</Text>
        <Text style={styles.tableCell}>{client.contact_name}</Text>
        <Text style={styles.tableCell}>{client.contact_cell_phone}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // console.log("Deleting", client.id_client);
            handleDelete(client.id_client);
          }}
        >
          <Text style={styles.tableCell}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#c8e1ff",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  deleteButton: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    color: "white",
  },
});

export default ClientsItem;
