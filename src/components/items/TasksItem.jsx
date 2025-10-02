import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log("Edit task", task.id_task);
        navigation.navigate("AddTask", { taskId: task.id_task });
      }}
    >
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{task.start_time}</Text>
        <Text style={styles.tableCell}>{task.client_id}</Text>
        <Text style={styles.tableCell}>{task.title}</Text>
        <Text style={styles.tableCellH}>{task.date_}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // console.log("Deleting", task.id_task);
            handleDelete(task.id_task);
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
  tableCellH: {
    display: "none",
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

export default TaskItem;
