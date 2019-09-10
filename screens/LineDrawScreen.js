import React, { Component } from 'react'
import {
  View,
  Text as Ntext,
  Dimensions,
  Button,
} from 'react-native'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import { FormLabel, FormInput, FormValidationMessage, Slider } from 'react-native-elements'

console.disableYellowBox = true

// react-native-svg
//import { Svg, G, Rect } from 'react-native-svg'
import { Svg, G, Line, Rect, Text, Path, TextPath, Defs, Polyline, Circle } from 'react-native-svg'

// width
const { width } = Dimensions.get('window')

const styles = {
}
const lineData = [

  { x:10, y:50 },
  { x:50, y:20 },
  { x:90, y:50 },

]
//class
export default class LineDraw extends Component {
  constructor(props) {
    super(props)
    this.state = {percent:50}
  }


  // renderCurvyLine(){
  //   // js側でいうd3.scale().linear()
  //   const y = d3scale.scaleLinear().domain([0, 100]).range([width, 0])
  //   const x = d3scale.scaleLinear().domain([0, 100]).range([0, width])


  //   const path = d3shape.line()
  //     .x((d) => x(d.x))
  //     .y((d) => y(d.y))
  //     .curve(d3shape.curveCatmullRom.alpha(0.5))
  //     (lineData) //引数としてlineData

  //   return (
  //     <Svg height={width} width={width}  style={{borderWidth: 2, borderColor: 'red',}} >
  //       <Ntext>3点を繋いでカーブさせる方式.. 綺麗な曲線が描きづらい。線の橋の曲線は同じ太さの●を橋に配置することで実現。</Ntext>
  //       <G style={{borderWidth: 2, borderColor: 'blue',}} >
  //         <Path d={path} fill={"none"} stroke="red" strokeWidth="8" />
  //         {
  //           lineData.map((item) => {
  //             return <Circle cx={x(item.x)} cy={y(item.y)} r="4" fill="red" />
  //           })
  //         }
  //       </G>
  //     </Svg>      
  //   )
  // }

  //private
  getCurvePath(percent="100"){
    // Scale
    const xScale = d3scale.scaleLinear().domain([0, 100]).range([0, width/2])
    let startBase = Math.PI/2 //曲線の起点（右側の計算ベース）
    let tani = Math.PI/ (10 * 10) //円を適当な単位に分割

    //幅はtani*10あります
    // tani * 10 /100が1%です。 
    // percent -100 の値 割合 をstartAngleに追加すればOK
    let startPoint = 20
    let endPoint  = 80
    let offset =  (100 - percent)
    let startAngle = startBase + tani*(startPoint + (offset * (endPoint-startPoint)/100) )
    let endAngle = startBase + tani * endPoint //固定

    let percent_tani = 80/100

    let arc = d3shape.arc()
    .innerRadius(xScale(85))
    .outerRadius(xScale(90))
    .startAngle(startAngle) 
    .endAngle(endAngle)   
    .cornerRadius(10)
    
    return arc()
  }

  /* Arc */
  renderCurvyLineByArc(){
    basePath=this.getCurvePath()
    overPath=this.getCurvePath(this.state.percent)


    return (
      <Svg height={width} width={width}  style={{borderWidth: 2, borderColor: 'red',}} >
        <Ntext>Arcを使って曲線を描く。線端の丸みはcornerRadius</Ntext>
        <G style={{borderWidth: 2, borderColor: 'blue',}}  x={width/2} y={width/4}>
          <Path d={basePath}  stroke="red" fill="none" strokeWidth="1" />

          <Path d={overPath}  stroke="red" fill="red" strokeWidth="1" />

        </G>
      </Svg>      
    )
  }


  //main
  render() {
    return (
      <View style={{ flex:1, borderWidth: 2, borderColor: '#000000', alignItems: 'center',}}>
        {this.renderCurvyLineByArc()}
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


