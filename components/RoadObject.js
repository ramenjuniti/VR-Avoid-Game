import React from 'react';
import { asset, Animated, View } from 'react-vr';

import BoxObject from './BoxObject';
import PlaneObject from './PlaneObject';

export default class RoadObject extends React.Component {

  render() {
    return (
      <View
        style={{
          transform: [
            { translateX: this.props.headPosition / 2 }
          ]
        }}
      >
        <PlaneObject planeX={this.props.planeX} />
        {
          this.props.boxX.map((e, i) => (
            <BoxObject
              key={i}
              boxX={e}
              boxZ={this.props.boxZ}
              front={this.props.front}
              judgeCollision={this.props.judgeCollision}
              collisionSound={this.props.collisionSound}
              avoidSound={this.props.avoidSound}
            />
          ))
        }
      </View>
    );
  }
}
