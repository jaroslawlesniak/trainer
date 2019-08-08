import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
        marginTop: 50
    }
});

class Training extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.data.name,
            break: this.props.data.break,
            series: this.props.data.series,
            level: 0
        }
    }

    render() {
        let content;

        if(this.state.level === 0) {
            content = 
            (<View>
                <Text>Podumowanie</Text>
                <Text>Ćwiczenie: {this.state.name}</Text>
                <Text>Czas pomiędzy seriami: {this.state.break}</Text>
                <Text>Serie: {this.state.series.map((val) => { <Text>val</Text> })}</Text>
            </View>);
        }

        return (
            <View>
                
                { content }
            </View>  
        );
    }
}

export default Training; 