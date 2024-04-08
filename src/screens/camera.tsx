import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Video: React.FC = () => {
  const cameraRef = useRef<RNCamera>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        const { uri } = await cameraRef.current.recordAsync();
        console.log('Video saved at:', uri);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
      />
      <View style={styles.controls}>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording} style={styles.button}>
            <Text style={styles.text}>Stop Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording} style={styles.button}>
            <Text style={styles.text}>Start Recording</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Video;

