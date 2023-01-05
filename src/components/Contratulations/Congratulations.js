import React, { useContext } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { GridContext } from "../../context";
import { getDimenssions } from "../../utils/utils";

const {width, height} = getDimenssions()

const Congratulations = ({show, hideModal, restart}) => {
    const { score } = useContext(GridContext);


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Contratulations...</Text>
            <Text style={styles.modalText}>{`You Score: ${score}`}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
              <Text style={styles.textStyle} onPress={restart}>Restart</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: width * 0.8,
    height: height * 0.18,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Congratulations;