
import { ScrollView, View, Image, Text, TouchableHighlight, Button, ImageBackground } from 'react-native';
import React from "react";
import {Picker} from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleService, Colors } from '../../services/StyleServices';
import NavigationService from '../../services/navigationService';
import APIService from '../../services/restAPIService';
import Spinner from 'react-native-loading-spinner-overlay';
import MainLayout from '../mainLayout';

export default class ReportPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            dropdownValue: "pv",
            extraComments: "",

            isLoading: false,
            errorOccured: false,

            imageRatio: 0.5625
        }

        this.onDropdownChosen = (value) => {
            this.setState({dropdownValue: value})
        }

        this.sendImage = async () => {
            console.log("Sending Report")
            
            this.setState({isLoading: true, errorOccured: false})
            success = await APIService.sendReport(MainLayout.mainLay.state.reportImage, this.state.dropdownValue, this.state.extraComments)
            
            if (success) {
                console.log("Report Uploaded Successfully :)")
                this.setState({
                    isLoading: false,
                    errorOccured: false
                })
                NavigationService.navigate("camera")
            } else {
                console.log("Report Failed Upload :(")
                this.setState({
                    isLoading: false,
                    errorOccured: true
                })
            }
        }
    }

    componentDidMount() {
        Image.getSize(MainLayout.mainLay.state.reportImage, (width, height) => {this.setState({imageRatio:width / height})})
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={{flex:1}}>
                <Image source={require("../../assets/background_image.png")} style={StyleService.main.backgroundImage}></Image>
                <ScrollView style={{display:"flex", flex:1, padding:20}}>
                    
                    
                    <View style={{flexDirection:'row',display:'flex'}}>
                        <Text style={{fontSize: 30, color: Colors.main.textColor, fontWeight:'bold', marginVertical:15}}>Submit A Report</Text>
                    </View>

                    <View>
                        <Image style={{marginBottom:20, width: "100%", aspectRatio:this.state.imageRatio, resizeMode:"contain", maxHeight:400, borderRadius:5, alignSelf:'center', borderWidth:1, borderColor:"black"}} source={{uri: MainLayout.mainLay.state.reportImage}}>
                        </Image>
                    </View>
                    

                    <Text style={{fontSize:20, color: Colors.main.textColor}}>Reason for your report?</Text>
                    <View style={{borderWidth:1, marginBottom:15}}>
                        <Picker onValueChange={this.onDropdownChosen} selectedValue={this.state.dropdownValue} style={{color:Colors.main.textColor, backgroundColor: Colors.main.background,}} dropdownIconColor={Colors.main.textColor}>
                            <Picker.Item label="Parking Violation" value="pv"/>
                            <Picker.Item label="Traffic Light Violation" value="tlv"/>
                            <Picker.Item label="Aggressive Driving" value="ad"/>
                            <Picker.Item label="Littering" value="lit"/>
                        </Picker>
                    </View>

                    <Text style={{fontSize:20, color:Colors.main.textColor}}>Extra Comments</Text>
                    <TextInput onChangeText={(newValue) => {this.setState({extraComments: newValue})}} ref={(r) => {extraInput = r}} placeholder="Write your comment here..." placeholderTextColor={"grey"} multiline={true} numberOfLines={10} style={{ height:100, textAlignVertical: 'top', color:Colors.main.textColor, borderColor:Colors.main.textColor, borderWidth:1, marginBottom:20, padding:10, borderRadius:10}}>
                    </TextInput>

                    {this.state.errorOccured === true ? (
                        <Text style={{color:"red", textAlign:"center", marginBottom:5, fontSize:15}}>Error Ocured</Text>
                    ) : <></>}
                    <TouchableOpacity onPress={() => this.sendImage()} style={{backgroundColor:"#A3BFF4", borderRadius:20, alignSelf:'center', width:"100%", padding:10, marginBottom:30}}>
                        <Text style={{color:"white", alignSelf:"center"}}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.isLoading == true ? (
                    <View style={{flex:1, width:"100%", height:"100%", position:'absolute', backgroundColor:'#000000aa', justifyContent:'center'}}>
                        <View style={{width:"100%", aspectRatio:1, borderRadius:30, alignSelf:'center'}}>
                            <Spinner textContent={'Submitting...'} textStyle={{color:"white"}} visible={true} style={{width:"10%", aspectRatio:1, backgroundColor:"white"}}></Spinner>
                        </View>
                    </View>
                ) : <></>}
                
            </View>
        );
    }
}