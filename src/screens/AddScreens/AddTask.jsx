import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveTask, getTask, updateTask } from "../../api/Task_api";

const AddTask = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    client_id: "",
    description_: "",
    date_: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    assigned_to: "",
    status_: "Pendiente",
  });

  const [editing, setEditing] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  const handleChange = (name, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !task.date_ ||
        !task.start_time ||
        !task.end_time ||
        isNaN(task.date_.getTime()) ||
        isNaN(task.start_time.getTime()) ||
        isNaN(task.end_time.getTime())
      ) {
        console.error("Invalid date values");
        return;
      }

      // Convertir las fechas y horas a formato ISO 8601
      const taskToSend = {
        ...task,
        date_: task.date_.toISOString(),
        start_time: task.start_time.toISOString(),
        end_time: task.end_time.toISOString(),
      };

      if (editing) {
        await updateTask(route.params.taskId, taskToSend);
      } else {
        await saveTask(taskToSend);
      }
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.taskId) {
      navigation.setOptions({ title: "" });
      setEditing(true);
      (async () => {
        const task = await getTask(route.params.taskId);

        // Parsear las fechas y horas al formato Date
        const date_ = new Date(task.date_);
        const start_time = new Date(task.start_time);
        const end_time = new Date(task.end_time);

        setTask({
          ...task,
          date_: date_,
          start_time: start_time,
          end_time: end_time,
        });
        setSelectedDate(date_);
        setSelectedStartTime(start_time);
        setSelectedEndTime(end_time);
      })();
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editing ? "Editar Asignación" : "Nueva Asignación"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={task.title}
        onChangeText={(value) => handleChange("title", value)}
      />

      <Picker
        selectedValue={task.client_id}
        style={styles.picker}
        onValueChange={(value) => handleChange("client_id", value)}
      >
        <Picker.Item label="Cliente 1" value="3" />
        <Picker.Item label="Cliente 2" value="4" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={task.description_}
        onChangeText={(value) => handleChange("description_", value)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={styles.buttonText}
        >{`Fecha seleccionada: ${selectedDate.toDateString()}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={task.date_}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            const date = selectedDate || task.date_;
            handleChange("date_", date);
            setSelectedDate(date);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowStartTimePicker(true)}
      >
        <Text style={styles.buttonText}>{`Hora de inicio seleccionada: ${
          selectedStartTime.toTimeString().split(" ")[0]
        }`}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={task.start_time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(false);
            const time = selectedTime || task.start_time;
            handleChange("start_time", time);
            setSelectedStartTime(time);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowEndTimePicker(true)}
      >
        <Text style={styles.buttonText}>{`Hora de fin seleccionada: ${
          selectedEndTime.toTimeString().split(" ")[0]
        }`}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={task.end_time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(false);
            const time = selectedTime || task.end_time;
            handleChange("end_time", time);
            setSelectedEndTime(time);
          }}
        />
      )}

      <Picker
        selectedValue={task.assigned_to}
        style={styles.picker}
        onValueChange={(value) => handleChange("assigned_to", value)}
      >
        <Picker.Item label="Asignado 1" value="7" />
        <Picker.Item label="Asignado 2" value="9" />
      </Picker>

      <Picker
        selectedValue={task.status_}
        style={styles.picker}
        onValueChange={(value) => handleChange("status_", value)}
      >
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En proceso" value="En proceso" />
        <Picker.Item label="Terminada" value="Terminada" />
      </Picker>

      <TouchableOpacity
        style={[
          styles.button,
          styles.submitButton,
          {
            backgroundColor:
              task.title &&
              task.client_id &&
              task.description_ &&
              task.date_ &&
              task.start_time &&
              task.end_time &&
              task.assigned_to &&
              task.status_
                ? "#28b4ec"
                : "gray",
          },
        ]}
        onPress={handleSubmit}
        disabled={
          !task.title ||
          !task.client_id ||
          !task.description_ ||
          !task.date_ ||
          !task.start_time ||
          !task.end_time ||
          !task.assigned_to ||
          !task.status_
        }
      >
        <Text style={styles.submitButtonText}>
          {editing ? "Actualizar" : "Guardar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#28b4ec",
  },
  input: {
    height: 40,
    borderColor: "#28b4ec",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 10,
    borderColor: "#28b4ec",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#28b4ec",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default AddTask;
