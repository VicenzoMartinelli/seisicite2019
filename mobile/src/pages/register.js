import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { registerUser } from '../services/api';
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  AlertButton,
  Item,
  Content,
  Card,
  Icon,
  Picker,
  CheckBox,
  View
} from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as yup from 'yup';
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFormikControl
} from "react-native-formik";
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { findModalidades, findInstitutions } from '../services/api';


export default function Register({ navigation }) {
  const [dataModalities, setDataModalities] = useState([])
  const [dataInstituicoes, setDataInstituicoes] = useState([])

  useEffect(() => {
    async function loadData() {
      findModalidades()
        .then(res => {
          setDataModalities(res.data.map((x) => ({ name: x })));
        });

      findInstitutions()
        .then(res => {
          setDataInstituicoes(res.data);
        });
    }

    loadData();
  }, []);

  const initial = {
    modalities: [],
    institution: '',
    isSei: true,
    isSicite: true,
    email: '',
    password: '',
    name: ''
  }

  const InputWithErrorError = ({ error, ...props }) => <View style={{ height: 55, flex: 1 }}>
    <Input {...props} />
    <Text style={styles.labelError}>{error}</Text>
  </View>;

  const CustomInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
  )(InputWithErrorError);

  const CustomForm = withNextInputAutoFocusForm(KeyboardAvoidingView, {
    submitAfterLastInput: false
  });

  const schema = yup.object().shape({
    modalities: yup
      .array()
      .min(1, 'Informe no mínimo uma modalidade'),
    institution: yup
      .string()
      .required('Informe uma instituição'),
    name: yup
      .string()
      .required('Informe o seu nome'),
    email: yup
      .string()
      .email('Informe um email válido')
      .required('Informe o email'),
    password: yup
      .string()
      .min(6, 'Informe uma senha com no mínimo 6 caracteres')
      .required('Informe a senha')
  });

  function handleRegister(values) {
    registerUser(values)
      .then(res => {
        if (res.success !== undefined && !res.success) {
          Alert.alert('Ocorreu alguma problema com seu cadastro', res.msg);
          return;
        }
        Alert.alert(
          'Cadastro efetuado com sucesso',
          'Agora para continuar deverá esperar até que a comissão aprove o seu cadastro',
          [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]
        );
      })
      .catch(err => {
        Alert.alert('Ocorreu alguma problema com seu cadastro', err);
      });
  }

  const styles = StyleSheet.create({
    title: {
      color: '#ff928b',
      textAlign: 'center',
      fontSize: 30,
      paddingTop: 15,
      paddingBottom: 15,
      fontWeight: 'bold'
    },
    main: {
      backgroundColor: "#eeeeee",
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      padding: 5
    },
    labelError: {
      fontSize: 11,
      color: '#f44336',
      marginLeft: 10
    },
    colorPrimary: {
      color: '#ff928b'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputIcon: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      flex: 0.8
    }
  });
  return (
    <Container>
      <Content contentContainerStyle={styles.main}>
        <Card key="1">
          <CustomForm behavior='height'>
            <ScrollView>
              <Text style={styles.title}>Realize seu cadastro</Text>
              <Formik
                initialValues={initial}
                onSubmit={handleRegister}
                validationSchema={schema}
              >
                {({ values, errors, touched, setFieldValue }) => {
                  return (
                    <Form style={{ padding: 10 }}>
                      <Item rounded style={{ marginBottom: 10 }}>
                        <Icon type="MaterialCommunityIcons" name="email" style={styles.colorPrimary}></Icon>
                        <CustomInput name="name" placeholderTextColor='#a3a3a3' placeholder='Insira seu nome' />
                      </Item>
                      <Item rounded style={{ marginBottom: 10 }}>
                        <Icon type="MaterialCommunityIcons" name="email" style={styles.colorPrimary}></Icon>
                        <CustomInput name="email" type="email" placeholderTextColor='#a3a3a3' placeholder='Insira seu email' />
                      </Item>

                      <Item rounded style={{ height: 50, marginBottom: 10, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
                        <Text style={{ marginRight: 20 }} onPress={(e) => setFieldValue('isSei', !values.isSei)} note>Avaliar Sei</Text>
                        <CheckBox color="#ff928b" onPress={(e) => setFieldValue('isSei', !values.isSei)} checked={values.isSei} />
                      </Item>

                      <Item rounded style={{ height: 50, marginBottom: 10, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
                        <Text style={{ marginRight: 20 }} note onPress={(e) => setFieldValue('isSicite', !values.isSicite)}>Avaliar Sicite</Text>
                        <CheckBox color="#ff928b" onPress={(e) => setFieldValue('isSicite', !values.isSicite)} checked={values.isSicite} />
                      </Item>

                      <Item rounded style={{ marginBottom: 10 }}>
                        <Icon type="Feather" name="unlock" style={styles.colorPrimary}></Icon>
                        <CustomInput style={{ flex: 1 }} name="password" type="password" secureTextEntry={true} placeholderTextColor='#a3a3a3' placeholder='Insira sua senha' />
                      </Item>

                      <Item rounded picker style={{ marginBottom: 10 }}>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Selecione a instituição"
                          placeholderStyle={{ color: "#a3a3a3" }}
                          placeholderIconColor="#ff9282"
                          selectedValue={values.institution}
                          onValueChange={(e) => setFieldValue('institution', e)}
                        >
                          {dataInstituicoes.map((e) => (<Picker.Item key={e} style={{ fontSize: 8 }} label={e} value={e} />))}
                        </Picker>
                      </Item>

                      <Item rounded >
                        <View style={{ flex: 1 }}>
                          <SectionedMultiSelect
                            items={dataModalities}
                            colors={{
                              primary: '#ff9282',
                              success: '#ff928b',
                              cancel: '#a3a3a3',
                              text: '#a3a3a3',
                              subText: '#a3a3a3',
                              selectToggleTextColor: '#a3a3a3',
                              searchPlaceholderTextColor: '#a3a3a3',
                              searchSelectionColor: '#a3a3a3',
                              chipColor: '#a3a3a3',
                              itemBackground: '#FFF',
                              subItemBackground: '#FFF'
                            }}
                            uniqueKey="name"
                            searchTextFontFamily={{ fontWeight: 'normal' }}
                            itemFontFamily={{ fontWeight: 'normal' }}
                            confirmTextFontFamily={{ fontWeight: 'normal' }}
                            selectText="Modalidades atendidas"
                            selectedText=""
                            confirmText="Confirmar"
                            searchText="Selecione"
                            searchPlaceholderText="Buscar modalidadess..."
                            showDropDowns={false}
                            modalWithSafeAreaView={true}
                            readOnlyHeadings={false}
                            onSelectedItemsChange={(x) => setFieldValue('modalities', x)}
                            selectedItems={values.modalities}
                          />
                          {errors.modalities && touched.modalities && <Text style={styles.labelError}>{errors.modalities}</Text>}
                        </View>
                      </Item>

                      <Button primary rounded bordered style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }} onPress={() => handleRegister(values)}>
                        <Text style={{ width: '100%', textAlign: 'center' }}> Cadastrar-se </Text>
                      </Button>

                      <Button transparent style={{ marginVertical: 10, width: '50%', alignSelf: 'center' }}
                        onPress={() => navigation.navigate('Login')}><Text style={{ width: '100%', textAlign: 'center' }}> Voltar  </Text></Button>
                    </Form>
                  );
                }}
              </Formik>
            </ScrollView>
          </CustomForm>
        </Card>
      </Content>
    </Container >
  );
}
