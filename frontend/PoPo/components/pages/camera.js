import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { StyleService } from "../../services/StyleServices.js";

import NavigationService from '../../services/navigationService.js';
import React from "react";
import ReportPage from './report.js';
import MainLayout from '../mainLayout.js';
import DimensionService from '../../services/dimensionService.js';

export default class CameraPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            page: "camera",
            permission: true,
            cameraType: CameraType.back,
            mainButtonWidth: "25%",
            littleButtonWidth: "10%"
        };

        this.toggleCameraType = () => {
            this.setState(
                {
                    cameraType: this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back
                }
            )
        }

        this.takePhoto = async () => {
            const photo = await camera.takePictureAsync();

            MainLayout.mainLay.setState({reportImage: photo.uri})
            NavigationService.navigate("report")
        }

        this.requestPermission = async () => {
            this.setState({permission: await Camera.requestCameraPermissionsAsync()})
        }
        
        this.leaveCamera = (newPage) => {
            NavigationService.navigate(newPage)
        }

        this.onOrientationChange = () => {
            orient = DimensionService.getOrientation()

            if (orient == "vertical") {
                this.setState({mainButtonWidth: "25%", littleButtonWidth: "10%"})
            } else {
                this.setState({mainButtonWidth: "10%", littleButtonWidth: "5%"})
            }
        }
    }

    

    async componentDidMount() {
        this.onOrientationChange()
        DimensionService.addListener(this.onOrientationChange)

        this.setState({permission: await Camera.requestCameraPermissionsAsync()})
        if (!this.state.permission) {
            // Camera permissions are still loading
            this.setState({page: "loading"})
        }

        if (!this.state.permission.granted) {
            this.setState({page: "permissions"})
        }

        MainLayout.mainLay.setState({padTop: false, navBorderRad: 0})        
    }

    componentWillUnmount() {
        MainLayout.mainLay.setState({padTop: true, navBorderRad: 30})        
    }

    /**
     * Renders the component.
     */
    render() {
        if (this.state.page === "camera") {
            return (
                <View style={{display:'flex', height:"100%", backgroundColor:'black', flex:1, justifyContent:'space-between'}}>
                    <View style={{flex:1}}>
                        <Camera ratio="16:9"
                        style={{
                            display:'flex',
                            width:"100%",
                            aspectRatio:0.5625,
                            transform:[{scale: 1}, {translateY:0}],
                            justifyContent:'flex-end',
                            height:"100%",
                            position:'absolute'
                            
                        }}
                        type={this.state.cameraType} ref={(r) => {camera = r}}>
                            <View style={{flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                                <TouchableOpacity style={{
                                    width:this.state.littleButtonWidth,
                                    borderRadius:100,
                                    aspectRatio:1,
                                    alignSelf:'center',
                                    borderColor:"white",
                                    borderWidth:0,}} onPress={() => NavigationService.navigate("gallery")}>
                                        <Image source={require("../../assets/gallery.png")} style={{height:"90%",
                                            width:'100%',
                                            resizeMode:'center', alignSelf:'center', tintColor:"white"}}>
                                        </Image>
                                </TouchableOpacity>

                                <TouchableOpacity style={[StyleService.main.cameraButton, {width:this.state.mainButtonWidth}]} onPress={this.takePhoto}>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width:this.state.littleButtonWidth,
                                    borderRadius:100,
                                    aspectRatio:1,
                                    alignSelf:'center',
                                    borderColor:"white",
                                    borderWidth:0,}} onPress={this.toggleCameraType}>
                                        <Image source={require("../../assets/flipcamera.png")} style={{height:"90%",
                                            width:'100%',
                                            resizeMode:'center', alignSelf:'center', tintColor:"white"}}>
                                        </Image>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                </View>
            );
        } else if (this.state.page === "loading") {
            return (
                <View/>
            );
        } else if (this.state.page === "permissions") {
            return (
                <View style={StyleService.main.container}>
                    <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                    <Button onPress={this.requestPermission} title="grant permission" />
                </View>
            );
        }
    }
}