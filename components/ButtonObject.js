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

export default class ButtonObject extends React.Component {
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
        <VrButton
          onClick={() => this.click()}
          onEnter={() => this.enter()}
          onExit={() => this.exit()}
          style={{
            position: 'absolute',
            width: 1.5,
            height: 0.6,
            borderRadius: 0.2,
            backgroundColor: '#134A9E',
            layoutOrigin: [0.5, 0.5],
            textAlign: 'center',
            textAlignVertical: 'center',
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
            {this.props.buttonLabel}
          </Text>
        </VrButton>
      </View>
    )
  }
}