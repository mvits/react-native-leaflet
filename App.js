/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//
// import React from 'react';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';

export default class App extends Component {
  //
  //
  // serverStart() {
  //   this.server.start();
  // }
  path = RNFS.DocumentDirectoryPath + '/www';
  server = new StaticServer(8080, this.path);
  state = {
    url: null,
  };
  file = 'index.html';

  moveAndroidFiles() {
    RNFS.mkdir(RNFS.DocumentDirectoryPath + '/www');
    this.files = ['www/index.html'];
    // this.files.forEach(async file => {
    RNFS.copyFileAssets(
      'www/index.html',
      RNFS.DocumentDirectoryPath + '/' + 'www/index.html',
    );
    // });
  }
  render() {
    // this.serverStart();
    // isRunning = this.server.isRunning();
    this.moveAndroidFiles();

    this.server.start().then(url => {
      this.setState({url});
    });

    // this.server.start();
    //
    // console.log('stiv');
    // console.log(this.path);
    // console.log(this.server);
    console.log(`${this.state.url}/${this.file}`);
    return (
      <SafeAreaView>
        <View style={{height: '100%', width: '100%'}}>
          <WebView
            source={{uri: `${this.state.url}/${this.file}`}}
            style={{marginTop: 20}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
