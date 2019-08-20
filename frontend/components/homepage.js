import React from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
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
        alignItems: 'baseline'
    },
    activity: {
        color: '#666',
        fontSize: 20,
        marginTop: 25
    },
    completedActivity: {
        color: '#00925b'
    }
});

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [
                {name: 'Pompki', days: [0,1,2,3,4,5,6], finished: false},
                {name: 'Podciąganie', days: [0,1,2,3,4,5,6], finished: true},
                {name: 'Hantle', days: [0,1,2,3,4,5,6], finished: false},
            ]
        }

        // this.state = {
        //     activities: []
        // }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content;

        if(this.state.activities.length === 0) {
            content = (
                <View style={{ alignContent: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <View>
                        <FontAwesome style={ styles.iconInfo} name='calendar' color="#888" size={50}/>
                        <Text style={styles.infoText}>Nie masz dzisiaj żadnych ćwiczeń</Text>
                    </View>
                </View>
            );
        } else {
            content = this.state.activities.map((activity, key) => {
                if(activity.finished === false) {
                    return (<View key={key} style={styles.container}><Text style={styles.activity}>{activity.name}</Text><FontAwesome name='angle-right' size={20} color='#000'/></View>);
                } else {
                    return (<View key={key} style={styles.container}><Text style={[styles.activity, styles.completedActivity]}>{activity.name}</Text><FontAwesome name='check-circle' size={20} color='#00925b'/></View>);
                }
            });
        }

        return (
            <View style={{ padding: 20 }}>
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