import * as React from "react";
import { TextInput, Button } from "react-native";
import { ImageBackground, StyleSheet, View } from "react-native";

/* border radiuses */
export const Border = {
    br_9xs: 4,
  };

  export const Color = {
    white: "#fff",
  };

export default class LoginPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.androidLarge1}>
              <View style={styles.logoParent}>
                <ImageBackground
                  style={styles.logoIcon}
                  resizeMode="center"
                  source={require("../../assets/logo.png")}
                />
                <View style={styles.login}>
                  <TextInput
                    style={[styles.usernameInput, styles.inputLayout]}
                    label="Username"
                    mode="flat"
                    placeholderTextColor="#212121"
                    theme={{
                      fonts: { regular: { fontFamily: "Exo", fontWeight: "Regular" } },
                      colors: { text: "#212121" },
                    }}
                  />
                  <TextInput
                    style={[styles.passwordInput, styles.inputLayout]}
                    label="Password"
                    mode="flat"
                    placeholderTextColor="#212121"
                    theme={{
                      fonts: { regular: { fontFamily: "Exo", fontWeight: "Regular" } },
                      colors: { text: "#212121" },
                    }}
                  />
                  <View
                    style={[styles.forgotPasswordParent, styles.loginButtonFlexBox]}
                  >
                    <Button
                      title="Forgot Password?"
                      mode="elevated"
                      labelStyle={styles.forgotPasswordBtn}
                    >
                      Forgot Password?
                    </Button>
                    <Button
                      style={[styles.loginButton, styles.loginButtonFlexBox]}
                      title="Login"
                      mode="contained"
                      labelStyle={styles.loginButtonBtn}
                      contentStyle={styles.loginButtonBtn1}
                    >
                      Login
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    forgotPasswordBtn: {
      color: "#000",
      fontSize: 14,
      fontFamily: "Exo_regular",
    },
    loginButtonBtn: {
      color: "#fff",
      fontSize: 18,
      fontFamily: "Roboto_regular",
    },
    loginButtonBtn1: {
      paddingHorizontal: 0,
      paddingVertical: 14,
      borderRadius: 6,
      height: 48,
    },
    inputLayout: {
      height: 48,
      borderWidth: 1,
      borderColor: "#212121",
      borderStyle: "solid",
      borderRadius: Border.br_9xs,
      marginLeft: -148,
      left: "50%",
      position: "absolute",
      width: 296,
    },
    loginButtonFlexBox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logoIcon: {
      width: 284,
      height: 284,
    },
    usernameInput: {
      top: 0,
    },
    passwordInput: {
      top: 62,
      overflow: "hidden",
    },
    loginButton: {
      width: 148,
      marginLeft: 24,
      overflow: "hidden",
    },
    forgotPasswordParent: {
      marginLeft: -142,
      top: 124,
      left: "50%",
      position: "absolute",
      flexDirection: "row",
    },
    login: {
      height: 172,
      marginTop: 43,
      width: 296,
      overflow: "hidden",
    },
    logoParent: {
      width: 360,
      paddingHorizontal: 32,
      paddingVertical: 120,
      overflow: "hidden",
      alignItems: "center",
      backgroundColor: Color.white,
    },
    androidLarge1: {
      flex: 1,
      width: "100%",
      height: 800,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Color.white,
    },
  });


