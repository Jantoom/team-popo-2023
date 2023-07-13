
import { ScrollView, View, Image, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import React from "react";
import { StyleService, Colors } from '../../services/StyleServices';
import NavigationService from '../../services/navigationService';
import DimensionService from '../../services/dimensionService';
import APIService from '../../services/restAPIService';

export default class HomePage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            buttonsWidth: "46%",
            reportHistoryLoaded: false,
            reportHistory: [],
            reportHistorySize: 0,
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
        APIService.getReportHistory().then((res) => {
            if (res["success"] === true) {
                this.setState({
                    reportHistoryLoaded: true,
                    reportHistory: res["reportHistory"]["violations"]
                })

            } else {
                this.setState(
                    {
                        reportHistoryLoaded: true,
                        reportHistorySize: 0
                    }
                )
            }
        })
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
                    <View style={{backgroundColor:"#DEE9FF", margin:20, borderRadius:5, padding:20, paddingBottom:10}}>
                        <Text style={{marginBottom:5, fontFamily:"B612"}}>PENDING REPORTS</Text>
                    {
                        this.state.reportHistoryLoaded === true  ? (
                        <>
                        {
                            this.state.reportHistory.length > 0 ?
                            this.state.reportHistory.map((violation) => {
                                return (
                                    <View key={violation.id} style={{padding:10, backgroundColor: "white", marginBottom:10, borderRadius:10}}>
                                        <View style={{display:"flex", flexDirection:"row"}}>
                                            {violation.uri === "" ? (
                                                <Image source={require("../../assets/gallery.png")} style={{width:"25%", aspectRatio:1, borderRadius:5, marginRight:5, alignSelf:"center"}}></Image>
                                            ) : (
                                                <Image source={{uri: violation.uri}} style={{width:"25%", aspectRatio:0.7, maxHeight:100, maxWidth: 100, borderRadius:5, marginRight:5, alignSelf:'center'}}></Image>
                                            )}
                                            
                                            <View style={{flex:1}}>
                                                <Text style={{fontFamily:"B612", fontSize:15, fontWeight:'bold'}}>{violation.date_created}</Text>                                                
                                                <Text style={{fontFamily:"B612", fontSize:13}}>Status: {violation["status"]}</Text>

                                                {violation["extra_comments"] !== "" ? (
                                                    <Text numberOfLines={2} style={{fontFamily:"B612", fontSize:13}}>{violation["extra_comments"]}</Text>
                                                ) : <></>}
                                                <Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            : (<Text style={{alignSelf:'center', marginVertical:10, fontSize:13}}>No Reports</Text>)
                        }</>
                    
                        ) : (<ActivityIndicator size="large" />)
                    }
                    </View>
                    
                </ScrollView>
            </View>
        );
    }
}