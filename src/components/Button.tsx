import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({text}) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
