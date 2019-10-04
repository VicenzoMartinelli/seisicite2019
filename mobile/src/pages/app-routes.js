import React, { Fragment } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import * as auth from '../services/auth';
const messages = [
  { id: 1, name: 'Diego Fernandes', avatar_url: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4', last_message: 'Lorem ipsum', time: '18:20 PM' },
  { id: 2, name: 'Claudio Orlandi', avatar_url: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g', last_message: 'Lorem ipsum', time: '10:12 AM' },
];

const blogList = [
  { id: 1, title: 'O impacto do café no psicológico humano', author: 'Claudio Orlandi', modality: 'Tecnologia', time: 'Daqui 5 minutos' }
];

const Home = ({ blogList }) => (
  <Content>
    {blogList.map(blog => (
      <Card key={blog.id}>
        <CardItem>
          <Body>
            <Text note>{blog.author}</Text>
            <Text note>{blog.modality}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{blog.title}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Text note>UTFPR - Sala 108</Text>
          </Left>
          <Right>
            <Text note>{blog.time}</Text>
          </Right>
        </CardItem>
      </Card>))}
  </Content>
);

const Messages = ({ messages }) => (
  <Fragment>
    <List>
      {messages.map(message => (
        <ListItem avatar key={message.id}>
          <Left>
            <Thumbnail source={{ uri: message.avatar_url }} />
          </Left>
          <Body>
            <Text>{message.name}</Text>
            <Text note>{message.last_message}</Text>
          </Body>
          <Right>
            <Text note>{message.time}</Text>
          </Right>
        </ListItem>
      ))}
    </List>
    <Fab
      direction="up"
      position="bottomRight"
      style={{ backgroundColor: "#7159C1" }}
    >
      <Icon type="FontAwesome" name="plus" />
    </Fab>
  </Fragment>
);
const Notification = () => null;


export default function HomeRoutes({ navigation }) {
  function handleLogout() {
    auth.logout()
      .then(() => {
        navigation.navigate('Login')
      })
  }

  return (
    <Container>
      <Header noLeft androidStatusBarColor="#ff928b" style={styles.header} hasTabs>
        <Body>
          <Title style={{ fontWeight: 'bold', textAlign: 'center' }}>Sei Sicite 2019</Title>
        </Body>
        <Right>
          <Button rounded transparent onPress={handleLogout}><Icon color='#FFF' type="MaterialIcons" name="exit-to-app" /></Button>
        </Right>
      </Header>
      <View style={styles.container}>
        <Tabs tabBarPosition={"bottom"} tabBarActiveTextColor='primary'>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-1" /><Text style={styles.tabHeadingText}>Pendentes</Text></TabHeading>}>
            <Home blogList={blogList} />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-2" /><Text style={styles.tabHeadingText}>Em aberto</Text></TabHeading>}>
            <Notification />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Icon type="MaterialCommunityIcons" name="numeric-3" /><Text style={styles.tabHeadingText}>Finalizados</Text></TabHeading>}>
            <Messages messages={messages} />
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