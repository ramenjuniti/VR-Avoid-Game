import React from 'react';
import { View, Text } from 'react-vr';

export default class CountDownObject extends React.Component {
  render() {
    return (
      <View>
        {
          this.props.startCount <= 0 ?
            <View></View>
            :
            <Text
              style={{
                position: 'absolute',
                color: '#FD9727',
                fontSize: 0.8,
                fontWeight: 300,
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{ translate: [0, 0, -3] }],
              }}>
              {this.props.startCount}
            </Text>
        }
      </View>
    )
  }
}