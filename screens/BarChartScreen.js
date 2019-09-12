import React, { Component } from 'react'
import {
  View,
  Text as Ntext,
  Dimensions,
  Button,
} from 'react-native'

import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import * as d3Axis from 'd3-axis'

// react-native-svg
import { Svg, G, Line, Rect, Text, Path, TextPath, Defs, Polyline, Polygon, Circle } from 'react-native-svg'

//original utility lib
import * as Util from "../components/Util" 


// width
const { width } = Dimensions.get('window')

//let  
// const data = [
//   {no:0, value:3},
//   {no:1, value:10},
//   {no:2, value:20},
//   {no:3, value:30},
//   {no:4, value:40},
//   {no:5, value:50},
//   {no:6, value:60},
//   {no:7, value:70},
//   {no:8, value:80},
//   {no:9, value:90},
//   {no:10, value:100},
// ]


//class
export default class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {flg : 0}
  }

  // updateData(){
  //   let data =[]
  //   dataCount = 10
  //   for(i=0;i< dataCount; i++){
  //     data.push(
  //       {no:i, value:Util.random(0,100)}
  //     )
  //   }
  //   this.setState({"data": data})
  // }


  /* BarChart */
  renderBarChart(){
    //dataの作成
    let data = []
    dataCount = 10
    for(i=0;i< dataCount; i++){
      data.push(
        {no:i, value:Util.random(0,100)}
      )
    }

    // this.updateData()
    // console.log(this.state)
    
    //scaleの作成
    //x 0-10, y=0-100
    const xScale = d3scale.scaleLinear().domain([0, 10]).range([0, width])
    const yScale = d3scale.scaleLinear().domain([0, 100]).range([0, width])
    
  

    return(
      <Svg height={width} width={width}  style={{borderWidth: 2, borderColor: 'red',}} >

        <G>
        {
          data.map((row)=>{
            return (
              // 左上がx:0 y:0なのでちょっと注意が必要. rectで指定するxyは左上のポイント            
              <G>
                <Rect rx={3} x={xScale(row.no) + 5} y={width - yScale(row.value) } width="25" height={yScale(row.value)} fill={"#3CA0F3"} />
              </G>
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
        <Ntext>BarChart</Ntext>
        {this.renderBarChart()}
        <Button title="ChangeData" onPress={() => this.setState({ flg: 0 })} />
      </View>
    );
  }
  

} //class


