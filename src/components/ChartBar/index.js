import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import Svg, { Text, Circle } from 'react-native-svg';

const ChartBar = (props) => {

    const [tooltipPos, setTooltipPos] = useState({ x:0, y:0, visible:false, value:0 })

    return (
        <View >
            <LineChart
                //ZERAR OS GRÁFICOS DE TEMPO

                data={{
                    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    datasets: [
                    {
                        data: [
                            props.data[1],
                            props.data[2],
                            props.data[3],
                            props.data[4],
                            props.data[5],
                            props.data[6],
                            props.data[0],
                        ]
                    }
                    ],
                }}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={300}
                yAxisInterval={1} // optional, defaults to 1
                fromZero
                decorator={() => {
                    return tooltipPos.visible ? <View>
                        <Svg>
                            <Circle cx={tooltipPos.x} cy={tooltipPos.y} r="15" width="45" height="45" fill="#60c3eb" stroke="#303030"/>
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
                    backgroundColor: "#FFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FCFCFC",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(96, 195, 235, ${opacity})`,
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
                style={{
                    marginVertical: 0,
                    borderRadius: 20,
                }}

            />
        </View>
    )
}

export default ChartBar;