import React from 'react';
import { NavigationComponent } from './navigationComponent';
import { TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { StyleService, Colors, Fonts } from '../services/StyleServices';
import NavigationService from '../services/navigationService.js';
import DimensionService from '../services/dimensionService';

/**
 * Component that defines the shared layout between all screens. Implement
 * navigation menus here.
 */
export default class MainLayout extends React.Component {
    static mainLay = undefined

    constructor(props) {
        super(props);
        MainLayout.mainLay = this

        this.state = {
            padTop: true,
            reportImage: "none",
            activeNavButton: "home",
            hideNav: false,
            navBorderRad: 30,
            debug: 1,

            reportHistory: []
        }
    }

    async componentDidMount() {
        if (!await Fonts.ready()) {
            console.log("Error Loading Fonts")
        }

        DimensionService.initEventListener()
    }

    /**
     * Renders the layout.
     */
    render() {
        return (
            <SafeAreaView style={this.state.padTop === true && false ? StyleService.main.outerContainer : StyleService.main.outerContainerNoPad}>
                <View style={{flex: 1, backgroundColor: Colors.main.background}}>
                    <NavigationComponent style={{flex: 1}}/>
                        {this.state.hideNav == false ? (
                            <View style={{borderTopLeftRadius: this.state.navBorderRad, borderTopRightRadius: this.state.navBorderRad, alignSelf:'flex-end', justifyContent:'center', display:'flex', flexDirection:'row', backgroundColor:Colors.main.navBackground, height:"6%", minHeight:50}}>
                                <TouchableOpacity
                                style={this.state.activeNavButton == "home" ? StyleService.main.activeNavButton : StyleService.main.navButton}
                                onPress={() => NavigationService.navigate("home")}>
                                    <Image resizeMode="center" source={require("../assets/home.png")} style={StyleService.main.navButtonImage}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={this.state.activeNavButton == "camera" || this.state.activeNavButton == "report" || this.state.activeNavButton == "gallery" ? StyleService.main.activeNavButton : StyleService.main.navButton}
                                onPress={() => NavigationService.navigate("camera")}>
                                    <Image resizeMode="center" source={require("../assets/camera.png")} style={StyleService.main.navButtonImage}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={this.state.activeNavButton == "profile" ? StyleService.main.activeNavButton : StyleService.main.navButton}
                                onPress={() => NavigationService.navigate("profile")}>
                                    <Image resizeMode="center" source={require("../assets/profile.png")} style={StyleService.main.navButtonImage}></Image>
                                </TouchableOpacity>
                            </View>
                    ) : <></>}
                    
                </View>
            </SafeAreaView>
            
        )
    }
}