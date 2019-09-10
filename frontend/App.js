import React from 'react';
import { View, ToolbarAndroid, StyleSheet, StatusBar } from 'react-native';
import Page from './libs/page';

import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import Homepage from './components/homepage';
import Activities from './components/activities';
import Stats from './components/stats';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    }
});

const AppDrawerNavigator = createBottomTabNavigator({
    Homepage,
    Activities,
    Stats
}, {
    tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#646b73',
        style: {
            backgroundColor: '#000'
        }
    }
});

const AppContainer = createAppContainer(AppDrawerNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        StatusBar.setBackgroundColor('#000');
        StatusBar.setBarStyle('light-content');

        this.state = {
            page: 0,
            data: {}
        };
    }
 
    render() {
        return (
            <AppContainer/>
        );
    }

    startTraining = (data) => {
        this.setState({
            page: 1,
            data: data
        });
    }

    finishTraining = () => {
        this.setState({
            page: 0
        });
    }
}