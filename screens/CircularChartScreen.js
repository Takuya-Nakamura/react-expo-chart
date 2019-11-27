import React, { Component } from 'react'
import {
  View,
  Text as Ntext,
  Dimensions,
  Button,
  Alert,
} from 'react-native'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

console.disableYellowBox = true

// react-native-svg
import { Svg, G, Line, Rect, Text, Path, TextPath, Defs } from 'react-native-svg'

// width
const { width } = Dimensions.get('window')

//class
export default class CircularChart extends Component {
  constructor(props) {
    super(props)
    this.state = { chart: 'circle' }
  }

  renderButtons() {
    return (
      <View style={{ height: 60, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button title="ChangeData" onPress={() => this.setState({ chart: 'draw' })} />
        <Button title="wire" onPress={() => this.setState({ chart: 'wire' })} />
      </View>
    )
  }

  //bar chart  add t-nakamura
  renderArcChart() {
    /** ここからしっかり作ってみると...**/
    // 例に習って14分割の場合
    // Math.PI
    let split_count = 14
    let angle = Math.PI / (split_count/2)
    console.log(angle)

    /** arcの作成**/
    let arcs= []

    //全体の円を何個に分断するか
    for(var i=1;i<=split_count;i++){  
      let one_cut = []

      //1cutの分割単位 
      let one_cut_split = 6
      let start_inner_radius = 10;
      let radius_tani = ((width-80) /2) / one_cut_split  //微妙に外に出ちゃう
      
      //一切れの１レベルずつ
      for(var j=1;j<=one_cut_split;j++){
        let inner_raidus = start_inner_radius + (radius_tani * (j-1))
        let outer_radius = start_inner_radius + (radius_tani * (j))
        var arc = d3shape.arc()
          .innerRadius(inner_raidus)
          .outerRadius(outer_radius)
          .startAngle( (angle * (i-1)) - (angle/2)) //開始位置をちょっとずらす
          .endAngle(angle * i - (angle/2) )
        
        //pathをそのままわたさないで、インスタンス
        one_cut.push(arc)

      }
      arcs.push(one_cut)
      
    }

    let colors =[];
    colors.push( ["#f4fff4", "#d5ffd5", "#80ff80", "#2bff2b", "#00d500",  "#008000"] ) //green
    colors.push( ["#fff4f4","#ffd5d5", "#ff8080", "#ff2b2b", "#d50000",  "#800000"] ) //red
    colors.push( ["#ffffff", "#f4f4f4", "#e9e9e9", "#dfdfdf", "#c9c9c9", "#5f5f5f"] )//gray

    const label =["1","2","3","4","5","6","7","8","9","10","11","12","13","14"]

    return (
      <View style={{ alignItems: 'center' }}>
        <Svg width={width} height={width} >
          <G x={width / 2} y={width / 2}　key="1">
          {
            arcs.map((one_cut, parent_index) => {
              //色の判定
              var randNum = Math.floor(Math.random()*(3));
              return one_cut.map((arc , index) => {
                  let centroid = arc.centroid() 
                  let path = arc()
                  let text_path_index = `index_${parent_index}`

                  if(index == 5){
                    // １つの弧の一番外の要素
                    return (
                      <G key={`${parent_index}_${index}`} >
                        {/* #### text_path #### */}
                        <Defs>
                          <Path id={text_path_index} d={path} />
                        </Defs>

                        <Text dy="12" key={index}>                          
                          <TextPath href={"#" + text_path_index} startOffset="" >
                            {label[parent_index]}
                          </TextPath>
                        </Text>

                        <Path
                          d={path}
                          stroke={"red"}
                          strokeWidth={"1"}
                          fill={"none"}
                        />
                      </G>
                    ) // return 
                  }else{ // if  
                    return (
                      <G>
                        <Path 
                          d={path}
                          stroke={"#fff"}
                          strokeWidth={"1"}
                          fill={colors[randNum][index]}
                        />                      
                      </G>
                      ) // return 
                  }//if
              })
            })            
          }
          </G>
        </Svg>
      </View>
    );



  }


  renderBySvg(){
      const SVGHeight = 60
      const SVGWidth = 60
      const graphHeight = 50
      let path = "M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
      //wave
      path = "M 10,90 Q 100,15 200,70 Q 340,140 400,30"  
      //arc1
      //path = "M-82.87218616372336,-103.91843454470894A132.91666666666666,132.91666666666666,0,0,1,-29.576740805026812,-129.5841683275007L-24.10643451193408,-105.61719048636421A108.33333333333333,108.33333333333333,0,0,0,-67.54472853469615,-84.69841060070321Z" 

      //arc2 
      var arc = d3shape.arc()
      .innerRadius(20)
      .outerRadius(40)
      .startAngle(0) //開始位置をちょっとずらすSampleChartScreen2
      .endAngle(Math.PI /4) 
      path = arc()

      //arc3 
      var arc3 = d3shape.arc()
      .innerRadius(20)
      .outerRadius(40)
      .startAngle((Math.PI /4)  * 2   ) //開始位置をちょっとずらすSampleChartScreen2
      .endAngle( (Math.PI /4)  * 4) 
      path3 = arc3()      
      
      /*  foreachで円を作成していく*/
      let split_count = 4
      let angle = Math.PI / (split_count/2)
      let arcs= []
  
      //全体の円を何個に分断するか
      for(var i=1;i<=split_count;i++){  
          let arc = d3shape.arc()
          .innerRadius(20)
          .outerRadius(70)
          .startAngle( (angle * (i-1)) - (angle/2)) //開始位置をちょっとずらすSampleChartScreen2
          .endAngle(angle * i - (angle/2) )   
          arcs.push(arc)
      }

      return (
        <Svg height="400" width="400">

        {
          arcs.map((arc, index) => {
              let path = arc()
              console.log(path)

              let path_id = "path_id_" + index

              return (
                <G x="200" y="200" key={index}>
                  <Defs>
                    <Path id={path_id} d={path} />
                  </Defs>                                          
                  <Text dy="-10" stroke="red" fill="blue">
                    <TextPath href={`#${path_id}`} textAnchor={"middle"} startOffset="10%">
                      {path_id}
                    </TextPath>
                  </Text>
                  <Path d={path} fill={"none"} stroke="red" />
                </G>
              )
          })
        }     
        </Svg>
      )
    }
  

  render() {
    let chart
    switch (this.state.chart) {
      case 'draw':
        chart = this.renderArcChart()
        break
      case 'wire':
        chart = this.renderBySvg()
        break
      default:
        chart = this.renderArcChart()
    }

    return (
      <View style={{ flex: 1 }}>
        {chart}
        {this.renderButtons()}

      </View>
    );
  }

} //class

