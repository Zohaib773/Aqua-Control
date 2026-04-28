import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 32 - 32 - 28; // screen - card padding - icon area

function SliderBar({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const x = e.nativeEvent.locationX;
      onChange(clamp(Math.round((x / SLIDER_WIDTH) * 100)));
    },
    onPanResponderMove: (e) => {
      const x = e.nativeEvent.locationX;
      onChange(clamp(Math.round((x / SLIDER_WIDTH) * 100)));
    },
  });

  const fillWidth = (value / 100) * SLIDER_WIDTH;

  // Inside your component, add this:
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      router.replace("/Dashboard/dashboard" as any); // change to the appropriate "home" for that screen
      return true; // true = we handled it, don't exit app
    });
    return () => backHandler.remove();
  }, []);

  return (
    <View style={sliderStyles.wrapper} {...panResponder.panHandlers}>
      <View style={sliderStyles.track}>
        <View style={[sliderStyles.fill, { width: fillWidth }]} />
        <View
          style={[sliderStyles.thumb, { left: fillWidth - 12 }]}
        />
      </View>
      <View style={sliderStyles.labels}>
        <Text style={sliderStyles.label}>0%</Text>
        <Text style={sliderStyles.label}>50%</Text>
        <Text style={sliderStyles.label}>100%</Text>
      </View>
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  wrapper: { marginVertical: 8 },
  track: {
    height: 6,
    backgroundColor: "#D0D8E8",
    borderRadius: 3,
    position: "relative",
    justifyContent: "center",
  },
  fill: {
    position: "absolute",
    left: 0,
    height: 6,
    backgroundColor: "#1565C0",
    borderRadius: 3,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1565C0",
    top: -9,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  label: { fontSize: 11, color: "#999" },
});

export default function AlertLimits() {
  const [leakageOn, setLeakageOn] = useState(true);
  const [leakageVal, setLeakageVal] = useState(30);

  const [lowWaterOn, setLowWaterOn] = useState(true);
  const [lowWaterVal, setLowWaterVal] = useState(20);

  const [overflowOn, setOverflowOn] = useState(true);
  const [overflowVal, setOverflowVal] = useState(90);

  const [noWaterOn, setNoWaterOn] = useState(true);
  const [noWaterTime, setNoWaterTime] = useState("After 10 min");

  const [pushOn, setPushOn] = useState(true);
  const [smsOn, setSmsOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  const timeOptions = ["After 5 min", "After 10 min", "After 15 min", "After 30 min"];
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleSwitch = (color = "#1565C0") => ({
    trackColor: { false: "#D0D8E8", true: "#4CAF50" },
    thumbColor: "white",
    ios_backgroundColor: "#D0D8E8",
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Alert Limits</Text>
          <Text style={styles.headerSub}>
            Set when you want to receive important water system alerts
          </Text>
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
        {/* Leakage Alert */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>💧</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Leakage Alert</Text>
              <Text style={styles.cardSubtitle}>Leakage sensitivity threshold</Text>
            </View>
            <Switch
              value={leakageOn}
              onValueChange={setLeakageOn}
              {...toggleSwitch()}
            />
          </View>
          <Text style={styles.valueText}>
            <Text style={styles.valueNum}>{leakageVal}</Text>
            <Text style={styles.valueSym}>%</Text>
          </Text>
          <SliderBar value={leakageVal} onChange={setLeakageVal} />
          <Text style={styles.hintText}>
            You will be alerted when unusual leakage exceeds this level.
          </Text>
        </View>

        {/* Low Water Level Alert */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🪣</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Low Water Level Alert</Text>
            </View>
            <Switch
              value={lowWaterOn}
              onValueChange={setLowWaterOn}
              {...toggleSwitch()}
            />
          </View>
          <Text style={styles.valueText}>
            <Text style={styles.valueNum}>{lowWaterVal}</Text>
            <Text style={styles.valueSym}>%</Text>
          </Text>
          <SliderBar value={lowWaterVal} onChange={setLowWaterVal} />
          <Text style={styles.hintText}>
            Send alert when tank level drops below this percentage.
          </Text>
        </View>

        {/* High Water / Overflow Alert */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🌊</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>High Water / Overflow Alert</Text>
            </View>
            <Switch
              value={overflowOn}
              onValueChange={setOverflowOn}
              {...toggleSwitch()}
            />
          </View>
          <Text style={styles.valueText}>
            <Text style={styles.valueNum}>{overflowVal}</Text>
            <Text style={styles.valueSym}>%</Text>
          </Text>
          <SliderBar value={overflowVal} onChange={setOverflowVal} />
          <Text style={styles.hintText}>
            Send alert when tank fills above this percentage.
          </Text>
        </View>

        {/* No Water Coming Alert */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🚫</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>No Water Coming Alert</Text>
            </View>
            <Switch
              value={noWaterOn}
              onValueChange={setNoWaterOn}
              {...toggleSwitch()}
            />
          </View>

          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTimePicker(!showTimePicker)}
            activeOpacity={0.85}
          >
            <Text style={styles.dropdownText}>{noWaterTime}</Text>
            <Text style={styles.dropdownArrow}>▾</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <View style={styles.dropdownOptions}>
              {timeOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.dropdownOption,
                    noWaterTime === opt && styles.dropdownOptionActive,
                  ]}
                  onPress={() => {
                    setNoWaterTime(opt);
                    setShowTimePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      noWaterTime === opt && styles.dropdownOptionTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={[styles.hintText, { marginTop: 10 }]}>
            Alert if no inflow is detected while motor is running.
          </Text>
        </View>

        {/* Notification Preferences */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔔</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Notification Preferences</Text>
            </View>
          </View>

          <View style={styles.prefRow}>
            <Text style={styles.prefIcon}>📱</Text>
            <Text style={styles.prefLabel}>Push Notification</Text>
            <Switch value={pushOn} onValueChange={setPushOn} {...toggleSwitch()} />
          </View>
          <View style={styles.prefDivider} />
          <View style={styles.prefRow}>
            <Text style={styles.prefIcon}>💬</Text>
            <Text style={styles.prefLabel}>SMS Alert</Text>
            <Switch value={smsOn} onValueChange={setSmsOn} {...toggleSwitch()} />
          </View>
          <View style={styles.prefDivider} />
          <View style={styles.prefRow}>
            <Text style={styles.prefIcon}>🔊</Text>
            <Text style={styles.prefLabel}>Sound Alert</Text>
            <Switch value={soundOn} onValueChange={setSoundOn} {...toggleSwitch()} />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveBtnIcon}>💾</Text>
          <Text style={styles.saveBtnText}>Save Limits</Text>
        </TouchableOpacity>

        {/* Reset */}
        <TouchableOpacity style={styles.resetBtn}>
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#EEF4FB" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EEF4FB",
  },
  backBtn: { padding: 6 },
  backArrow: { fontSize: 22, color: "#222", fontWeight: "600" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
  headerSub: { fontSize: 11, color: "#777", textAlign: "center", marginTop: 2, lineHeight: 15 },
  bellBtn: { position: "relative", padding: 6 },
  bellIcon: { fontSize: 22 },
  bellDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderWidth: 1.5,
    borderColor: "#EEF4FB",
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16 },

  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8F0FC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconEmoji: { fontSize: 22 },
  cardHeaderText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#111" },
  cardSubtitle: { fontSize: 12, color: "#888", marginTop: 1 },

  valueText: { marginTop: 4 },
  valueNum: { fontSize: 36, fontWeight: "900", color: "#1565C0" },
  valueSym: { fontSize: 18, fontWeight: "700", color: "#1565C0" },

  hintText: { fontSize: 12, color: "#888", marginTop: 4, lineHeight: 17 },

  // Dropdown
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#D0D8E8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#FAFAFA",
  },
  dropdownText: { fontSize: 14, color: "#333", fontWeight: "500" },
  dropdownArrow: { fontSize: 14, color: "#666" },
  dropdownOptions: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E8F5",
    marginTop: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4FA",
  },
  dropdownOptionActive: { backgroundColor: "#EEF4FB" },
  dropdownOptionText: { fontSize: 14, color: "#444" },
  dropdownOptionTextActive: { color: "#1565C0", fontWeight: "700" },

  // Notification prefs
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  prefIcon: { fontSize: 18, marginRight: 12, width: 28 },
  prefLabel: { flex: 1, fontSize: 14, color: "#333", fontWeight: "500" },
  prefDivider: { height: 1, backgroundColor: "#F0F4FA" },

  // Save / Reset
  saveBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 16,
    paddingVertical: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnIcon: { fontSize: 18, marginRight: 8 },
  saveBtnText: { color: "white", fontSize: 17, fontWeight: "800", letterSpacing: 0.5 },
  resetBtn: { alignItems: "center", marginBottom: 8 },
  resetText: { color: "#1565C0", fontSize: 14, fontWeight: "600" },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E8EEF4",
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
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
  navIcon: { fontSize: 20, color: "#999" },
  navIconActive: { color: "#1565C0" },
  navLabel: { fontSize: 10, color: "#999", marginTop: 3, fontWeight: "500" },
  navLabelActive: { color: "#1565C0", fontWeight: "700" },
  navActiveBar: {
    position: "absolute",
    top: 0,
    width: 28,
    height: 3,
    backgroundColor: "#1565C0",
    borderRadius: 2,
  },
});