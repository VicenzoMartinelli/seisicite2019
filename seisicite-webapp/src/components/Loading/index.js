import React from 'react'
import { Section, Wrapper } from './style';
import { primaryColor } from '../../styles/kit';
import { RingLoader } from 'react-spinners';

const Loading = (props) => {
  return (
    <Section {...props}>
      <div>
        <RingLoader
          color={primaryColor}
          size={120}
          sizeUnit={'px'}
        />
      </div>
    </Section>
  )
}

Loading.defaultProps = {
  w: '100wh',
  h: '100vh',
  bgColor: '#e8e8e8'
}

export default Loading;