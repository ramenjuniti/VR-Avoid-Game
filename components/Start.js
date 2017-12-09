import React from 'react';
import {
  AppRegistry,
  View,
  Pano,
  asset,
  Text,
  VrButton,
  VrHeadModel,
} from 'react-vr';

import ButtonObject from './ButtonObject';

export default class Start extends React.Component {
  constructor() {
    super();
    this.focusClick = this.focusClick.bind(this);
  }

  enter() {
    this.timeout = setTimeout(this.focusClick, 1000);
  }

  exit() {
    clearTimeout(this.timeout);
  }

  click() {
    clearTimeout(this.timeout);
    this.props.gameStart();
  }

  focusClick() {
    clearTimeout(this.timeout);
    this.props.gameStart();
  }

  timerReset() {
    if (!this.timeout) {
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  render() {
    return (
      <View>
        <Pano
          source={asset("Pano.jpg")}
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 0.7,
            padding: 0.1,
            borderRadius: 0.2,
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
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          ゲーム内では
          {"\n"}
          {VrHeadModel.inVR() ?
            "首を左右に傾けることで\n移動することができます\n"
            :
            "視点を左右に動かすことで\n移動することができます\n"
          }
          {"\n"}
          ボタンに視点合わせるとクリックできます
        </Text>
        <ButtonObject
          buttonLabel={'Start'}
          gameStart={this.props.gameStart}
        />
      </View>
    );
  }
}