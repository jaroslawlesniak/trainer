import React from 'react';
import { View, Text, AsyncStorage, StyleSheet, ToolbarAndroid } from 'react-native';
import { FontAwesome, Ionicons  } from '@expo/vector-icons';

const styles = StyleSheet.create({
    iconInfo: {
        textAlign: 'center'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginTop: 10
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 15
    },
    activity: {
        color: '#666',
        fontSize: 20
    },
    completedActivity: {
        // backgroundColor: '#11a36c',
        color: '#11a36c'
    }
});

export default class Homepage extends React.Component {
    static navigationOptions = {
        title: "Dzisiejsze ćwiczenia",
        drawerIcon: (<Ionicons name='md-calendar' size={18}/>)
    }

    constructor(props) {
        super(props);

        this.state = {
            activities: []
        }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content;

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
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            const current_date = `${day}/${month}/${year}`;

            content = this.state.activities.map((activity, key) => {
                if(activity.last_complete_day !== current_date) {
                    return (
                        <View key={key} style={styles.container}>
                            <Text style={styles.activity}>{activity.title}</Text>
                            <FontAwesome style={{backgroundColor: '#f2f2f2', padding: 10, width: 40, textAlign: 'center', borderRadius: 100}} name='angle-right' size={20} color='#000' onPress={() => {this.props.navigation.navigate('Training', { data: activity })}}/>
                        </View>
                    );
                } else {
                    return (
                        <View key={key} style={[styles.container, styles.completedActivity]}>
                            <Text style={[styles.activity, styles.completedActivity]}>{activity.title}</Text>
                            <FontAwesome name='check-circle' size={20} color='#11a36c'/>
                        </View>
                    );
                }
            });
        }

        return (
            <View>
                <ToolbarAndroid color="#fff" title="Dzisiejsze ćwiczenia" style={{ height: 55 }}/>
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
}