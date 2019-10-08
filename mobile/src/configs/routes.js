import React from 'react';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Login from './../pages/login'
import Register from './../pages/register'
import Home from './../pages/home'
import EvaluateArticle from './../pages/evaluate-article'
import ResetPassword from './../pages/reset-password'

const mainNavigation = createAnimatedSwitchNavigator(
  {
    Login,
    Register,
    Home,
    EvaluateArticle,
    ResetPassword
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="scale"
          durationMs={300}
          interpolation="linear"
        />
        <Transition.In type="scale" interpolation="linear" durationMs={300} />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(mainNavigation);