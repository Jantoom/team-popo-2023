
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React, { cloneElement } from "react";
import { ImageBackground } from 'react-native';
import { StyleService, Colors } from '../../services/StyleServices';
import { TextInput } from 'react-native';

export default class HomePage extends React.Component {
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
            <View style={{display:"flex", flex:1}}>
                <Image source={require("../../assets/background_image.png")} style={StyleService.main.backgroundImage}></Image>

                <ScrollView style={{paddingHorizontal:"2%"}}>
                    <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:5, padding:20, marginTop:70}}>
                        <Text style={{marginBottom:5}}>POINTS</Text>
                        <Text style={{alignSelf:'center', fontSize:50}}>1094</Text>
                    </View>

                    <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:5, padding:8}}>
                        <Text style={{marginBottom:5, marginTop:5, marginLeft:5}}>QUICK START</Text>
                        <View style={{display:"flex", flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableHighlight style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:"46%", aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1}}>
                                    <Image style={{flex:1,width:"100%", resizeMode:'contain', alignSelf:'center'}} source={require("../../assets/parking-violation.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:"46%", aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1}}>
                                    <Image style={{flex:1,width:"100%", resizeMode:'contain', alignSelf:'center'}} source={require("../../assets/traffic-light-violation.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:"46%", aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1}}>
                                    <Image style={{flex:1,width:"100%", resizeMode:'contain', alignSelf:'center'}} source={require("../../assets/aggressive-driving.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:"46%", aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1}}>
                                    <Image style={{flex:1,width:"100%", resizeMode:'contain', alignSelf:'center'}} source={require("../../assets/littering.png")}></Image>
                                </View>
                            </TouchableHighlight>
                        </View>             
                    </View>
                </ScrollView>
            </View>
        );
    }
}