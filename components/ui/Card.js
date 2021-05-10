import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {HeaderButton}  from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Card = props => {
  return (
    <View style={{ ...props.style, ...styles.card }}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10
  }
})

export default Card;

