import React, { Component } from 'react'
import {
  View,
  Text as Ntext,
  Dimensions,
  Button,
} from 'react-native'


// react-native-svg
import { Svg, G, Rect,Polygon, Circle, Use, Symbol } from 'react-native-svg'

//react-native-elements
import { Input,Slider } from 'react-native-elements';

//original utility lib
import * as Util from "../components/Util" 

// width
const { width } = Dimensions.get('window')


const colors = ["#8bc9ea", "#f9d777", "#00a53c", "#f78376"]

//class
export default class RatioBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      left:Util.random(1,5),
      middle:Util.random(1,5),
      right:Util.random(1,5),
      percent:50,
    }
  }

  /* 配列の実際の値からvalueを計算する */
  calcRatio(arr){
    let total = arr.reduce((total, data) =>{
      return total + data
    })
    let ratio = []
    arr.map((item) =>{
      ratio.push(item/total)
    })
    return ratio
  } 

  /* BarSplitChart */
  renderBarChart(){
    
    //縦位置
    const y = width/2

    //barの幅(ここはwidthに合わせる)
    const barWidth = width

    //stateからデータ取得
    let data = [
      this.state.left,
      this.state.middle,
      this.state.right,
    ]
        
    //配列の値から比率を取得する
    let dataRatio = this.calcRatio(data)
    let totalPercent = 0

    //ベースの片側だけ角丸作成 Staticに作成
    return(
      <Svg height={width} width={width}  style={{borderWidth: 2, borderColor: 'red',}} >
        {/* symbolで三角を宣言してあとでuseで使う。 */}
        <Symbol id="symbol" viewBox="0 0 50 50" width="50" height="50">
          <Polygon
            points="0,0 50,0 25,50"
            fill="#fff"
            stroke="#000"
            strokeWidth="2"
          />
        </Symbol>

        <G y={y}　>
            {/* base */}
            <Rect rx={10} width={barWidth} height={25} fill={"none"} stroke="#000"/>
            
            {/* 左側 */}
            {
              dataRatio.map((percent, index) =>{
                totalPercent = totalPercent + percent;//ここまでの通算..

                if(index == 0){ //first 左側だけ角丸
                  return (
                    <G>
                      <Rect rx={10} x={barWidth*(totalPercent - percent )} width={ barWidth * percent} height={25} fill={colors[index]} />              
                      <Rect x={barWidth*(totalPercent - percent ) + (barWidth * percent)/2} width={(barWidth * percent)/2} height={25} fill={colors[index]} />
                    </G>
                  )  
                }else if(index == dataRatio.length-1){ //last　右側だけ角丸
                  return (
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

        <Button title="ChangeData" onPress={() => {
          this.setState({ 
            left: Util.random(1,5),
            middle: Util.random(1,5),
            right: Util.random(1,5),
            percent:Util.random(0,100)
          })
        }}/>

        <Input
          placeholder={this.state.left}
          onChangeText={(value) =>{
            this.setState({left:Number(value)})
          } }

        />
        <Input
          placeholder={this.state.middle}
          onChangeText={(value) =>{
            this.setState({middle:Number(value)})
          } }

        />
        <Input
          placeholder={this.state.right}
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


