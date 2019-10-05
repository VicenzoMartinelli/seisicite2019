import React from 'react';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Login from './../pages/login'
import Register from './../pages/register'
import Home from './../pages/home'
import EvaluateArticle from './../pages/evaluate-article'

const mainNavigation = createAnimatedSwitchNavigator(
  {
    Login,
    Register,
    Home,
    EvaluateArticle
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(mainNavigation);