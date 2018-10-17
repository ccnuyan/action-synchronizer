import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TextInput,
  Button
} from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import { startGetUserRepos, setAuth } from "../root/actions";
import { authSelector, reposSelector } from "../root/selectors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

export class Home extends Component {
  onSubmitClick = e => {
    this.props.startGetUserRepos();
  };

  onUsernameInputChange = username => {
    const { auth } = this.props;
    this.props.setAuth({ ...auth, username });
  };

  onWebViewMessage(event) {
    console.log("Message from WebView:");
    console.log(event.nativeEvent.data);
  }

  onRepoPressed(r) {}

  render() {
    const { auth, repos } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ padding: 10, paddingTop: 30 }}>
          <Text>This is Native Host</Text>
          <TextInput
            onChangeText={this.onUsernameInputChange}
            value={auth.username}
            style={{ height: 30, marginTop: 10 }}
            placeholder="github username"
          />
          <Button
            style={{ marginBottom: 10 }}
            title={"Submit"}
            onPress={this.onSubmitClick}
          />
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
          originWhitelist={["*"]}
          onMessage={this.onWebViewMessage}
          style={{
            height: 300,
            margin: 10,
            borderColor: "#333333",
            borderWidth: 1
          }}
          source={{ uri: "http://192.168.3.83:3000/auth.html" }}
        />
        <WebView
          originWhitelist={["*"]}
          onMessage={this.onWebViewMessage}
          style={{
            height: 300,
            margin: 10,
            borderColor: "#333333",
            borderWidth: 1
          }}
          source={{ uri: "http://192.168.3.83:3000/business.html" }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: authSelector(state),
  repos: reposSelector(state)
});

const mapDispatchToProps = d => ({
  startGetUserRepos: () => d(startGetUserRepos()),
  setAuth: auth => d(setAuth(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
