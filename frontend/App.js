import React from 'react';
import { View, ToolbarAndroid, StyleSheet, StatusBar } from 'react-native';
import Page from './libs/page';

import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Homepage from './components/homepage';
import Configure from './components/configure';
import NavigationComponent from './components/navigation';
import Activities from './components/activities';
import Training from './components/training';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    }
});

const AppDrawerNavigator = createDrawerNavigator(
    {
        Homepage,
        Activities
    },{
        contentComponent: NavigationComponent
    }
    );

const AppContainer = createAppContainer(AppDrawerNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        StatusBar.setBackgroundColor('#f2f2f2');
        StatusBar.setBarStyle('dark-content');

        this.state = {
            page: 0,
            data: {}
        };
    }
 
    render() {
        let content;

        switch(this.state.page) {
            case Page.HOMEPAGE: {
                content = (<Homepage/>);
            }
        }

        // if(this.state.page === 0) {
        //     content = (<Configure onConfigure={ this.startTraining }/>);
        // }
        // if(this.state.page === 1) {
        //     content = <Training data={ this.state.data } finishTraining={ this.finishTraining }/>
        // }

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