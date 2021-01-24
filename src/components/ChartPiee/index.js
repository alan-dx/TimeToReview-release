import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';

class ChartPiee extends React.Component {

  constructor(props) {
    super(props);
    let data = []
    let colors = []
    
    props.data.map(({label, associatedReviews, marker}) => {
      data.push({label, value: associatedReviews.length})
      colors.push(processColor(marker))
    })

    this.state = {
      passData: props.data,
      selectedEntry: 'Pressione uma fatia do círculo',
      legend: {
        enabled: true,
        textSize: 10,
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: data,
          label: '',
          config: {
            colors: colors,
            valueTextSize: 13,
            valueTextColor: processColor('#FFF'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null || entry.label == undefined) {
      this.setState({...this.state, selectedEntry: 'Pressione uma fatia do círculo'})
    } else {
      this.setState({...this.state, selectedEntry: `${entry.label}: ${entry.value} Revisões`})
    }
    console.log(event.nativeEvent)
  }


  render() {

    return (
      <View style={styles.container}>
          <View style={styles.chartContainer}>
            <PieChart
                style={styles.chart}
                logEnabled={true}
                chartBackgroundColor={processColor('#FFF')}
                chartDescription={this.state.description}
                data={this.state.data}
                legend={this.state.legend}
                highlights={this.state.highlights}

                extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                entryLabelColor={processColor('green')}
                entryLabelTextSize={12}
                entryLabelFontFamily={'HelveticaNeue-Medium'}
                drawEntryLabels={false}

                rotationEnabled={true}
                rotationAngle={45}
                usePercentValues={true}
                styledCenterText={{text:'Porcentagem por matéria', color: processColor('#303030'), fontFamily: 'HelveticaNeue-Medium', size: 10}}
                centerTextRadiusPercent={100}
                holeRadius={40}
                holeColor={processColor('#FFF')}
                transparentCircleRadius={45}
                transparentCircleColor={processColor('#F7F7F7')}
                maxAngle={350}
                onSelect={this.handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          <View>
              <Text style={styles.selectText}>{this.state.selectedEntry}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  chartContainer: {
    flex: 1,
    marginTop: 25,
  },
  chart: {
    flex: 1,
  },
  selectText: {
      fontFamily: "Archivo-Bold",
      alignSelf: 'center',
      color: '#606060'

  }
});

export default ChartPiee;