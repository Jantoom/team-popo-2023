import * as React from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
//import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";

/**
 * Needs to be moved into a global styles
 */
/* fonts */
export const FontFamily = {
  button: "Roboto_medium",
  b612Regular: "B612_regular",
  body2: "Roboto_regular",
  openSansSemibold: "Open Sans_semibold",
  sansationBold: "Sansation_bold",
  exoRegular: "Exo_regular",
};
/* font sizes */
export const FontSize = {
  body2_size: 14,
  size_lg: 18,
  size_mid: 17,
};
/* Colors */
export const Color = {
  white: "#fff",
  lavender: "#dee9ff",
  grey800: "#212121",
  bDBDBD: "#a3bff4",
  black: "#000",
};
/* Paddings */
export const Padding = {
  p_xs: 12,
  p_3xs: 10,
  p_9xs: 4,
};
/* border radiuses */
export const Border = {
  br_9xs: 4,
  br_8xs: 5,
};

export default class DashboardPage extends React.Component {
  /**
   * Instantiates the component.
   * @param {object} props Properties
   */
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <View style={[styles.homeScreen, styles.homeFlexBox]}>
        <View style={[styles.homeScreenFrame, styles.homeFlexBox]}>
          <View style={[styles.nonNavBar, styles.homeFlexBox]}>
            <View style={styles.menu}>
              <View style={[styles.imageHolder, styles.imageHolderPosition]}>
                <ImageBackground
                  style={[styles.imageHolder, styles.imageHolderPosition]}
                  resizeMode="cover"
                  source={require("../../assets/background_image.png")}
                />
              </View>
              <View style={[styles.menuWithoutLogo, styles.imageHolderPosition]}>
                <View style={[styles.points, styles.pointsSpaceBlock]}>
                  <View style={[styles.pointsFrame, styles.offencesFlexBox]}>
                    <Text style={[styles.points1, styles.points1FlexBox]}>
                      POINTS
                    </Text>
                  </View>
                  <View style={[styles.frame, styles.frameFlexBox]}>
                    <Text style={[styles.pointNumber, styles.points1FlexBox]}>
                      1004
                    </Text>
                  </View>
                </View>
                <View style={[styles.quickStart, styles.pointsSpaceBlock]}>
                  <Text style={styles.quickStart1}>QUICK START</Text>
                  <View style={[styles.offences, styles.offencesFlexBox]}>
                    <View style={styles.quickLayout}>
                      <Image
                        style={[styles.parkingViolationIcon, styles.iconLayout]}
                        contentFit="cover"
                        source={require("../../assets/parking-violation.png")}
                      />
                      <Image
                        style={[styles.aggressiveDrivingIcon, styles.iconLayout]}
                        contentFit="cover"
                        source={require("../../assets/aggressive-driving.png")}
                      />
                    </View>
                    <View style={[styles.rightQuickStart, styles.quickLayout]}>
                      <Image
                        style={[styles.parkingViolationIcon, styles.iconLayout]}
                        contentFit="cover"
                        source={require("../../assets/traffic-light-violation.png")}
                      />
                      <Image
                        style={[styles.litteringIcon, styles.iconLayout]}
                        contentFit="cover"
                        source={require("../../assets/littering.png")}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  homeFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageHolderPosition: {
    left: "50%",
    top: "50%",
  },
  pointsSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: Color.lavender,
    borderRadius: Border.br_9xs,
  },
  offencesFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  points1FlexBox: {
    textAlign: "center",
    color: Color.grey800,
    lineHeight: 16,
  },
  frameFlexBox: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  iconLayout: {
    height: 136,
    width: 132,
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  quickLayout: {
    height: 284,
    width: 132,
  },
  imageHolder: {
    marginTop: -180,
    marginLeft: -153,
    width: 306,
    height: 360,
    position: "absolute",
    top: "50%",
  },
  points1: {
    width: 122,
    fontFamily: FontFamily.button,
    fontWeight: "500",
    letterSpacing: 1,
    fontSize: FontSize.body2_size,
    textAlign: "center",
    alignSelf: "stretch",
  },
  pointsFrame: {
    height: 16,
  },
  pointNumber: {
    fontSize: 50,
    letterSpacing: 10,
    fontFamily: FontFamily.b612Regular,
    display: "flex",
    width: 213,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    overflow: "hidden",
  },
  points: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  quickStart1: {
    textAlign: "left",
    color: Color.grey800,
    lineHeight: 16,
    fontFamily: FontFamily.button,
    fontWeight: "500",
    letterSpacing: 1,
    fontSize: FontSize.body2_size,
  },
  parkingViolationIcon: {
    top: 0,
    left: 0,
    height: 136,
  },
  aggressiveDrivingIcon: {
    top: 148,
    left: 0,
    height: 136,
  },
  litteringIcon: {
    marginTop: 6,
    marginLeft: -66,
    left: "50%",
    top: "50%",
  },
  rightQuickStart: {
    marginLeft: 12,
  },
  offences: {
    marginTop: 7,
    overflow: "hidden",
    justifyContent: "center",
  },
  quickStart: {
    marginTop: 28,
  },
  menuWithoutLogo: {
    marginTop: -251.5,
    marginLeft: -150,
    position: "absolute",
    top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    height: 504,
    alignSelf: "center",
    width: "100%",
  },
  nonNavBar: {
    paddingHorizontal: "%",
    paddingTop: "20%",
    paddingBottom: "10%",
    alignSelf: "stretch",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  homeScreenFrame: {
    height: 740,
    overflow: "hidden",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  homeScreen: {
    backgroundColor: Color.white,
    display: "none",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
});
