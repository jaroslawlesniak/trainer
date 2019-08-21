import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { View, AsyncStorage, Text, StyleSheet, ToolbarAndroid } from 'react-native';

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 15
    }
});

export default class Activities extends React.Component {
    static navigationOptions = {
        title: "Zarządzaj ćwiczeniami",
        drawerIcon: (<MaterialCommunityIcons name='dumbbell' size={18}/>)
    }

    constructor(props) {
        super(props);

        this.state = {
            activities: [
                {title: 'Pompki', days: [0,1,2,3,4,5,6], finished: false},
                {title: 'Podciąganie', days: [0,1,2,3,4,5,6], finished: true},
                {title: 'Hantle', days: [0,1,2,3,4,5,6], finished: false},
            ]
        }

        // this.state = {
        //     activities: []
        // }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content;

        if(this.state.activities.length !== 0) {
            content = this.state.activities.map((activity, key) => (
                <View key={key} style={styles.item}>
                    <Text style={{ fontSize: 20, color: '#666' }}>{activity.title}</Text>
                    <FontAwesome size={20} name="cog"/>
                </View>
            ))
        }

        return (
            <View>
                <ToolbarAndroid title='Ćwiczenia' style={{ height: 55 }}/>
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