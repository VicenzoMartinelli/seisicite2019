import React, { useState, useEffect } from 'react';
import { Container, Header, Left, Right, Body, Button, Icon, View, Segment, Text, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as auth from '../services/auth';
import { FlatList } from 'react-native-gesture-handler';
import { findArticlesEvaluate, canEvaluateArticle } from '../services/api';

const ListDefault = ({ items, type, navigation }) => {

  const handleRenderItem = ({ item }) => {

    const handleOnClick = async () => {
      if (type !== 3) {
        canEvaluateArticle(item.id)
          .then((err) => {
            navigation.navigate('EvaluateArticle', {
              article: item
            });
          })
          .catch((x) => {
            Alert.alert('Atenção', 'Não é possível realizar esta avaliação. Verifique, por favor, a data e horário da mesma')
            return;
          })
      }
    }

    return (
      <TouchableOpacity key={item.id} onPress={handleOnClick}>
        <Card pointerEvents="none">
          <CardItem>
            <Left>
              <Text note style={{ fontWeight: 'bold' }}>Submissão: {item.submissionId}</Text>
            </Left>
            <Right>
              <Text note>{item.modality}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text note>Autor: </Text>
              <Text note style={{ fontWeight: 'bold' }}>{item.primaryAuthor.fullName}</Text>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ marginLeft: 10, fontSize: 13 }}>{item.title}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text note>{item.building}</Text>
            </Left>
            <Right>
              <Text note>{item.room}</Text>
            </Right>
          </CardItem>
          {item.localDetails && <CardItem>
            <Left>
              <Text note>{item.localDetails}</Text>
            </Left>
          </CardItem>
          }
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <Content>
      <FlatList
        style={{ marginTop: 10 }}
        onScrollBeginDrag={() => Alert.alert('oi')}
        data={items}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
      />
    </Content >
  );
}

export default function Home({ navigation }) {
  const [event, setEvent] = useState(1);
  const [toEvaluate, setToEvaluate] = useState([]);
  const [evualuated, setEvaluated] = useState([]);
  const [closed, setClosed] = useState([]);

  let [useSei, setUseSei] = useState(false);
  let [useSicite, setUseSicite] = useState(false);

  useEffect(() => {
    async function doOperations() {
      const userData = await auth.getUser();
      setUseSei(userData.isSei);
      setUseSicite(userData.isSicite);
    }

    doOperations()
  }, [])

  useEffect(() => {
    async function doOperations() {
      findArticlesEvaluate(event, 1)
        .then(res => {
          setToEvaluate(res.data);
        });

      findArticlesEvaluate(event, 2)
        .then(res => {
          setEvaluated(res.data);
        });

      findArticlesEvaluate(event, 3)
        .then(res => {
          setClosed(res.data);
        });
    }
    console.log('passo aq');

    doOperations();
  }, [event])

  function handleLogout() {
    auth.logout()
      .then(() => {
        navigation.navigate('Login')
      })
  }

  return (
    <Container>
      <Header androidStatusBarColor="#ff928b" style={styles.header} hasTabs>
        <Left>
          <Segment style={{ marginLeft: 50 }}>
            <Button style={{ width: 80, alignContent: 'center' }} disabled={!useSei} active={event === 1} onPress={() => event === 2 && setEvent(1)}><Text>Sei</Text></Button>
            <Button style={{ width: 80, alignContent: 'center' }} disabled={!useSicite} active={event === 2} onPress={() => event === 1 && setEvent(2)}><Text>Sicite</Text></Button>
          </Segment>
        </Left>
        <Right>
          <Button rounded transparent onPress={handleLogout}><Icon color='#FFF' type="MaterialIcons" name="exit-to-app" /></Button>
        </Right>
      </Header>
      <View style={styles.container}>
        <Tabs tabBarPosition={"bottom"} tabBarActiveTextColor='primary'>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-1" /><Text style={styles.tabHeadingText}>Pendentes</Text></TabHeading>}>
            <ListDefault items={toEvaluate} type={1} navigation={navigation} />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-2" /><Text style={styles.tabHeadingText}>Em aberto</Text></TabHeading>}>
            <ListDefault items={evualuated} type={2} navigation={navigation} />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-3" /><Text style={styles.tabHeadingText}>Finalizados</Text></TabHeading>}>
            <ListDefault items={closed} type={3} navigation={navigation} />
          </Tab>
        </Tabs>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff928b",
  },
  container: {
    flex: 1,
  },
  tabHeading: {
    flexDirection: 'column'
  },
  tabHeadingText: {
    fontSize: 11
  }
});