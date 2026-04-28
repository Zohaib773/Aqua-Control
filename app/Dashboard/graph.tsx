// import { router } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//     BackHandler,
//     Dimensions,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const GRAPH_WIDTH = width - 48;
// const GRAPH_HEIGHT = 180;

// // Weekly data (7 days)
// const weeklyData = [
//     { day: "Mon", value: 45 },
//     { day: "Tue", value: 60 },
//     { day: "Wed", value: 30 },
//     { day: "Thu", value: 72 },
//     { day: "Fri", value: 55 },
//     { day: "Sat", value: 80 },
//     { day: "Sun", value: 72 },
// ];

// // Monthly data (4 weeks)
// const monthlyData = [
//     { day: "Wk 1", value: 55 },
//     { day: "Wk 2", value: 68 },
//     { day: "Wk 3", value: 40 },
//     { day: "Wk 4", value: 72 },
// ];

// // 24h data
// const hourlyData = [
//     { day: "2AM", value: 90 },
//     { day: "5AM", value: 85 },
//     { day: "8AM", value: 60 },
//     { day: "11AM", value: 72 },
//     { day: "2PM", value: 65 },
//     { day: "5PM", value: 78 },
//     { day: "8PM", value: 72 },
// ];

// const PERIODS = ["24H", "7D", "1M"];

// function BarGraph({ data }: { data: { day: string; value: number }[] }) {
//     const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//     const maxValue = 100;
//     const barWidth = Math.floor((GRAPH_WIDTH - (data.length - 1) * 8) / data.length);

//     return (
//         <View style={graphStyles.container}>
//             {/* Y-axis labels */}
//             <View style={graphStyles.yAxis}>
//                 {[100, 75, 50, 25, 0].map((v) => (
//                     <Text key={v} style={graphStyles.yLabel}>{v}%</Text>
//                 ))}
//             </View>

//             {/* Graph area */}
//             <View style={graphStyles.graphArea}>
//                 {/* Grid lines */}
//                 {[0, 25, 50, 75, 100].map((v) => (
//                     <View
//                         key={v}
//                         style={[
//                             graphStyles.gridLine,
//                             { bottom: (v / maxValue) * GRAPH_HEIGHT },
//                         ]}
//                     />
//                 ))}

//                 {/* Bars */}
//                 <View style={graphStyles.barsRow}>
//                     {data.map((item, index) => {
//                         const barH = (item.value / maxValue) * GRAPH_HEIGHT;
//                         const isSelected = selectedIndex === index;
//                         const isHigh = item.value >= 80;
//                         const isLow = item.value <= 25;

//                         return (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[graphStyles.barCol, { width: barWidth }]}
//                                 onPress={() =>
//                                     setSelectedIndex(isSelected ? null : index)
//                                 }
//                                 activeOpacity={0.8}
//                             >
//                                 {isSelected && (
//                                     <View style={[graphStyles.tooltip, { bottom: barH + 8 }]}>
//                                         <Text style={graphStyles.tooltipText}>{item.value}%</Text>
//                                         <View style={graphStyles.tooltipArrow} />
//                                     </View>
//                                 )}
//                                 <View
//                                     style={[
//                                         graphStyles.bar,
//                                         {
//                                             height: barH,
//                                             width: barWidth,
//                                             backgroundColor: isSelected
//                                                 ? "#0D47A1"
//                                                 : isHigh
//                                                 ? "#EF5350"
//                                                 : isLow
//                                                 ? "#FF9800"
//                                                 : "#1565C0",
//                                             opacity: isSelected ? 1 : 0.85,
//                                         },
//                                     ]}
//                                 />
//                                 <Text style={graphStyles.xLabel}>{item.day}</Text>
//                             </TouchableOpacity>
//                         );
//                     })}
//                 </View>
//             </View>
//         </View>
//     );
// }

// const graphStyles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         height: GRAPH_HEIGHT + 30,
//         marginTop: 8,
//     },
//     yAxis: {
//         width: 36,
//         justifyContent: "space-between",
//         alignItems: "flex-end",
//         paddingRight: 6,
//         paddingBottom: 22,
//     },
//     yLabel: { fontSize: 9, color: "#AAB4C8" },
//     graphArea: {
//         flex: 1,
//         position: "relative",
//     },
//     gridLine: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         height: 1,
//         backgroundColor: "#EEF2F8",
//     },
//     barsRow: {
//         flexDirection: "row",
//         alignItems: "flex-end",
//         height: GRAPH_HEIGHT,
//         gap: 8,
//         paddingBottom: 0,
//     },
//     barCol: {
//         alignItems: "center",
//         justifyContent: "flex-end",
//         height: GRAPH_HEIGHT + 22,
//         position: "relative",
//     },
//     bar: {
//         borderRadius: 6,
//         marginBottom: 4,
//     },
//     xLabel: {
//         fontSize: 9,
//         color: "#AAB4C8",
//         marginTop: 4,
//         textAlign: "center",
//     },
//     tooltip: {
//         position: "absolute",
//         backgroundColor: "#0D47A1",
//         borderRadius: 6,
//         paddingHorizontal: 6,
//         paddingVertical: 3,
//         zIndex: 10,
//         alignItems: "center",
//     },
//     tooltipText: { color: "white", fontSize: 10, fontWeight: "700" },
//     tooltipArrow: {
//         width: 0,
//         height: 0,
//         borderLeftWidth: 4,
//         borderRightWidth: 4,
//         borderTopWidth: 5,
//         borderLeftColor: "transparent",
//         borderRightColor: "transparent",
//         borderTopColor: "#0D47A1",
//         position: "absolute",
//         bottom: -5,
//     },
// });

// // Line Graph for trend
// function LineGraph({ data }: { data: { day: string; value: number }[] }) {
//     const maxValue = 100;
//     const pointSpacing = (GRAPH_WIDTH - 40) / (data.length - 1);

//     const points = data.map((item, i) => ({
//         x: i * pointSpacing,
//         y: GRAPH_HEIGHT - (item.value / maxValue) * GRAPH_HEIGHT,
//         value: item.value,
//         day: item.day,
//     }));

//     // Build SVG path
//     const pathD = points
//         .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
//         .join(" ");

//     // Area fill path
//     const areaD =
//         pathD +
//         ` L ${points[points.length - 1].x} ${GRAPH_HEIGHT} L 0 ${GRAPH_HEIGHT} Z`;

//     return (
//         <View style={lineStyles.container}>
//             <View style={lineStyles.yAxis}>
//                 {[100, 75, 50, 25, 0].map((v) => (
//                     <Text key={v} style={lineStyles.yLabel}>{v}%</Text>
//                 ))}
//             </View>
//             <View style={lineStyles.svgWrap}>
//                 {/* Grid */}
//                 {[0, 25, 50, 75, 100].map((v) => (
//                     <View
//                         key={v}
//                         style={[
//                             lineStyles.gridLine,
//                             { bottom: (v / maxValue) * GRAPH_HEIGHT },
//                         ]}
//                     />
//                 ))}
//                 {/* Area fill (simulated with absolute views) */}
//                 {points.slice(0, -1).map((p, i) => {
//                     const next = points[i + 1];
//                     const segW = next.x - p.x;
//                     const avgY = (p.y + next.y) / 2;
//                     const fillH = GRAPH_HEIGHT - avgY;
//                     return (
//                         <View
//                             key={i}
//                             style={{
//                                 position: "absolute",
//                                 left: p.x,
//                                 bottom: 0,
//                                 width: segW,
//                                 height: fillH,
//                                 backgroundColor: "rgba(21,101,192,0.08)",
//                             }}
//                         />
//                     );
//                 })}
//                 {/* Line segments */}
//                 {points.slice(0, -1).map((p, i) => {
//                     const next = points[i + 1];
//                     const dx = next.x - p.x;
//                     const dy = next.y - p.y;
//                     const length = Math.sqrt(dx * dx + dy * dy);
//                     const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
//                     return (
//                         <View
//                             key={i}
//                             style={{
//                                 position: "absolute",
//                                 left: p.x,
//                                 top: p.y,
//                                 width: length,
//                                 height: 2.5,
//                                 backgroundColor: "#1565C0",
//                                 transformOrigin: "left center",
//                                 transform: [{ rotate: `${angle}deg` }],
//                             }}
//                         />
//                     );
//                 })}
//                 {/* Dots */}
//                 {points.map((p, i) => (
//                     <View
//                         key={i}
//                         style={[
//                             lineStyles.dot,
//                             { left: p.x - 5, top: p.y - 5 },
//                         ]}
//                     />
//                 ))}
//                 {/* X labels */}
//                 <View style={lineStyles.xRow}>
//                     {data.map((d) => (
//                         <Text key={d.day} style={lineStyles.xLabel}>{d.day}</Text>
//                     ))}
//                 </View>
//             </View>
//         </View>
//     );
// }

// const lineStyles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         height: GRAPH_HEIGHT + 30,
//         marginTop: 8,
//     },
//     yAxis: {
//         width: 36,
//         justifyContent: "space-between",
//         alignItems: "flex-end",
//         paddingRight: 6,
//         paddingBottom: 22,
//     },
//     yLabel: { fontSize: 9, color: "#AAB4C8" },
//     svgWrap: {
//         flex: 1,
//         height: GRAPH_HEIGHT,
//         position: "relative",
//     },
//     gridLine: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         height: 1,
//         backgroundColor: "#EEF2F8",
//     },
//     dot: {
//         position: "absolute",
//         width: 10,
//         height: 10,
//         borderRadius: 5,
//         backgroundColor: "#1565C0",
//         borderWidth: 2,
//         borderColor: "white",
//         shadowColor: "#1565C0",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.4,
//         shadowRadius: 3,
//         elevation: 3,
//     },
//     xRow: {
//         position: "absolute",
//         bottom: -22,
//         left: 0,
//         right: 0,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     xLabel: { fontSize: 9, color: "#AAB4C8", textAlign: "center" },
// });

// export default function TankDetail() {
//     const [period, setPeriod] = useState("7D");
//     const [graphType, setGraphType] = useState<"bar" | "line">("bar");

//     useEffect(() => {
//         const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
//             router.replace("/Dashboard/dashboard" as any);
//             return true;
//         });
//         return () => backHandler.remove();
//     }, []);

//     const data =
//         period === "24H" ? hourlyData : period === "1M" ? monthlyData : weeklyData;

//     const stats = [
//         { label: "Current Level", value: "72%", icon: "💧", color: "#1565C0" },
//         { label: "Volume", value: "3,600 L", icon: "🪣", color: "#2E7D32" },
//         { label: "Capacity", value: "5,000 L", icon: "📊", color: "#6A1B9A" },
//         { label: "Status", value: "Normal", icon: "✅", color: "#2E7D32" },
//     ];

//     return (
//         <SafeAreaView style={styles.safe}>
//             <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity
//                     onPress={() => router.replace("/Dashboard/dashboard" as any)}
//                     style={styles.backBtn}
//                 >
//                     <Text style={styles.backArrow}>←</Text>
//                 </TouchableOpacity>
//                 <View style={styles.headerCenter}>
//                     <Text style={styles.headerTitle}>Tank Level</Text>
//                     <Text style={styles.headerSub}>Live monitoring & history</Text>
//                 </View>
//                 <TouchableOpacity style={styles.bellBtn}>
//                     <Text style={styles.bellIcon}>🔔</Text>
//                     <View style={styles.bellDot} />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView
//                 style={styles.scroll}
//                 contentContainerStyle={styles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Live Tank Visual */}
//                 <View style={styles.liveCard}>
//                     <View style={styles.liveBadge}>
//                         <View style={styles.liveDot} />
//                         <Text style={styles.liveText}>LIVE</Text>
//                     </View>

//                     <View style={styles.tankVisualRow}>
//                         {/* Big Tank */}
//                         <View style={styles.bigTankWrap}>
//                             <View style={styles.bigTank}>
//                                 <View style={styles.bigTankEmpty} />
//                                 <View style={styles.bigTankWater} />
//                             </View>
//                             <View style={styles.bigTankPipe} />
//                             <View style={styles.bigTankStand}>
//                                 {[0,1,2,3].map(i => <View key={i} style={styles.bigTankLeg} />)}
//                             </View>
//                             {/* Water % label inside */}
//                             <View style={styles.tankLabelOverlay}>
//                                 <Text style={styles.tankLabelText}>72%</Text>
//                             </View>
//                         </View>

//                         {/* Right side info */}
//                         <View style={styles.liveInfo}>
//                             <Text style={styles.livePercent}>72<Text style={styles.livePercentSym}>%</Text></Text>
//                             <Text style={styles.liveFilledLabel}>Filled</Text>
//                             <Text style={styles.liveLiters}>3,600 / 5,000 L</Text>

//                             <View style={styles.progressTrack}>
//                                 <View style={[styles.progressFill, { width: "72%" }]} />
//                             </View>

//                             <View style={styles.liveStatusRow}>
//                                 <View style={styles.liveStatusDot} />
//                                 <Text style={styles.liveStatusText}>Everything is working fine</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Stat Cards */}
//                 <View style={styles.statsGrid}>
//                     {stats.map((s) => (
//                         <View key={s.label} style={styles.statCard}>
//                             <Text style={styles.statIcon}>{s.icon}</Text>
//                             <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
//                             <Text style={styles.statLabel}>{s.label}</Text>
//                         </View>
//                     ))}
//                 </View>

//                 {/* Graph Card */}
//                 <View style={styles.graphCard}>
//                     {/* Graph header */}
//                     <View style={styles.graphHeader}>
//                         <Text style={styles.graphTitle}>Tank Level History</Text>
//                         {/* Graph type toggle */}
//                         <View style={styles.graphTypeRow}>
//                             <TouchableOpacity
//                                 style={[styles.typeBtn, graphType === "bar" && styles.typeBtnActive]}
//                                 onPress={() => setGraphType("bar")}
//                             >
//                                 <Text style={[styles.typeBtnText, graphType === "bar" && styles.typeBtnTextActive]}>
//                                     Bar
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.typeBtn, graphType === "line" && styles.typeBtnActive]}
//                                 onPress={() => setGraphType("line")}
//                             >
//                                 <Text style={[styles.typeBtnText, graphType === "line" && styles.typeBtnTextActive]}>
//                                     Line
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     {/* Period selector */}
//                     <View style={styles.periodRow}>
//                         {PERIODS.map((p) => (
//                             <TouchableOpacity
//                                 key={p}
//                                 style={[styles.periodTab, period === p && styles.periodTabActive]}
//                                 onPress={() => setPeriod(p)}
//                             >
//                                 <Text style={[styles.periodText, period === p && styles.periodTextActive]}>
//                                     {p}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>

//                     {/* Legend */}
//                     <View style={styles.legendRow}>
//                         <View style={styles.legendItem}>
//                             <View style={[styles.legendDot, { backgroundColor: "#1565C0" }]} />
//                             <Text style={styles.legendText}>Normal</Text>
//                         </View>
//                         <View style={styles.legendItem}>
//                             <View style={[styles.legendDot, { backgroundColor: "#EF5350" }]} />
//                             <Text style={styles.legendText}>High (≥80%)</Text>
//                         </View>
//                         <View style={styles.legendItem}>
//                             <View style={[styles.legendDot, { backgroundColor: "#FF9800" }]} />
//                             <Text style={styles.legendText}>Low (≤25%)</Text>
//                         </View>
//                     </View>

//                     {/* Graph */}
//                     {graphType === "bar" ? (
//                         <BarGraph data={data} />
//                     ) : (
//                         <LineGraph data={data} />
//                     )}
//                 </View>

//                 {/* Insights */}
//                 <View style={styles.insightsCard}>
//                     <Text style={styles.insightsTitle}>📊 Insights</Text>
//                     <View style={styles.insightRow}>
//                         <Text style={styles.insightIcon}>📈</Text>
//                         <Text style={styles.insightText}>Average level this week: <Text style={styles.insightBold}>59%</Text></Text>
//                     </View>
//                     <View style={styles.insightRow}>
//                         <Text style={styles.insightIcon}>⬆️</Text>
//                         <Text style={styles.insightText}>Highest: <Text style={styles.insightBold}>80%</Text> on Saturday</Text>
//                     </View>
//                     <View style={styles.insightRow}>
//                         <Text style={styles.insightIcon}>⬇️</Text>
//                         <Text style={styles.insightText}>Lowest: <Text style={styles.insightBold}>30%</Text> on Wednesday</Text>
//                     </View>
//                     <View style={styles.insightRow}>
//                         <Text style={styles.insightIcon}>🔄</Text>
//                         <Text style={styles.insightText}>Motor auto-triggered <Text style={styles.insightBold}>3 times</Text> this week</Text>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safe: { flex: 1, backgroundColor: "#EEF4FB" },

//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: "#EEF4FB",
//     },
//     backBtn: { padding: 6 },
//     backArrow: { fontSize: 22, color: "#222", fontWeight: "600" },
//     headerCenter: { flex: 1, alignItems: "center" },
//     headerTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
//     headerSub: { fontSize: 11, color: "#777", marginTop: 2 },
//     bellBtn: { position: "relative", padding: 6 },
//     bellIcon: { fontSize: 22 },
//     bellDot: {
//         position: "absolute", top: 6, right: 6,
//         width: 9, height: 9, borderRadius: 5,
//         backgroundColor: "#4CAF50",
//         borderWidth: 1.5, borderColor: "#EEF4FB",
//     },

//     scroll: { flex: 1 },
//     scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 24 },

//     // Live Card
//     liveCard: {
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 16,
//         marginBottom: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     liveBadge: {
//         flexDirection: "row",
//         alignItems: "center",
//         alignSelf: "flex-start",
//         backgroundColor: "#E8F5E9",
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         marginBottom: 12,
//     },
//     liveDot: {
//         width: 7, height: 7, borderRadius: 4,
//         backgroundColor: "#4CAF50", marginRight: 5,
//     },
//     liveText: { fontSize: 11, fontWeight: "800", color: "#2E7D32", letterSpacing: 1 },

//     tankVisualRow: { flexDirection: "row", alignItems: "center" },
//     bigTankWrap: { position: "relative", alignItems: "center", width: 110, marginRight: 16 },
//     bigTank: {
//         width: 90, height: 120,
//         borderRadius: 10, overflow: "hidden",
//         borderWidth: 2, borderColor: "#B0BEC5",
//         flexDirection: "column-reverse",
//     },
//     bigTankEmpty: { flex: 28, backgroundColor: "#f0f0f0" },
//     bigTankWater: { flex: 72, backgroundColor: "#1565C0" },
//     bigTankPipe: {
//         width: 6, height: 16,
//         backgroundColor: "#78909C",
//         alignSelf: "flex-end", marginRight: 8,
//     },
//     bigTankStand: {
//         flexDirection: "row", justifyContent: "space-around", width: 80,
//     },
//     bigTankLeg: { width: 9, height: 18, backgroundColor: "#90A4AE", borderRadius: 2 },
//     tankLabelOverlay: {
//         position: "absolute", top: 44, left: 0, right: 0,
//         alignItems: "center",
//     },
//     tankLabelText: { fontSize: 13, fontWeight: "800", color: "white" },

//     liveInfo: { flex: 1 },
//     livePercent: { fontSize: 44, fontWeight: "900", color: "#1565C0", lineHeight: 50 },
//     livePercentSym: { fontSize: 20, fontWeight: "700", color: "#1565C0" },
//     liveFilledLabel: { fontSize: 14, fontWeight: "700", color: "#222", marginTop: -4 },
//     liveLiters: { fontSize: 13, color: "#1565C0", fontWeight: "600", marginTop: 2 },
//     progressTrack: {
//         height: 8, backgroundColor: "#E0E0E0",
//         borderRadius: 4, marginTop: 8, marginBottom: 10, overflow: "hidden",
//     },
//     progressFill: { height: "100%", backgroundColor: "#1565C0", borderRadius: 4 },
//     liveStatusRow: { flexDirection: "row", alignItems: "center" },
//     liveStatusDot: {
//         width: 8, height: 8, borderRadius: 4,
//         backgroundColor: "#4CAF50", marginRight: 6,
//     },
//     liveStatusText: { fontSize: 11, color: "#2E7D32", fontWeight: "600" },

//     // Stats grid
//     statsGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: 8,
//         marginBottom: 14,
//     },
//     statCard: {
//         width: (width - 32 - 8) / 2 - 4,
//         backgroundColor: "white",
//         borderRadius: 16,
//         padding: 14,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     statIcon: { fontSize: 22, marginBottom: 4 },
//     statValue: { fontSize: 18, fontWeight: "800", marginBottom: 2 },
//     statLabel: { fontSize: 11, color: "#888", textAlign: "center" },

//     // Graph Card
//     graphCard: {
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 16,
//         marginBottom: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     graphHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginBottom: 12,
//     },
//     graphTitle: { fontSize: 16, fontWeight: "800", color: "#111" },
//     graphTypeRow: { flexDirection: "row", gap: 6 },
//     typeBtn: {
//         paddingHorizontal: 12, paddingVertical: 5,
//         borderRadius: 12,
//         borderWidth: 1.5, borderColor: "#D0DCF0",
//         backgroundColor: "white",
//     },
//     typeBtnActive: { backgroundColor: "#1565C0", borderColor: "#1565C0" },
//     typeBtnText: { fontSize: 12, fontWeight: "600", color: "#666" },
//     typeBtnTextActive: { color: "white" },

//     periodRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
//     periodTab: {
//         paddingHorizontal: 16, paddingVertical: 6,
//         borderRadius: 20,
//         backgroundColor: "#F0F4FA",
//     },
//     periodTabActive: { backgroundColor: "#1565C0" },
//     periodText: { fontSize: 12, fontWeight: "600", color: "#666" },
//     periodTextActive: { color: "white" },

//     legendRow: { flexDirection: "row", gap: 12, marginBottom: 8 },
//     legendItem: { flexDirection: "row", alignItems: "center" },
//     legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
//     legendText: { fontSize: 10, color: "#888" },

//     // Insights
//     insightsCard: {
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 16,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     insightsTitle: { fontSize: 16, fontWeight: "800", color: "#111", marginBottom: 12 },
//     insightRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingVertical: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: "#F0F5FB",
//     },
//     insightIcon: { fontSize: 16, marginRight: 10, width: 24 },
//     insightText: { fontSize: 13, color: "#555", flex: 1 },
//     insightBold: { fontWeight: "700", color: "#1565C0" },
// });


import { router } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function TankGraph() {

     useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
          router.replace("/Dashboard/dashboard" as any); // change to the appropriate "home" for that screen
          return true; // true = we handled it, don't exit app
        });
        return () => backHandler.remove();
      }, []);
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tank Water Level</Text> 

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              data: [40, 60, 55, 70, 65, 80], // sample water levels
            },
          ],
        }}
        width={screenWidth - 20}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
          labelColor: () => "#555",
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
  },
});