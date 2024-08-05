import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useFetchNeighborhoods} from '../hooks';
import Loader from './Loader';
import {useGlobalContext} from '../context';

const NeighborhoodsList = () => {
    const {filterParams, setNeighborhoodList, selectedNeighborhood} = useGlobalContext();
    const {data, loading, error} = useFetchNeighborhoods(filterParams);

    useEffect(() => {
        setNeighborhoodList(data);
    }, [data]);

    const listToDisplay = useMemo(() => {
        if (selectedNeighborhood && data) {
            return data.filter((item) => item.neigborhood === selectedNeighborhood);
        }
        return data;

    }, [data, selectedNeighborhood]);


    if (loading) {
        return <Loader/>
    }


    const renderItem = ({item}) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.neigborhood}</Text>
                <Text style={styles.distance}>{`${item.distanceFromCityCenter}km from city center`}</Text>
                <Text style={styles.avgAge}>{`Average age: ${item.averageAge}`}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hoods</Text>
            {listToDisplay && listToDisplay.length > 0 ? (
                <FlatList
                    data={listToDisplay}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />
            ) : (
                <Text>No neighborhoods found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        elevation: 1,
        zIndex: 1,
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    itemContainer: {
        backgroundColor: '#fef8f8',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,

    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    distance: {
        fontSize: 14,
        color: '#549de0',
    },
    avgAge: {
        fontSize: 14,
    },

});

export default NeighborhoodsList;
