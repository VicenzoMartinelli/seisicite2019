import React, { useState } from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { registerUser } from '../services/api';
import {
  Container,
  Button,
  Text,
  Form,
  Content,
  Card,
  Icon,
  Toast
} from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Formik } from "formik";
import { ScrollView } from 'react-native-gesture-handler';
import { evaluateArticle as saveEvaluation } from '../services/api';

export default function EvaluateArticle({ navigation }) {
  const article = navigation.getParam('article', {})

  function handleSave(values) {
    saveEvaluation(values)
      .then(res => {
        console.log(res)
        if (res.success !== undefined && !res.success) {
          Alert.alert('Atenção', res.msg);
          return;
        }
        Toast.show({
          text: 'Avaliação efetuada com sucesso!',
          buttonText: 'Ok',
          onClose: () => navigation.navigate('Home')
        })
      })
      .catch(err => {
        Alert.alert('Ocorreu alguma problema ao submeter sua avaliação', err);
      });
  }

  const styles = StyleSheet.create({
    title: {
      color: '#ff928b',
      textAlign: 'center',
      fontSize: 22,
      paddingVertical: 15,
      paddingHorizontal: 10,
      fontWeight: 'bold'
    },
    subTitle: {
      paddingHorizontal: 10,
      fontSize: 15,
      color: '#6e6e6e',
      paddingBottom: 8,
      borderBottomColor: '#ff928b',
      borderBottomWidth: 2
    },
    main: {
      backgroundColor: "#eeeeee",
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      padding: 5
    },
    colorPrimary: {
      color: '#ff928b'
    },
    labelMarginLeft: {
      marginLeft: 3,
      marginTop: 10,
      fontSize: 11
    }
  });

  return (
    <Container>
      <Content contentContainerStyle={styles.main}>
        <Card>
          <ScrollView>
            <Text style={styles.title}>Avaliação da apresentação</Text>
            <Formik
              initialValues={article}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form style={{ padding: 10 }}>
                    <Text note style={styles.subTitle}>Critérios referentes à apresentação</Text>

                    <Text note style={styles.labelMarginLeft}>Postura (vocabulário, linguagem, entonação etc.)</Text>
                    <AirbnbRating
                      count={10}
                      defaultRating={values.notaPostura}
                      size={25}
                      showRating={false}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaPostura', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Organização e clareza da disposição dos itens</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaOrganizacaoClareza}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaOrganizacaoClareza', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Motivação</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaMotivacao}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaMotivacao', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Adequação de conteúdo ao tempo de apresentação (10 min)</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaAdequacaoTempoConteudo}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaAdequacaoTempoConteudo', e)}
                    />

                    <Text note style={[styles.subTitle, { marginTop: 15 }]}>Critérios referentes ao trabalho</Text>

                    <Text note style={styles.labelMarginLeft}>Introdução</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaIntroducaoTrabalho}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaIntroducaoTrabalho', e)}
                    />
                    <Text note style={styles.labelMarginLeft}>Objetivos (geral e específicos)</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaObjetivosTrabalho}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaObjetivosTrabalho', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Material e métodos concisos</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaMateriaisMetodo}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaMateriaisMetodo', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Sequência na apresentação (lógica e clara)</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaSequenciaLogica}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaSequenciaLogica', e)}
                    />

                    <Text note style={styles.labelMarginLeft}>Nível de conhecimento aparente do assunto (entendimento, clareza e capacidade de  explicação e respostas)</Text>
                    <AirbnbRating
                      count={10}
                      showRating={false}
                      defaultRating={values.notaConhecimentoAssunto}
                      size={25}
                      selectedColor='#ff928b'
                      onFinishRating={(e) => setFieldValue('notaConhecimentoAssunto', e)}
                    />

                    <Button primary rounded bordered style={{ marginVertical: 25, width: '80%', alignSelf: 'center' }} onPress={() => handleSave(values)}>
                      <Icon name="check" type="MaterialIcons" style={styles.colorPrimary} />
                      <Text style={{ width: '80%', textAlign: 'center' }}> Finalizar avaliação </Text>
                    </Button>

                    <Button transparent style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }}
                      onPress={() => navigation.navigate('Home')}><Text style={{ width: '100%', textAlign: 'center' }}> Voltar  </Text></Button>
                  </Form>
                );
              }}
            </Formik>
          </ScrollView>
        </Card>
      </Content>
    </Container >
  );
}
