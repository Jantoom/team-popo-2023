
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React from "react";
import { ImageBackground } from 'react-native';
import { StyleService, Colors } from '../../services/StyleServices';

export default class ProfilePage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={{display:"flex", flex:1,}}>
                <Image source={require("../../assets/background_image.png")} style={StyleService.main.backgroundImage}></Image>
                <Text style={{fontSize:40, color:"black", alignSelf:'center'}}>Profile</Text>
            </View>
        );
    }
}