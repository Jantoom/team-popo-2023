
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React, { cloneElement } from "react";
import { ImageBackground } from 'react-native';
import { StyleService, Colors } from '../../services/StyleServices';
import { TextInput } from 'react-native';
import NavigationService from '../../services/navigationService';
import DimensionService from '../../services/dimensionService';

export default class HomePage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            buttonsWidth: "46%"
        }

        this.onOrientationChange = () => {
            orient = DimensionService.getOrientation()

            if (orient == "vertical") {
                this.setState({buttonsWidth: "46%"})
            } else {
                this.setState({buttonsWidth: "21%"})
            }
        }
    }

    componentDidMount() {
        this.onOrientationChange()
        DimensionService.addListener(this.onOrientationChange)

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
                        <Text style={{marginBottom:5, fontFamily:"B612"}}>POINTS</Text>
                        <Text style={{alignSelf:'center', fontSize:50, fontFamily:"B612", letterSpacing:5}}>1094</Text>
                    </View>

                    <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:5, padding:8}}>
                        <Text style={{marginBottom:5, marginTop:5, marginLeft:5, fontFamily:"B612"}}>QUICK START</Text>
                        <View style={{display:"flex", flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableHighlight onPress={() => NavigationService.navigate("camera")} style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:this.state.buttonsWidth, aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1, backgroundColor:"white", borderRadius: 5}}>
                                    <Image style={{flex:1,width:"100%", height:"100%", alignSelf:'center'}} source={require("../../assets/parking-violation.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => NavigationService.navigate("camera")} style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:this.state.buttonsWidth, aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1, backgroundColor:"white", borderRadius: 5}}>
                                    <Image style={{flex:1,width:"100%", height:"100%", alignSelf:'center'}} source={require("../../assets/traffic-light-violation.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => NavigationService.navigate("camera")} style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:this.state.buttonsWidth, aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1, backgroundColor:"white", borderRadius: 5}}>
                                    <Image style={{flex:1,width:"100%", height:"100%", alignSelf:'center'}} source={require("../../assets/aggressive-driving.png")}></Image>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => NavigationService.navigate("camera")} style={{backgroundColor:"white", alignContent:'center', alignSelf:'center', width:this.state.buttonsWidth, aspectRatio:0.9, margin:"2%", borderRadius:5}}>
                                <View style={{flex:1, backgroundColor:"white", borderRadius: 5}}>
                                    <Image style={{flex:1,width:"100%", height:"100%", alignSelf:'center'}} source={require("../../assets/littering.png")}></Image>
                                </View>
                            </TouchableHighlight>
                        </View>             
                    </View>
                </ScrollView>
            </View>
        );
    }
}