import React from 'react';
import { ScrollView, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';

const styles = StyleSheet.create({
    header: {
        height: 125, 
        backgroundColor: '#11a36c',
        marginBottom: -5,
        justifyContent: 'flex-end',
        padding: 20
    },
    headerText: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 20
    }
});

export default NavigationComponent = (props) => (
    <ScrollView>
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Trainer</Text>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
);
