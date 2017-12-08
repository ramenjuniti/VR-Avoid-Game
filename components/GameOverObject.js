import React from 'react';
import { View, Text, VrButton, StyleSheet, Animated } from 'react-vr';

export default class GameOverObject extends React.Component {
  render() {
    return (
      this.props.gameOverTextDisplay ?
        <Animated.View>
          <Text style={styles.GameOverText}>
            GameOver
        </Text>
          <VrButton
            style={styles.RetryButton}
            onClick={() => this.props.gameStart()}
          >
            <Text
              style={styles.ButtonText}
            >
              Retry
            </Text>
          </VrButton>
        </Animated.View>
        :
        <View></View>
    )
  }
}

const styles = StyleSheet.create({
  GameOverText: {
    color: '#E70B19',
    fontSize: 0.15,
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.08,
    paddingRight: 0.08,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [
      { translate: [0, 0.05, -0.5] },
      { rotateX: 5 }
    ]
  },
  RetryButton: {
    width: 0.25,
    paddingLeft: 0.05,
    paddingRight: 0.05,
    backgroundColor: '#0A5267',
    borderRadius: 0.02,
    layoutOrigin: [0.5, 0.5],
    transform: [
      { translate: [0, 0, -0.5] }
    ]
  },
  ButtonText: {
    fontSize: 0.05,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});