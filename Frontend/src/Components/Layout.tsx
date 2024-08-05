import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

const Layout = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        minHeight: screenHeight,
    },
});

export default Layout;
