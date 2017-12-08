import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';

import Start from './components/Start';
import VrGame from './components/VrGame';

export default class VR_Avoid_Game extends React.Component {
  constructor() {
    super();
    this.state = {
      game: false
    }
  }

  gameStart() {
    this.state.game ?
      this.setState({ game: false })
      :
      this.setState({ game: true })
  }

  render() {
    return (
      <View>
        {
          this.state.game ?
            <VrGame gameStart={() => this.gameStart()} />
            :
            <Start gameStart={() => this.gameStart()} />
        }
      </View>
    );
  }
};

AppRegistry.registerComponent('VR_Avoid_Game', () => VR_Avoid_Game);
