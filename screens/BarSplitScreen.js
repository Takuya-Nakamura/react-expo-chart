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
import { Svg, G, Line, Rect, Text, Path, TextPath, Defs, Polyline, Polygon, Circle, Use, Symbol } from 'react-native-svg'
import { tsThisType, conditionalExpression } from '@babel/types';

//react-native-elements
import { Input,Slider } from 'react-native-elements';


// width
const { width } = Dimensions.get('window')


//class
export default class BarSplit extends Component {
  constructor(props) {
    super(props)
    // this.setState({data: 100})
    this.state = {
      left:1,
      middle:1,
      right:1,
      percent:50,
    }
  }



  calcRatio(arr){
    let total = arr.reduce((total, data) =>{
      return total + data
    } )
    console.log(total)
    let ratio = []
    arr.map((item) =>{
      ratio.push(item/total)
    })

    return ratio
  } 

  /* BarSplitChart */
  renderBarChart(){
    //scaleの作成
    const xScale = d3scale.scaleLinear().domain([0, 10]).range([0, width])

    //barの配置
    //縦位置
    const y = width/2

    //barの幅(ここはwidthに合わせる)
    const barWidth = width

    //データと割合
    let data = [
      this.state.left,
      this.state.middle,
      this.state.right,
    ]
    console.log("data")
    console.log(data)
    
    
    //配列の値から比率を取得する
    let dataRatio = this.calcRatio(data)
    let dataCount = dataRatio.length

    console.log(dataRatio)
    
    let totalPercent = 0
    let colors = ["#8bc9ea", "#f9d777", "#00a53c", "#f78376"]

    //ベースの片側だけ角丸作成 Staticに作成
    return(
      <Svg height={width} width={width}  style={{borderWidth: 2, borderColor: 'red',}} >
        <Symbol id="symbol" viewBox="0 0 50 50" width="50" height="50">
          <Polygon
            points="0,0 50,0 25,50"
            fill="#fff"
            stroke="#000"
            strokeWidth="2"
          />
        </Symbol>

        {/* 動的に作成する */}
        <G y={y}　>
            {/* base */}
            {/* <Rect rx={10} width={barWidth} height={25} fill={"none"} stroke="#000"/> */}
            
            {/* 左側 */}
            {
              dataRatio.map((percent, index) =>{
                totalPercent = totalPercent + percent;
                console.log(index)

                if(index == 0){ //first 
                  return (
                    <G>
                      {/* 左側だけ角丸 */}
                      <Rect rx={10} x={barWidth*(totalPercent - percent )} width={ barWidth * percent} height={25} fill={colors[index]} />              
                      <Rect x={barWidth*(totalPercent - percent ) + (barWidth * percent)/2} width={(barWidth * percent)/2} height={25} fill={colors[index]} />
                    </G>
                  )  
                }else if(index == dataRatio.length-1){ //last　右側だけ角丸
                  console.log("test")
                  console.log(colors[index])
                  return (
                    // <G> 
                    //   {/* 右側だけ角丸 */}
                    //   <Rect rx={10} x={ barWidth*(totalPercent - percent )} y={y} width={ barWidth * percent} height={25} fill={"#000"} />
                    //   <Rect x={250} y={y} width={ (barWidth * percent)/2 } height={25} fill={colors[index]} />  
                    // </G>
                    <G>
                      <Rect rx={10} x={barWidth*(totalPercent - percent )} width={barWidth * percent} height={25} fill={colors[index]} />
                      <Rect  x={barWidth*(totalPercent - percent )} width={ barWidth * percent/2} height={25} fill={colors[index]} />
                    </G>
                  )
                }else{
                  return (
                    <Rect x={barWidth*(totalPercent - percent )} width={barWidth * percent} height={25} fill={colors[index]} />
                  )  
                }
              })    

            }
            {/* 三角 */}
            <Use href="#symbol" x={barWidth*this.state.percent/100} y={-10} width="20" height="20" />
        </G> 
      </Svg>      
    )
  }



  //main
  render() {
    return (
      <View style={{ flex:1, borderWidth: 2, borderColor: '#000000', alignItems: 'center',}}>
        <Ntext>Bar Split</Ntext>
        {this.renderBarChart()}

        <Input
          placeholder='left'
          onChangeText={(value) =>{
            this.setState({left:Number(value)})
          } }

        />
        <Input
          placeholder='middle'
          onChangeText={(value) =>{
            this.setState({middle:Number(value)})
          } }

        />
        <Input
          placeholder='right'
          onChangeText={(value) =>{
            this.setState({right:Number(value)})
          } }

        />

        <Slider 
          value={this.state.percent}
          onValueChange={value => this.setState({ percent:value })}
          maximumValue={100}
          minimumValue={0}
          width={"80%"}          
        />

      </View>
    );
  }
} //class


