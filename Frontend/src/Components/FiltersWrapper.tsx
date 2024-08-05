import React, {useMemo} from 'react';
import {useGlobalContext} from '../context';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchAutocomplete from './AutocompleteSearch';
import FilterModal from './FilterModal';

const FiltersWrapper = () => {
    const {neighborhoodList} = useGlobalContext();
    const {isFilterModalOpen, setIsFilterModalOpen, setFilterParams, setSelectedNeighborhood} = useGlobalContext();

    const handleSelectItem = (selectedPlace: string) => {
        setSelectedNeighborhood(selectedPlace);
    };

    const handleCloseModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleApplyFilters = (filters: any) => {
        console.log('Applied filters:', filters);

        setFilterParams(({...filters}));
    };

    const neighborhoodNamesList = useMemo(() => {
        return neighborhoodList?.map((item) => item.neigborhood) || [];
    }, [neighborhoodList]);

    return (
        <View style={styles.container}>
            <SearchAutocomplete
                data={neighborhoodNamesList}
                placeholder="Search fruits..."
                onSelectItem={handleSelectItem}
            />
            <LinearGradient colors={['#8ac3f1', '#4a96dd']} style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={() => setIsFilterModalOpen(!isFilterModalOpen)}>
                    <Image source={require('../assets/icons/filter.png')} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </LinearGradient>

            <FilterModal
                visible={isFilterModalOpen}
                onClose={handleCloseModal}
                onApply={handleApplyFilters}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 45,
        height: 45,
    },

});

export default FiltersWrapper;
