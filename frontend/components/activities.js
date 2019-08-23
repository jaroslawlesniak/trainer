import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Modal, View, AsyncStorage, Text, StyleSheet, ToolbarAndroid } from 'react-native';
import Page from '../libs/page';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 15
    },
    header: {

    },
    input: {
        padding: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 10
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
            ],
            page: Page.ACTIVITIES,
            new_activity: {
                title: '',
                break_time: 0,
                days: [false, false, false, false, false, false, false],
                series: []
            }
        }

        // this.state = {
        //     activities: []
        // }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content;

        if(this.state.page === Page.ACTIVITIES) {
            if(this.state.activities.length !== 0) {
                content = this.state.activities.map((activity, key) => (
                    <View key={key} style={styles.item}>
                        <Text style={{ fontSize: 20, color: '#666' }}>{activity.title}</Text>
                        <FontAwesome size={20} name="cog"/>
                    </View>
                ))
            }
        }
        if(this.state.page === Page.NEW_ACTIVITY) {
            return (
            <Modal animationType="fade" transparent={false} onRequestClose={() => {this.setState({page: Page.ACTIVITIES})}}>
                <View style={{padding: 10}}>
                    <Text style={styles.header}>Nazwa ćwiczenia</Text>
                    <TextInput style={styles.input} onChangeText={(e) => {this.handleTitleChange(e)}}/>
                    <Text style={styles.header}>Czas pomiędzy seriami</Text>
                    <TextInput style={styles.input} onChangeText={(e) => {this.handleBreakTimeCHange(e)}}/>
                    <Text style={styles.header}>Dni tygodnia</Text>
                </View>
            </Modal>);
        }

        return (
            <View>
                <ToolbarAndroid title='Ćwiczenia' style={{ height: 55 }}
                actions={[{title:"Dodaj ćwiczenie", show:'never'}]}
                onActionSelected={ (e) => { this.addNewActivity(e) }}/>
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

    addNewActivity(position) {
        if(position === 0) {
            this.setState({
                page: Page.NEW_ACTIVITY
            });
        }
    }

    handleTitleChange(title) {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.title = title;
        this.setState({
            new_activity: modyfiedActivity
        });
    }

    handleBreakTimeCHange(time) {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.break_time = time;
        this.setState({
            new_activity: modyfiedActivity
        });
    }
}