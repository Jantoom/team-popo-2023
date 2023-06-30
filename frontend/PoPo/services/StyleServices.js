import { StyleSheet, Platform, StatusBar } from "react-native";

/**
 * Service for accessing the stylesheet.
 */
export class StyleService {
    /**
     * Style sheet for playback components.
     */
    static main = StyleSheet.create({
        outerContainer: {
            flex: 1,
            alignContext: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        navButtonImage: {
          height:"50%",
          width:'100%',
          resizeMode:'center'
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