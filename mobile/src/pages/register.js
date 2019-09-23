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
  ListItem,
  CheckBox,
  Body
} from 'native-base';

export default function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [modality, setModality] = useState('');
  const [isSei, setIsSei] = useState(false);
  const [isSicite, setIsSicite] = useState(false);

  function handleRegister() {
    api.post('/auth/register-evaluator', { email, password })
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
          <Text style={styles.title}>Realize seu cadastro</Text>
          <Form style={{ padding: 10 }}>
            <Item rounded >
              <Icon type="MaterialIcons" name="person" style={{ color: '#ff928b' }}></Icon>
              <Input value={name} onChangeText={(e) => setName(e)} placeholder='Insira seu nome' />
            </Item>
            <ListItem>
              <Body>
                <Text>Avaliar Sei</Text>
              </Body>
              <CheckBox checked={isSei} onPress={(e) => setIsSei(e === 'checked' ? false : true)} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Avaliar Sicite</Text>
              </Body>
              <CheckBox checked={isSicite} onPress={(e) => setIsSicite(e === 'checked' ? false : true)} />
            </ListItem>
            <Item rounded >
              <Icon type="MaterialIcons" name="person" style={{ color: '#ff928b' }}></Icon>
              <Input value={modality} onChangeText={(e) => setModality(e)} placeholder='Insira seu dakdasui' />
            </Item>
            <Item rounded >
              <Icon type="MaterialCommunityIcons" name="email" style={{ color: '#ff928b' }}></Icon>
              <Input value={email} onChangeText={(e) => setEmail(e)} placeholder='Insira seu email' />
            </Item>
            <Item rounded style={{ marginHorinzontal: 10, marginTop: 5 }}>
              <Icon type="Feather" name="unlock" style={{ color: '#ff928b' }}></Icon>
              <Input value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} placeholder='Insira sua senha' />
            </Item>

            <Button primary rounded bordered style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={handleRegister}>
              <Text style={{ width: '100%', textAlign: 'center' }}> Login </Text>
            </Button>
          </Form>
        </Card>
      </Content>
    </Container >
  );
}
