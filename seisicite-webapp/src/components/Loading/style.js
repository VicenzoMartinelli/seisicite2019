import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: ${props => props.w};
  height: ${props => props.h};
  background-color: ${props => props.bgColor};
`;