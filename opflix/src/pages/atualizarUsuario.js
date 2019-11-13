import React, { Component } from 'react';

import { View, Image, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'

// import { Container } from './styles';

const styles = StyleSheet.create({
    imgs: {
        height: 50,
        width: 50
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        marginTop: 20
    },
    texto: {
        marginVertical: 25,
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
        width: '75%',
        alignSelf: 'center',
        fontSize: 20,
    }
})



// import { Container } from './styles';

export default class pages extends Component {


    constructor() {
        super();
        this.state = {
            imagem: '',
            nome: '',
            email: '',
            dataNascimento: ''
        }
    }

    _salvarDadosUsuario = async () => {
        let jwtDecode = require('jwt-decode');
        let token = await AsyncStorage.getItem('@opflix:token')
        let values = jwtDecode(token);
        this.setState({ nome: values.Username, email: values.email, dataNascimento: values.DataNascimento, imagem: values.Imagem })
    }


    _tratarData = (data) => {
        let novaData = data.split(' ')
        return novaData[0]
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Image source={require('./../img/user_icon.png')} style={styles.imgs} />
        )
    }

    componentDidMount() {
        this._salvarDadosUsuario();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <TouchableOpacity style={{ width: '95%', marginTop: 15 }} onPress={() => console.log('atualizar')}>
                    <Image source={require('./../img/edit_24px.png')} style={{ alignSelf: 'flex-end' }} />
                </TouchableOpacity>
                <Image source={{ uri: this.state.imagem }} style={styles.profilePic} />
                <View style={{ marginTop: 15 }}>
                    <TextInput onChangeText={x => this.setState({ nome: x })} style={styles.texto} value={this.state.nome} />
                    <TextInput onChangeText={x => this.setState({ email: x })} style={styles.texto} value={this.state.email} />
                    <DatePicker onDateChange={x => this.setState({ dataNascimento: x })} style={styles.texto} placeholder={this.state.dataNascimento} />
                </View>
            </View>
        );
    }
}