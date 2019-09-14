import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native'


//original utility lib
import * as Util from "../components/Util" 

//react-native-elements
import { Input,Slider } from 'react-native-elements';
// react-native-svg 
import { Svg, G, Rect,Polygon, Circle, Use, Symbol } from 'react-native-svg'

import Measure from "react-measure";

// width
const { width } = Dimensions.get('window')
const colors = ["#8bc9ea", "#f9d777", "#00a53c", "#f78376"]


export default class FlexScreen extends Component {
  constructor(props) {
    super(props)
    this.state ={
    }
  }

  

  renderSvg(elemName=""){

    if(!this.state[elemName]){
      console.log("存在しない")
      return //何も返さない

    }

    //サイズがない時は何も返さない
    if(this.state.height==0 || this.state.width==0){
      return //何も返さない
    }

    let svgWidth;
    size = this.state[elemName]
    if(size.width >= size.height){
      svgWidth = size.height //小さい方を幅にする
    }else{
      svgWidth = size.width
    }
    //半径・xy
    const r = svgWidth / 2 

    // margin 上下左右5%をとってviewboxに
    const margin = svgWidth*0.05
    const vbX = -margin;
    const vbY = -margin;
    const vbEndX = svgWidth + margin*2;
    const vbEndY = svgWidth + margin*2;

    return(
      <Svg 
      width={svgWidth} height={svgWidth}  
      viewBox={`${vbX} ${vbY} ${vbEndX} ${vbEndY}`}
      style={{borderWidth:1, borderColor:"#000"}}>
        <Circle x={r} y={r} r={r}  fill="red" />
      </Svg>
    )
  }
  
  onLayout = (e, name) => {
    /* コンポーネントの高さを取得し、stateに保存 */
    
    this.setState({
      [name]:{
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,  
      }
    });
  }


  //main
  render() { 
    console.log(styles)
    return (
      <View style={{flex:1}}>
        {/* header */}
        <Text >SvgSample</Text>
        <View 
          onLayout={ (e)=> this.onLayout(e, "header")}
          style={styles.header}
        >
          {this.renderSvg("header")}
        </View>

        {/* body */}
        <View 
          style={styles.body}
        >

          <View 
            onLayout={ (e)=> this.onLayout(e, "body1")}
            style={styles.bodyChild}
          >
          {this.renderSvg("body1")}

          </View>

          <View 
            onLayout={ (e)=> this.onLayout(e, "body2")}
            style={styles.bodyChild}
            >
            {this.renderSvg("body2")}
          </View>

          <View 
            onLayout={ (e)=> this.onLayout(e, "body3")}
            style={styles.bodyChild}
          >
            {this.renderSvg("body3")}
                <View 
                  style={styles.body2}
                >
                  <View 
                    onLayout={ (e)=> this.onLayout(e, "body3-1")}
                    style={styles.bodyChild2}
                    >
                    {this.renderSvg("body3-1")}
                  </View>
                  <View 
                    onLayout={ (e)=> this.onLayout(e, "body3-2")}
                    style={styles.bodyChild2}
                    >
                    {this.renderSvg("body3-2")}
                  </View>

                  <View 
                    onLayout={ (e)=> this.onLayout(e, "body3-3")}
                    style={styles.bodyChild2}
                    >
                    {this.renderSvg("body3-3")}
                  </View>

                </View>

          </View>

        </View>

        {/* footer */}
        <View style={{ flex:1, alignItems: 'center',　justifyContent:'center'}}>

        </View>

    </View>
    );
  }
} //class

const styles = StyleSheet.create({
  header: {
    flex:1, 
    alignItems: 'center',
  },
  body: {
    flex:1, 
    backgroundColor:"#aab1f0",
    flexDirection:'row'
  },
  bodyChild:{
    flex:1, 
    alignItems: 'center',
    backgroundColor:"#f0efaa",

  },

  body2: {
    flex:1, 
    backgroundColor:"#aab1f0",
    flexDirection:'row'
  },
  bodyChild2:{
    flex:1, 
    alignItems: 'center',
    backgroundColor:"#f0efaa",

  },

  footer:{

  }
});