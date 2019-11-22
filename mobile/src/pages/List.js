import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  AsyncStorage,
  Alert
} from "react-native";

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  // pegar usuário logado
  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://172.16.10.28:3333", {
        query: { user_id }
      });
      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  // [ReactJS, [ Node.js]

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techArray = storageTechs.split(",").map(tech => tech.trim());

      setTechs(techArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
