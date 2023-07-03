import NavigationService from "../services/navigationService.js";
import React from "react";
import { View, Text } from "react-native";

/**
 * A component for routing between different screens by listening to
 * events from the navigation service.
 */
export class NavigationComponent extends React.Component {
    /**
     * Creates the navigation component.
     * @param { Object } props Component properties
     */
    constructor(props) {
        super(props);

        NavigationService.registerListener(() => {
            this.forceUpdate();
        });
    }

    /**
     * Renders the component with the current component.
     */
    render() {
        let screen;
        try {
            screen = NavigationService.getComponent();
        } catch (err) {
            screen = React.createElement(Text, null, err);
        }

        return React.createElement(View, this.props, screen);
    }
}