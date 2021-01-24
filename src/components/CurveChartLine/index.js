import React, {useEffect, useState, useContext} from 'react';
import {View, Dimensions} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Svg, { Text, Circle} from 'react-native-svg';

const CurveChartLine = (props) => {

    const [tooltipPos, setTooltipPos] = useState({ x:0, y:0, visible:false, value:0 })
    // const [data, setData] = useState([]) //Possible solution to Gambi [1]: 

    // useEffect(() => { //Possible solution to Gambi [1]: Don't work beacause a error in react-native-svg lib
    //     setData(performance)
    //     console.log('effect')
    // }, [performance])

    return (
        <View>
            <LineChart
                data={{
                    labels: ["0h", "1h", "24h", "48h", "6d", "31d"],
                    datasets: [ 
                        {
                            data: [
                                100,
                                50,
                                35,
                                25,
                                22,
                                17
                            ]
                      }
                    ],
                }}
                width={Dimensions.get("window").width * 0.85} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                fromZero
                decorator={() => {
                    return tooltipPos.visible ? <View>
                        <Svg>
                            <Circle cx={tooltipPos.x} cy={tooltipPos.y} r="13" width="30" height="30" fill="#e74e36" stroke="#303030"/>
                            <Text
                                fill="white"
                                stroke="white"
                                fontSize="13"
                                x={tooltipPos.x}
                                y={tooltipPos.y + 5}
                                textAnchor="middle"
                            >
                                {tooltipPos.value}
                            </Text>
                        </Svg>
                    </View> : null
                }}
                onDataPointClick={(data) => {
                    // check if we have clicked on the same point again
                    let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y ===  data.y)

                    // if clicked on the same point again toggle visibility
                    // else,render tooltip to new position and update its value
                    isSamePoint ? setTooltipPos((previousState)=> {
                        return {
                                ...previousState, 
                                value: data.value,
                                visible: !previousState.visible
                            }
                        })
                        : 
                        setTooltipPos({x: data.x, 
                            value: data.value, y: data.y,
                            visible: true
                    });
                }}
                chartConfig={{
                    backgroundColor: "#FFFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(231, 78, 54, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(48, 48, 48, ${opacity})`,
                    style: {
                        borderRadius: 20,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "1",
                        stroke: "#303030"
                    }
                }}
                style={{marginVertical: 5}}
            />
        </View>
    )
}

export default CurveChartLine;