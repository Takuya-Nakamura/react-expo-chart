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


const data = [
  {x:0,y:5},   
  {x:1,y:7},   
  {x:2,y:6},    
  {x:3,y:10},    
  {x:4,y:4},    
  {x:5,y:5},    
  {x:6,y:8},    
  {x:7,y:2},    
  {x:8,y:3},    
  {x:9,y:6},    
  {x:10,y:5},    
]

const tickPointData =[0,1,2,3,4,5,6,7,8,9,10]

//class
export default class AxisDraw extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  /* BarChart */
  renderBarChart(){
 
        
    //scaleの作成
    //x 0-10, y=0-100
    const xScale = d3scale.scaleLinear().domain([0, 10]).range([0, width])
    const yScale = d3scale.scaleLinear().domain([0, 100]).range([0, width])
    
    //Line Chart Path
    let linePath = d3shape.line()
      .x((d) => xScale(d.x))
      .y((d) => width - xScale(d.y))
      (data)

    //view box
    let vb_x = 0 - margin
    let vb_y = 0 - margin 
    let vb_end_x = width + margin * 2 
    let vb_end_y = width + margin * 2

    
    return(
      <Svg height={width}  width={width} viewBox={`${vb_x} ${vb_y} ${vb_end_x} ${vb_end_y}`} style={{borderWidth: 2, borderColor: 'red',}} >
        <G>
            <Path stroke="red" fill="none" d={linePath}></Path>
            {/* <Rect x="100" y="100" width="100" height="100" fill="#000"/> */}
            {/* x axis 下側 ラベル下 margin 20*/}
            
            <Axis 
              x={0} // x軸の開始位置 横　
              y={width}//x軸の開始位置 縦 大きい方が下
              width={width}//幅
              startVal={0}
              endVal={10}
              scale={xScale}
              ticks={10}
              tickPointData={tickPointData}
            />
            
            {/* y axis 左側 ラベル左*/}
            <Axis 
              x={0}
              y={width} //左下起点
              width={width}
              startVal={0}
              endVal={10}
              scale={xScale}
              ticks={10}
              tickPointData={tickPointData}
              vertical
            />
            {
              //scaleがうまくあわせられてない..
              data.map((item) =>{
                return(
                  <Circle fill="red" r="5" cx={xScale(item.x) } cy={width-xScale(item.y)}  /> //20はmargin分 あとは微調整..?
                )
              })
            }
        </G> 
      </Svg>      
    )
  }

  //main
  render() {
    return (
      <View style={{ flex:1, borderWidth: 2, borderColor: '#000000', alignItems: 'center',}}>
        <Ntext>DrawAxis</Ntext>
        {this.renderBarChart()}
      </View>
    );
  }
} //class
