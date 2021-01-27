import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Svg, { Text, Circle} from 'react-native-svg';

const ChartLine = (props) => {

    const [tooltipPos, setTooltipPos] = useState({ x:0, y:0, visible:false, value:0 })
    const [data, setData] = useState(props.data.map(({reviews}) => {
        return reviews
    }))
    const [selectLegend, setSelectLegend] = useState(null)
    const currentDate = new Date()

    useEffect(() => {
        if (props.showLabel) {
            setSelectLegend(['Revisões/dia'])
        }
    }, [])

    useEffect(() => { //to update chart when props.data is modified
        //similar to componentDidUpdate
        setData(props.data.map(({reviews}) => {
            return reviews
        }))
    }, [props.data[currentDate.getDay()].reviews])

    return (
        <View >
            <LineChart
                data={{
                    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    datasets: [
                    {
                        data: [
                            data[1],
                            data[2],
                            data[3],
                            data[4],
                            data[5],
                            data[6],
                            data[0],
                        ]
                    }
                    ],
                    legend: selectLegend
                }}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={props.height}
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
                    backgroundColor: "#FFF",
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
                bezier
                style={{
                    borderRadius: 20,
                    elevation: props.elevation
                }}

            />
        </View>
    )
}

export default ChartLine;