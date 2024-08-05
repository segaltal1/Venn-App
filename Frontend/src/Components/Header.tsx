import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hood</Text>
            <Text style={styles.subtitle}>Finder</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Header;
