import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { StyleService } from "../../services/StyleServices.js";

import NavigationService from '../../services/navigationService.js';
import React from "react";


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
        };

        this.toggleCameraType = () => {
            this.setState({cameraType: this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back})
        }

        this.takePhoto = async () => {
            const photo = await camera.takePictureAsync();
            console.log(photo)
        }

        this.requestPermission = async () => {
            this.setState({permission: await Camera.requestCameraPermissionsAsync()})
            console.log(await Camera.requestCameraPermissionsAsync())
            console.log("test")
        }
        
        this.leaveCamera = (newPage) => {
            NavigationService.navigate(newPage)
        }
    }

    

    async componentDidMount() {
        this.setState({permission: await Camera.requestCameraPermissionsAsync()})
        if (!this.state.permission) {
            // Camera permissions are still loading
            this.setState({page: "loading"})
        }

        if (!this.state.permission.granted) {
            this.setState({page: "permissions"})
        }
    }

    /**
     * Renders the component.
     */
    render() {
        if (this.state.page === "camera") {
            return (
                <View style={StyleService.main.container}>
                    <Camera style={{}} type={this.state.cameraType} ref={(r) => {camera = r}}>
                        <View style={StyleService.main.buttonContainer}>
                        <TouchableOpacity style={StyleService.main.button} onPress={this.toggleCameraType}>
                            <Text style={StyleService.main.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleService.main.button} onPress={this.takePhoto}>
                            <Text style={StyleService.main.text}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleService.main.button} onPress={() => this.leaveCamera("gallery")}>
                            <Text style={StyleService.main.text}>Gallery</Text>
                        </TouchableOpacity>
                        </View>
                    </Camera>
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