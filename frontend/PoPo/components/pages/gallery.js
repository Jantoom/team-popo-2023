import FileService from '../../services/fileService.js'
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React, { useEffect } from "react";
import NavigationService from '../../services/navigationService.js';
import { StyleService } from "../../services/StyleServices.js";
import APIService from '../../services/restAPIService.js';

export default class GalleryPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            images: [],
        };

        this.updateImageLibrary = async () => {
            this.setState({
                images: await FileService.getCacheFiles()
            })
        }

        this.sendImage = async (fileURI) => {
            fileData = FileService.readFile(fileURI)
            console.log("Sending Image")
            APIService.sendData()            
        }

        this.deleteImage = (imageURI) => {
            FileService.deleteFile(imageURI)      
            this.updateImageLibrary()
        }
    }

    async componentDidMount() {
        this.updateImageLibrary()
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={{display:"flex", flex:1, padding:10}}>
                <ScrollView style={{display: "flex"}}>
                    <View style={{display: "flex", flexDirection:'row',flexWrap:'wrap'}}>
                        {this.state.images.map((item, index) => {
                            return (
                                <TouchableHighlight key={item["fileURI"]} style={{width: "31.333%", height:150, margin: "1%"}} onPress={() => {this.deleteImage(item["fileURI"])}}>
                                    <Image source={{uri: item["fileURI"]}} style={{flex:1, borderRadius:10}}></Image>
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                </ScrollView>
                {this.state.images.length == 0 ? <Text style={{color:"#dddddd", alignSelf:'center', bottom:"48%"}}>No Images Found</Text> : <></>}
                
            </View>
        );
    }
}