import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

type SearchAutocompleteProps = {
    data: string[];
    onSelectItem: (item: string) => void;
    placeholder: string;
};

const SearchAutocomplete = ({data, onSelectItem}: SearchAutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const handleInputChange = (text: string) => {
        setQuery(text);
        if (text.length > 0) {
            const filtered = data.filter((item) =>
                item.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
            setIsDropdownVisible(true);
        } else {
            setFilteredData([]);
            setIsDropdownVisible(false);
        }
    };

    const handleSelectItem = (item) => {
        setQuery(item);
        setFilteredData([]);
        onSelectItem(item);
    };

    const cleanInput = () => {
        setQuery('');
        setFilteredData([]);
        setIsDropdownVisible(false);
        onSelectItem('');
    }


    return (
        <View style={styles.container}>
            <Image source={require('../assets/icons/search.png')} style={styles.icon}/>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={handleInputChange}
                placeholder="Search"
                placeholderTextColor="#999"
                underlineColorAndroid="transparent"
                autoCapitalize="none"

            />
            <TouchableOpacity onPress={cleanInput} style={styles.cleanIcon}>
                <Image
                    style={{width: 18, height: 18}}
                    source={require('../assets/icons/clean.png')}
                />
            </TouchableOpacity>

            {isDropdownVisible && (
                <FlatList
                    data={[...new Set(filteredData)].slice(0, 5)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => handleSelectItem(item)}>
                            <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.dropdown}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 8,
        position: 'relative',
        zIndex: 10,
        elevation: 10,
        width: '80%',
    },
    icon: {
        width: 18,
        height: 18,
        position: 'absolute',
        zIndex: 10,
        top: 10,
        left: 10,
    },
    cleanIcon: {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        right: 10,

    },
    input: {
        height: 40,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 40,
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        top: 40,
        zIndex: 10,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchAutocomplete;
