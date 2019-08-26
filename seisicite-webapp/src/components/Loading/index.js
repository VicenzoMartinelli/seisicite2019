import React from 'react'
import { Section, Wrapper } from './style';
import { primaryColor } from '../../styles/kit';
import { RingLoader } from 'react-spinners';

export default () => {
  return (
    <Section>
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
