import React from 'react';
import { View, Text } from 'react-vr';

export default class ScoreObject extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            position: 'absolute',
            fontSize: 0.2,
            layoutOrigin: [0.5, 0.5],
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [
              { translate: this.props.scoreTextPosition ? [0, -0.1, -1] : [-1, 1, -2] },
              { rotateX: this.props.scoreTextPosition ? 0 : 10 },
              { rotateY: this.props.scoreTextPosition ? 0 : 10 }
            ]
          }}>
          score: {this.props.score} m
        </Text>
      </View>
    );
  }
}