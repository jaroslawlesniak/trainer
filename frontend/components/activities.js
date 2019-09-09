import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Modal, View, AsyncStorage, Text, StyleSheet, ToolbarAndroid } from 'react-native';
import Page from '../libs/page';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { CheckBox, Button } from 'react-native-elements';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000"
    },
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        padding: 15
    },
    header: {
        color: "#fff"
    },
    input: {
        padding: 5,
        backgroundColor: '#646b73',
        borderRadius: 10,
        color: '#fff'
    }
});

export default class Activities extends React.Component {
    static navigationOptions = {
        title: "Ćwiczenia",
        drawerIcon: (<MaterialCommunityIcons name='dumbbell' size={18}/>)
    }

    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            page: Page.ACTIVITIES,
            is_modyfied: false,
            modyfied_id: 0,
            new_activity: {
                title: '',
                break_time: 0,
                days: [false, false, false, false, false, false, false],
                series: [0]
            }
        }

        this.loadActivitiesFromLocalStorage();
    }

    render() {
        let content, series;

        if(this.state.page === Page.ACTIVITIES) {
            if(this.state.activities.length !== 0) {
                content = this.state.activities.map((activity, key) => (
                    <View key={key} style={styles.item}>
                        <Text style={{ fontSize: 20, color: '#666' }}>{activity.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome style={{color: '#f2f2f2', marginRight: 25 }} onPress={() => {this.modyfyActivity(key, activity)}} size={20} name="cog"/>
                            <FontAwesome style={{color: '#f44242' }} onPress={() => {this.deleteActivity(key)}} size={20} name="trash"/>
                        </View>
                    </View>
                ))
            }
        }
        if(this.state.page === Page.NEW_ACTIVITY) {
            series = this.state.new_activity.series.map((serie, key) => (
                <View key={key}>
                    <Text style={{ color: '#fff' }}>{key + 1}. seria</Text>
                    <TextInput style={styles.input} value={serie.toString()} onChangeText={(e) => {this.handleSerieChange(key, e)}} keyboardType='numeric'/>
                    <FontAwesome style={{backgroundColor: '#f44242', color: "#fff", padding: 10, width: 40, textAlign: 'center', borderRadius: 100}} onPress={() => {this.deleteSingleSerie(key)}} size={20} name="trash"/>
                </View>
            ));
            return (
            <Modal animationType="fade" transparent={false} onRequestClose={() => {this.setState({page: Page.ACTIVITIES})}}>
                <ScrollView style={{ backgroundColor: '#000' }}>
                    <View style={{padding: 10 }}>
                        <Text style={styles.header}>Nazwa ćwiczenia</Text>
                        <TextInput value={this.state.new_activity.title} style={styles.input} onChangeText={(e) => {this.handleTitleChange(e)}}/>
                        <Text style={styles.header}>Czas pomiędzy seriami</Text>
                        <TextInput value={this.state.new_activity.break_time.toString()} style={styles.input} onChangeText={(e) => {this.handleBreakTimeCHange(e)}}/>
                        <Text style={styles.header}>Dni tygodnia</Text>
                        <CheckBox title='Poniedziałek' checked={this.state.new_activity.days[0]} onPress={() => {this.handleCheckDay(0)}}/>
                        <CheckBox title='Wtorek' checked={this.state.new_activity.days[1]} onPress={() => {this.handleCheckDay(1)}}/>
                        <CheckBox title='Środa' checked={this.state.new_activity.days[2]} onPress={() => {this.handleCheckDay(2)}}/>
                        <CheckBox title='Czwartek' checked={this.state.new_activity.days[3]} onPress={() => {this.handleCheckDay(3)}}/>
                        <CheckBox title='Piątek' checked={this.state.new_activity.days[4]} onPress={() => {this.handleCheckDay(4)}}/>
                        <CheckBox title='Sobota' checked={this.state.new_activity.days[5]} onPress={() => {this.handleCheckDay(5)}}/>
                        <CheckBox title='Niedziela' checked={this.state.new_activity.days[6]} onPress={() => {this.handleCheckDay(6)}}/> 
                        <Text style={styles.header}>Powtórzenia w serii</Text>
                        {series}
                        <Button title="Dodaj serię" onPress={() => { this.addNewSerie() }}/>
                    </View>
                    <Button title='Zapisz' onPress={() => { this.submitActivity() }}/>
                </ScrollView>
            </Modal>);
        }

        return (
            <View style={ styles.page }>
                <ToolbarAndroid titleColor="#fff" title='Ćwiczenia' style={{ height: 55 }}
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
                page: Page.NEW_ACTIVITY,
                is_modyfied: false
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

    handleCheckDay(position) {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.days[position] = !modyfiedActivity.days[position];
        this.setState({
            new_activity: modyfiedActivity
        });
    }

    handleSerieChange(position, value) {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.series[position] = value;
        this.setState({
            new_activity: modyfiedActivity
        });
    }

    addNewSerie() {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.series.push(0);
        this.setState({
            new_activity: modyfiedActivity
        });
    }

    deleteSingleSerie(id) {
        let modyfiedActivity = this.state.new_activity;
        modyfiedActivity.series.splice(id, 1);

        this.setState({
            new_activity: modyfiedActivity
        });
    }

    async submitActivity() {
        let activity = {
            title: this.state.new_activity.title,
            break_time: this.state.new_activity.break_time,
            days: this.state.new_activity.days,
            series: this.state.new_activity.series,
            last_complete_day: ''
        }

        let newActivities = this.state.activities;

        if(this.state.is_modyfied === false) {
            newActivities.push(newActivity);
        } else {
            newActivities[this.state.modyfied_id] = activity;
        }

        await AsyncStorage.setItem('activities', JSON.stringify(newActivities));

        this.setState({
            activities: newActivities,
            page: Page.ACTIVITIES
        });
    }

    async deleteActivity(id) {
        let allActivities = await AsyncStorage.getItem('activities');
        allActivities = JSON.parse(allActivities);
        allActivities.splice(id, 1);
        await AsyncStorage.setItem('activities', JSON.stringify(allActivities));

        this.setState({
            activities: allActivities
        });
    }

    modyfyActivity(id, activity) {
        this.setState({
            page: Page.NEW_ACTIVITY,
            new_activity: activity,
            is_modyfied: true,
            modyfied_id: id
        });
    }
}