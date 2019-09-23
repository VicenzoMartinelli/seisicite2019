import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import api from '../services/api';
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Item,
  Content,
  Card,
  Icon,
  Them
} from 'native-base';

import Logo from '../assets/logo.png';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    api.post('/auth/login', { email, password })
      .then((r) => {
        console.log(r)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const styles = StyleSheet.create({
    title: {
      color: '#ff928b',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    main: {
      backgroundColor: "#eeeeee",
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      padding: 5
    }
  });

  return (
    <Container>
      <Content contentContainerStyle={styles.main}>
        <Card>
          <Image source={Logo} style={{ height: 80, width: 80, marginVertical: 20, alignSelf: 'center' }} />
          <Text style={styles.title}>Sei Sicite 2019</Text>
          <Form style={{ padding: 10 }}>
            <Item rounded >
              <Icon type="MaterialCommunityIcons" name="email" style={{ color: '#ff928b' }}></Icon>
              <Input value={email} onChangeText={(e) => setEmail(e)} placeholder='Insira seu email' />
            </Item>
            <Item rounded style={{ marginHorinzontal: 10, marginTop: 5 }}>
              <Icon type="Feather" name="unlock" style={{ color: '#ff928b' }}></Icon>
              <Input value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} placeholder='Insira sua senha' />
            </Item>

            <Button primary rounded bordered style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={handleLogin}>
              <Text style={{ width: '100%', textAlign: 'center' }}> Login </Text>
            </Button>
            <Button transparent style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={() => navigation.navigate('Register')}><Text style={{ width: '100%', textAlign: 'center' }}> Cadastrar-se </Text></Button>
          </Form>
        </Card>
      </Content>
    </Container >
  );
}
