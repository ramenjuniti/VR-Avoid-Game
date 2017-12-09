import React from 'react';
import { View, Text, VrButton, StyleSheet } from 'react-vr';

import ButtonObject from './ButtonObject';

export default class GameOverObject extends React.Component {
  render() {
    return (
      this.props.gameOverTextDisplay ?
        <View>
          <Text style={styles.GameOverText}>
            GameOver
        </Text>
          <ButtonObject
            buttonLabel={'Retry'}
            gameStart={this.props.gameStart}
          />
        </View>
        :
        <View></View>
    )
  }
}

const styles = StyleSheet.create({
  GameOverText: {
    position: 'absolute',
    color: '#E70B19',
    fontSize: 0.3,
    layoutOrigin: [0.5, 0.5],
    transform: [
      { translate: [0, 0.3, -1] },
      { rotateX: 5 }
    ]
  }
});