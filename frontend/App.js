import React from 'react';
import { View, ToolbarAndroid, StyleSheet, StatusBar } from 'react-native';
import Page from './libs/page';
import { Ionicons } from '@expo/vector-icons';

import Homepage from './components/homepage';

const styles = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: '#fff'
    },
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
});

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
            <View style={styles.container}>
                <ToolbarAndroid 
                    style={styles.toolbar} 
                    title='Dzisiaj'
                    actions={[
                        {title: 'Zarządzaj ćwiczeniami', iconName: 'md-cog', show: 'never'},
                        {title: 'Dodaj ćwiczenie', iconName: 'md-cog', show: 'never'}
                    ]}/>
                {content}
            </View>
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
