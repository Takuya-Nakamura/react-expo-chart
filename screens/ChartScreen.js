import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import { WebView } from 'react-native';

import { ART } from 'react-native'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import * as d3Array from 'd3-array'

//importと同じ書き方...?
const {
  Surface,
  Group,
  Shape
} = ART


// import { AreaChart, Grid } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default function ChartScreen() {
  return (
      <ChartOne></ChartOne>
  );
}

// ChartScreen.navigationOptions = {
//   header: null,
// };


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const colors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
]

class ChartOne extends React.Component{
  
  render(){
    
    return (
      <View style={styles.container}>
        <Text>PieChart</Text>
      <Surface>
        <Group x={100 / 2} y={100 / 2}>
          {
            pieChart.paths.map((item, index) =>{
              <Shape
                key={`pie_shape_${index}`}
                fill={colors[index]}
                stroke={colors[index]}
                d={item.path}
              />              
            })            
          }
        </Group>
      </Surface>
      </View>
    );  
  }
}

const pieData = [
  { number: 8, name: 'Fun activities' },
  { number: 7, name: 'Dog' },
  { number: 16, name: 'Food' },
  { number: 23, name: 'Car' },
  { number: 23, name: 'Rent' },
  { number: 4, name: 'Misc' }
]

const arcs = d3shape.pie().value((item) => item.number)(pieData)
const pieChart = { paths: [] }
arcs.map((arc, index) => {
  const path = d3shape.arc().outerRadius(180).padAngle(.05).innerRadius(30)(arc)
  pieChart.paths.push({ path })
})