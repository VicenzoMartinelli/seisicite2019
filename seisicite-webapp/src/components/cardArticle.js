import React from 'react'
import { Card } from 'grommet-controls';
import { Text, Box, Heading } from 'grommet';

const CardArticle = ({ title, starterDate, modality, submissionId, ...rest }) => {

  return (
    // <Card
    //   direction={'column'}
    //   pad={'small'}
    //   basis={'auto'}
    // >
    //   <Box direction={'row'} justify={'between'} pad={{ bottom: 'small' }} margin={{ bottom: 'small' }} border={{ side: "bottom" }} >
    //     <Text>Submissão: {submissionId}</Text>
    //     <Text>{modality} - {starterDate}</Text>
    //   </Box>
    //   <Heading size={6}>{title}</Heading>
    //   <Text></Text>
    // </Card>
    <Card margin={'medium'}>
      <Card.CardTitle>
        Card
    </Card.CardTitle>
      <Card.CardContent>
        Some content
    </Card.CardContent>
    </Card>
  );
};

export default CardArticle;

