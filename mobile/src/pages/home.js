import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Icon,
  View,
  Segment,
  Text,
  Content,
  Tab,
  Tabs,
  TabHeading,
  Card,
  CardItem,
  Toast
} from "native-base";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as auth from "../services/auth";
import { FlatList } from "react-native-gesture-handler";
import { findArticlesEvaluate, canEvaluateArticle } from "../services/api";
import Loader from "react-native-modal-loader";
import "moment/locale/pt-br";
import moment from "moment";

const ListDefault = ({ items, setLoading, type, navigation }) => {
  const handleRenderItem = ({ item }) => {
    const handleOnClick = async () => {
      if (type !== 3) {
        setLoading(true);

        canEvaluateArticle(item.id)
          .then(err => {
            setLoading(false);
            navigation.navigate("EvaluateArticle", {
              article: item
            });
          })
          .catch(x => {
            setLoading(false);
            Alert.alert(
              "Atenção",
              "Não é possível realizar esta avaliação. Verifique, por favor, a data e horário da mesma"
            );
            return;
          });
      }
    };
    const date = moment(item.startDate, moment.ISO_8601).locale("pt-br");

    return (
      <TouchableOpacity key={item.id} onPress={handleOnClick}>
        <Card pointerEvents="none">
          <CardItem>
            <Left>
              <Text note style={{ fontWeight: "bold" }}>
                Submissão: {item.submissionId}
              </Text>
            </Left>
            <Right>
              <Text note>{item.modality}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text note style={{ marginLeft: 10, fontWeight: "bold" }}>
                Autor(es): {item.primaryAuthor.fullName}
                {item.secundaryAuthor &&
                  item.secundaryAuthor.fullName &&
                  `, ${item.secundaryAuthor.fullName}`}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ marginLeft: 10, fontSize: 13 }}>{item.title}</Text>
            </Body>
          </CardItem>
          {(item.building.length > 0 || item.room.length > 0) ? (
            <CardItem>
              <Left>
                <Text note>{item.building}</Text>
              </Left>
              <Right>
                <Text note>{item.room}</Text>
              </Right>
            </CardItem>
          ) : null}
          {(item.localDetails || "").length > 0 ? (
            <CardItem>
              <Left>
                <Text note>{item.localDetails}</Text>
              </Left>
            </CardItem>
          ): null}
          <CardItem>
            <Left>
              <Text note>
                {date.format("DD") + " de " + date.format("MMMM - HH:mm")}
              </Text>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Content>
      <FlatList
        style={{ marginTop: 10 }}
        data={items}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
      />
    </Content>
  );
};

export default function Home({ navigation }) {
  const [event, setEvent] = useState(1);
  const [toEvaluate, setToEvaluate] = useState([]);
  const [evualuated, setEvaluated] = useState([]);
  const [closed, setClosed] = useState([]);
  const [loading, setLoading] = useState(false);

  let [useSei, setUseSei] = useState(false);
  let [useSicite, setUseSicite] = useState(false);

  useEffect(() => {
    async function doOperations() {
      const userData = await auth.getUser();
      setUseSei(userData.isSei);
      setUseSicite(userData.isSicite);
    }

    doOperations();
  }, []);

  useEffect(() => {
    async function doOperations() {
      setLoading(true);
      let completed = [false, false, false];

      function finalizeLoading() {
        if (completed.every(x => x)) {
          setLoading(false);
        }
      }

      try {
        findArticlesEvaluate(event, 1).then(res => {
          setToEvaluate(res.data);

          completed[0] = true;
          finalizeLoading();
        });

        findArticlesEvaluate(event, 2).then(res => {
          setEvaluated(res.data);

          completed[1] = true;
          finalizeLoading();
        });

        findArticlesEvaluate(event, 3).then(res => {
          setClosed(res.data);

          completed[2] = true;
          finalizeLoading();
        });
      } catch (error) {
        setLoading(false);
        Toast.show({
          text: "Não foi possível conectar-se com o servidor",
          buttonText: "Ok",
          type: "danger"
        });
      }
    }

    doOperations();
  }, [event]);

  function handleLogout() {
    auth.logout().then(() => {
      navigation.navigate("Login");
    });
  }

  function handleEventChange() {
    setLoading(true);

    if (event === 1) {
      setEvent(2);
    } else {
      setEvent(1);
    }
  }

  return (
    <Container>
      <Header
        noLeft={(useSicite && !useSei) || (!useSicite && useSei)}
        androidStatusBarColor="#ff928b"
        style={styles.header}
        hasTabs
      >
        <Left>
          {useSicite && useSei && (
            <Button rounded transparent onPress={handleEventChange}>
              <Icon color="#FFF" type="MaterialIcons" name="compare-arrows" />
            </Button>
          )}
        </Left>
        <Body>
          <Text style={{ color: "#FFF", fontSize: 16 }}>
            {event === 1 ? "Evento: Sei" : "Evento: Sicite"}
          </Text>
        </Body>
        <Right>
          <Button rounded transparent onPress={handleLogout}>
            <Icon color="#FFF" type="MaterialIcons" name="exit-to-app" />
          </Button>
        </Right>
      </Header>
      <View style={styles.container}>
        <Loader color="#ff928b" loading={loading} />

        <Tabs tabBarPosition={"bottom"} tabBarActiveTextColor="primary">
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Icon type="MaterialCommunityIcons" name="numeric-1" />
                <Text style={styles.tabHeadingText}>Pendentes</Text>
              </TabHeading>
            }
          >
            <ListDefault setLoading={setLoading} items={toEvaluate} type={1} navigation={navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Icon type="MaterialCommunityIcons" name="numeric-2" />
                <Text style={styles.tabHeadingText}>Em aberto</Text>
              </TabHeading>
            }
          >
            <ListDefault setLoading={setLoading} items={evualuated} type={2} navigation={navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Icon type="MaterialCommunityIcons" name="numeric-3" />
                <Text style={styles.tabHeadingText}>Finalizados</Text>
              </TabHeading>
            }
          >
            <ListDefault setLoading={setLoading} items={closed} type={3} navigation={navigation} />
          </Tab>
        </Tabs>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff928b"
  },
  container: {
    flex: 1
  },
  tabHeading: {
    flexDirection: "column"
  },
  tabHeadingText: {
    fontSize: 11
  }
});
