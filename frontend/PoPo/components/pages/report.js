
import { ScrollView, View, Image, Text, TouchableHighlight, Button, ImageBackground } from 'react-native';
import React from "react";
import {Picker} from '@react-native-picker/picker';
import FileService from '../../services/fileService';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import NavigationService from '../../services/navigationService';

export default class ReportPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            dropdownValue: "java",
            imageURI: "none"
        }

        this.onDropdownChosen = (value) => {
            console.log(value)
            this.setState({dropdownValue: value})
        }
    }

    async componentDidMount() {
        console.log((await FileService.getCacheFiles()).pop())
        this.setState({imageURI: (await FileService.getCacheFiles()).pop()["fileURI"]})
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <ScrollView style={{display:"flex", flex:1, padding:20}}>
                <Text style={{fontSize:30, color:"white", fontWeight:'bold', marginBottom:15}}>Submit A Report</Text>
                <Text style={{fontSize:20, color:"white"}}>Reason for your report?</Text>
                <Picker onValueChange={this.onDropdownChosen} selectedValue={this.state.dropdownValue} style={{color:"black", backgroundColor:"white", borderColor:"red", marginBottom:15}} dropdownIconColor={"black"}>
                    <Picker.Item label="Java" value="java"/>
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <Text style={{fontSize:20, color:"white"}}>Image Preview</Text>
                <Image style={{width:"100%", aspectRatio:0.9, resizeMode:'contain', overflow:'hidden'}} source={{uri: this.state.imageURI}}></Image>
                <TouchableOpacity style={{borderRadius:20, alignSelf:'flex-end', borderColor:"grey", borderWidth:2, padding:10}} onPress={() => NavigationService.navigate("camera")}>
                    <Text style={{color:"white"}}>Retake</Text>
                </TouchableOpacity>

                <Text style={{fontSize:20, color:"white"}}>Extra Comments</Text>
                <TextInput placeholder="Write your comment here..." placeholderTextColor={"grey"} multiline={true} numberOfLines={10} style={{ height:100, textAlignVertical: 'top', color:"white", borderColor:"white", borderWidth:1, marginBottom:20, padding:10, borderRadius:10}}>
                </TextInput>

                <TouchableOpacity style={{borderRadius:20, alignSelf:'center', width:"100%", borderColor:"grey", borderWidth:2, padding:10, marginBottom:30}}>
                    <Text style={{color:"white", alignSelf:"center"}}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}