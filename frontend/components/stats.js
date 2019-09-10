import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, ToolbarAndroid } from 'react-native';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#000',
        flex: 1
    }
});

export default class Stats extends React.Component {
    static navigationOptions = {
        title: '',
        tabBarIcon: ({tintColor}) => <Ionicons name='md-stats' size={25} color={tintColor}/>
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.page }>
                 <ToolbarAndroid titleColor="#fff" title='Statystyki' style={{ height: 55 }}/>
            </View>
        )
    }
}