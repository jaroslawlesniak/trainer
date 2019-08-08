import React from "react";
import { StyleSheet, Text, Button, View, TextInput } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
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
    button: {
        padding: 0
    },
    input: {
        backgroundColor: "#fff",
        margin: 15,
        borderRadius: 10,
        color: "#333",
        height: "auto",
        padding: 10,
        fontSize: 16
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

        return (
            <View style={styles.container}>
                <View style={{ alignContent: "flex-end"}}>
                    <Text style={[ styles.text, styles.header ]}>{ content }</Text>
                    <TextInput style={[styles.text, styles.input ]} value={this.state.text} onChangeText={(text) => this.setState({text})}/>
                    <Button title="Ustaw" style={[styles.text, styles.button ]} onPress={() => { this.nextLevel() }} color="#FFBD1B"/>
                </View>
            </View>
        );
    }

    nextLevel() {
        if(this.state.level === 0) {
            this.setState({
                name: this.state.text,
                level: this.state.level + 1,
                text: ""
            });
        }
        if(this.state.level === 1) {
            this.setState({
                series_amount: parseInt(this.state.text),
                level: this.state.level + 1,
                text: "" 
            });
        }
        if(this.state.level === 2) {
            this.setState({
                break: parseInt(this.state.text),
                level: this.state.level + 1,
                text: ""
            });
        }
        if(this.state.level > 2) {
            let series = this.state.series;
            series.push(parseInt(this.state.text));

            this.setState({
                series: series,
                level: this.state.level + 1,
                text: ""
            });
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