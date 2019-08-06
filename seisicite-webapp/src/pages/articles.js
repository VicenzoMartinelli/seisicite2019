import React, { useState } from 'react'
import { Box, Text, DataTable, Tabs, Tab, Heading } from 'grommet'
import Sidebar from '../components/sidebar'
import withAuth from '../components/withAuth'
import { brand } from '../styles/theme'
import CardArticle from '../components/cardArticle';


const columns = [
  {
    property: "SubmissionId",
    header: "ID Submissão",
    primary: true
  },
  {
    property: "Title",
    header: 'Título'
  },
  {
    property: "Modality",
    header: "Molidade"
  },
  {
    property: "StartDate",
    header: "Data Início",
    render: datum =>
      datum.date && new Date(datum.date).toLocaleDateString("pt-BR"),
  },
  {
    property: "Building",
    header: "Estabelecimento"
  },
  {
    property: "Room",
    header: "Sala"
  }
];

const DATA = [
  /* 1 */
  {
    "_id": "5d48c5d13d8b6f2e1499fa60",
    "Event": 1,
    "AssessmentStatus": 1,
    "ApresentationType": 1,
    "SubmissionId": "2243",
    "Title": "Epistemologia qualitativa e teoria da subjetividade de Fernando González Rey: contribuições para o resgate do sujeito na pesquisa em administração",
    "Resume": "A pesquisa em Administração é criticada por alguns autores da área como Guerreiro Ramos (1989), Chanlat (1996), Enriquez (2000) e Tragtenberg (2005), por ser baseada somente na ciência formal, predominantemente positivista/funcionalista. Para estes autores esta limitação demanda novos subsídios para repensar este predomínio paradigmático e buscar novos sentidos para o mundo, abrindo possibilidades para vê-lo como “uma prática social” formada a partir de uma subjetividade social que é “a forma pela qual as múltiplas configurações de espaços sociais e ordens diferentes se configuram subjetivamente em cada espaço social concreto, em seus processos constituintes e nos indivíduos que interatuam nesses espaços” (GONZÁLEZ REY e MITJÁNS MARTÍNEZ, 2017, p. 83). Este artigo propõe um novo olhar para a pesquisa em Administração, que resgate a “temática do Sujeito” que “passou a ocupar o centro das reflexões no campo das teorias sociais e da cultura” (MALUF, 2013, p.133), um sujeito singular, dialético e complexo, “um homem que de forma simultânea representa uma singularidade e um ser social, relação que não é uma determinação externa, mas uma relação recursiva” (GONZÁLEZ REY, 2003, p. 224). E, olhar para as organizações como espaços sociais relacionais no quais se produz subjetividade.",
    "PrimaryAuthor": {
      "FirstName": "Liliane",
      "MiddleName": "",
      "LastName": "Canopf",
      "Country": "BR",
      "Institution": "Universidade Tecnológica Federal do Paraná, Pato Branco, Paraná, Brasil",
      "PageUrl": "",
      "Email": "lilianec@utfpr.edu.br",
      "BibliographySummary": "Departamento de Administração"
    },
    "SecundaryAuthor": null,
    "Modality": "Ciências Humanas",
    "Language": "pt",
    "StartDate": "2019-11-11",
    "EndDate": "2019-11-13",
    "Building": "",
    "Room": "",
    "LocalDetails": null,
    "DirectorDecision": "Aceitar",
    "Situation": "Publicado"
  }
];

const step = 10;

const load = () => {
  console.log(`InfiniteScroll fires onMore after loading ${step} items`);
};


export default withAuth(() => {
  return (
    <Box fill>
      <Sidebar>
        <Box flex align="center" justify="center">
          <Tabs flex justify={"start"} margin={'medium'}>
            <Tab title="Sei">
              <Box fill pad="medium" align="start">
                <Heading level={2}>
                  <Box gap="small">
                    <Text textAlign={"start"}>Artigos disponíveis</Text>
                  </Box>
                </Heading>
                {DATA.map((r) => <CardArticle key={r._id} {...r} />)}
              </Box>
            </Tab>
            <Tab title="Sicite">
              <Box fill pad="large" align="center">
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Sidebar>
    </Box>
  )
});
