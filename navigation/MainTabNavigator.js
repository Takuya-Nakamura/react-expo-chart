import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChartScreen from '../screens/ChartScreen';
import SampleChartScreen from '../screens/SampleChartScreen';
import SampleChartScreen2 from '../screens/CircularChartScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


// Sample
const SampleChartStack = createStackNavigator({SampleChartScreen});
SampleChartStack.navigationOptions = {
  tabBarLabel: 'Samples',
};

// Circular
const CircularChartStack = createStackNavigator({SampleChartScreen2});
CircularChartStack.navigationOptions = {
  tabBarLabel: 'Circular',
};



// tab
let tabNavigator = createBottomTabNavigator(
  {
    CircularChartStack,
    SampleChartStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#ffffff',
      activeBackgroundColor: '#5ab4bd',
      inactiveBackgroundColor: '#ffffff',

      style: { 
        borderTopWidth: 2, 
        borderTopColor: '#5ab4bd' ,
      },
      tabStyle:{
        borderRightWidth: 2, 
        borderRightColor: '#5ab4bd',
        borderBottomWidth: 2, 
        borderBottomColor:'#5ab4bd',
      }
    }
  }
);



export default tabNavigator;
