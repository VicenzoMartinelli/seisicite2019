import React from 'react'
import Card from './card';
import { Text, Box, Heading } from 'grommet';

const CardArticle = ({ Title, StarterDate, Modality, SubmissionId, ...rest }) => {

  return (
    <Card direction={'column'} pad={'medium'}>
      <Box direction={'row'} justify={'between'} pad={{ bottom: 'small' }} margin={{ bottom: 'small' }} border={{ side: "bottom" }} >
        <Text>Submissão: {SubmissionId}</Text>
        <Text>{Modality} - {StarterDate}</Text>
      </Box>
      <Heading size={6}>{Title}</Heading>
      <Text>loremadhasidshaduiashduiashdiuasdhasuidhudahiashduiahdasuidhasiudhasuid</Text>
    </Card>
  );
};

export default CardArticle;

