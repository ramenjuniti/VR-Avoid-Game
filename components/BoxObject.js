import React from 'react';
import { asset, Box, View, Animated, Sound, Text } from 'react-vr';

export default class BoxObject extends React.Component {

  render() {
    return (
      <Animated.View
        style={{
          layoutOrigin: [2.5, 2.5],
          transform: [
            { translate: [this.props.boxX, 1, 0] },
            { translateZ: this.props.boxZ }
          ]
        }}
      >
        <Box
          texture={asset('box_texture.jpg')}
          dimWidth={5}
          dimDepth={5}
          dimHeight={5}
        >
          {
            this.props.collisionSound ?
              <Sound
                source={asset('collision.mp3')}
                volume={3}
              />
              :
              <View></View>
          }
        </Box>
      </Animated.View>
    );
  }
}

