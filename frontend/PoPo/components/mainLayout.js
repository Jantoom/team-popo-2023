import React from 'react';
import { NavigationComponent } from './navigationComponent';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Component that defines the shared layout between all screens. Implement
 * navigation menus here.
 */
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Renders the layout.
     */
    render() {
        return (
            <NavigationComponent style={{flex: 1}}/>
        )
    }
}