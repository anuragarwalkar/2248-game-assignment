import React, {Component} from 'react';
import Svg, {Line} from 'react-native-svg';
import {
    StyleSheet,
    View,
    PanResponder,
    Dimensions,
} from 'react-native';
import Grid from './src/components/Grid/Grid';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        console.log(e);
        return true
      }

    })
  ).current;
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >

        <Grid />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: 'relative'
  },
});

export default App;