import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FILTERS = ["All", "Motor", "Tank", "Alerts"];

const HISTORY_DATA = [
  {
    id: 1,
    type: "Motor",
    icon: "⚡",
    iconBg: "#E3F2FD",
    iconColor: "#1565C0",
    title: "Motor Turned ON",
    desc: "Motor started automatically — tank level dropped to 20%",
    time: "Today, 08:14 AM",
    tag: "Auto",
    tagColor: "#1565C0",
    tagBg: "#E3F2FD",
  },
  {
    id: 2,
    type: "Tank",
    icon: "💧",
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
    title: "Tank Filled to 72%",
    desc: "Tank level reached 3600L after 45 min of pumping",
    time: "Today, 09:02 AM",
    tag: "Normal",
    tagColor: "#2E7D32",
    tagBg: "#E8F5E9",
  },
  {
    id: 3,
    type: "Alerts",
    icon: "⚠️",
    iconBg: "#FFEBEE",
    iconColor: "#C62828",
    title: "Leakage Detected",
    desc: "Unusual pressure drop detected in pipeline",
    time: "Today, 11:30 AM",
    tag: "Alert",
    tagColor: "#C62828",
    tagBg: "#FFEBEE",
  },
  {
    id: 4,
    type: "Motor",
    icon: "⏻",
    iconBg: "#FFF8E1",
    iconColor: "#E65100",
    title: "Motor Turned OFF",
    desc: "Motor stopped manually by user",
    time: "Today, 12:45 PM",
    tag: "Manual",
    tagColor: "#E65100",
    tagBg: "#FFF8E1",
  },
  {
    id: 5,
    type: "Alerts",
    icon: "🚫",
    iconBg: "#FFF8E1",
    iconColor: "#E65100",
    title: "No Water Coming",
    desc: "No inflow detected while motor was running for 10 min",
    time: "Yesterday, 07:20 AM",
    tag: "Alert",
    tagColor: "#E65100",
    tagBg: "#FFF8E1",
  },
  {
    id: 6,
    type: "Tank",
    icon: "🌊",
    iconBg: "#E3F2FD",
    iconColor: "#1565C0",
    title: "Overflow Warning",
    desc: "Tank reached 90% — overflow alert triggered",
    time: "Yesterday, 10:55 AM",
    tag: "Warning",
    tagColor: "#1565C0",
    tagBg: "#E3F2FD",
  },
  {
    id: 7,
    type: "Motor",
    icon: "⚡",
    iconBg: "#E3F2FD",
    iconColor: "#1565C0",
    title: "Motor Turned ON",
    desc: "Motor started automatically — scheduled daily cycle",
    time: "Yesterday, 06:00 AM",
    tag: "Auto",
    tagColor: "#1565C0",
    tagBg: "#E3F2FD",
  },
  {
    id: 8,
    type: "Tank",
    icon: "💧",
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
    title: "Tank Filled to 95%",
    desc: "Tank level reached 4750L",
    time: "2 days ago, 08:30 AM",
    tag: "Normal",
    tagColor: "#2E7D32",
    tagBg: "#E8F5E9",
  },
];

const STATS = [
  { label: "Motor Runs", value: "24", unit: "this month", icon: "⚡" },
  { label: "Water Pumped", value: "48,200", unit: "Litres", icon: "💧" },
  { label: "Alerts", value: "6", unit: "this month", icon: "⚠️" },
];

export default function History() {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        router.replace("/Dashboard/dashboard" as any); // change to the appropriate "home" for that screen
        return true; // true = we handled it, don't exit app
      });
      return () => backHandler.remove();
    }, []);

  const filtered =
    activeFilter === "All"
      ? HISTORY_DATA
      : HISTORY_DATA.filter((d) => d.type === activeFilter);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>History</Text>
          <Text style={styles.headerSub}>Activity log of your water system</Text>
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
        {/* Stats Row */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statUnit}>{s.unit}</Text>
            </View>
          ))}
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[styles.filterText, activeFilter === f && styles.filterTextActive]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Timeline */}
        <View style={styles.timeline}>
          {filtered.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              {/* Left dot + line */}
              <View style={styles.timelineDotCol}>
                <View style={[styles.timelineDot, { backgroundColor: item.iconColor }]} />
                {index < filtered.length - 1 && <View style={styles.timelineLine} />}
              </View>

              {/* Card */}
              <View style={styles.historyCard}>
                <View style={styles.historyCardTop}>
                  <View style={[styles.historyIcon, { backgroundColor: item.iconBg }]}>
                    <Text style={styles.historyIconEmoji}>{item.icon}</Text>
                  </View>
                  <View style={styles.historyCardBody}>
                    <View style={styles.historyCardRow}>
                      <Text style={styles.historyTitle}>{item.title}</Text>
                      <View style={[styles.historyTag, { backgroundColor: item.tagBg }]}>
                        <Text style={[styles.historyTagText, { color: item.tagColor }]}>
                          {item.tag}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.historyDesc}>{item.desc}</Text>
                    <Text style={styles.historyTime}>🕐 {item.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
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
//   safe: { flex: 1, backgroundColor: "#EEF4FB" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#EEF4FB",
//   },
//   backArrow: { fontSize: 22, color: "#222", fontWeight: "600", padding: 6 },
//   headerCenter: { flex: 1, alignItems: "center" },
//   headerTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
//   headerSub: { fontSize: 11, color: "#777", marginTop: 2 },
//   bellBtn: { position: "relative", padding: 6 },
//   bellIcon: { fontSize: 22 },
//   bellDot: {
//     position: "absolute",
//     top: 6, right: 6,
//     width: 9, height: 9,
//     borderRadius: 5,
//     backgroundColor: "#4CAF50",
//     borderWidth: 1.5,
//     borderColor: "#EEF4FB",
//   },

//   scroll: { flex: 1 },
//   scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },

//   // Stats
//   statsRow: { flexDirection: "row", marginBottom: 16, gap: 8 },
//   statCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.07,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   statIcon: { fontSize: 20, marginBottom: 4 },
//   statValue: { fontSize: 18, fontWeight: "800", color: "#1565C0" },
//   statLabel: { fontSize: 10, fontWeight: "700", color: "#333", textAlign: "center", marginTop: 2 },
//   statUnit: { fontSize: 9, color: "#999", textAlign: "center" },

//   // Filters
//   filterScroll: { marginBottom: 16 },
//   filterContent: { gap: 8, paddingRight: 4 },
//   filterTab: {
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "white",
//     borderWidth: 1.5,
//     borderColor: "#D0DCF0",
//   },
//   filterTabActive: {
//     backgroundColor: "#1565C0",
//     borderColor: "#1565C0",
//   },
//   filterText: { fontSize: 13, fontWeight: "600", color: "#666" },
//   filterTextActive: { color: "white" },

//   // Timeline
//   timeline: { paddingLeft: 4 },
//   timelineItem: { flexDirection: "row", marginBottom: 14 },
//   timelineDotCol: { alignItems: "center", width: 20, marginRight: 12, paddingTop: 14 },
//   timelineDot: {
//     width: 12, height: 12,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: "white",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   timelineLine: {
//     flex: 1,
//     width: 2,
//     backgroundColor: "#D8E4F0",
//     marginTop: 4,
//     minHeight: 20,
//   },
//   historyCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.07,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   historyCardTop: { flexDirection: "row", alignItems: "flex-start" },
//   historyIcon: {
//     width: 40, height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   historyIconEmoji: { fontSize: 18 },
//   historyCardBody: { flex: 1 },
//   historyCardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 3,
//   },
//   historyTitle: { fontSize: 13, fontWeight: "700", color: "#111", flex: 1, marginRight: 6 },
//   historyTag: {
//     borderRadius: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   historyTagText: { fontSize: 10, fontWeight: "700" },
//   historyDesc: { fontSize: 11, color: "#777", lineHeight: 16, marginBottom: 4 },
//   historyTime: { fontSize: 10, color: "#AAB4C8", fontWeight: "500" },

//   // Bottom Nav
//   bottomNav: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#E8EEF4",
//     paddingBottom: 8,
//     paddingTop: 6,
//     elevation: 10,
//   },
//   navTab: { flex: 1, alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 4 },
//   navIcon: { fontSize: 20, color: "#999" },
//   navIconActive: { color: "#1565C0" },
//   navLabel: { fontSize: 10, color: "#999", marginTop: 3, fontWeight: "500" },
//   navLabelActive: { color: "#1565C0", fontWeight: "700" },
//   navActiveBar: {
//     position: "absolute", top: 0,
//     width: 28, height: 3,
//     backgroundColor: "#1565C0",
//     borderRadius: 2,
//   },
// });

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0e1a" }, // Dark background
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#131826", // Dark header
  },
  backArrow: { fontSize: 22, color: "#e5e7eb", fontWeight: "600", padding: 6 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#ffffff" },
  headerSub: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  bellBtn: { position: "relative", padding: 6 },
  bellIcon: { fontSize: 22, color: "#e5e7eb" },
  bellDot: {
    position: "absolute",
    top: 6, right: 6,
    width: 9, height: 9,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderWidth: 1.5,
    borderColor: "#131826",
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },

  // Stats
  statsRow: { flexDirection: "row", marginBottom: 16, gap: 8 },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1f2e", // Dark card
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: "800", color: "#4FC3F7" }, // Lighter blue
  statLabel: { fontSize: 10, fontWeight: "700", color: "#e5e7eb", textAlign: "center", marginTop: 2 },
  statUnit: { fontSize: 9, color: "#9ca3af", textAlign: "center" },

  // Filters
  filterScroll: { marginBottom: 16 },
  filterContent: { gap: 8, paddingRight: 4 },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1f2e", // Dark filter background
    borderWidth: 1.5,
    borderColor: "#2a2f3e", // Dark border
  },
  filterTabActive: {
    backgroundColor: "#1565C0", // Keep brand blue
    borderColor: "#1565C0",
  },
  filterText: { fontSize: 13, fontWeight: "600", color: "#9ca3af" },
  filterTextActive: { color: "white" },

  // Timeline
  timeline: { paddingLeft: 4 },
  timelineItem: { flexDirection: "row", marginBottom: 14 },
  timelineDotCol: { alignItems: "center", width: 20, marginRight: 12, paddingTop: 14 },
  timelineDot: {
    width: 12, height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#1a1f2e", // Match card background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#2a2f3e", // Dark line
    marginTop: 4,
    minHeight: 20,
  },
  historyCard: {
    flex: 1,
    backgroundColor: "#1a1f2e", // Dark card
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  historyCardTop: { flexDirection: "row", alignItems: "flex-start" },
  historyIcon: {
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  historyIconEmoji: { fontSize: 18 },
  historyCardBody: { flex: 1 },
  historyCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  historyTitle: { fontSize: 13, fontWeight: "700", color: "#ffffff", flex: 1, marginRight: 6 },
  historyTag: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  historyTagText: { fontSize: 10, fontWeight: "700" },
  historyDesc: { fontSize: 11, color: "#9ca3af", lineHeight: 16, marginBottom: 4 },
  historyTime: { fontSize: 10, color: "#6b7280", fontWeight: "500" },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#131826", // Dark bottom nav
    borderTopWidth: 1,
    borderTopColor: "#2a2f3e",
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 10,
  },
  navTab: { flex: 1, alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 4 },
  navIcon: { fontSize: 20, color: "#6b7280" },
  navIconActive: { color: "#4FC3F7" },
  navLabel: { fontSize: 10, color: "#6b7280", marginTop: 3, fontWeight: "500" },
  navLabelActive: { color: "#4FC3F7", fontWeight: "700" },
  navActiveBar: {
    position: "absolute", top: 0,
    width: 28, height: 3,
    backgroundColor: "#4FC3F7",
    borderRadius: 2,
  },
});