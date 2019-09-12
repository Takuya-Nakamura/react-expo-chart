import React, { Component } from 'react';

import { G, Line, Path, Rect, Text, Button } from 'react-native-svg'
import * as d3scale from 'd3-scale'


export class Axis extends Component{ //export defaultにするとエラーになってしまった...
  constructor(props){
    super(props);
  }

  render () {
    let { width, ticks, x, y, startVal, endVal, vertical } = this.props
    const TICKSIZE = width / 1 //メモリ棒の長さ
    x = x || 0
    y = y || 0
    let endX = vertical ? x : x + width
    let endY = vertical ? y - width : y
    let scale = this.props.scale

    let tickPointData = this.props.tickPointData
    console.log(tickPointData)
    // if (!scale) {
    //   scale = typeof startVal === 'number' ? d3scale.scaleLinear() : d3scale.scaleTime()
    //   scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
    // }

    let tickPoints = vertical ? this.getTickPoints(vertical, y, endY, ticks)
      : this.getTickPoints(vertical, x, endX, ticks)

  
    return (

      <G >
        <Line
			stroke='#000'
			strokeWidth='3'
			x1={x}
			x2={endX}
	   		y1={y}
			y2={endY} />

        {/* 目盛 */}
        {console.log("#### tickPoints ####")}
        {tickPointData.map(
            pos => {
              console.log(pos)
              return ( 
                  <G> 
                    <Line
                      key={pos}
                      stroke='#aaa'
                      strokeWidth='1'
                      x1={vertical ? x : scale(pos)}
                      y1={vertical ? scale(pos) : y}
                      x2={vertical ? TICKSIZE + x : scale(pos) } // 元のメモリ上の場合 x-TICKSIZE
                      y2={vertical ? scale(pos) : y - TICKSIZE} // 元のメモリ上の場合 y+TICKSIZE
                      strokeDasharray="5,5" // 破線
                      //  strokeDashoffset = "5"
                      />
                  </G>
              )
            }    
          )}

          {/* text */}
          {tickPointData.map(
            (pos, index) => {
              console.log("#### Text #####")
              console.log(pos)
              console.log(scale(pos))
              console.log(y)
              
              return (
                <Text
                  key={pos}
                  fill='#000'
                  stroke='#000'
                  textAnchor='middle'
                  x={vertical ? x - 7 : scale(pos)}
                  y={vertical ? width - scale(pos) : y + 12 } > 

                {index}

              </Text>
            )
            }

          )}
      </G>
              

    )


  }

  getTickPoints (vertical, start, end, numTicks) {
    let res = []
    let ticksEvery = Math.floor(this.props.width / (numTicks - 1))
    if (vertical) {
      for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }

}
