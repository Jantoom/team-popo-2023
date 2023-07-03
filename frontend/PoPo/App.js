import { Camera, CameraType } from 'expo-camera';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import GalleryPage from './components/pages/gallery.js';
import CameraPage from './components/pages/camera.js';
import LoginPage from './components/pages/login.js';
import ReportPage from './components/pages/report.js';
import ProfilePage from './components/pages/profile.js';
import HomePage from './components/pages/home.js';
import SignUpPage from './components/pages/signup.js';

import React from 'react';
import NavigationService from './services/navigationService';
import MainLayout from './components/mainLayout';

export default function App() {
    // Register all page components here
    NavigationService.register("login", React.createElement(LoginPage));
    NavigationService.register("signup", React.createElement(SignUpPage));
    NavigationService.register("home", React.createElement(HomePage));
    NavigationService.register("report", React.createElement(ReportPage));
    NavigationService.register("camera", React.createElement(CameraPage));
    NavigationService.register("gallery", React.createElement(GalleryPage));
    NavigationService.register("profile", React.createElement(ProfilePage));
    
    return (
        <MainLayout />
  );
}