import { StyleSheet, Platform, StatusBar } from "react-native";


/**
 * Defines the colour palette used by the app.
 */
export class Colors {
  /**
   * Primary colour tones
   */
  static main = {
    background: "white",
    textColor: "black",
    navBackground: "#A3BFF4",
    navBackgroundSelected: "#A3BFF4"
  }
}

/**
 * Service for accessing the stylesheet.
 */
export class StyleService {
    /**
     * Style sheet for playback components.
     */
    static main = StyleSheet.create({
        backgroundImage: {
          alignSelf:'center',
          flex: 1,
          position:'absolute',
          width:"100%",
          resizeMode:"contain"
          
        },
        outerContainer: {
            flex: 1,
            backgroundColor: 'black',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        outerContainerNoPad: {
          flex: 1,
          backgroundColor: 'black',
      },
        buttonContainer: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'transparent',
          margin: 64,
        },
        navButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent:'center',
        },
        activeNavButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent:'center',
          backgroundColor: "#6C9AF0"
        },
        navButtonImage: {
          height:"50%",
          width:'100%',
          resizeMode:'contain',
          tintColor:"#808080",
        },
        cameraButton: {
          backgroundColor:'transparent',
          width:"25%",
          borderRadius:100,
          aspectRatio:1,
          alignSelf:'center',
          marginBottom:"5%",
          borderColor:"white",
          borderWidth:5,
          marginHorizontal:20
        },
        text: {
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
        },
        image: {
          wdith: 50,
          height: 50,
          backgroundColor: '#0553',
          maxWidth: 50,
        },
        galleryContainer: {
          flex: 1
        },
        rowFlexContainer: {

        }
    });

}