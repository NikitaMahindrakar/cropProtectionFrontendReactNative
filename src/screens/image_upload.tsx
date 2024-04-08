import React, { useState } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

const Upload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } 
      else if (response.assets) {
        const firstImage = response.assets[0];
        if (firstImage && firstImage.uri) {
          setSelectedImage(firstImage.uri);
        } else {
          console.log('Selected image is invalid');
        }
    }
  });
  };

  const generateReport = () => {
    console.log('Generating report...');
  };

  return (
    <View style={styles.container}>
      {!selectedImage ? (
        <Button title="Upload Image" onPress={pickImage} />
      ) : (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Button title="Generate Report" onPress={generateReport} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Upload;

