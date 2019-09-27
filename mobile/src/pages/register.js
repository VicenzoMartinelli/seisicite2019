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
  Body,
  View
} from 'native-base';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default function Register({ navigation }) {

  const items = [
    {
      name: 'Modalidades',
      children: [
        { name: "daudhai" },
        { name: "2313123" },
        { name: "4111312" },
      ]
    }
  ];
  const [modalities, setModalities] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

  function onSelectedItemsChange(selectedItems) {
    setModalities(selectedItems);
  };

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
            <Item rounded >
              <Icon type="MaterialCommunityIcons" name="email" style={{ color: '#ff928b' }}></Icon>
              <Input value={email} onChangeText={(e) => setEmail(e)} placeholder='Insira seu email' />
            </Item>
            <Item rounded style={{ marginHorinzontal: 10, marginTop: 5 }}>
              <Icon type="Feather" name="unlock" style={{ color: '#ff928b' }}></Icon>
              <Input value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} placeholder='Insira sua senha' />
            </Item>

            <ListItem style={{ borderRadius: 40, padding: 5 }}>
              <Body>
                <Text style={{ color: "#e2e2e2" }}>Avaliar Sei</Text>
              </Body>
              <CheckBox color="#ff928b" onPress={() => setIsSei(!isSei)} checked={isSei} />
            </ListItem>
            <ListItem>
              <Body>
                <Text style={{ color: "#e2e2e2" }}>Avaliar Sicite</Text>
              </Body>
              <CheckBox color="#ff928b" onPress={() => setIsSicite(!isSicite)} checked={isSicite} />
            </ListItem>
            <Item rounded >
              <View style={{ flex: 1 }}>
                <SectionedMultiSelect
                  items={items}
                  colors={{ primary: '#ff928b' }}
                  uniqueKey="name"
                  subKey="children"
                  selectText="Modalidades atendidas"
                  showDropDowns={false}
                  modalWithSafeAreaView={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={modalities}
                />
              </View>
            </Item>


            <Button primary rounded bordered style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={handleRegister}>
              <Text style={{ width: '100%', textAlign: 'center' }}> Cadastrar-se </Text>
            </Button>

            <Button transparent style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={() => navigation.navigate('Login')}><Text style={{ width: '100%', textAlign: 'center' }}> Voltar  </Text></Button>
          </Form>
        </Card>
      </Content>
    </Container >
  );
}
