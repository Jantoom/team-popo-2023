
import { ScrollView, View, Image, Text, TouchableHighlight, Button, ImageBackground } from 'react-native';
import React from "react";
import {Picker} from '@react-native-picker/picker';
import FileService from '../../services/fileService';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import NavigationService from '../../services/navigationService';
import APIService from '../../services/restAPIService';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ReportPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            dropdownValue: "pv",
            imageURI: "none",
            extraComments: "",

            isLoading: false,
            errorOccured: false
        }

        this.onDropdownChosen = (value) => {
            this.setState({dropdownValue: value})
        }

        this.sendImage = async () => {
            this.setState({isLoading: true, errorOccured: false})
            console.log("Sending Image")

            let formData = new FormData();
            formData.append("image", {
                uri: this.state.imageURI,
                type: "image/png",
                name: "image.png",
            })

            formData.append("type", this.state.dropdownValue)
            formData.append("extra_comments", this.state.extraComments)
            
            response = await fetch('http://10.194.139.183:6400/api/v1/violations', {
                method: 'POST',
                body: formData,
            }).catch((reason) => {
                console.log(reason)
                response = undefined
            })
            if (response !== undefined) {
                if (response.status === 201) {
                    // Image Upload Success :)
                    console.log("Image Uploaded Successfully :)")
                    this.setState({isLoading: false})
                    return
                } else {
                    // Image Upload Failed :(
                    console.log("Image Failed Upload :'(")
                }
            }
            this.setState({
                isLoading: false,
                errorOccured: true
            })
        }
    }

    async componentDidMount() {
        this.setState({imageURI: (await FileService.getCacheFiles()).pop()["fileURI"]})
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{display:"flex", flex:1, padding:20}}>
                    
                    
                    <View style={{flexDirection:'row',display:'flex', }}>
                        <Text style={{fontSize:30, color:"white", fontWeight:'bold', marginBottom:15}}>Submit A Report</Text>
                    </View>

                    <Text style={{fontSize:20, color:"white"}}>Image Preview</Text>
                    <Image style={{width:"100%", aspectRatio:0.9, resizeMode:'contain', overflow:'hidden', marginBottom:20}} source={{uri: this.state.imageURI}}></Image>
                    

                    <Text style={{fontSize:20, color:"white"}}>Reason for your report?</Text>
                    <Picker onValueChange={this.onDropdownChosen} selectedValue={this.state.dropdownValue} style={{color:"white", backgroundColor:"black", borderColor:"red", marginBottom:15}} dropdownIconColor={"white"}>
                        <Picker.Item label="Parking Violation" value="pv"/>
                        <Picker.Item label="Traffic Light Violation" value="tlv"/>
                        <Picker.Item label="Aggressive Driving" value="ad"/>
                        <Picker.Item label="Littering" value="lit"/>
                    </Picker>

                    <Text style={{fontSize:20, color:"white"}}>Extra Comments</Text>
                    <TextInput onChangeText={(newValue) => {this.setState({extraComments: newValue})}} ref={(r) => {extraInput = r}} placeholder="Write your comment here..." placeholderTextColor={"grey"} multiline={true} numberOfLines={10} style={{ height:100, textAlignVertical: 'top', color:"white", borderColor:"white", borderWidth:1, marginBottom:20, padding:10, borderRadius:10}}>
                    </TextInput>

                    {this.state.errorOccured === true ? (
                        <Text style={{color:"red", textAlign:"center", marginBottom:5, fontSize:15}}>Error Ocured</Text>
                    ) : <></>}
                    <TouchableOpacity onPress={() => this.sendImage()} style={{borderRadius:20, alignSelf:'center', width:"100%", borderColor:"grey", borderWidth:2, padding:10, marginBottom:30}}>
                        <Text style={{color:"white", alignSelf:"center"}}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.isLoading == true ? (
                    <View style={{flex:1, width:"100%", height:"100%", position:'absolute', backgroundColor:'#000000aa', justifyContent:'center'}}>
                        <View style={{width:"100%", aspectRatio:1, borderRadius:30, alignSelf:'center'}}>
                            <Spinner textContent={'Loading...'} textStyle={{color:"white"}} visible={true} style={{width:"10%", aspectRatio:1, backgroundColor:"white"}}></Spinner>
                        </View>
                    </View>
                ) : <></>}
                
            </View>
        );
    }
}