// import { router } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import {
//     Animated,
//     BackHandler,
//     Dimensions,
//     Easing,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from "react-native";

// const { width } = Dimensions.get("window");


// // ─────────────────────────────────────────────
// // Bubble Layer
// // ─────────────────────────────────────────────
// function BubbleLayer({
//     waterColor,
//     fillPercent,
//     tankH,
// }: {
//     waterColor: string;
//     fillPercent: number;
//     tankH: number;
// }) {
//     const bubbles = useRef(
//         Array.from({ length: 5 }).map((_, i) => ({
//             x: 8 + i * 14,
//             anim: new Animated.Value(0),
//             size: 4 + (i % 3) * 2,
//             delay: i * 500,
//         }))
//     ).current;

//     useEffect(() => {
//         bubbles.forEach((b) => {
//             const loop = () => {
//                 b.anim.setValue(0);
//                 Animated.timing(b.anim, {
//                     toValue: 1,
//                     duration: 2800 + b.delay,
//                     easing: Easing.linear,
//                     useNativeDriver: true,
//                     delay: b.delay,
//                 }).start(loop);
//             };
//             loop();
//         });
//     }, []);

//     const waterFillH = (fillPercent / 100) * tankH;

//     return (
//         <>
//             {bubbles.map((b, i) => {
//                 const translateY = b.anim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, -(waterFillH - 12)],
//                 });
//                 const opacity = b.anim.interpolate({
//                     inputRange: [0, 0.1, 0.85, 1],
//                     outputRange: [0, 0.55, 0.55, 0],
//                 });
//                 return (
//                     <Animated.View
//                         key={i}
//                         style={{
//                             position: "absolute",
//                             bottom: 8,
//                             left: b.x,
//                             width: b.size,
//                             height: b.size,
//                             borderRadius: b.size / 2,
//                             backgroundColor: waterColor,
//                             opacity,
//                             transform: [{ translateY }],
//                         }}
//                     />
//                 );
//             })}
//         </>
//     );
// }

// // ─────────────────────────────────────────────
// // Animated Fluid Tank — waves on water surface
// // ─────────────────────────────────────────────
// function FluidTank({ percent }: { percent: number }) {
//     const waveAnim = useRef(new Animated.Value(0)).current;
//     const wave2Anim = useRef(new Animated.Value(0)).current;
//     const fillAnim = useRef(new Animated.Value(0)).current;

//     const TANK_W = 90;
//     const TANK_H = 120;
//     const WAVE_H = 12;

//     useEffect(() => {
//         Animated.timing(fillAnim, {
//             toValue: percent,
//             duration: 1400,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: false,
//         }).start();

//         Animated.loop(
//             Animated.timing(waveAnim, {
//                 toValue: 1,
//                 duration: 2000,
//                 easing: Easing.linear,
//                 useNativeDriver: true,
//             })
//         ).start();

//         Animated.loop(
//             Animated.timing(wave2Anim, {
//                 toValue: 1,
//                 duration: 3200,
//                 easing: Easing.linear,
//                 useNativeDriver: true,
//             })
//         ).start();
//     }, []);

//     const fillHeight = fillAnim.interpolate({
//         inputRange: [0, 100],
//         outputRange: [0, TANK_H],
//     });

//     // Wave surface bottom position = same as fill height
//     const waveSurfaceBottom = fillAnim.interpolate({
//         inputRange: [0, 100],
//         outputRange: [0, TANK_H],
//     });

//     const wave1X = waveAnim.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -(TANK_W * 2)],
//     });
//     const wave2X = wave2Anim.interpolate({
//         inputRange: [0, 1],
//         outputRange: [-TANK_W, TANK_W],
//     });

//     const waterColor =
//         percent >= 80 ? "#EF5350" : percent <= 20 ? "#FF9800" : "#1565C0";
//     const waterColorLight =
//         percent >= 80 ? "#EF9A9A" : percent <= 20 ? "#FFCC80" : "#42A5F5";
//     const labelColor = percent > 45 ? "white" : "#1565C0";

//     return (
//         <View style={tankStyles.wrapper}>
//             <View style={[tankStyles.tank, { width: TANK_W, height: TANK_H }]}>
//                 {/* Empty background */}
//                 <View style={[StyleSheet.absoluteFill, tankStyles.emptyBg]} />

//                 {/* Water body — no waves inside, just fill + bubbles + gloss */}
//                 <Animated.View
//                     style={[
//                         tankStyles.waterFill,
//                         { height: fillHeight, backgroundColor: waterColor },
//                     ]}
//                 >
//                     <View style={tankStyles.gloss} />
//                     <BubbleLayer
//                         waterColor={waterColorLight}
//                         fillPercent={percent}
//                         tankH={TANK_H}
//                     />
//                 </Animated.View>

//                 {/* ✅ Waves positioned AT the water surface (top edge of fill) */}
//                 <Animated.View
//                     style={[
//                         tankStyles.waveSurface,
//                         { bottom: waveSurfaceBottom },
//                     ]}
//                 >
//                     {/* Wave 1 — main wave */}
//                     <Animated.View
//                         style={[
//                             tankStyles.waveRow,
//                             { top: 0, transform: [{ translateX: wave1X }] },
//                         ]}
//                     >
//                         {Array.from({ length: 8 }).map((_, i) => (
//                             <View
//                                 key={i}
//                                 style={{
//                                     position: "absolute",
//                                     left: i * (TANK_W / 2),
//                                     width: TANK_W / 2 + 2,
//                                     height: WAVE_H,
//                                     backgroundColor: waterColor,
//                                     borderTopLeftRadius: i % 2 === 0 ? WAVE_H : 0,
//                                     borderTopRightRadius: i % 2 === 0 ? WAVE_H : 0,
//                                     borderBottomLeftRadius: i % 2 !== 0 ? WAVE_H : 0,
//                                     borderBottomRightRadius: i % 2 !== 0 ? WAVE_H : 0,
//                                     top: i % 2 === 0 ? 0 : WAVE_H / 2,
//                                 }}
//                             />
//                         ))}
//                     </Animated.View>

//                     {/* Wave 2 — lighter offset wave */}
//                     <Animated.View
//                         style={[
//                             tankStyles.waveRow,
//                             { top: 4, transform: [{ translateX: wave2X }] },
//                         ]}
//                     >
//                         {Array.from({ length: 8 }).map((_, i) => (
//                             <View
//                                 key={i}
//                                 style={{
//                                     position: "absolute",
//                                     left: i * (TANK_W / 2),
//                                     width: TANK_W / 2 + 2,
//                                     height: WAVE_H,
//                                     backgroundColor: waterColorLight,
//                                     opacity: 0.45,
//                                     borderTopLeftRadius: i % 2 !== 0 ? WAVE_H : 0,
//                                     borderTopRightRadius: i % 2 !== 0 ? WAVE_H : 0,
//                                     borderBottomLeftRadius: i % 2 === 0 ? WAVE_H : 0,
//                                     borderBottomRightRadius: i % 2 === 0 ? WAVE_H : 0,
//                                     top: i % 2 !== 0 ? 0 : WAVE_H / 2,
//                                 }}
//                             />
//                         ))}
//                     </Animated.View>
//                 </Animated.View>

//                 {/* % label */}
//                 <View style={tankStyles.labelOverlay} pointerEvents="none">
//                     <Text style={[tankStyles.labelText, { color: labelColor }]}>
//                         {percent}%
//                     </Text>
//                 </View>
//             </View>

//             {/* Pipe */}
//             <View style={tankStyles.pipe} />

//             {/* Legs */}
//             <View style={tankStyles.standRow}>
//                 {[0, 1, 2, 3].map((i) => (
//                     <View key={i} style={tankStyles.leg} />
//                 ))}
//             </View>

//             {/* Base */}
//             <View style={tankStyles.base} />
//         </View>
//     );
// }

// const tankStyles = StyleSheet.create({
//     wrapper: { alignItems: "center", width: 110 },
//     tank: {
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: "#B0BEC5",
//         overflow: "hidden",
//         position: "relative",
//     },
//     emptyBg: { backgroundColor: "#ECEFF1" },
//     waterFill: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         overflow: "hidden",
//     },
//     // ✅ Wave surface sits exactly at the top edge of water
//     waveSurface: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         height: 18,
//         overflow: "hidden",
//     },
//     waveRow: {
//         position: "absolute",
//         left: 0,
//         width: 720,
//         height: 12,
//     },
//     gloss: {
//         position: "absolute",
//         top: 10,
//         left: 5,
//         width: 12,
//         height: "55%",
//         backgroundColor: "rgba(255,255,255,0.18)",
//         borderRadius: 6,
//     },
//     labelOverlay: {
//         position: "absolute",
//         top: 0, left: 0, right: 0, bottom: 0,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     labelText: { fontSize: 14, fontWeight: "800" },
//     pipe: {
//         width: 6, height: 16,
//         backgroundColor: "#78909C",
//         alignSelf: "flex-end",
//         marginRight: 10,
//     },
//     standRow: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         width: 80,
//     },
//     leg: { width: 10, height: 22, backgroundColor: "#90A4AE", borderRadius: 2 },
//     base: { width: 90, height: 6, backgroundColor: "#78909C", borderRadius: 3 },
// });


// export default function Dashboard() {
//     const [motorOn, setMotorOn] = useState(true);
//     const tankPercent = 72;
//     const tankCurrent = 3600;
//     const tankTotal = 5000;

//     useEffect(() => {
//         const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
//             return true; // blocks back — user must use nav or swipe to exit
//             // OR return false; // allows app to exit normally
//         });
//         return () => backHandler.remove();
//     }, []);


//     return (
//         <SafeAreaView style={styles.safe}>
//             <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.menuBtn}>
//                     <View style={styles.menuLine} />
//                     <View style={styles.menuLine} />
//                     <View style={styles.menuLine} />
//                 </TouchableOpacity>
//                 <View style={styles.headerCenter}>
//                     <Text style={styles.headerTitle}>
//                         <Text style={styles.headerBlue}>Aqua</Text>
//                         <Text style={styles.headerGreen}>Smart</Text>
//                     </Text>
//                     <Text style={styles.headerSub}>Smart Water Motor & Tank System</Text>
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
//                 {/* Tank Level Card */}
//                 <View style={styles.card}>
//                     {/* <Text style={styles.cardTitle}>Tank Level</Text> */}
//                     <TouchableOpacity
//                         style={styles.card}
//                         activeOpacity={0.85}
//                         onPress={() => router.push("/Dashboard/graph" as any)}
//                     >
//                         <Text style={styles.cardTitle}>Tank Level</Text>
//                         <View style={styles.tankRow}>
//                             {/* Tank Illustration */}
//                             {/* <View style={styles.tankIllustration}>
//                                 <View style={styles.tankBody}>
//                                     <View style={styles.tankEmpty} />
//                                     <View style={[styles.tankWater, { flex: tankPercent }]} />
//                                 </View>
//                                 <View style={styles.tankPipe} />
//                                 <View style={styles.tankStandRow}>
//                                     {[0, 1, 2, 3].map((i) => (
//                                         <View key={i} style={styles.tankLeg} />
//                                     ))}
//                                 </View>
//                                 <View style={styles.tankBase} />
//                             </View> */}
//                             <FluidTank percent={tankPercent} />

//                             {/* Tank Info */}
//                             <View style={styles.tankInfo}>
//                                 <Text style={styles.tankPercent}>
//                                     <Text style={styles.tankPercentNum}>{tankPercent}</Text>
//                                     <Text style={styles.tankPercentSym}>%</Text>
//                                 </Text>
//                                 <Text style={styles.tankFilledLabel}>Filled</Text>
//                                 <Text style={styles.tankLiters}>
//                                     {tankCurrent.toLocaleString()} / {tankTotal.toLocaleString()} L
//                                 </Text>
//                                 {/* Progress Bar */}
//                                 <View style={styles.progressTrack}>
//                                     <View
//                                         style={[
//                                             styles.progressFill,
//                                             { width: `${tankPercent}%` },
//                                         ]}
//                                     />
//                                 </View>
//                                 <View style={styles.dividerLine} />
//                                 <View style={styles.statusRow}>
//                                     <View style={styles.statusCheck}>
//                                         <Text style={styles.statusCheckIcon}>✓</Text>
//                                     </View>
//                                     <View>
//                                         <Text style={styles.statusNormal}>Normal</Text>
//                                         <Text style={styles.statusDesc}>Everything is working fine.</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                 </View>


//                 {/* Motor Control Card */}
//                 <View style={styles.card}>
//                     <Text style={styles.cardTitle}>Motor Control</Text>
//                     <View style={styles.motorRow}>
//                         {/* Motor Illustration */}
//                         <View style={styles.motorIllustration}>
//                             <View style={styles.motorBody}>
//                                 <View style={styles.motorFin} />
//                                 <View style={styles.motorFin} />
//                                 <View style={styles.motorFin} />
//                                 <View style={styles.motorFin} />
//                                 <View style={styles.motorFin} />
//                             </View>
//                             <View style={styles.motorShaft} />
//                             <View style={styles.motorBase} />
//                         </View>

//                         {/* Motor Info */}
//                         <View style={styles.motorInfo}>
//                             <Text style={[styles.motorStatus, motorOn ? styles.motorOn : styles.motorOff]}>
//                                 {motorOn ? "ON" : "OFF"}
//                             </Text>
//                             <Text style={styles.motorDesc}>
//                                 {motorOn ? "Motor is running" : "Motor is stopped"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={[
//                                     styles.motorBtn,
//                                     motorOn ? styles.motorBtnOff : styles.motorBtnOn,
//                                 ]}
//                                 onPress={() => setMotorOn(!motorOn)}
//                                 activeOpacity={0.85}
//                             >
//                                 <Text style={styles.motorBtnIcon}>⏻</Text>
//                                 <Text style={styles.motorBtnText}>
//                                     {motorOn ? "TURN OFF" : "TURN ON"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Stats Row */}
//                 <View style={styles.statsRow}>
//                     <View style={[styles.statCard, { marginRight: 8 }]}>
//                         <View style={styles.statIconWrap}>
//                             <Text style={styles.statIconEmoji}>💧</Text>
//                         </View>
//                         <Text style={styles.statLabel}>Water Saved</Text>
//                         <TouchableOpacity
//                             style={styles.card}
//                             activeOpacity={0.85}
//                             onPress={() => router.push("/Dashboard/graph" as any)}
//                         >
//                             <Text style={styles.statValue}>
//                                 12,540 <Text style={styles.statUnit}>L</Text>
//                             </Text>
//                             <Text style={styles.statMonth}>This Month</Text>
//                             <Text style={styles.statChange}>↑ 18% vs last month</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.statCard}>
//                         <View style={[styles.statIconWrap, styles.statIconGreen]}>
//                             <Text style={styles.statIconEmoji}>⚡</Text>
//                         </View>
//                         <Text style={styles.statLabel}>Power Saved</Text>
//                         <TouchableOpacity
//                             style={styles.card}
//                             activeOpacity={0.85}
//                             onPress={() => router.push("/Dashboard/graph" as any)}
//                         >
//                             <Text style={styles.statValue}>
//                                 38.6 <Text style={styles.statUnit}>kWh</Text>
//                             </Text>
//                             <Text style={styles.statMonth}>This Month</Text>
//                             <Text style={styles.statChange}>↑ 22% vs last month</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Smart Protection */}
//                 <TouchableOpacity style={styles.protectionCard} activeOpacity={0.85}>
//                     <View style={styles.protectionLeft}>
//                         <View style={styles.shieldWrap}>
//                             <Text style={styles.shieldIcon}>🛡️</Text>
//                             <Text style={styles.shieldCheck}>✓</Text>
//                         </View>
//                         <View>
//                             <Text style={styles.protectionTitle}>Smart Protection</Text>
//                             <Text style={styles.protectionDesc}>
//                                 Dry Run Protection, Overload{"\n"}Protection & Auto Control
//                             </Text>
//                         </View>
//                     </View>
//                     <Text style={styles.arrowIcon}>›</Text>
//                 </TouchableOpacity>

//                 {/* Alerts */}
//                 <View style={styles.alertsHeader}>
//                     <Text style={styles.alertsTitle}>Alerts & Responses</Text>
//                     <TouchableOpacity>
//                         <Text style={styles.viewAll}>View All ›</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Alert 1 */}
//                 <View style={styles.alertCard}>
//                     <View style={[styles.alertIconWrap, styles.alertIconRed]}>
//                         <Text style={styles.alertIconEmoji}>⚠️</Text>
//                     </View>
//                     <View style={styles.alertBody}>
//                         <Text style={styles.alertTitleRed}>Leakage Detected</Text>
//                         <Text style={styles.alertDesc}>
//                             Possible leakage detected.{"\n"}Check taps and pipelines.
//                         </Text>
//                     </View>
//                     <View style={styles.alertActions}>
//                         <View style={styles.alertBadgeRed}>
//                             <Text style={styles.alertBadgeText}>Action Needed</Text>
//                         </View>
//                         <TouchableOpacity style={styles.alertCheckBtn}>
//                             <Text style={styles.alertCheckBtnText}>Check Now</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Alert 2 */}
//                 <View style={[styles.alertCard, { marginBottom: 24 }]}>
//                     <View style={[styles.alertIconWrap, styles.alertIconYellow]}>
//                         <Text style={styles.alertIconEmoji}>⚠️</Text>
//                     </View>
//                     <View style={styles.alertBody}>
//                         <Text style={styles.alertTitleYellow}>No Water Coming</Text>
//                         <Text style={styles.alertDesc}>
//                             No water inflow detected.{"\n"}Check source supply or motor dry run.
//                         </Text>
//                     </View>
//                     <View style={styles.alertActions}>
//                         <TouchableOpacity style={styles.alertSupplyBtn}>
//                             <Text style={styles.alertSupplyBtnText}>Check Supply</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.alertCheckBtnYellow}>
//                             <Text style={styles.alertCheckBtnYellowText}>Check Now</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>

//             {/* Bottom Navigation */}
//             <View style={styles.bottomNav}>
//                 {[
//                     { icon: "⊞", label: "Dashboard", active: true, route: "/Dashboard/dashboard" },
//                     { icon: "🕐", label: "History", active: false, route: "/Dashboard/history" },
//                     { icon: "🔔", label: "Alerts", active: false, route: "/Dashboard/alerts" },
//                     { icon: "⚙️", label: "Settings", active: false, route: "/Dashboard/settings" },
//                 ].map((tab) => (
//                     <TouchableOpacity
//                         key={tab.label}
//                         style={styles.navTab}
//                         onPress={() => router.replace(tab.route as any)}
//                     >
//                         <Text style={[styles.navIcon, tab.active && styles.navIconActive]}>
//                             {tab.icon}
//                         </Text>
//                         <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>
//                             {tab.label}
//                         </Text>
//                         {tab.active && <View style={styles.navActiveBar} />}
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safe: { flex: 1, backgroundColor: "#EEF4FB" },

//     // Header
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         backgroundColor: "#EEF4FB",
//     },
//     menuBtn: { padding: 4 },
//     menuLine: {
//         width: 22,
//         height: 2.5,
//         backgroundColor: "#333",
//         marginVertical: 2.5,
//         borderRadius: 2,
//     },
//     headerCenter: { alignItems: "center" },
//     headerTitle: { fontSize: 22, fontWeight: "800" },
//     headerBlue: { color: "#1565C0" },
//     headerGreen: { color: "#2E7D32" },
//     headerSub: { fontSize: 11, color: "#666", marginTop: 1 },
//     bellBtn: { position: "relative", padding: 4 },
//     bellIcon: { fontSize: 22 },
//     bellDot: {
//         position: "absolute",
//         top: 4,
//         right: 4,
//         width: 9,
//         height: 9,
//         borderRadius: 5,
//         backgroundColor: "#4CAF50",
//         borderWidth: 1.5,
//         borderColor: "#EEF4FB",
//     },

//     scroll: { flex: 1 },
//     scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

//     // Cards
//     card: {
//         backgroundColor: "white",
//         borderRadius: 18,
//         padding: 16,
//         marginBottom: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     cardTitle: {
//         fontSize: 17,
//         fontWeight: "700",
//         color: "#111",
//         marginBottom: 12,
//     },

//     // Tank
//     tankRow: { flexDirection: "row", alignItems: "center" },
//     tankIllustration: { alignItems: "center", marginRight: 16, width: 110 },
//     tankBody: {
//         width: 90,
//         height: 110,
//         borderRadius: 10,
//         overflow: "hidden",
//         borderWidth: 2,
//         borderColor: "#B0BEC5",
//         flexDirection: "column-reverse",
//     },
//     tankEmpty: { flex: 28, backgroundColor: "#f0f0f0" },
//     tankWater: { backgroundColor: "#1565C0" },
//     tankPipe: {
//         width: 6,
//         height: 20,
//         backgroundColor: "#78909C",
//         alignSelf: "flex-end",
//         marginRight: 10,
//     },
//     tankStandRow: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         width: 80,
//     },
//     tankLeg: { width: 10, height: 22, backgroundColor: "#90A4AE", borderRadius: 2 },
//     tankBase: {
//         width: 90,
//         height: 6,
//         backgroundColor: "#78909C",
//         borderRadius: 3,
//     },
//     tankInfo: { flex: 1 },
//     tankPercent: { lineHeight: 50 },
//     tankPercentNum: { fontSize: 48, fontWeight: "800", color: "#1565C0" },
//     tankPercentSym: { fontSize: 22, fontWeight: "700", color: "#1565C0" },
//     tankFilledLabel: { fontSize: 14, fontWeight: "700", color: "#222", marginTop: -4 },
//     tankLiters: { fontSize: 13, color: "#1565C0", fontWeight: "600", marginTop: 2 },
//     progressTrack: {
//         height: 8,
//         backgroundColor: "#E0E0E0",
//         borderRadius: 4,
//         marginTop: 8,
//         marginBottom: 12,
//         overflow: "hidden",
//     },
//     progressFill: {
//         height: "100%",
//         backgroundColor: "#1565C0",
//         borderRadius: 4,
//     },
//     dividerLine: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 10 },
//     statusRow: { flexDirection: "row", alignItems: "center" },
//     statusCheck: {
//         width: 22,
//         height: 22,
//         borderRadius: 11,
//         borderWidth: 2,
//         borderColor: "#4CAF50",
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 8,
//     },
//     statusCheckIcon: { color: "#4CAF50", fontSize: 12, fontWeight: "800" },
//     statusNormal: { fontSize: 13, fontWeight: "700", color: "#222" },
//     statusDesc: { fontSize: 11, color: "#888" },

//     // Motor
//     motorRow: { flexDirection: "row", alignItems: "center" },
//     motorIllustration: { alignItems: "center", marginRight: 16, width: 110 },
//     motorBody: {
//         width: 80,
//         height: 55,
//         backgroundColor: "#1565C0",
//         borderRadius: 8,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-around",
//         paddingHorizontal: 8,
//         overflow: "hidden",
//     },
//     motorFin: {
//         width: 8,
//         height: 40,
//         backgroundColor: "rgba(255,255,255,0.2)",
//         borderRadius: 2,
//     },
//     motorShaft: {
//         width: 30,
//         height: 10,
//         backgroundColor: "#90A4AE",
//         borderRadius: 5,
//         alignSelf: "flex-end",
//         marginRight: 0,
//         marginTop: -5,
//     },
//     motorBase: {
//         width: 90,
//         height: 8,
//         backgroundColor: "#455A64",
//         borderRadius: 4,
//         marginTop: 2,
//     },
//     motorInfo: { flex: 1 },
//     motorStatus: { fontSize: 32, fontWeight: "900", letterSpacing: 1 },
//     motorOn: { color: "#2E7D32" },
//     motorOff: { color: "#C62828" },
//     motorDesc: { fontSize: 13, color: "#555", marginBottom: 12 },
//     motorBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 30,
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//     },
//     motorBtnOff: { backgroundColor: "#2E7D32" },
//     motorBtnOn: { backgroundColor: "#C62828" },
//     motorBtnIcon: { color: "white", fontSize: 14, marginRight: 6 },
//     motorBtnText: { color: "white", fontWeight: "800", fontSize: 14, letterSpacing: 1 },

//     // Stats
//     statsRow: { flexDirection: "row", marginBottom: 14 },
//     statCard: {
//         flex: 1,
//         backgroundColor: "white",
//         borderRadius: 16,
//         padding: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     statIconWrap: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         backgroundColor: "#E3F2FD",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 8,
//     },
//     statIconGreen: { backgroundColor: "#E8F5E9" },
//     statIconEmoji: { fontSize: 20 },
//     statLabel: { fontSize: 12, color: "#666", fontWeight: "600", marginBottom: 2 },
//     statValue: { fontSize: 24, fontWeight: "800", color: "#111" },
//     statUnit: { fontSize: 14, fontWeight: "600", color: "#1565C0" },
//     statMonth: { fontSize: 11, color: "#888", marginTop: 2 },
//     statChange: { fontSize: 11, color: "#2E7D32", fontWeight: "600", marginTop: 3 },

//     // Protection
//     protectionCard: {
//         backgroundColor: "white",
//         borderRadius: 16,
//         padding: 16,
//         marginBottom: 14,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     protectionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
//     shieldWrap: { position: "relative", marginRight: 12 },
//     shieldIcon: { fontSize: 36 },
//     shieldCheck: {
//         position: "absolute",
//         bottom: 0,
//         right: -2,
//         fontSize: 12,
//         color: "white",
//         fontWeight: "800",
//     },
//     protectionTitle: { fontSize: 15, fontWeight: "700", color: "#111", marginBottom: 2 },
//     protectionDesc: { fontSize: 12, color: "#666", lineHeight: 17 },
//     arrowIcon: { fontSize: 22, color: "#999", fontWeight: "300" },

//     // Alerts
//     alertsHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     alertsTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
//     viewAll: { fontSize: 13, color: "#1565C0", fontWeight: "600" },
//     alertCard: {
//         backgroundColor: "white",
//         borderRadius: 16,
//         padding: 14,
//         marginBottom: 10,
//         flexDirection: "row",
//         alignItems: "flex-start",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     alertIconWrap: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 10,
//     },
//     alertIconRed: { backgroundColor: "#FFEBEE" },
//     alertIconYellow: { backgroundColor: "#FFF8E1" },
//     alertIconEmoji: { fontSize: 20 },
//     alertBody: { flex: 1 },
//     alertTitleRed: { fontSize: 14, fontWeight: "700", color: "#C62828", marginBottom: 2 },
//     alertTitleYellow: { fontSize: 14, fontWeight: "700", color: "#E65100", marginBottom: 2 },
//     alertDesc: { fontSize: 11, color: "#666", lineHeight: 16 },
//     alertActions: { alignItems: "flex-end", justifyContent: "center", gap: 6 },
//     alertBadgeRed: {
//         backgroundColor: "#FFEBEE",
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//     },
//     alertBadgeText: { fontSize: 10, color: "#C62828", fontWeight: "700" },
//     alertCheckBtn: {
//         borderWidth: 1.5,
//         borderColor: "#C62828",
//         borderRadius: 20,
//         paddingHorizontal: 12,
//         paddingVertical: 5,
//     },
//     alertCheckBtnText: { fontSize: 11, color: "#C62828", fontWeight: "700" },
//     alertSupplyBtn: {
//         borderWidth: 1.5,
//         borderColor: "#E65100",
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//     },
//     alertSupplyBtnText: { fontSize: 10, color: "#E65100", fontWeight: "700" },
//     alertCheckBtnYellow: {
//         borderWidth: 1.5,
//         borderColor: "#E65100",
//         borderRadius: 20,
//         paddingHorizontal: 12,
//         paddingVertical: 5,
//     },
//     alertCheckBtnYellowText: { fontSize: 11, color: "#E65100", fontWeight: "700" },

//     // Bottom Nav
//     bottomNav: {
//         flexDirection: "row",
//         backgroundColor: "white",
//         borderTopWidth: 1,
//         borderTopColor: "#E8EEF4",
//         paddingBottom: 8,
//         paddingTop: 6,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.06,
//         shadowRadius: 8,
//         elevation: 10,
//     },
//     navTab: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         paddingTop: 4,
//     },
//     navIcon: { fontSize: 20, color: "#999" },
//     navIconActive: { color: "#1565C0" },
//     navLabel: { fontSize: 10, color: "#999", marginTop: 3, fontWeight: "500" },
//     navLabelActive: { color: "#1565C0", fontWeight: "700" },
//     navActiveBar: {
//         position: "absolute",
//         top: 0,
//         width: 28,
//         height: 3,
//         backgroundColor: "#1565C0",
//         borderRadius: 2,
//     },
// });



import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    BackHandler,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import UltraWaveTank from "./component/UltraWaveTank";

const { width } = Dimensions.get("window");



export default function Dashboard() {
    const [motorOn, setMotorOn] = useState(true);
    const tankPercent = 60;
    const tankCurrent = 3600;
    const tankTotal = 5000;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            return true; // blocks back — user must use nav or swipe to exit
            // OR return false; // allows app to exit normally
        });
        return () => backHandler.remove();
    }, []);


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuBtn}>
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>
                        <Text style={styles.headerBlue}>Aqua</Text>
                        <Text style={styles.headerGreen}>Smart</Text>
                    </Text>
                    <Text style={styles.headerSub}>Smart Water Motor & Tank System</Text>
                </View>
                <TouchableOpacity style={styles.bellBtn}>
                    <Text style={styles.bellIcon}>🔔</Text>
                    <View style={styles.bellDot} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Tank Level Card */}
                <View style={styles.card}>
                    {/* <Text style={styles.cardTitle}>Tank Level</Text> */}
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => router.push("/Dashboard/graph" as any)}
                    >
                        <Text style={styles.cardTitle}>Tank Level</Text>
                        <View style={styles.tankRow}>
                            {/* Tank Illustration */}
                            {/* <View style={styles.tankIllustration}>
                                <View style={styles.tankBody}>
                                    <View style={styles.tankEmpty} />
                                    <View style={[styles.tankWater, { flex: tankPercent }]} />
                                </View>
                                <View style={styles.tankPipe} />
                                <View style={styles.tankStandRow}>
                                    {[0, 1, 2, 3].map((i) => (
                                        <View key={i} style={styles.tankLeg} />
                                    ))}
                                </View>
                                <View style={styles.tankBase} />
                            </View> */}
                            <UltraWaveTank percent={tankPercent} />

                            {/* Tank Info */}
                            <View style={styles.tankInfo}>
                                <Text style={styles.tankPercent}>
                                    <Text style={styles.tankPercentNum}>{tankPercent}</Text>
                                    <Text style={styles.tankPercentSym}>%</Text>
                                </Text>
                                <Text style={styles.tankFilledLabel}>Filled</Text>
                                <Text style={styles.tankLiters}>
                                    {tankCurrent.toLocaleString()} / {tankTotal.toLocaleString()} L
                                </Text>
                                {/* Progress Bar */}
                                <View style={styles.progressTrack}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${tankPercent}%` },
                                        ]}
                                    />
                                </View>
                                <View style={styles.dividerLine} />
                                <View style={styles.statusRow}>
                                    <View style={styles.statusCheck}>
                                        <Text style={styles.statusCheckIcon}>✓</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.statusNormal}>Normal</Text>
                                        <Text style={styles.statusDesc}>Everything is working fine.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>


                {/* Motor Control Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Motor Control</Text>
                    <View style={styles.motorRow}>
                        {/* Motor Illustration */}
                        <View style={styles.motorIllustration}>
                            <View style={styles.motorBody}>
                                <View style={styles.motorFin} />
                                <View style={styles.motorFin} />
                                <View style={styles.motorFin} />
                                <View style={styles.motorFin} />
                                <View style={styles.motorFin} />
                            </View>
                            <View style={styles.motorShaft} />
                            <View style={styles.motorBase} />
                        </View>

                        {/* Motor Info */}
                        <View style={styles.motorInfo}>
                            <Text style={[styles.motorStatus, motorOn ? styles.motorOn : styles.motorOff]}>
                                {motorOn ? "ON" : "OFF"}
                            </Text>
                            <Text style={styles.motorDesc}>
                                {motorOn ? "Motor is running" : "Motor is stopped"}
                            </Text>
                            <TouchableOpacity
                                style={[
                                    styles.motorBtn,
                                    motorOn ? styles.motorBtnOff : styles.motorBtnOn,
                                ]}
                                onPress={() => setMotorOn(!motorOn)}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.motorBtnIcon}>⏻</Text>
                                <Text style={styles.motorBtnText}>
                                    {motorOn ? "TURN OFF" : "TURN ON"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { marginRight: 8 }]}>
                        <View style={styles.statIconWrap}>
                            <Text style={styles.statIconEmoji}>💧</Text>
                        </View>
                        <Text style={styles.statLabel}>Water Saved</Text>
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.85}
                            onPress={() => router.push("/Dashboard/graph" as any)}
                        >
                            <Text style={styles.statValue}>
                                12,540 <Text style={styles.statUnit}>L</Text>
                            </Text>
                            <Text style={styles.statMonth}>This Month</Text>
                            <Text style={styles.statChange}>↑ 18% vs last month</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconWrap, styles.statIconGreen]}>
                            <Text style={styles.statIconEmoji}>⚡</Text>
                        </View>
                        <Text style={styles.statLabel}>Power Saved</Text>
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.85}
                            onPress={() => router.push("/Dashboard/graph" as any)}
                        >
                            <Text style={styles.statValue}>
                                38.6 <Text style={styles.statUnit}>kWh</Text>
                            </Text>
                            <Text style={styles.statMonth}>This Month</Text>
                            <Text style={styles.statChange}>↑ 22% vs last month</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Smart Protection */}
                <TouchableOpacity style={styles.protectionCard} activeOpacity={0.85}>
                    <View style={styles.protectionLeft}>
                        <View style={styles.shieldWrap}>
                            <Text style={styles.shieldIcon}>🛡️</Text>
                            <Text style={styles.shieldCheck}>✓</Text>
                        </View>
                        <View>
                            <Text style={styles.protectionTitle}>Smart Protection</Text>
                            <Text style={styles.protectionDesc}>
                                Dry Run Protection, Overload{"\n"}Protection & Auto Control
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.arrowIcon}>›</Text>
                </TouchableOpacity>

                {/* Alerts */}
                <View style={styles.alertsHeader}>
                    <Text style={styles.alertsTitle}>Alerts & Responses</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All ›</Text>
                    </TouchableOpacity>
                </View>

                {/* Alert 1 */}
                <View style={styles.alertCard}>
                    <View style={[styles.alertIconWrap, styles.alertIconRed]}>
                        <Text style={styles.alertIconEmoji}>⚠️</Text>
                    </View>
                    <View style={styles.alertBody}>
                        <Text style={styles.alertTitleRed}>Leakage Detected</Text>
                        <Text style={styles.alertDesc}>
                            Possible leakage detected.{"\n"}Check taps and pipelines.
                        </Text>
                    </View>
                    <View style={styles.alertActions}>
                        <View style={styles.alertBadgeRed}>
                            <Text style={styles.alertBadgeText}>Action Needed</Text>
                        </View>
                        <TouchableOpacity style={styles.alertCheckBtn}>
                            <Text style={styles.alertCheckBtnText}>Check Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Alert 2 */}
                <View style={[styles.alertCard, { marginBottom: 24 }]}>
                    <View style={[styles.alertIconWrap, styles.alertIconYellow]}>
                        <Text style={styles.alertIconEmoji}>⚠️</Text>
                    </View>
                    <View style={styles.alertBody}>
                        <Text style={styles.alertTitleYellow}>No Water Coming</Text>
                        <Text style={styles.alertDesc}>
                            No water inflow detected.{"\n"}Check source supply or motor dry run.
                        </Text>
                    </View>
                    <View style={styles.alertActions}>
                        <TouchableOpacity style={styles.alertSupplyBtn}>
                            <Text style={styles.alertSupplyBtnText}>Check Supply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.alertCheckBtnYellow}>
                            <Text style={styles.alertCheckBtnYellowText}>Check Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                {[
                    { icon: "⊞", label: "Dashboard", active: true, route: "/Dashboard/dashboard" },
                    { icon: "🕐", label: "History", active: false, route: "/Dashboard/history" },
                    { icon: "🔔", label: "Alerts", active: false, route: "/Dashboard/alerts" },
                    { icon: "⚙️", label: "Settings", active: false, route: "/Dashboard/settings" },
                ].map((tab) => (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.navTab}
                        onPress={() => router.replace(tab.route as any)}
                    >
                        <Text style={[styles.navIcon, tab.active && styles.navIconActive]}>
                            {tab.icon}
                        </Text>
                        <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>
                            {tab.label}
                        </Text>
                        {tab.active && <View style={styles.navActiveBar} />}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     // safe: { flex: 1, backgroundColor: "#EEF4FB" },
//     safe: { flex: 1, backgroundColor: "#000000" },

//     // Header
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         backgroundColor: "#434446",
//     },
//     menuBtn: { padding: 4 },
//     menuLine: {
//         width: 22,
//         height: 2.5,
//         backgroundColor: "#999797",
//         marginVertical: 2.5,
//         borderRadius: 2,
//     },
//     headerCenter: { alignItems: "center" },
//     headerTitle: { fontSize: 22, fontWeight: "800" },
//     headerBlue: { color: "#1565C0" },
//     headerGreen: { color: "#2E7D32" },
//     headerSub: { fontSize: 11, color: "#666", marginTop: 1 },
//     bellBtn: { position: "relative", padding: 4 },
//     bellIcon: { fontSize: 22 },
//     bellDot: {
//         position: "absolute",
//         top: 4,
//         right: 4,
//         width: 9,
//         height: 9,
//         borderRadius: 5,
//         backgroundColor: "#4CAF50",
//         borderWidth: 1.5,
//         borderColor: "#EEF4FB",
//     },

//     scroll: { flex: 1 },
//     scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

//     // Cards
//     card: {
//         backgroundColor: "#434446",
//         borderRadius: 18,
//         padding: 16,
//         marginBottom: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     cardTitle: {
//         fontSize: 17,
//         fontWeight: "700",
//         color: "#111",
//         marginBottom: 12,
//     },

//     // Tank
//     tankRow: { flexDirection: "row", alignItems: "center" },
//     tankIllustration: { alignItems: "center", marginRight: 16, width: 110 },
//     tankBody: {
//         width: 90,
//         height: 110,
//         borderRadius: 10,
//         overflow: "hidden",
//         borderWidth: 2,
//         borderColor: "#B0BEC5",
//         flexDirection: "column-reverse",
//     },
//     tankEmpty: { flex: 28, backgroundColor: "#f0f0f0" },
//     tankWater: { backgroundColor: "#1565C0" },
//     tankPipe: {
//         width: 6,
//         height: 20,
//         backgroundColor: "#78909C",
//         alignSelf: "flex-end",
//         marginRight: 10,
//     },
//     tankStandRow: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         width: 80,
//     },
//     tankLeg: { width: 10, height: 22, backgroundColor: "#90A4AE", borderRadius: 2 },
//     tankBase: {
//         width: 90,
//         height: 6,
//         backgroundColor: "#78909C",
//         borderRadius: 3,
//     },
//     tankInfo: { flex: 1 },
//     tankPercent: { lineHeight: 50 },
//     tankPercentNum: { fontSize: 48, fontWeight: "800", color: "#1565C0" },
//     tankPercentSym: { fontSize: 22, fontWeight: "700", color: "#1565C0" },
//     tankFilledLabel: { fontSize: 14, fontWeight: "700", color: "#222", marginTop: -4 },
//     tankLiters: { fontSize: 13, color: "#1565C0", fontWeight: "600", marginTop: 2 },
//     progressTrack: {
//         height: 8,
//         backgroundColor: "#E0E0E0",
//         borderRadius: 4,
//         marginTop: 8,
//         marginBottom: 12,
//         overflow: "hidden",
//     },
//     progressFill: {
//         height: "100%",
//         backgroundColor: "#1565C0",
//         borderRadius: 4,
//     },
//     dividerLine: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 10 },
//     statusRow: { flexDirection: "row", alignItems: "center" },
//     statusCheck: {
//         width: 22,
//         height: 22,
//         borderRadius: 11,
//         borderWidth: 2,
//         borderColor: "#4CAF50",
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 8,
//     },
//     statusCheckIcon: { color: "#4CAF50", fontSize: 12, fontWeight: "800" },
//     statusNormal: { fontSize: 13, fontWeight: "700", color: "#222" },
//     statusDesc: { fontSize: 11, color: "#888" },

//     // Motor
//     motorRow: { flexDirection: "row", alignItems: "center" },
//     motorIllustration: { alignItems: "center", marginRight: 16, width: 110 },
//     motorBody: {
//         width: 80,
//         height: 55,
//         backgroundColor: "#1565C0",
//         borderRadius: 8,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-around",
//         paddingHorizontal: 8,
//         overflow: "hidden",
//     },
//     motorFin: {
//         width: 8,
//         height: 40,
//         backgroundColor: "rgba(255,255,255,0.2)",
//         borderRadius: 2,
//     },
//     motorShaft: {
//         width: 30,
//         height: 10,
//         backgroundColor: "#90A4AE",
//         borderRadius: 5,
//         alignSelf: "flex-end",
//         marginRight: 0,
//         marginTop: -5,
//     },
//     motorBase: {
//         width: 90,
//         height: 8,
//         backgroundColor: "#455A64",
//         borderRadius: 4,
//         marginTop: 2,
//     },
//     motorInfo: { flex: 1 },
//     motorStatus: { fontSize: 32, fontWeight: "900", letterSpacing: 1 },
//     motorOn: { color: "#2E7D32" },
//     motorOff: { color: "#C62828" },
//     motorDesc: { fontSize: 13, color: "#555", marginBottom: 12 },
//     motorBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 30,
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//     },
//     motorBtnOff: { backgroundColor: "#2E7D32" },
//     motorBtnOn: { backgroundColor: "#C62828" },
//     motorBtnIcon: { color: "white", fontSize: 14, marginRight: 6 },
//     motorBtnText: { color: "white", fontWeight: "800", fontSize: 14, letterSpacing: 1 },

//     // Stats
//     statsRow: { flexDirection: "row", marginBottom: 14 },
//     statCard: {
//         flex: 1,
//         backgroundColor: "#434446",
//         borderRadius: 16,
//         padding: 14,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     statIconWrap: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         backgroundColor: "#434446",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 8,
//     },
//     statIconGreen: { backgroundColor: "#434446" },
//     statIconEmoji: { fontSize: 20 },
//     statLabel: { fontSize: 12, color: "#666", fontWeight: "600", marginBottom: 2 },
//     statValue: { fontSize: 24, fontWeight: "800", color: "#111" },
//     statUnit: { fontSize: 14, fontWeight: "600", color: "#1565C0" },
//     statMonth: { fontSize: 11, color: "#888", marginTop: 2 },
//     statChange: { fontSize: 11, color: "#2E7D32", fontWeight: "600", marginTop: 3 },

//     // Protection
//     protectionCard: {
//         backgroundColor: "#434446",
//         borderRadius: 16,
//         padding: 16,
//         marginBottom: 14,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     protectionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
//     shieldWrap: { position: "relative", marginRight: 12 },
//     shieldIcon: { fontSize: 36 },
//     shieldCheck: {
//         position: "absolute",
//         bottom: 0,
//         right: -2,
//         fontSize: 12,
//         color: "white",
//         fontWeight: "800",
//     },
//     protectionTitle: { fontSize: 15, fontWeight: "700", color: "#111", marginBottom: 2 },
//     protectionDesc: { fontSize: 12, color: "#666", lineHeight: 17 },
//     arrowIcon: { fontSize: 22, color: "#999", fontWeight: "300" },

//     // Alerts
//     alertsHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     alertsTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
//     viewAll: { fontSize: 13, color: "#1565C0", fontWeight: "600" },
//     alertCard: {
//         backgroundColor: "#434446",
//         borderRadius: 16,
//         padding: 14,
//         marginBottom: 10,
//         flexDirection: "row",
//         alignItems: "flex-start",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.07,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     alertIconWrap: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 10,
//     },
//     alertIconRed: { backgroundColor: "#434446" },
//     alertIconYellow: { backgroundColor: "#434446" },
//     alertIconEmoji: { fontSize: 20 },
//     alertBody: { flex: 1 },
//     alertTitleRed: { fontSize: 14, fontWeight: "700", color: "#C62828", marginBottom: 2 },
//     alertTitleYellow: { fontSize: 14, fontWeight: "700", color: "#E65100", marginBottom: 2 },
//     alertDesc: { fontSize: 11, color: "#666", lineHeight: 16 },
//     alertActions: { alignItems: "flex-end", justifyContent: "center", gap: 6 },
//     alertBadgeRed: {
//         backgroundColor: "#FFEBEE",
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//     },
//     alertBadgeText: { fontSize: 10, color: "#C62828", fontWeight: "700" },
//     alertCheckBtn: {
//         borderWidth: 1.5,
//         borderColor: "#C62828",
//         borderRadius: 20,
//         paddingHorizontal: 12,
//         paddingVertical: 5,
//     },
//     alertCheckBtnText: { fontSize: 11, color: "#C62828", fontWeight: "700" },
//     alertSupplyBtn: {
//         borderWidth: 1.5,
//         borderColor: "#E65100",
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//     },
//     alertSupplyBtnText: { fontSize: 10, color: "#E65100", fontWeight: "700" },
//     alertCheckBtnYellow: {
//         borderWidth: 1.5,
//         borderColor: "#E65100",
//         borderRadius: 20,
//         paddingHorizontal: 12,
//         paddingVertical: 5,
//     },
//     alertCheckBtnYellowText: { fontSize: 11, color: "#E65100", fontWeight: "700" },

//     // Bottom Nav
//     bottomNav: {
//         flexDirection: "row",
//         backgroundColor: "#434446",
//         borderTopWidth: 1,
//         borderTopColor: "#969a9e",
//         paddingBottom: 8,
//         paddingTop: 6,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.06,
//         shadowRadius: 8,
//         elevation: 10,
//     },
//     navTab: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         paddingTop: 4,
//     },
//     navIcon: { fontSize: 20, color: "#999" },
//     navIconActive: { color: "#1565C0" },
//     navLabel: { fontSize: 10, color: "#999", marginTop: 3, fontWeight: "500" },
//     navLabelActive: { color: "#1565C0", fontWeight: "700" },
//     navActiveBar: {
//         position: "absolute",
//         top: 0,
//         width: 28,
//         height: 3,
//         backgroundColor: "#1565C0",
//         borderRadius: 2,
//     },
// });


const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#0a0e1a" }, // Dark background

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: "#131826", // Dark header
    },
    menuBtn: { padding: 4 },
    menuLine: {
        width: 22,
        height: 2.5,
        backgroundColor: "#9ca3af", // Lighter gray for visibility
        marginVertical: 2.5,
        borderRadius: 2,
    },
    headerCenter: { alignItems: "center" },
    headerTitle: { fontSize: 22, fontWeight: "800" },
    headerBlue: { color: "#4FC3F7" }, // Lighter blue for dark mode
    headerGreen: { color: "#81C784" }, // Lighter green for dark mode
    headerSub: { fontSize: 11, color: "#9ca3af", marginTop: 1 },
    bellBtn: { position: "relative", padding: 4 },
    bellIcon: { fontSize: 22, color: "#e5e7eb" },
    bellDot: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#4CAF50",
        borderWidth: 1.5,
        borderColor: "#131826",
    },

    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

    // Cards
    card: {
        backgroundColor: "#1a1f2e", // Dark card background
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#ffffff", // White text
        marginBottom: 12,
    },

    // Tank
    tankRow: { flexDirection: "row", alignItems: "center" },
    tankIllustration: { alignItems: "center", marginRight: 16, width: 110 },
    tankBody: {
        width: 90,
        height: 110,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#2a3e5c", // Darker border
        flexDirection: "column-reverse",
    },
    tankEmpty: { flex: 28, backgroundColor: "#1e2333" }, // Dark empty area
    tankWater: { backgroundColor: "#1e4a6e" }, // Darker water color
    tankPipe: {
        width: 6,
        height: 20,
        backgroundColor: "#4a5568",
        alignSelf: "flex-end",
        marginRight: 10,
    },
    tankStandRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 80,
    },
    tankLeg: { width: 10, height: 22, backgroundColor: "#4a5568", borderRadius: 2 },
    tankBase: {
        width: 90,
        height: 6,
        backgroundColor: "#2a3e5c",
        borderRadius: 3,
    },
    tankInfo: { flex: 1 },
    tankPercent: { lineHeight: 50 },
    tankPercentNum: { fontSize: 48, fontWeight: "800", color: "#4FC3F7" }, // Lighter blue
    tankPercentSym: { fontSize: 22, fontWeight: "700", color: "#4FC3F7" },
    tankFilledLabel: { fontSize: 14, fontWeight: "700", color: "#e5e7eb", marginTop: -4 },
    tankLiters: { fontSize: 13, color: "#4FC3F7", fontWeight: "600", marginTop: 2 },
    progressTrack: {
        height: 8,
        backgroundColor: "#2a2f3e", // Dark track
        borderRadius: 4,
        marginTop: 8,
        marginBottom: 12,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#4FC3F7", // Lighter blue fill
        borderRadius: 4,
    },
    dividerLine: { height: 1, backgroundColor: "#2a2f3e", marginBottom: 10 }, // Dark divider
    statusRow: { flexDirection: "row", alignItems: "center" },
    statusCheck: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#4CAF50",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    statusCheckIcon: { color: "#4CAF50", fontSize: 12, fontWeight: "800" },
    statusNormal: { fontSize: 13, fontWeight: "700", color: "#e5e7eb" },
    statusDesc: { fontSize: 11, color: "#9ca3af" },

    // Motor
    motorRow: { flexDirection: "row", alignItems: "center" },
    motorIllustration: { alignItems: "center", marginRight: 16, width: 110 },
    motorBody: {
        width: 80,
        height: 55,
        backgroundColor: "#1e4a6e", // Darker motor color
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 8,
        overflow: "hidden",
    },
    motorFin: {
        width: 8,
        height: 40,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 2,
    },
    motorShaft: {
        width: 30,
        height: 10,
        backgroundColor: "#4a5568",
        borderRadius: 5,
        alignSelf: "flex-end",
        marginRight: 0,
        marginTop: -5,
    },
    motorBase: {
        width: 90,
        height: 8,
        backgroundColor: "#2a3e5c",
        borderRadius: 4,
        marginTop: 2,
    },
    motorInfo: { flex: 1 },
    motorStatus: { fontSize: 32, fontWeight: "900", letterSpacing: 1 },
    motorOn: { color: "#81C784" }, // Light green for ON
    motorOff: { color: "#EF9A9A" }, // Light red for OFF
    motorDesc: { fontSize: 13, color: "#9ca3af", marginBottom: 12 },
    motorBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    motorBtnOff: { backgroundColor: "#81C784" }, // Green for OFF button (to turn ON)
    motorBtnOn: { backgroundColor: "#EF9A9A" }, // Red for ON button (to turn OFF)
    motorBtnIcon: { color: "white", fontSize: 14, marginRight: 6 },
    motorBtnText: { color: "white", fontWeight: "800", fontSize: 14, letterSpacing: 1 },

    // Stats
    statsRow: { flexDirection: "row", marginBottom: 14 },
    statCard: {
        flex: 1,
        backgroundColor: "#1a1f2e", // Dark card
        borderRadius: 16,
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    statIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#131826", // Slightly darker than card
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    statIconGreen: { backgroundColor: "#131826" },
    statIconEmoji: { fontSize: 20 },
    statLabel: { fontSize: 12, color: "#9ca3af", fontWeight: "600", marginBottom: 2 },
    statValue: { fontSize: 24, fontWeight: "800", color: "#ffffff" },
    statUnit: { fontSize: 14, fontWeight: "600", color: "#4FC3F7" },
    statMonth: { fontSize: 11, color: "#6b7280", marginTop: 2 },
    statChange: { fontSize: 11, color: "#81C784", fontWeight: "600", marginTop: 3 },

    // Protection
    protectionCard: {
        backgroundColor: "#1a1f2e", // Dark card
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    protectionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    shieldWrap: { position: "relative", marginRight: 12 },
    shieldIcon: { fontSize: 36 },
    shieldCheck: {
        position: "absolute",
        bottom: 0,
        right: -2,
        fontSize: 12,
        color: "#81C784",
        fontWeight: "800",
    },
    protectionTitle: { fontSize: 15, fontWeight: "700", color: "#ffffff", marginBottom: 2 },
    protectionDesc: { fontSize: 12, color: "#9ca3af", lineHeight: 17 },
    arrowIcon: { fontSize: 22, color: "#6b7280", fontWeight: "300" },

    // Alerts
    alertsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    alertsTitle: { fontSize: 17, fontWeight: "700", color: "#ffffff" },
    viewAll: { fontSize: 13, color: "#4FC3F7", fontWeight: "600" },
    alertCard: {
        backgroundColor: "#1a1f2e", // Dark card
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    alertIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    alertIconRed: { backgroundColor: "#2a1a1a" }, // Dark red-tinted
    alertIconYellow: { backgroundColor: "#2a241a" }, // Dark yellow-tinted
    alertIconEmoji: { fontSize: 20 },
    alertBody: { flex: 1 },
    alertTitleRed: { fontSize: 14, fontWeight: "700", color: "#EF9A9A", marginBottom: 2 }, // Light red
    alertTitleYellow: { fontSize: 14, fontWeight: "700", color: "#FFB74D", marginBottom: 2 }, // Light orange
    alertDesc: { fontSize: 11, color: "#9ca3af", lineHeight: 16 },
    alertActions: { alignItems: "flex-end", justifyContent: "center", gap: 6 },
    alertBadgeRed: {
        backgroundColor: "rgba(239, 154, 154, 0.15)", // Semi-transparent red
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    alertBadgeText: { fontSize: 10, color: "#EF9A9A", fontWeight: "700" },
    alertCheckBtn: {
        borderWidth: 1.5,
        borderColor: "#EF9A9A",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    alertCheckBtnText: { fontSize: 11, color: "#EF9A9A", fontWeight: "700" },
    alertSupplyBtn: {
        borderWidth: 1.5,
        borderColor: "#FFB74D",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    alertSupplyBtnText: { fontSize: 10, color: "#FFB74D", fontWeight: "700" },
    alertCheckBtnYellow: {
        borderWidth: 1.5,
        borderColor: "#FFB74D",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    alertCheckBtnYellowText: { fontSize: 11, color: "#FFB74D", fontWeight: "700" },

    // Bottom Nav
    bottomNav: {
        flexDirection: "row",
        backgroundColor: "#131826",
        borderTopWidth: 1,
        borderTopColor: "#2a2f3e",
        paddingBottom: 8,
        paddingTop: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    navTab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 4,
    },
    navIcon: { fontSize: 20, color: "#6b7280" },
    navIconActive: { color: "#4FC3F7" },
    navLabel: { fontSize: 10, color: "#6b7280", marginTop: 3, fontWeight: "500" },
    navLabelActive: { color: "#4FC3F7", fontWeight: "700" },
    navActiveBar: {
        position: "absolute",
        top: 0,
        width: 28,
        height: 3,
        backgroundColor: "#4FC3F7",
        borderRadius: 2,
    },
});
