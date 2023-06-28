import { Camera, CameraType } from 'expo-camera';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GalleryPage from './components/pages/gallery.js';
import CameraPage from './components/pages/camera.js';

import React from 'react';
import NavigationService from './services/navigationService';
import MainLayout from './components/mainLayout';

import { StyleService } from "./services/StyleServices.js";

export default function App() {
    // Register all page components here
    NavigationService.register("camera", React.createElement(CameraPage));
    NavigationService.register("gallery", React.createElement(GalleryPage));

    return (
        <View style={StyleService.main.outerContainer}>
            <MainLayout />
        </View>
  );
}