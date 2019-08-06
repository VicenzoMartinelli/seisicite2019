import React, { useContext, useState } from 'react'
import { Box, Collapsible, Layer, Heading, Button, ResponsiveContext, Text, Image } from 'grommet'
import { Menu, Logout } from 'grommet-icons'
import * as auth from '../services/auth'
import history from '../history'
import MenuComponent from './menu'
import { light, brand } from '../styles/theme'
import Logo from '../imgs/seisicite.png'

const logout = () => {
  auth.logout()
  history.replace('/login')
}

const AppBar = props => (
  <Box
    tag="header"
    direction="row-reverse"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

export default props => {
  const [showSidebar, setShowSidebar] = useState(false)

  const [open, setOpened] = useState(undefined)

  const size = useContext(ResponsiveContext)

  const onClose = () => setOpened(undefined)

  return (
    <>
      <AppBar>
        <Box align={'center'} direction={'row'} alignContent={'around'}>
          <Text >{auth.getConfirm().Email}</Text>
          <Button icon={<Logout />} onClick={logout} />
        </Box>
        <Box direction={'row'} alignContent={'between'} width={'medium'} align={'center'}>
          <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
          <Text size={'large'} weight={'bold'}>
            Seisicite 2019
          </Text>
        </Box>
      </AppBar>
      <Box fill={true} direction="row" flex overflow={{ horizontal: 'hidden' }}>
        {!showSidebar || size !== 'small' ? (
          <Box direction={'row'} justify={'between'} fill>
            <Collapsible direction="horizontal" open={showSidebar}>
              <Box
                width="small"
                background="light-2"
                fill={'vertical'}
                elevation={'large'}
                align="center"
                justify="start"
              >
                <MenuComponent />
              </Box>
            </Collapsible>
            {props.children}
          </Box>
        ) : (
            <Layer position="center" modals responsive={true} onClickOutside={onClose} onEsc={onClose}>
              <Box pad="medium" gap="small" width="medium" fill align={'center'} justify={'center'}>
                <MenuComponent />
              </Box>
            </Layer>
          )}
      </Box>
    </>
  )
}
