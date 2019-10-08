import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { resetPassword } from '../services/api';
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Item,
  Content,
  Card,
  Icon,
  Toast
} from 'native-base';
import Loader from "react-native-modal-loader";

export default function ResetPassword({ navigation }) {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function handleReset() {
    if (validateEmail(email)) {
      setLoading(true);

      resetPassword(email)
        .then(res => {
          setLoading(false);

          if (res.success !== undefined && !res.success) {
            Alert.alert('Atenção', "Não foi possível finalizar o processo");
            return;
          }

          Toast.show({
            text: 'Uma nova senha foi encaminhada no seu email!',
            buttonText: 'Ok',
            onClose: () => navigation.navigate('Login')
          })
        })
        .catch(err => {
          setLoading(false);

          Alert.alert('Atenção', 'Não foi possível finalizar o processo');
        });
    }
    else {
      Toast.show({
        text: 'Informe um email válido!',
        buttonText: 'Ok',
        type: 'danger'
      })
    }
  }

  const styles = StyleSheet.create({
    title: {
      color: '#ff928b',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
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
        <Card style={{ padding: 10 }}>
          <Loader color='#ff928b' loading={loading} />
          <Text style={styles.title}>Informe o email com que se cadastrou</Text>
          <Text style={styles.title}>Vamos enviar uma nova senha</Text>
          <Form style={{ padding: 10 }}>
            <Item rounded >
              <Icon type="MaterialCommunityIcons" name="email" style={{ color: '#ff928b' }}></Icon>
              <Input value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={(e) => setEmail(e)} placeholder='Email' />
            </Item>

            <Button primary rounded bordered style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={handleReset}>
              <Text style={{ width: '100%', textAlign: 'center' }}> Confirmar </Text>
            </Button>

            <Button transparent style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }}
              onPress={() => navigation.navigate('Login')}><Text style={{ width: '100%', textAlign: 'center' }}> Voltar  </Text></Button>
          </Form>
        </Card>
      </Content>
    </Container >
  );
}
