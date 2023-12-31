import FileService from '../../services/fileService.js'
import { ScrollView, View, Image, Text, TouchableHighlight, Button } from 'react-native';
import React, { cloneElement, useEffect } from "react";
import NavigationService from '../../services/navigationService.js';
import { StyleService, Colors } from "../../services/StyleServices.js";
import APIService from '../../services/restAPIService.js';
import ReportPage from './report.js';
import MainLayout from '../mainLayout.js';
import DimensionService from '../../services/dimensionService.js';

export default class GalleryPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            galleryWidth: "31.333%"
        };

        this.updateImageLibrary = async () => {
            this.setState({
                images: await FileService.getCacheFiles()
            })
        }

        this.deleteImage = (imageURI) => {
            FileService.deleteFile(imageURI)      
            this.updateImageLibrary()
        }

        this.selectImage = (imageURI) => {
            MainLayout.mainLay.setState({reportImage: imageURI})
            NavigationService.navigate("report")
        }

        this.onOrientationChange = () => {
            orient = DimensionService.getOrientation()
            if (orient == "vertical") {
                this.setState({galleryWidth: "31.333%"})
            } else {
                this.setState({galleryWidth: "23%"})
            }
        }
    }

    async componentDidMount() {
        this.updateImageLibrary()
        this.onOrientationChange()
        DimensionService.addListener(this.onOrientationChange)
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={{display:"flex", flex:1, padding:10}}>
                <Image source={require("../../assets/background_image.png")} style={StyleService.main.backgroundImage}></Image>
                <ScrollView style={{display: "flex"}}>
                    <View style={{display: "flex", flexDirection:'row',flexWrap:'wrap'}}>
                        {this.state.images.map((item, index) => {
                            return (
                                <TouchableHighlight key={item["fileURI"]} style={{width: this.state.galleryWidth, height:150, margin: "1%", borderRadius:10}} onPress={() => {this.selectImage(item["fileURI"])}}>
                                    <View style={{flex:1}}>
                                        <Image source={{uri: item["fileURI"]}} style={{flex:1, borderRadius:10}}></Image>
                                        <TouchableHighlight onPress={() => this.deleteImage(item["fileURI"])} style={{position:'absolute', width:20, aspectRatio:1, alignSelf:"flex-end", right:5, top:5, backgroundColor:"white", justifyContent:'center', borderRadius:50}}>
                                            <Text style={{color:"red", alignSelf:'center', fontWeight:'bold', verticalAlign:'middle'}}>X</Text>
                                        </TouchableHighlight>
                                    </View>
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                </ScrollView>
                {this.state.images.length == 0 ? <Text style={{color:Colors.main.textColor, alignSelf:'center', bottom:"48%"}}>No Images Found</Text> : <></>}
                
            </View>
        );
    }
}