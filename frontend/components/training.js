import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: "#fff",
        marginTop: 50,
        marginBottom: 25
    },
    text: {
        color: "#fff"
    },
    serie: {
        color: "#FFBD1B",
        fontSize: 40,
        textAlign: "center",
        marginBottom: 25
    }
});

class Training extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.data.name,
            break: this.props.data.break,
            series: this.props.data.series,
            level: 0,
            break_time: 0,
            serie: 0,
            finished: false,
            completed: this.props.data.series.reduce((a, b) => a + b, 0)
        }
    }

    render() {
        let content;

        if(this.state.level === 0) {
            content = 
            (<View>
                <Text style={ styles.header }>Podsumowanie</Text>
                <Text style={ styles.text }>Ćwiczenie: {this.state.name}</Text>
                <Text style={ styles.text }>Czas pomiędzy seriami: {this.state.break}</Text>
                <Text style={ styles.text }>Serie: {this.state.series.join(", ")}</Text>
                <Button title="Rozpocznij trening" onPress={() => this.startTraining() }/>
            </View>);
        }

        if(this.state.finished === false) {
            if(this.state.level > 0) {
                if(this.state.level%2 === 0) {
                    content = (
                        <View>
                            <Text style={ styles.header }>Przerwa</Text>
                            <Text style={ styles.serie }>{this.state.break_time}</Text>
                        </View>
                    );
                } else {
                    content = (
                        <View>
                            <Text style={styles.header}>Seria {this.state.serie + 1}/{this.state.series.length}</Text>
                            <Text style={styles.serie}>{this.state.series[this.state.serie]}</Text>
                            <Button title="Zakończ serię" onPress={ () => { this.startBreak() }}/>
                        </View>
                    );
                }
            }
        } else {
            content = (
            <View>
                <Text style={styles.header}>Zakończono trening</Text>
                <Text style={styles.text}>{this.state.completed} powtórzeń</Text>
            </View>);
        }

        return (
            <View>
                { content }
            </View>  
        );
    }

    startTraining() {
        this.setState({
            level: 1
        });
    }

    startBreak() {
        if(this.state.serie + 1 !== this.state.series.length) {
            this.setState({
                level: this.state.level + 1,
                break_time: this.state.break,
                serie: this.state.serie + 1
            }, () => {
                this.countDownTimer();
            });
        } else {
            this.setState({
                finished: true
            });
        }
    }

    countDownTimer() {
        setTimeout(() => {
            if(this.state.break_time > 0) {
                this.setState({
                    break_time: this.state.break_time - 1
                });
                this.countDownTimer();
            } else {
                this.setState({
                    level: this.state.level + 1
                });
            }
        }, 1000);
    }
}

export default Training; 