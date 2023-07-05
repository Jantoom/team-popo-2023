
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React, { cloneElement } from "react";
import { ImageBackground } from 'react-native';
import { StyleService, Colors } from '../../services/StyleServices';
import { TextInput } from 'react-native';

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

                <ScrollView style={{marginTop:20}}>
                <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:15, padding:20}}>
                    <Text style={{marginBottom:20, fontFamily:"B612"}}>ACCOUNT INFORMATION</Text>
                    <View style={{display:"flex", flexDirection:'row', alignItems:'center', marginBottom:10}}>
                        <Text style={{color:Colors.main.textColo, fontFamily:"B612"}}>Name: </Text>
                        <TextInput backgroundColor={"red"} style={{marginRight:10, backgroundColor: Colors.main.background, color:Colors.main.textColor, paddingHorizontal:8, borderRadius:10, flex:1}}>Kelly Luo</TextInput>
                        <TouchableHighlight style={{flex:1, backgroundColor:"#A3BFF4", borderRadius:5, height:"100%", alignItems:'center'}}><Text style={{flex:1, textAlignVertical:'center'}}>Edit Profile</Text></TouchableHighlight>
                    </View>
                    <View style={{display:"flex", flexDirection:'row', alignItems:'center', marginBottom:10}}>
                        <Text style={{color:Colors.main.textColor, fontFamily:"B612"}}>Email:  </Text>
                        <TextInput backgroundColor={"red"} style={{backgroundColor: Colors.main.background, color:Colors.main.textColor, paddingHorizontal:8, borderRadius:10, flex:1}}>example@uqconnect.edu.au</TextInput>
                    </View>

                    <View style={{display:"flex", flexDirection:'row', alignItems:'center', marginBottom:10}}>
                        <Text style={{color:Colors.main.textColor, fontFamily:"B612"}}>Phone: </Text>
                        <TextInput backgroundColor={"red"} style={{backgroundColor: Colors.main.background, color:Colors.main.textColor, paddingHorizontal:8, borderRadius:10, flex:1}}>13009461296 (call me)</TextInput>
                    </View>
                    <View style={{display:"flex", flexDirection:'row', alignItems:'center', alignContent:'center'}}>
                        <Text style={{color:Colors.main.textColor, fontSize:17, fontFamily:"B612"}}>POINTS: </Text>
                        <Text style={{fontSize:25, fontFamily:"B612"}}>1094</Text>
                    </View>
                </View>

                <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:15, padding:20}}>
                    <Text style={{marginBottom:20, fontFamily:"B612"}}>SPEND YOUR POINTS</Text>
                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#DEE9FF", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>$3 </Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Parking Voucher</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#DEE9FF", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>$3</Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Supermarket Voucher</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#DEE9FF", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>$3 </Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Weixin Credit</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#DEE9FF", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>$3 </Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Meituan Voucher</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#B4CDFF", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>$5 </Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Meituan Voucher</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{backgroundColor: Colors.main.background, padding:5, borderRadius:5, marginBottom: 10}}>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <View style={{backgroundColor:"#DADADA", padding:10, marginHorizontal:10, borderRadius:5}}>
                                <Text style={{fontSize:15}}>???</Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:15}}>Mystery Coupon</Text>
                        </View>
                    </TouchableHighlight>
                    
                </View>
                </ScrollView>
            </View>
        );
    }
}