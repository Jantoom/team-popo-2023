import React from 'react';
import { NavigationComponent } from './navigationComponent';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { StyleService, Colors } from '../services/StyleServices';
import NavigationService from '../services/navigationService.js';
import { ScrollView } from 'react-native';

/**
 * Component that defines the shared layout between all screens. Implement
 * navigation menus here.
 */
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Renders the layout.
     */
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.main.background}}>
                <NavigationComponent style={{flex: 1}}/>
                <View style={{alignSelf:'flex-end', justifyContent:'center', display:'flex', flexDirection:'row', backgroundColor:Colors.main.navBackground, height:"6%", paddingHorizontal:"4%", minHeight:50}}>
                    <TouchableOpacity style={StyleService.main.navButton} onPress={() => NavigationService.navigate("home")}>
                        <Image resizeMode="center" source={require("../assets/home.png")} style={StyleService.main.navButtonImage}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleService.main.navButton} onPress={() => NavigationService.navigate("camera")}>
                        <Image resizeMode="center" source={require("../assets/camera.png")} style={StyleService.main.navButtonImage}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleService.main.navButton} onPress={() => NavigationService.navigate("profile")}>
                        <Image resizeMode="center" source={require("../assets/profile.png")} style={StyleService.main.navButtonImage}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}