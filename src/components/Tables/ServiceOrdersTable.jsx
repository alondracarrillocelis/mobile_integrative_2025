import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ServiceOrdersItem from "../items/ServiceOrdersItem";
import { useIsFocused } from "@react-navigation/native";
import { getServiceOrders } from "../../api/OrderServices_api";

const ServiceOrdersTable = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // función para cargar las ordenes de servicio
  const loadServiceOrders = async () => {
    setLoading(true);
    try {
      const data = await getServiceOrders();
      setServiceOrders(data);
    } catch (error) {
      console.error("Error loading service orders", error);
    } finally {
      setLoading(false);
    }
  };

  // efecto para cargar las ordenes de servicio cuando el componente se monta
  useEffect(() => {
    loadServiceOrders();
  }, [isFocused]);

  // función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => {
    return <ServiceOrdersItem serviceOrder={item} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadServiceOrders();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Código</Text>
          <Text style={styles.tableHeaderCell}>Fecha</Text>
          {/* <Text style={styles.tableHeaderCell}>Estado</Text> */}
          <Text style={styles.tableHeaderCell}>Acción</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={serviceOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_service_order.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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

export default ServiceOrdersTable;
