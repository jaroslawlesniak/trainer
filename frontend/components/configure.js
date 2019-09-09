import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#000'
    },
    view: {
        display: "flex",
        flex: 2,
        justifyContent: "center"
    },
    button: {
        justifyContent: "flex-end"
    },
    text: {
        alignItems: "center",
        padding: 30,
        textAlign: "center"
    },
    header: {
        fontSize: 30,
        color: "#fff" 
    },
    input: {
        backgroundColor: "#fff",
        margin: 15,
        borderRadius: 10,
        color: "#333",
        height: "auto",
        padding: 10,
        fontSize: 16,
        textAlign: "left"
    },
    submit_button: {
        backgroundColor: "#FFBD1B",
        color: "#fff",
        padding: 20,
        textAlign: "center"
    }
});

class Configure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            level: 0,
            name: "",
            break: 0,
            series_amount: 0,
            series: []
        }
    }

    render() {
        let content;
        let keyboardType = "default";

        if(this.state.level === 0) {
            content = <Text>Nazwa ćwiczenia</Text>;
        }
        if(this.state.level === 1) {
            content = <Text>Ilość serii</Text>
        }
        if(this.state.level === 2) {
            content = <Text>Czas pomiędzy seriami</Text>;
        }
        if(this.state.level > 2) {
            content = <Text>Powtórzenia w serii {this.state.level - 2}/{this.state.series_amount}</Text>
        }
        if(this.state.level > 0) {
            keyboardType = "numeric";
        }

        return (
            <View style={styles.container}>
                <View style={ styles.view }>
                    <Text style={[ styles.text, styles.header ]}>{ content }</Text>
                </View>
                <View style={ styles.view }>
                    <TextInput keyboardType={ keyboardType } style={[styles.text, styles.input ]} value={this.state.text} onChangeText={(text) => this.setState({text})}/>
                </View>
                <View style={[ styles.view, styles.button ]}>
                    <TouchableOpacity onPress={() => { this.nextLevel() }}> 
                        <Text style={ styles.submit_button }>Ustaw</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    nextLevel() {
        if(this.state.level === 0) {
            if(this.state.text !== "") {
                this.setState({
                    name: this.state.text,
                    level: this.state.level + 1,
                    text: ""
                });
            } else {
                ToastAndroid.show('Musisz podać nazwę treningu', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } 
        }
        if(this.state.level === 1) {
            if(this.state.text !== "") {
                this.setState({
                    series_amount: parseInt(this.state.text) || 1,
                    level: this.state.level + 1,
                    text: "" 
                });
            } else {
                ToastAndroid.show('Musisz podać ilość serii', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } 
        }
        if(this.state.level === 2) {
            if(this.state.text !== "") {
                this.setState({
                    break: parseInt(this.state.text) || 0,
                    level: this.state.level + 1,
                    text: ""
                });
            } else {
                ToastAndroid.show('Musisz podać długość przerwy pomiędzy seriami', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } 
        }
        if(this.state.level > 2) {
            if(this.state.text !== "") {
            let series = this.state.series;
            series.push(parseInt(this.state.text) || 0);

                this.setState({
                    series: series,
                    level: this.state.level + 1,
                    text: ""
                });
            } else {
                ToastAndroid.show('Musisz podać ilość powtórzeń w serii', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } 
        }
        if(this.state.level > 2 && this.state.level === (this.state.series_amount + 2)) {
            this.props.onConfigure({
                name: this.state.name,
                break: this.state.break,
                series: this.state.series
            });
        }
    }
}

export default Configure;