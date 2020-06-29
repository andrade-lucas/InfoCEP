import React, {useState} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

interface IProps {
    placeholder: string,
    onPressed: (cep: string) => void
}

export default function InputForm(props: IProps) {
    const [cep, setCEP] = useState('');
    return (
        <View style={styles.container}>
            <TextInput keyboardType="numeric" maxLength={8} placeholder={props.placeholder} style={styles.formControl} value={cep} 
            onChangeText={value => setCEP(value)} />
            <TouchableOpacity style={styles.btn} onPress={() => props.onPressed(cep)}>
                <Icon name="search" color="#fff" size={30} style={styles.btnIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    formControl: {
        flex: 4,
        fontSize: 21,
        alignSelf: 'stretch',
        marginLeft: '5%',
        paddingLeft: 25,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        backgroundColor: 'rgba(189, 188, 181, 0.3)'
    },
    btn: {
        flex: 1,
        marginRight: '5%',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        backgroundColor: '#2881ed'
    },
    btnIcon: {
        padding: 10,
        alignSelf: 'center'
    }
})
