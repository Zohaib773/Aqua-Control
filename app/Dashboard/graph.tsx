

// import { router } from "expo-router";
// import React, { useEffect } from "react";
// import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// export default function TankGraph() {

//      useEffect(() => {
//         const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
//           router.replace("/Dashboard/dashboard" as any); // change to the appropriate "home" for that screen
//           return true; // true = we handled it, don't exit app
//         });
//         return () => backHandler.remove();
//       }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tank Water Level</Text> 

//       <LineChart
//         data={{
//           labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//           datasets: [
//             {
//               data: [40, 60, 55, 70, 65, 80], // sample water levels
//             },
//           ],
//         }}
//         width={screenWidth - 20}
//         height={220}
//         yAxisSuffix="%"
//         chartConfig={{
//           backgroundColor: "#fff",
//           backgroundGradientFrom: "#fff",
//           backgroundGradientTo: "#fff",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
//           labelColor: () => "#555",
//         }}
//         style={styles.chart}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     backgroundColor: "#0a0e1a", // Dark background
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 16,
//     textAlign: "center",
//     color: "#ffffff", // White text for dark mode
//   },
//   chart: {
//     borderRadius: 16,
//     backgroundColor: "#1a1f2e", // Dark card background for chart area
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function TankGraph() {
  const [selectedRange, setSelectedRange] = useState("week"); // week, month, year

  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{ data: [40, 60, 55, 70, 65, 80] }]
  });

  const [animatedData, setAnimatedData] = useState(chartData);
  const prevDataRef = useRef<number[]>(chartData.datasets[0].data);



  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      router.replace("/Dashboard/dashboard" as any);
      return true;
    });
    return () => backHandler.remove();
  }, []);

  // Update chart data based on selected range
  // useEffect(() => {
  //   updateChartData(selectedRange);
  // }, [selectedRange]);

  useEffect(() => {
  const targetData = getChartData(selectedRange);
  const startData = prevDataRef.current;

  let startTime: number | null = null;
  const duration = 4000;

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);

    // smoother easing
    const eased = 1 - Math.pow(1 - progress, 4);

    const newData = targetData.datasets[0].data.map((value, i) => {
      const start = startData[i] || 0;
      const interpolated = start + (value - start) * eased;
      return parseFloat(interpolated.toFixed(1));
    });

    setAnimatedData({
      labels: targetData.labels,
      datasets: [{ data: newData }],
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      prevDataRef.current = targetData.datasets[0].data;
      setAnimatedData(targetData);
    }
  };

  requestAnimationFrame(animate);
}, [selectedRange]);


  const updateChartData = (range: any) => {
    switch (range) {
      case "day":
        setChartData({
          labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM", "11PM"],
          datasets: [{ data: [35, 38, 45, 62, 68, 72, 70] }]
        });
        break;
      case "week":
        setChartData({
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [40, 60, 55, 70, 65, 80, 78] }]
        });
        break;
      case "month":
        setChartData({
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [{ data: [45, 62, 58, 75] }]
        });
        break;
      case "year":
        setChartData({
          labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
          datasets: [{ data: [42, 55, 68, 72, 65, 70] }]
        });
        break;
      default:
        break;
    }
  };

  const getChartData = (range: any) => {
    switch (range) {
      case "day":
        return {
          labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM", "11PM"],
          datasets: [{ data: [35, 38, 45, 62, 68, 72, 70] }]
        };
      case "week":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [40, 60, 55, 70, 65, 80, 78] }]
        };
      case "month":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [{ data: [45, 62, 58, 75] }]
        };
      case "year":
        return {
          labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
          datasets: [{ data: [42, 55, 68, 72, 65, 70] }]
        };
      default:
        return chartData;
    }
  };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#e5e7eb" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Water Level Analytics</Text>
          <Text style={styles.headerSub}>Track your tank water levels</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={22} color="#e5e7eb" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Date Range Selector */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterBtn, selectedRange === "day" && styles.filterBtnActive]}
              onPress={() => setSelectedRange("day")}
            >
              <Text style={[styles.filterText, selectedRange === "day" && styles.filterTextActive]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterBtn, selectedRange === "week" && styles.filterBtnActive]}
              onPress={() => setSelectedRange("week")}
            >
              <Text style={[styles.filterText, selectedRange === "week" && styles.filterTextActive]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterBtn, selectedRange === "month" && styles.filterBtnActive]}
              onPress={() => setSelectedRange("month")}
            >
              <Text style={[styles.filterText, selectedRange === "month" && styles.filterTextActive]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterBtn, selectedRange === "year" && styles.filterBtnActive]}
              onPress={() => setSelectedRange("year")}
            >
              <Text style={[styles.filterText, selectedRange === "year" && styles.filterTextActive]}>Year</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Summary */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Average</Text>
              <Text style={styles.statValue}>62<Text style={styles.statUnit}>%</Text></Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Peak</Text>
              <Text style={styles.statValue}>80<Text style={styles.statUnit}>%</Text></Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Lowest</Text>
              <Text style={styles.statValue}>40<Text style={styles.statUnit}>%</Text></Text>
            </View>
          </View>

          {/* Chart Card */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              {selectedRange === "day" && "Today's Water Level"}
              {selectedRange === "week" && "Weekly Water Level Trend"}
              {selectedRange === "month" && "Monthly Water Level Trend"}
              {selectedRange === "year" && "Yearly Water Level Trend"}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View>
                {/* <LineChart
                  data={chartData}
                  width={Math.max(screenWidth - 40, chartData.labels.length * 70)}
                  height={280}
                  yAxisSuffix="%"
                  yAxisInterval={1}
                  chartConfig={{
                    backgroundColor: "#1a1f2e",
                    backgroundGradientFrom: "#1a1f2e",
                    backgroundGradientTo: "#1a1f2e",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`, // Light blue
                    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`, // Gray labels
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "5",
                      strokeWidth: "2",
                      stroke: "#4FC3F7",
                      fill: "#4FC3F7",
                    },
                    propsForBackgroundLines: {
                      stroke: "#2a2f3e",
                      strokeWidth: 0.5,
                    },
                    fillShadowGradient: "#4FC3F7",
                    fillShadowGradientOpacity: 0.1,
                  }}
                  bezier={true} 
                  style={styles.chart}
                  formatYLabel={(yLabel) => {
                    const num = parseFloat(yLabel);
                    return `${Math.round(num)}%`;
                  }}
                  fromZero={true}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLines={true}
                  withHorizontalLines={true}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  segments={5}
                /> */}
                <LineChart
                  data={animatedData}
                  width={Math.max(screenWidth - 40, animatedData.labels.length * 70)}
                  height={280}
                  yAxisSuffix="%"
                  yAxisInterval={1}
                  chartConfig={{
                    backgroundColor: "#1a1f2e",
                    backgroundGradientFrom: "#1a1f2e",
                    backgroundGradientTo: "#1a1f2e",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "5",
                      strokeWidth: "2",
                      stroke: "#4FC3F7",
                      fill: "#4FC3F7",
                    },
                    propsForBackgroundLines: {
                      stroke: "#2a2f3e",
                      strokeWidth: 0.5,
                    },
                    fillShadowGradient: "#4FC3F7",
                    fillShadowGradientOpacity: 0.1,
                  }}
                  bezier={false}
                  style={styles.chart}

                  formatYLabel={(yLabel) => {
                    const num = parseFloat(yLabel);
                    return `${Math.round(num)}%`;
                  }}
                  fromZero={true}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLines={true}
                  withHorizontalLines={true}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  segments={5}
                />
              </View>
            </ScrollView>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#4FC3F7" }]} />
                <Text style={styles.legendText}>Water Level (%)</Text>
              </View>
            </View>
          </View>

          {/* Additional Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="water-outline" size={20} color="#4FC3F7" />
              <Text style={styles.infoLabel}>Total Consumption (This {selectedRange === "day" ? "Day" : selectedRange === "week" ? "Week" : selectedRange === "month" ? "Month" : "Year"})</Text>
              <Text style={styles.infoValue}>2,450 L</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="trending-up-outline" size={20} color="#81C784" />
              <Text style={styles.infoLabel}>Efficiency Rate</Text>
              <Text style={[styles.infoValue, { color: "#81C784" }]}>+12.5%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#131826",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2f3e",
  },
  backBtn: {
    padding: 6,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
  },
  headerSub: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  bellBtn: {
    position: "relative",
    padding: 6,
  },
  bellDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderWidth: 1.5,
    borderColor: "#131826",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#131826",
    borderRadius: 12,
    padding: 4,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  filterBtnActive: {
    backgroundColor: "#1565C0",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1f2e",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4FC3F7",
  },
  statUnit: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  chartCard: {
    backgroundColor: "#1a1f2e",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#e5e7eb",
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#1a1f2e",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 13,
    color: "#e5e7eb",
    fontWeight: "500",
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4FC3F7",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#2a2f3e",
    marginVertical: 8,
  },
});