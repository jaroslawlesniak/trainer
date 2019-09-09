import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000"
    },
    view: {
        display: "flex",
        flex: 2,
        justifyContent: "flex-start",
        padding: 10
    },
    button: {
        justifyContent: "flex-end",
        padding: 0
    },
    header: {
        color: "#fff",
        fontSize: 25,
        marginBottom: 15
    },
    text: {
        color: "#646b73"
    },
    submit_button: {
        backgroundColor: "#FFBD1B",
        color: "#fff",
        padding: 20,
        textAlign: "center"
    },
    name: {
        color: "#333",
        fontSize: 25,
        marginBottom: 15,
        textAlign: "center"
    },
    current_serie: {
        fontSize: 18,
        color: "#bbb",
        textAlign: "center"
    },
    counter: {
        textAlign: "center",
        fontSize: 50,
        color: "#FFBD1B"
    },
    center: {
        justifyContent: "center"
    }
});

class Training extends React.Component {
    timer;

    constructor(props) {
        super(props);

        StatusBar.setBackgroundColor('#000');
        StatusBar.setBarStyle('light-content');

        this.state = {
            name: this.props.data.title,
            break: this.props.data.break_time,
            series: this.props.data.series,
            level: 0,
            break_time: 0,
            serie: 0,
            finished: false,
            completed: this.props.data.series.reduce((prev, next) => prev + next),
            key: this.props.activity_key
        };    
    }

    render() {
        let content;

        if(this.state.level === 0) {
            content = 
            (<View style={styles.container}>
                <View style={styles.view}>
                    <Text style={ styles.header }>Podsumowanie</Text>
                    <Text style={ styles.text }>Ćwiczenie: {this.state.name}</Text>
                    <Text style={ styles.text }>Czas pomiędzy seriami: {this.state.break}</Text>
                    <Text style={ styles.text }>Powtórzenia: {this.state.series.join(", ")}</Text>
                </View>
                <View style={[styles.view, styles.button]}>
                    <TouchableOpacity onPress={() => { this.startTraining() }}> 
                        <Text style={ styles.submit_button }>Rozpocznij trening</Text>
                    </TouchableOpacity>
                </View>
            </View>);
        }

        if(this.state.finished === false) {
            if(this.state.level > 0) {
                if(this.state.level%2 === 0) {
                    content = (
                        <View style={styles.container}>
                            <View style={[styles.view, styles.center]}>
                                <Text style={ styles.name }>Przerwa</Text>
                                <Text style={ styles.counter }>{this.state.break_time}</Text>
                            </View>    
                        </View>
                    );
                } else {
                    content = (
                        <View style={styles.container}>
                            <View style={styles.view}>
                                <Text style={styles.name}>{this.state.name}</Text>
                                <Text style={styles.current_serie}>{this.state.serie + 1}/{this.state.series.length}</Text>
                            </View>
                            <View style={styles.view}>
                                <Text style={styles.counter}>{this.state.series[this.state.serie]}</Text>
                            </View>
                            <View style={[styles.view, styles.button]}>
                                <TouchableOpacity onPress={() => { this.startBreak() }}> 
                                    <Text style={ styles.submit_button }>Zakończ serię</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }
            }
        } else {
            content = (
            <View style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.name}>Zakończono trening</Text>
                    <Text style={styles.current_serie}>{this.state.completed} powtórzeń</Text>
                </View>
                <View style={[styles.view, styles.button]}>
                    <TouchableOpacity onPress={() => { this.props.finishTraining(this.state.key) }}> 
                        <Text style={ styles.submit_button }>Zakończ trening</Text>
                    </TouchableOpacity>
                </View>
            </View>);
        }

        return (
            <View style={styles.container}>
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
        this.timer = setTimeout(() => {
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

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
}

export default Training; 