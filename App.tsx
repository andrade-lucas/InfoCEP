import React from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import Axios from 'axios';

import InputForm from './src/components/InputForm';

interface IProps {
}

interface IState {
  cepInfo: any,
  isBusy: Boolean
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      cepInfo: {},
      isBusy: false
    }
  }

  getInfo = async (cep: string) => {
    this.setState({ isBusy: true });
    let info = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
    this.setState({ cepInfo: info });
    this.setState({ isBusy: false });
  }

  renderInfo = () => {
    if (!this.state.isBusy) {
      return (
        <View style={styles.infoContainer}>
          <Text><Text style={styles.strong}>CEP:</Text> {this.state.cepInfo.cep}</Text>
          <Text><Text style={styles.strong}>Logradouro:</Text> {this.state.cepInfo.logradouro}</Text>
          <Text><Text style={styles.strong}>Complemento:</Text> {this.state.cepInfo.complemento}</Text>
          <Text><Text style={styles.strong}>Bairro:</Text> {this.state.cepInfo.bairro}</Text>
          <Text><Text style={styles.strong}>Cidade:</Text> {this.state.cepInfo.localidade}</Text>
          <Text><Text style={styles.strong}>UF:</Text> {this.state.cepInfo.uf}</Text>
          <Text><Text style={styles.strong}>IBGE:</Text> {this.state.cepInfo.ibge}</Text>
        </View>
      );
    }
    return <ActivityIndicator size={50} style={styles.indicator} />;
  }

  render = () => {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={require('./assets/img/logo-nome.png')} style={styles.logo} />
        <InputForm placeholder="Digite o CEP" onPressed={this.getInfo} />
        {this.renderInfo()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffef00'
  },
  logo: {
    flex: 1,
    height: 150,
    width: 300,
    alignSelf: 'center'
  },
  indicator: {
    marginTop: 50
  },
  infoContainer: {
    flex: 1,
    height: '100%',
    margin: '5%',
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#rgba(189, 188, 181, 0.3)'
  },
  strong: {
    fontWeight: 'bold'
  }
});
