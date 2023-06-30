
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React from "react";

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
            <View style={{display:"flex", flex:1, padding:10}}>
                <Text style={{fontSize:40, color:"white", alignSelf:'center'}}>Profile</Text>
            </View>
        );
    }
}