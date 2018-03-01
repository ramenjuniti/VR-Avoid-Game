import React from 'react';
import { asset, Plane, View, Animated } from 'react-vr';

export default class PlaneObject extends React.Component {

  render() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          transform: [
            { translate: [0, -2, 0] },
            { rotateX: -90 },
            { rotateZ: 90 },
            { translateX: this.props.planeX }
          ]
        }}
      >
        <Plane
          texture={asset('road.jpg')}
          dimWidth={500}
          dimHeight={60}
        />
      </Animated.View>
    );
  }
}