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
import { Svg, G, Line, Rect, Text, Path, Circle } from 'react-native-svg'

// width
let { width } = Dimensions.get('window')

//original utility lib
import * as Util from "../components/Util" 


//class
export default class Rador extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  /* BarChart */
  renderRadorChart(){
    //scaleの作成
    const xScale = d3scale.scaleLinear().domain([0, 10]).range([0, width])
    
    //表示したい目盛
    let ticks = [2,4,6,8,10];

    //マッピングするデータ
    let data = []
    for (i=0; i<6; i++){
      data.push(Util.random(1,10))
    }

    let arr_axis = []    
    for (var i = 0; i < data.length; i++) {
      let angle = (Math.PI/2) + (2 * Math.PI * i / data.length);
      let line_coordinate = this.angleToCoordinate(angle, 10, xScale); 
      arr_axis.push(line_coordinate)
    }

    //pointのpathの作成
    let cordinates=[]
    for (var i = 0; i < data.length; i ++){
      let d = data[i];
      let angle = (Math.PI/2) + (2 * Math.PI * i / data.length); //角度方向の取得
      cordinates.push(this.angleToCoordinate(angle, d, xScale));   
    }    

    //pathを閉じるよう最後に最初と同じ座標を入れる。
    cordinates.push(cordinates[0])
    //Pathの取得
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
  /* 
  * angleとポイントを渡すことで、ポイントの座標値を返す。
  * angleは自分で返す
  */
  angleToCoordinate(angle, value, scale){
    let x = Math.cos(angle) * scale(value);
    let y = Math.sin(angle) * scale(value);
    return {"x": (width + x)/2, "y": (width - y)/2};
  }

  //main
  render() {
    return (
      <View style={{ flex:1, borderWidth: 2, borderColor: '#000000', alignItems: 'center',}}>
        <Ntext>Rador</Ntext>
        {this.renderRadorChart()}
        <Button title="ChangeData" onPress={() => this.setState({ flg: 0 })} />

      </View>
    );
  }
} //class
