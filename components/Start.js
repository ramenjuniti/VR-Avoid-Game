import React from 'react';
import PropTypes from 'prop-types';

import {
  AppRegistry,
  View,
  Pano,
  asset,
  Text,
  VrButton,
  VrHeadModel
} from 'react-vr';


export default class Start extends React.Component {
  render() {
    return (
      <View>
        <Pano
          source={asset("Pano.jpg")}
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 0.5,
            padding: 0.1,
            borderRadius: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            backgroundColor: '#607D8B',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 1, -3] }]
          }}
        >
          Avoid Game
        </Text>
        <Text
          style={{
            position: 'absolute',
            fontSize: 0.2,
            textAlign: 'center',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          ゲーム内では
          {"\n"}
          {VrHeadModel.inVR() ?
            "首を左右に傾けることで\n移動することができます"
            :
            "視点を左右に動かすことで\n移動することができます"
          }
        </Text>
        <VrButton
          onClick={() => this.props.gameStart()}
          style={{
            position: 'absolute',
            width: 1.5,
            borderRadius: 0.2,
            backgroundColor: '#009688',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, -1, -3] }]
          }}
        >
          <Text
            style={{
              fontSize: 0.5,
              textAlign: 'center',
              textAlignVertical: 'center'
            }}
          >
            Start
          </Text>
        </VrButton>
      </View>
    );
  }
}