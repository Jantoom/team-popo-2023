import React from 'react';
import { NavigationComponent } from './navigationComponent';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { StyleService } from '../services/StyleServices';
import NavigationService from '../services/navigationService.js';

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
            <View style={{flex: 1, backgroundColor: "black"}}>
                <NavigationComponent style={{flex: 1}}/>
                <View style={{alignSelf:'flex-end', minHeight:50, justifyContent:'center', display:'flex', flexDirection:'row', flex:1, backgroundColor:"#1e1e1e", borderTopLeftRadius:22, borderTopRightRadius: 22, flex:1, maxHeight:"6%", paddingHorizontal:"4%", marginTop:5}}>
                        <TouchableOpacity style={StyleService.main.button} onPress={() => NavigationService.navigate("home")}>
                            <Image source={require("../assets/home.png")} style={{height:"60%", resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleService.main.button} onPress={() => NavigationService.navigate("camera")}>
                        <Image source={require("../assets/camera.png")} style={{height:"60%", resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleService.main.button} onPress={() => NavigationService.navigate("gallery")}>
                            <Image source={require("../assets/profile.png")} style={{height:"60%", resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}