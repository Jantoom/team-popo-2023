import { Camera, CameraType } from 'expo-camera';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import GalleryPage from './components/pages/gallery.js';
import CameraPage from './components/pages/camera.js';
import HomePage from './components/pages/home.js';
import ReportPage from './components/pages/report.js';
import ProfilePage from './components/pages/profile.js';

import React from 'react';
import NavigationService from './services/navigationService';
import MainLayout from './components/mainLayout';

import { StyleService } from "./services/StyleServices.js";

export default function App() {
    // Register all page components here
    NavigationService.register("home", React.createElement(HomePage));
    NavigationService.register("report", React.createElement(ReportPage));
    NavigationService.register("camera", React.createElement(CameraPage));
    NavigationService.register("gallery", React.createElement(GalleryPage));
    NavigationService.register("profile", React.createElement(ProfilePage));
    
    return (
        <SafeAreaView style={StyleService.main.outerContainer}>
            <MainLayout />
        </SafeAreaView>
  );
}