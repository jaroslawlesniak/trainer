import React from 'react';
import { View, Text, AsyncStorage, StyleSheet, ToolbarAndroid, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons  } from '@expo/vector-icons';
import Page from '../libs/page';
import Training from './training';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#000",
        flex: 1
    },
    iconInfo: {
        textAlign: 'center'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        marginTop: 10
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        padding: 15
    },
    activity: {
        color: '#646b73',
        fontSize: 20
    },
    completedActivity: {
        color: '#fff'
    }
});

export default class Homepage extends React.Component {
    static navigationOptions = {
        title: "Dziś",
        tabBarIcon: () => <Ionicons name='md-calendar'/>
    }

    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            page: Page.HOMEPAGE,
            activity: {},
            key: -1
        }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content;

        if(this.state.page === Page.HOMEPAGE) {
            if(this.state.activities.length === 0) {
                content = (
                    <View style={{ alignContent: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <View>
                            <FontAwesome style={styles.iconInfo} name='calendar' color="#888" size={50}/>
                            <Text style={styles.infoText}>Nie masz zaplanowanych ćwiczeń</Text>
                        </View>
                    </View>
                );
            } else {
                let date = new Date();
                let dayOfWeek = date.getDay() - 1;
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                const current_date = `${day}/${month}/${year}`;

                if(dayOfWeek === -1) {
                    dayOfWeek = 6;
                }

                content = this.state.activities.map((activity, key) => {
                    if(activity.days[dayOfWeek] === true)
                    {
                        if(activity.last_complete_day !== current_date) {
                            return (
                                <TouchableOpacity key={key} style={styles.container} onPress={() => {this.setState({
                                        page: Page.SINGLE_ACTIVITY,
                                        activity,
                                        key
                                    });
                                }}>
                                    <Text style={styles.activity}>{activity.title}</Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <View key={key} style={[styles.container, styles.completedActivity]}>
                                    <Text style={[styles.activity, styles.completedActivity]}>{activity.title}</Text>
                                    <FontAwesome name='check-circle' size={20} color='#11a36c'/>
                                </View>
                            );
                        }
                    }
                });
            }
        } else if(this.state.page === Page.SINGLE_ACTIVITY) {
            content = (
                <Modal animationType="fade" transparent={false} onRequestClose={() => {this.setState({page: Page.HOMEPAGE})}}>
                    <Training data={this.state.activity} activity_key={this.state.key} finishTraining={(e) => { this.finishTraining(e) }}/>
                </Modal>
            );
        }

        return (
            <View style={ styles.page }>
                <ToolbarAndroid titleColor="#fff" title="Dzisiejsze ćwiczenia" style={{ height: 55, marginBottom: 25 }}/>
                {content}
            </View>
        );
    }

    async loadActivitiesFromLocalStorage() {
        const activities = await AsyncStorage.getItem('activities');

        if(activities !== null) {
            this.setState({
                activities: JSON.parse(activities)
            });
        }
    }

    finishTraining(key) {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const current_date = `${day}/${month}/${year}`;

        let activities = this.state.activities;
        activities[key].last_complete_day = current_date;
        this.setState({
            activities,
            page: Page.HOMEPAGE
        });

        AsyncStorage.setItem('activities', JSON.stringify(activities));
    }
}