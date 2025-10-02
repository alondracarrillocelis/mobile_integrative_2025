import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ClientsItem from "../items/ClientsItem";
import { useIsFocused } from "@react-navigation/native";
import { getClients, deleteClient } from "../../api/Clients_api";

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // función para cargar los clientes
  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Error loading clients", error);
    } finally {
      setLoading(false);
    }
  };

  // efecto para cargar los clientes cuando el componente se monta
  useEffect(() => {
    loadClients();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteClient(id);
    await loadClients();
  };
  // función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => {
    return <ClientsItem client={item} handleDelete={handleDelete} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Código</Text>
          <Text style={styles.tableHeaderCell}>Nombre</Text>
          <Text style={styles.tableHeaderCell}>Contacto</Text>
          <Text style={styles.tableHeaderCell}>Celular</Text>
          <Text style={styles.tableHeaderCell}>Acción</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={clients}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_client.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ClientsTable;
