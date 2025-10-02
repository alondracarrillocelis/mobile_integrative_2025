import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

const ProfileScreen = () => {
  const [signature, setSignature] = useState(null);
  const signRef = useRef();

  const handleSignature = (signature) => {
    setSignature(signature);
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setSignature(null); // Clear the signature state
  };

  const handleSave = async () => {
    if (!signature) {
      Alert.alert('Error', 'No hay firma para guardar');
      return;
    }
    const fileUri = FileSystem.documentDirectory + 'signature.png';
    await FileSystem.writeAsStringAsync(fileUri, signature.replace('data:image/png;base64,', ''), {
      encoding: FileSystem.EncodingType.Base64,
    });
    Alert.alert('Firma guardada', `La firma ha sido guardada en ${fileUri}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
        <TouchableOpacity style={styles.cameraButton}>
          <Text style={styles.cameraButtonText}>Tomarse una Foto</Text>
        </TouchableOpacity>
        <Text style={styles.emailText}>ivanrenteria803@gmail.com</Text>
        <Text style={styles.nameText}>Nombre: Iván Amador</Text>
        <TouchableOpacity>
          <Text style={styles.permissionText}>Ver mis permisos</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signatureTitle}>Ingresar Firma *</Text>
      <View style={styles.signatureContainer}>
        <Signature
          ref={signRef}
          onOK={handleSignature}
          descriptionText="Firma"
          clearText="Limpiar"
          confirmText="Guardar"
          webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
        />
      </View>
      {signature ? (
        <Image style={styles.signatureImage} source={{ uri: signature }} />
      ) : null}
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Limpiar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Firma</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd' },
  cameraButton: { marginTop: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  cameraButtonText: { color: '#fff', textAlign: 'center' },
  emailText: { marginTop: 10, color: '#666' },
  nameText: { marginTop: 5, fontWeight: 'bold' },
  permissionText: { marginTop: 5, color: '#007bff' },
  signatureTitle: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  signatureContainer: { flex: 1, borderWidth: 1, borderColor: '#c8e1ff', borderRadius: 5, height: 300, marginTop: 20 },
  signatureImage: { width: '100%', height: 200, resizeMode: 'contain', marginTop: 20 },
  clearButton: { marginTop: 10, padding: 10, backgroundColor: '#dc3545', borderRadius: 5 },
  clearButtonText: { color: '#fff', textAlign: 'center' },
  saveButton: { marginTop: 10, padding: 10, backgroundColor: '#28a745', borderRadius: 5 },
  saveButtonText: { color: '#fff', textAlign: 'center' },
});

export default ProfileScreen;
