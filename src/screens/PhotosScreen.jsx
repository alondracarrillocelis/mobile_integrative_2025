import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotosScreen = () => {
  const [photo, setPhoto] = useState(null);

  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos para acceder a la galería.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos para usar la cámara.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos</Text>
      <TouchableOpacity style={styles.cameraButton} onPress={selectPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Image source={require('../../assets/camara.png')} style={styles.photo} />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Cliente:</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Comentarios:</Text>
      <TextInput style={styles.input} multiline numberOfLines={4} />
      <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Guardar')}>
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>
      <Button title="Tomar Foto" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  cameraButton: { alignItems: 'center', marginVertical: 20 },
  photo: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#ddd' },
  label: { fontSize: 16, marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5 },
  saveButton: { marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16 },
});

export default PhotosScreen;
