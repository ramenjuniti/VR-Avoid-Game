import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  VrHeadModel,
  Animated,
  Sound
} from 'react-vr'

import CountDownObject from './CountDownObject';
import RoadObject from './RoadObject';
import GameOverObject from './GameOverObject';
import ScoreObject from './ScoreObject';
import Start from './Start';

const Easing = require("Easing");

export default class VrGame extends React.Component {
  constructor() {
    super();

    //ヘッドセット使っているかどうかを判定
    const vrHeadSet = VrHeadModel.inVR() ? 2 : 1;

    this.state = {
      start: setInterval(() => this.onStart(), 3000),

      startCount: 3,
      startCountDown: setInterval(() => this.countDown(), 1000),

      //ヘッドセットであればz軸で値を取得し、そうでなければy軸で値を取得する
      headPosition: VrHeadModel.rotation()[vrHeadSet],
      //頭の位置の値を常に監視する
      updateRotate: null,

      //障害物の取り得るx座標
      boxPosition: [-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25],

      /*
      アニメーションで動かす床と障害物のz座標の初期値
      床のオブジェクトは、様々な軸で回転させているため
      床のオブジェクトのx座標が相対的にプレイヤーから見たz座標となる
      */
      planeX: new Animated.Value(50),
      boxZ: new Animated.Value(-50),
      boxX: [-10, -5, 0, 5, 10],

      //アニメーションを繰り返し、毎回障害物のx座標をランダムに変更する
      front: null,

      //5つの障害物に当たったかどうかを判定を常に監視
      judgeCollision: null,

      gameOverTextDisplay: false,
      collisionSound: false,
      avoidSound: false,

      score: 0,
      scoreTextPosition: false,
      scoreInterval: null
    }
  }

  onStart() {
    const vrHeadSet = VrHeadModel.inVR() ? 2 : 1;
    this.randomBoxPosition(this.state.boxPosition);
    this.animatedFront();
    this.scoreCounter()
    this.setState({
      updateRotate: setInterval(() => this.setRotate(vrHeadSet), 0),
      front: setInterval(() => {
        this.randomBoxPosition(this.state.boxPosition);
        this.animatedFront();
        this.setState({ avoidSound: false })
      }, 2000),
      judgeCollision: setInterval(() => {
        this.state.boxX.map((i) => (
          this.collision(i + (this.state.headPosition / 2), this.state.boxZ._value)
        ))
      }, 0),
      scoreInterval: setInterval(() => this.scoreCounter(), 40)
    })
    clearInterval(this.state.start);
  }

  countDown() {
    if (this.state.startCount === 0) {
      clearInterval(this.state.startCountDown);
    }
    this.setState({
      startCount: this.state.startCount - 1
    })
  }

  //boxのx座標をランダムに決める
  randomBoxPosition(arr) {
    // 配列の中身をシャッフルする
    for (let i = arr.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[rand]] = [arr[rand], arr[i]]
    }
    this.setState({
      // 5つの障害物のx座標の値をboxXに入れる
      boxX: this.state.boxX.map((e, i) => (
        e = arr[i]
      ))
    });
  }

  //頭の位置の値を取得し、stateに設定する
  setRotate(axis) {
    if (-30 < VrHeadModel.rotation()[axis] || VrHeadModel.rotation()[axis] < 30) {
      this.setState({
        headPosition: VrHeadModel.rotation()[axis]
      })
    }
  }

  //プレイヤー以外のオブジェクトを動かすアニメーション
  animatedFront() {
    this.setState({
      planeX: new Animated.Value(50),
      boxZ: new Animated.Value(-50)
    });
    Animated.parallel([
      Animated.timing(this.state.planeX, {
        toValue: -50,
        duration: 2000,
        easing: Easing.linear
      }),
      Animated.timing(this.state.boxZ, {
        toValue: 50,
        duration: 2000,
        easing: Easing.linear
      })
    ]).start();
  }

  //障害物に当たったかどうかを判定し、当たればインターバルを止める
  collision(x, y) {
    let distance = Math.pow(x, 2) + Math.pow(y, 2);
    if (6.25 <= distance && distance <= 25) {
      this.setState({ avoidSound: true })
    }
    if (distance < 6.25) {
      this.state.boxZ.stopAnimation();
      clearInterval(this.state.front);
      clearInterval(this.state.judgeCollision);
      clearInterval(this.state.updateRotate);
      clearInterval(this.state.scoreInterval);
      this.setState({
        gameOverTextDisplay: true,
        collisionSound: true,
        scoreTextPosition: true
      });
    }
  }

  // スコアカウンター
  scoreCounter() {
    this.setState({
      score: this.state.score + 1
    });
  }

  render() {
    return (
      <View>
        <Sound
          source={{ mp3: asset('game_BGM.mp3') }}
          loop={true}
        />
        <CountDownObject
          startCount={this.state.startCount}
        />
        <RoadObject
          headPosition={this.state.headPosition}
          planeX={this.state.planeX}
          boxX={this.state.boxX}
          boxZ={this.state.boxZ}
          front={this.state.front}
          judgeCollision={this.state.judgeCollision}
          collisionSound={this.state.collisionSound}
          avoidSound={this.state.avoidSound}
        />
        <GameOverObject
          gameOverTextDisplay={this.state.gameOverTextDisplay}
          gameStart={() => this.props.gameStart()}
        />
        <ScoreObject
          score={this.state.score}
          scoreTextPosition={this.state.scoreTextPosition}
        />
      </View>
    )
  }
}
