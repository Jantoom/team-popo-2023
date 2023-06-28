import { StyleSheet } from 'react-native';

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
            backgroundColor: 'transparent'
        },
        container: {
            flex: 1,
            justifyContent: 'center',
          },
        camera: {
           flex: 1,
        },
        buttonContainer: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'transparent',
          margin: 64,
        },
        button: {
          flex: 1,
          alignSelf: 'flex-end',
          alignItems: 'center',
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