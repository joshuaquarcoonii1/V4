import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const Spacer = ({ height, width }) => <View style={{ height, width }} />;


const AnalyticsScreen = () => {
  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
      <Spacer height={50} />

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Sales Analytics
      </Text>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [30, 45, 28, 80, 99, 43],
            },
          ],
        }}
        width={screenWidth - 30} // Width of chart
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
  <Spacer height={0} />

      {/* Bar Chart */}
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
            },
          ],
        }}
        width={screenWidth - 30}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
  <Spacer height={60} />

      {/* Pie Chart */}
      <PieChart
        data={[
          {
            name: 'Sales Q1',
            population: 215,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Sales Q2',
            population: 280,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Sales Q3',
            population: 527,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Sales Q4',
            population: 853,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
        ]}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;
