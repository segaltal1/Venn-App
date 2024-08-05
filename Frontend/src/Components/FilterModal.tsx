import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
}

const MAX_AGE = 120;
const MAX_DISTANCE = 1000;

const FilterModal: React.FC<FilterModalProps> = ({visible, onClose, onApply}) => {
    const [ageRange, setAgeRange] = useState([0, MAX_AGE]);
    const [distanceRange, setDistanceRange] = useState([0, MAX_DISTANCE]);
    const [sortField, setSortField] = useState('age');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


    const handleApply = () => {
        const filters = {
            ageRange,
            maxDistance: distanceRange[1] + 'km',
            sortBy: [sortField, sortDirection],
        };
        onApply(filters);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter Options</Text>

                    <View style={styles.sliderContainer}>
                        <Text>Age Range: {ageRange[0]} - {ageRange[1]}</Text>
                        <MultiSlider
                            trackStyle={{height: 5}}
                            selectedStyle={{backgroundColor: '#4a96dd'}}
                            markerStyle={{backgroundColor: '#4a96dd', height: 20, width: 20}}
                            pressedMarkerStyle={{backgroundColor: '#4a96dd'}}
                            values={ageRange}
                            sliderLength={280}
                            onValuesChange={(values) => setAgeRange(values)}
                            min={0}
                            max={MAX_AGE}
                            step={1}/>

                    </View>

                    <View style={styles.sliderContainer}>
                        <Text>Distance Range: {distanceRange[0]}km - {distanceRange[1]}km</Text>
                        <MultiSlider
                            trackStyle={{height: 5}}
                            selectedStyle={{backgroundColor: '#4a96dd'}}
                            markerStyle={{backgroundColor: '#4a96dd', height: 20, width: 20}}
                            pressedMarkerStyle={{backgroundColor: '#4a96dd'}}
                            values={distanceRange}
                            sliderLength={280}
                            onValuesChange={(values) => setDistanceRange(values)}
                            min={0}
                            max={MAX_DISTANCE}
                            step={1}/>

                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text>Sort By</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSortField(value)}
                            value={sortField}
                            items={[
                                {label: 'Age ', value: 'averageAge'},
                                {label: 'Distance', value: 'distanceFromCityCenter'},
                                {label: 'Name', value: 'neigborhood'},
                            ]}
                        />
                        <RNPickerSelect
                            onValueChange={(value) => setSortDirection(value)}
                            value={sortDirection}
                            items={[
                                {label: 'Ascending', value: 'asc'},
                                {label: 'Descending', value: 'desc'},
                            ]}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <LinearGradient colors={['#8ac3f1', '#4a96dd']} style={styles.button}>
                            <TouchableOpacity onPress={handleApply}>
                                <Text style={styles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        </LinearGradient>


                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sliderContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },

    dropdownContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,

    },
    buttonContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    cancelButtonText: {
        color: 'black',
    },
});

export default FilterModal;
