import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function SettingRow({
  icon,
  label,
  value,
  onPress,
  toggle,
  toggleValue,
  onToggle,
  danger,
  chevron = true,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  danger?: boolean;
  chevron?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={toggle ? 1 : 0.7}
    >
      <Text style={styles.settingRowIcon}>{icon}</Text>
      <Text style={[styles.settingRowLabel, danger && styles.dangerText]}>{label}</Text>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: "#D0D8E8", true: "#4CAF50" }}
          thumbColor="white"
          ios_backgroundColor="#D0D8E8"
        />
      ) : (
        <View style={styles.settingRowRight}>
          {value && <Text style={styles.settingRowValue}>{value}</Text>}
          {chevron && <Text style={styles.chevron}>›</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export default function Settings() {
  const [autoMotor, setAutoMotor] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [userName, setUserName] = useState("Muhammad Ali");

  useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        router.replace("/Dashboard/dashboard" as any); // change to the appropriate "home" for that screen
        return true; // true = we handled it, don't exit app
      });
      return () => backHandler.remove();
    }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF4FB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>Manage your AquaSmart preferences</Text>
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
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MA</Text>
          </View>
          <View style={styles.profileInfo}>
            {editingName ? (
              <TextInput
                style={styles.nameInput}
                value={userName}
                onChangeText={setUserName}
                onBlur={() => setEditingName(false)}
                autoFocus
              />
            ) : (
              <Text style={styles.profileName}>{userName}</Text>
            )}
            <Text style={styles.profileEmail}>ali@aquasmart.com</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>✓ Verified Account</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditingName(true)}
          >
            <Text style={styles.editBtnText}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Device */}
        <SectionHeader title="Device & System" />
        <View style={styles.card}>
          <SettingRow icon="📡" label="Device ID" value="AS-00482" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🔁" label="Auto Motor Control" toggle toggleValue={autoMotor} onToggle={setAutoMotor} />
          <View style={styles.rowDivider} />
          <SettingRow icon="📶" label="Wi-Fi Connection" value="Connected" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🔋" label="Device Battery" value="87%" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🔄" label="Firmware Version" value="v2.4.1" onPress={() => {}} />
        </View>

        {/* Tank Config */}
        <SectionHeader title="Tank Configuration" />
        <View style={styles.card}>
          <SettingRow icon="🪣" label="Tank Capacity" value="5000 L" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="⏱️" label="Auto-fill Schedule" value="6:00 AM" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="📊" label="Calibrate Sensor" onPress={() => {}} />
        </View>

        {/* Notifications */}
        <SectionHeader title="Notifications" />
        <View style={styles.card}>
          <SettingRow icon="🔔" label="Enable Notifications" toggle toggleValue={notifications} onToggle={setNotifications} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🚨" label="Alert Limits" onPress={() => router.push("/alerts" as any)} />
        </View>

        {/* App Preferences */}
        <SectionHeader title="App Preferences" />
        <View style={styles.card}>
          <SettingRow icon="🌙" label="Dark Mode" toggle toggleValue={darkMode} onToggle={setDarkMode} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🌐" label="Language" value="English" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="📏" label="Units" value="Litres" onPress={() => {}} />
        </View>

        {/* Security */}
        <SectionHeader title="Security" />
        <View style={styles.card}>
          <SettingRow icon="🔐" label="Biometric Login" toggle toggleValue={biometric} onToggle={setBiometric} />
          <View style={styles.rowDivider} />
          <SettingRow icon="🔑" label="Change Password" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="📱" label="Two-Factor Auth" value="Off" onPress={() => {}} />
        </View>

        {/* Support */}
        <SectionHeader title="Support" />
        <View style={styles.card}>
          <SettingRow icon="📖" label="User Manual" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="💬" label="Contact Support" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="⭐" label="Rate the App" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="ℹ️" label="App Version" value="1.0.0" chevron={false} />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.85}
          onPress={() => router.replace("/" as any)}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>
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
//     position: "absolute", top: 6, right: 6,
//     width: 9, height: 9, borderRadius: 5,
//     backgroundColor: "#4CAF50",
//     borderWidth: 1.5, borderColor: "#EEF4FB",
//   },

//   scroll: { flex: 1 },
//   scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },

//   // Profile
//   profileCard: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     shadowColor: "#1565C0",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   avatar: {
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: "#1565C0",
//     alignItems: "center", justifyContent: "center",
//     marginRight: 14,
//   },
//   avatarText: { color: "white", fontSize: 20, fontWeight: "800" },
//   profileInfo: { flex: 1 },
//   profileName: { fontSize: 17, fontWeight: "800", color: "#111", marginBottom: 2 },
//   nameInput: {
//     fontSize: 17, fontWeight: "800", color: "#111",
//     borderBottomWidth: 1.5, borderColor: "#1565C0",
//     paddingVertical: 2, marginBottom: 2,
//   },
//   profileEmail: { fontSize: 12, color: "#888", marginBottom: 6 },
//   profileBadge: {
//     backgroundColor: "#E8F5E9",
//     borderRadius: 10,
//     paddingHorizontal: 8, paddingVertical: 3,
//     alignSelf: "flex-start",
//   },
//   profileBadgeText: { fontSize: 10, color: "#2E7D32", fontWeight: "700" },
//   editBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: "#EEF4FB",
//     alignItems: "center", justifyContent: "center",
//   },
//   editBtnText: { fontSize: 16 },

//   // Section
//   sectionHeader: {
//     fontSize: 12, fontWeight: "800",
//     color: "#8A9BB5",
//     letterSpacing: 1,
//     textTransform: "uppercase",
//     marginBottom: 8,
//     marginLeft: 4,
//   },

//   card: {
//     backgroundColor: "white",
//     borderRadius: 18,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.07,
//     shadowRadius: 8,
//     elevation: 3,
//     overflow: "hidden",
//   },
//   settingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   settingRowIcon: { fontSize: 20, width: 32, marginRight: 12 },
//   settingRowLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#222" },
//   dangerText: { color: "#C62828" },
//   settingRowRight: { flexDirection: "row", alignItems: "center" },
//   settingRowValue: { fontSize: 13, color: "#888", marginRight: 6 },
//   chevron: { fontSize: 20, color: "#C0CCD8", fontWeight: "300" },
//   rowDivider: { height: 1, backgroundColor: "#F0F5FB", marginLeft: 60 },

//   // Logout
//   logoutBtn: {
//     backgroundColor: "#1565C0",
//     borderRadius: 16,
//     paddingVertical: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//     shadowColor: "#1565C0",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   logoutIcon: { fontSize: 18, marginRight: 8 },
//   logoutText: { color: "white", fontSize: 16, fontWeight: "800" },
//   deleteBtn: { alignItems: "center", marginBottom: 8 },
//   deleteBtnText: { color: "#C62828", fontSize: 13, fontWeight: "600" },

//   // Bottom Nav
//   bottomNav: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#E8EEF4",
//     paddingBottom: 8, paddingTop: 6,
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
//     backgroundColor: "#1565C0", borderRadius: 2,
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
    position: "absolute", top: 6, right: 6,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderWidth: 1.5, borderColor: "#131826",
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },

  // Profile
  profileCard: {
    backgroundColor: "#1a1f2e", // Dark card
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: "#1565C0",
    alignItems: "center", justifyContent: "center",
    marginRight: 14,
  },
  avatarText: { color: "white", fontSize: 20, fontWeight: "800" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: "800", color: "#ffffff", marginBottom: 2 },
  nameInput: {
    fontSize: 17, fontWeight: "800", color: "#ffffff",
    borderBottomWidth: 1.5, borderColor: "#4FC3F7",
    paddingVertical: 2, marginBottom: 2,
  },
  profileEmail: { fontSize: 12, color: "#9ca3af", marginBottom: 6 },
  profileBadge: {
    backgroundColor: "rgba(129, 199, 132, 0.15)", // Semi-transparent green
    borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 3,
    alignSelf: "flex-start",
  },
  profileBadgeText: { fontSize: 10, color: "#81C784", fontWeight: "700" },
  editBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#131826",
    alignItems: "center", justifyContent: "center",
  },
  editBtnText: { fontSize: 16, color: "#e5e7eb" },

  // Section
  sectionHeader: {
    fontSize: 12, fontWeight: "800",
    color: "#6b7280", // Muted gray
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },

  card: {
    backgroundColor: "#1a1f2e", // Dark card
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingRowIcon: { fontSize: 20, width: 32, marginRight: 12, color: "#e5e7eb" },
  settingRowLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#ffffff" },
  dangerText: { color: "#EF9A9A" }, // Light red for danger items
  settingRowRight: { flexDirection: "row", alignItems: "center" },
  settingRowValue: { fontSize: 13, color: "#9ca3af", marginRight: 6 },
  chevron: { fontSize: 20, color: "#6b7280", fontWeight: "300" },
  rowDivider: { height: 1, backgroundColor: "#2a2f3e", marginLeft: 60 },

  // Logout
  logoutBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutIcon: { fontSize: 18, marginRight: 8, color: "#ffffff" },
  logoutText: { color: "white", fontSize: 16, fontWeight: "800" },
  deleteBtn: { alignItems: "center", marginBottom: 8 },
  deleteBtnText: { color: "#EF9A9A", fontSize: 13, fontWeight: "600" }, // Light red

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#131826", // Dark bottom nav
    borderTopWidth: 1,
    borderTopColor: "#2a2f3e",
    paddingBottom: 8, paddingTop: 6,
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
    backgroundColor: "#4FC3F7", borderRadius: 2,
  },
});


// import { router } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   BackHandler,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// function SettingRow({
//   label,
//   value,
//   onPress,
//   toggle,
//   toggleValue,
//   onToggle,
//   danger,
// }: {
//   label: string;
//   value?: string;
//   onPress?: () => void;
//   toggle?: boolean;
//   toggleValue?: boolean;
//   onToggle?: (v: boolean) => void;
//   danger?: boolean;
// }) {
//   return (
//     <TouchableOpacity
//       style={styles.settingRow}
//       onPress={onPress}
//       activeOpacity={toggle ? 1 : 0.7}
//     >
//       <Text style={[styles.settingRowLabel, danger && styles.dangerText]}>
//         {label}
//       </Text>
//       {toggle ? (
//         <Switch
//           value={toggleValue}
//           onValueChange={onToggle}
//           trackColor={{ false: "#ccc", true: "#4CAF50" }}
//           thumbColor="white"
//         />
//       ) : (
//         <View style={styles.settingRowRight}>
//           {value && <Text style={styles.settingRowValue}>{value}</Text>}
//           {onPress && <Text style={styles.chevron}>›</Text>}
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// }

// function SectionHeader({ title }: { title: string }) {
//   return <Text style={styles.sectionHeader}>{title}</Text>;
// }

// export default function Settings() {
//   const [autoMotor, setAutoMotor] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [biometric, setBiometric] = useState(false);
//   const [editingName, setEditingName] = useState(false);
//   const [userName, setUserName] = useState("Muhammad Ali");

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
//       router.replace("/Dashboard/dashboard" as any);
//       return true;
//     });
//     return () => backHandler.remove();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

//       {/* Simple Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Settings</Text>
//         <View style={{ width: 30 }} />
//       </View>

//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Simple Profile */}
//         <View style={styles.profileCard}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>MA</Text>
//           </View>
//           <View style={styles.profileInfo}>
//             {editingName ? (
//               <TextInput
//                 style={styles.nameInput}
//                 value={userName}
//                 onChangeText={setUserName}
//                 onBlur={() => setEditingName(false)}
//                 autoFocus
//               />
//             ) : (
//               <Text style={styles.profileName}>{userName}</Text>
//             )}
//             <Text style={styles.profileEmail}>ali@aquasmart.com</Text>
//           </View>
//           <TouchableOpacity onPress={() => setEditingName(true)}>
//             <Text style={styles.editIcon}>✏️</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Device */}
//         <SectionHeader title="Device" />
//         <View style={styles.card}>
//           <SettingRow label="Device ID" value="AS-00482" />
//           <SettingRow
//             label="Auto Motor Control"
//             toggle
//             toggleValue={autoMotor}
//             onToggle={setAutoMotor}
//           />
//           <SettingRow label="Wi-Fi" value="Connected" />
//           <SettingRow label="Battery" value="87%" />
//           <SettingRow label="Firmware" value="v2.4.1" />
//         </View>

//         {/* Tank */}
//         <SectionHeader title="Tank" />
//         <View style={styles.card}>
//           <SettingRow label="Capacity" value="5000 L" />
//           <SettingRow label="Auto-fill Schedule" value="6:00 AM" />
//           <SettingRow label="Calibrate Sensor" onPress={() => {}} />
//         </View>

//         {/* Preferences */}
//         <SectionHeader title="Preferences" />
//         <View style={styles.card}>
//           <SettingRow
//             label="Notifications"
//             toggle
//             toggleValue={notifications}
//             onToggle={setNotifications}
//           />
//           <SettingRow
//             label="Dark Mode"
//             toggle
//             toggleValue={darkMode}
//             onToggle={setDarkMode}
//           />
//           <SettingRow label="Language" value="English" />
//           <SettingRow label="Units" value="Litres" />
//         </View>

//         {/* Security */}
//         <SectionHeader title="Security" />
//         <View style={styles.card}>
//           <SettingRow
//             label="Biometric Login"
//             toggle
//             toggleValue={biometric}
//             onToggle={setBiometric}
//           />
//           <SettingRow label="Change Password" onPress={() => {}} />
//           <SettingRow label="Two-Factor Auth" value="Off" />
//         </View>

//         {/* Support */}
//         <SectionHeader title="Support" />
//         <View style={styles.card}>
//           <SettingRow label="User Manual" onPress={() => {}} />
//           <SettingRow label="Contact Support" onPress={() => {}} />
//           <SettingRow label="Rate the App" onPress={() => {}} />
//           <SettingRow label="Version" value="1.0.0" />
//         </View>

//         {/* Buttons */}
//         <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace("/" as any)}>
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.deleteBtn}>
//           <Text style={styles.deleteBtnText}>Delete Account</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Simple Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navTab} onPress={() => router.replace("/Dashboard/dashboard" as any)}>
//           <Text style={styles.navIcon}>⊞</Text>
//           <Text style={styles.navLabel}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab} onPress={() => router.replace("/Dashboard/history" as any)}>
//           <Text style={styles.navIcon}>🕐</Text>
//           <Text style={styles.navLabel}>History</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab} onPress={() => router.replace("/Dashboard/alerts" as any)}>
//           <Text style={styles.navIcon}>🔔</Text>
//           <Text style={styles.navLabel}>Alerts</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab} onPress={() => router.replace("/Dashboard/settings" as any)}>
//           <Text style={[styles.navIcon, styles.navIconActive]}>⚙️</Text>
//           <Text style={[styles.navLabel, styles.navLabelActive]}>Settings</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#f5f5f5" },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#f5f5f5",
//   },
//   backArrow: { fontSize: 28, color: "#333" },
//   headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },

//   scroll: { flex: 1 },
//   scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 },

//   profileCard: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#4CAF50",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   avatarText: { color: "white", fontSize: 18, fontWeight: "bold" },
//   profileInfo: { flex: 1 },
//   profileName: { fontSize: 16, fontWeight: "600", color: "#333" },
//   nameInput: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     borderBottomWidth: 1,
//     borderColor: "#4CAF50",
//     paddingVertical: 2,
//   },
//   profileEmail: { fontSize: 12, color: "#888", marginTop: 2 },
//   editIcon: { fontSize: 18, color: "#888", padding: 8 },

//   sectionHeader: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#888",
//     marginBottom: 8,
//     marginTop: 4,
//   },

//   card: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   settingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   settingRowLabel: { fontSize: 15, color: "#333" },
//   dangerText: { color: "#d32f2f" },
//   settingRowRight: { flexDirection: "row", alignItems: "center" },
//   settingRowValue: { fontSize: 14, color: "#888", marginRight: 8 },
//   chevron: { fontSize: 18, color: "#ccc" },

//   logoutBtn: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 12,
//     paddingVertical: 14,
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   logoutText: { color: "white", fontSize: 16, fontWeight: "600" },
//   deleteBtn: { alignItems: "center", marginBottom: 20 },
//   deleteBtnText: { color: "#d32f2f", fontSize: 14 },

//   bottomNav: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     paddingVertical: 8,
//   },
//   navTab: { flex: 1, alignItems: "center", paddingVertical: 4 },
//   navIcon: { fontSize: 22, color: "#999" },
//   navIconActive: { color: "#4CAF50" },
//   navLabel: { fontSize: 10, color: "#999", marginTop: 2 },
//   navLabelActive: { color: "#4CAF50", fontWeight: "600" },
// });





// import { Text, View } from "react-native";
// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit Setting to this screen.</Text>
//     </View>
//   );
// }