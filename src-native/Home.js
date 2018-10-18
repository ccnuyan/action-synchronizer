import React, { Component } from 'react';
import { StyleSheet, Text, View, WebView, TextInput, Button } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { startGetUserRepos, setUsername } from '../root/actions';
import { usernameSelector } from '../root/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  }
});

import { synchronizer } from '../root/utility/getStore';

export class Home extends Component {
  onSubmitClick = e => {
    this.props.startGetUserRepos();
  };

  onUsernameInputChange = username => {
    this.props.setUsername(username);
  };

  onWebViewMessage(event) {
    let data = {};
    try {
      data = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.error(err);
    }

    if (data.type === 'sync_action') {
      console.log('action received from webview:');
      synchronizer.dispatch(data.action);
    } else {
      console.log('console message received from webview:');
      console.log(data);
    }
  }

  onRepoPressed(r) {}

  componentDidMount = () => {
    synchronizer.registerListerner('auth', this.webView1);
    synchronizer.registerListerner('business', this.webView2);
  };

  render() {
    const { username, repos } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ padding: 10, paddingTop: 30 }}>
          <Text style={{ fontSize: 20 }}>This is Native Host</Text>
          <TextInput onChangeText={this.onUsernameInputChange} value={username} style={{ height: 30, marginTop: 10 }} placeholder="github username" />
          <Button style={{ marginBottom: 10 }} title={'Submit'} onPress={this.onSubmitClick} />
          {_.take(_.values(repos), 3).map(r => {
            return (
              <Button
                onPress={() => {
                  this.onRepoPressed(r);
                }}
                color="#336699"
                key={r.id}
                title={r.name}
              />
            );
          })}
        </View>
        <WebView
          ref={e => {
            this.webView1 = e;
          }}
          originWhitelist={['*']}
          onMessage={this.onWebViewMessage}
          style={{
            height: 120,
            margin: 10,
            borderColor: '#333333',
            borderWidth: 1
          }}
          source={{ uri: 'http://192.168.3.83:3000/auth.html' }}
        />
        <WebView
          ref={e => {
            this.webView2 = e;
          }}
          originWhitelist={['*']}
          onMessage={this.onWebViewMessage}
          style={{
            height: 500,
            margin: 10,
            borderColor: '#333333',
            borderWidth: 1
          }}
          source={{ uri: 'http://192.168.3.83:3000/business.html' }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: usernameSelector(state)
});

const mapDispatchToProps = d => ({
  startGetUserRepos: () => d(startGetUserRepos()),
  setUsername: auth => d(setUsername(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
