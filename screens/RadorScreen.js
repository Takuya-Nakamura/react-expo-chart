import React, { Component } from 'react'
import {
  View,
  Text as Ntext,
  Dimensions,
  Button,
} from 'react-native'

import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

// react-native-svg
import { Svg, G, Line, Rect, Text, Path, TextPath, Defs, Polyline, Circle } from 'react-native-svg'

// width
let { width } = Dimensions.get('window')
let margin =  20  // left bottom

// 
import { Axis }  from "../components/axis/Axis"


const tickPointData =[0,1,2,3,4,5,6,7,8,9,10]

//class
export default class Rador extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  /* BarChart */
  renderRadorChart(){
 
        
    //scaleの作成
    //x 0-10, y=0-100
    const xScale = d3scale.scaleLinear().domain([0, 10]).range([0, width])
    const yScale = d3scale.scaleLinear().domain([0, 100]).range([0, width])
    
    //
    let ticks = [2,4,6,8,10];

    //
    let features =[
      1,2,3,4,5
    ]

    let arr_axis = []    
    for (var i = 0; i < features.length; i++) {
      let angle = (Math.PI/2) + (2 * Math.PI * i / features.length);
      let line_coordinate = this.angleToCoordinate(angle, 10, xScale); //10というのはvalueの位置
      console.log(line_coordinate)
      arr_axis.push(line_coordinate)
    }

    //point path
    let colors = ["darkorange", "gray", "navy"];
    let data = [1,5,6,4,8]
    let cordinates=[]

    for (var i = 0; i < data.length; i ++){
      let d = data[i];
      let color = colors[i];
      let angle = (Math.PI/2) + (2 * Math.PI * i / features.length);
      cordinates.push(this.angleToCoordinate(angle, d, xScale));   
    }    
    cordinates.push(cordinates[0])//pathを閉じるように
    let linePath = d3shape.line()
                    .x(d=>d.x)
                    .y(d=>d.y)
                    (cordinates)

    return(
      <Svg height={width} width={width} viewBox={`0 0 ${width} ${width}`}style={{borderWidth: 2, borderColor: 'blue',}} >
        <G>
          {/* グリッド線のプロット(円) */}
          {
            ticks.map(tick =>
              <Circle r={xScale(tick)/2} x={width/2} y={width/2} fill={"none"} stroke="gray" > </Circle>
            )
          }
          {/* ラベルの追加 */}
          {
            ticks.map(tick =>
              <Text x={width/2} y={width/2 - xScale(tick)/2} >{tick}</Text>
            )
          }
          {/* 軸の記述 */}
          {
            arr_axis.map(item =>(
              <Line x1={width/2} y1={width/2} x2={item.x} y2={item.y} stroke="#000"></Line>
            ))
          }
          {/* ポイント */}
          <Path d={linePath} fill="#05F802" opacity="0.5" stroke="#097707"></Path>
        </G> 
      </Svg>      
    )
  }

  //private 
  /* angle と 目的の座標に渡す 座標値を返す。*/
  angleToCoordinate(angle, value, scale){
    let x = Math.cos(angle) * scale(value);
    let y = Math.sin(angle) * scale(value);
    return {"x": (width + x)/2, "y": (width - y)/2};
  }

  // getPathCoordinates(data_point){
  //   let coordinates = [];
  //   for (var i = 0; i < features.length; i++){
  //       let ft_name = features[i];
  //       let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
  //       coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
  //   }
  //   return coordinates;
  // }

  //main
  render() {
    return (
      <View style={{ flex:1, borderWidth: 2, borderColor: '#000000', alignItems: 'center',}}>
        <Ntext>Rador</Ntext>
        {this.renderRadorChart()}
      </View>
    );
  }
} //class
