import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Configure from './components/configure';
import Training from './components/training';

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#333',
        flex: 1
    }
  });

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            data: {}
        };
    }

    render() {
        let content;

        if(this.state.page === 0) {
            content = (<Configure onConfigure={ this.startTraining }/>);
        }
        if(this.state.page === 1) {
            content = <Training data={ this.state.data }/>
        }

        return (
            <View style={styles.view}>
                { content }
            </View>
        );
    }

    startTraining = (data) => {
        this.setState({
            page: 1,
            data: data
        });
    }
}
