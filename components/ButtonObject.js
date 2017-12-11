import React from 'react';
import {
  AppRegistry,
  View,
  Pano,
  asset,
  Text,
  VrButton,
  VrHeadModel,
  Animated,
  VrSoundEffects
} from 'react-vr';

const Easing = require("Easing");

export default class ButtonObject extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonZ: new Animated.Value(-2),
      buttonY: new Animated.Value(-0.8)
    }
    this.focusClick = this.focusClick.bind(this);
    VrSoundEffects.load({
      mp3: asset("button.mp3")
    });
  }

  enter() {
    this.timeout = setTimeout(this.focusClick, 1000);
    this.animation = Animated.parallel([
      this.moveButton()
    ]);
    this.animation.start();
  }

  exit() {
    clearTimeout(this.timeout);
    this.clearAnimation();
    this.animation = Animated.parallel([
      this.backButton()
    ]);
    this.animation.start();
  }

  click() {
    clearTimeout(this.timeout);
    this.clearAnimation();
    VrSoundEffects.play({
      mp3: asset("button.mp3")
    });
    this.props.gameStart();
  }

  focusClick() {
    clearTimeout(this.timeout);
    this.clearAnimation();
    VrSoundEffects.play({
      mp3: asset("button.mp3")
    });
    this.props.gameStart();
  }

  timerReset() {
    if (!this.timeout) {
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  clearAnimation() {
    if (!this.animation) {
      return;
    }
    this.animation.stop();
    this.animation = null;
  }

  moveButton() {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.buttonZ, {
          duration: 500,
          toValue: -1,
        }),
        Animated.timing(this.state.buttonY, {
          duration: 500,
          toValue: -0.5,
        }),
      ])
    ]);
  }

  backButton() {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.buttonZ, {
          duration: 500,
          toValue: -2,
        }),
        Animated.timing(this.state.buttonY, {
          duration: 500,
          toValue: -0.8,
        }),
      ])
    ]);
  }

  render() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          transform: [
            { translateZ: this.state.buttonZ },
            { translateY: this.state.buttonY }
          ]
        }}
      >
        <VrButton
          onClick={() => this.click()}
          onEnter={() => this.enter()}
          onExit={() => this.exit()}
          style={{
            position: 'absolute',
            width: 1.5,
            height: 0.6,
            borderRadius: 0.2,
            backgroundColor: '#159587',
            layoutOrigin: [0.5, 0.5],
            transform: [
              { translate: [0, -0.8, -2] },
              { rotateX: -10 }
            ]
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
      </Animated.View>
    )
  }
}