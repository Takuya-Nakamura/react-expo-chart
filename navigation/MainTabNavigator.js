import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SampleChartScreen from '../screens/SampleChartScreen';
import CircularChartScreen from '../screens/CircularChartScreen';
import LineDrawScreen from '../screens/LineDrawScreen';
import BarChartScreen from '../screens/BarChartScreen';
import AxisScreen from '../screens/AxisScreen';
import RadorScreen from '../screens/RadorScreen';
import BarSplitScreen from '../screens/BarSplitScreen';

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
const CircularChartStack = createStackNavigator({CircularChartScreen});
CircularChartStack.navigationOptions = {
  tabBarLabel: 'Circular',
};

// LineDraw
const LineDrawChartStack = createStackNavigator({LineDrawScreen});
LineDrawChartStack.navigationOptions = {
  tabBarLabel: 'Line',
};

// BarChart
const BarChartStack = createStackNavigator({BarChartScreen});
BarChartStack.navigationOptions = {
  tabBarLabel: 'Bar',
};

// AxisChart
const AxisChartStack = createStackNavigator({AxisScreen});
AxisChartStack.navigationOptions = {
  tabBarLabel: 'Axis',
};

// RadorChart
const RadorChartStack = createStackNavigator({RadorScreen});
RadorChartStack.navigationOptions = {
  tabBarLabel: 'Rador',
};

// BarSplit
const BarSplitStack = createStackNavigator({BarSplitScreen});
BarSplitStack.navigationOptions = {
  tabBarLabel: 'BarSplit',
};

// tab
let tabNavigator = createBottomTabNavigator(
  {
    BarSplitStack,
    RadorChartStack,
    CircularChartStack,
    LineDrawChartStack,
    BarChartStack,
    AxisChartStack,
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
