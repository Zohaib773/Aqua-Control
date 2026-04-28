import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { height } = Dimensions.get("window");

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Hero Background Section */}
      <View style={styles.heroSection}>
        {/* Sky gradient background */}
        <View style={styles.skyBackground} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.dropEmoji}>💧</Text>
            <Text style={styles.leafEmoji}>🌿</Text>
          </View>
          <Text style={styles.brandName}>
            <Text style={styles.brandBlue}>Aqua</Text>
            <Text style={styles.brandGreen}>Smart</Text>
          </Text>
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.tagline}>  Save Water. Save Power.  </Text>
            <View style={styles.taglineLine} />
          </View>
          <Text style={styles.taglineLeaf}>🌿</Text>
        </View>

        {/* Tank Illustration Area */}
        <View style={styles.tankArea}>
          {/* Floating Icons */}
          <View style={[styles.floatingIcon, styles.floatingIconTopLeft]}>
            <Text style={styles.floatingIconText}>💧</Text>
          </View>
          <View style={[styles.floatingIcon, styles.floatingIconTopRight]}>
            <Text style={styles.floatingIconText}>📶</Text>
          </View>
          <View style={[styles.floatingIcon, styles.floatingIconMidRight]}>
            <Text style={styles.floatingIconText}>🛡️</Text>
          </View>
          <View style={[styles.floatingIcon, styles.floatingIconBottomRight]}>
            <Text style={styles.floatingIconText}>⚡</Text>
          </View>

          {/* Water Tank */}
          <View style={styles.tankContainer}>
            {/* Tank body */}
            <View style={styles.tank}>
              <View style={styles.tankTop} />
              <View style={styles.tankBodyWhite} />
              <View style={styles.tankWaterLight} />
              <View style={styles.tankWaterMid} />
              <View style={styles.tankWaterDark} />
              <View style={styles.tankBottom} />
            </View>
            {/* Stand */}
            <View style={styles.tankStand}>
              <View style={styles.standLeg} />
              <View style={styles.standLeg} />
              <View style={styles.standLeg} />
              <View style={styles.standLeg} />
            </View>
            {/* Pump */}
            <View style={styles.pump}>
              <View style={styles.pumpBody} />
              <View style={styles.pumpMotor} />
            </View>
            {/* Controller box */}
            <View style={styles.controllerBox}>
              <View style={styles.controllerDot} />
              <Text style={styles.controllerDrop}>💧</Text>
              <Text style={styles.controllerWifi}>📶</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Login Card */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.cardWrapper}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
              Login or create an account to manage your water system
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.85}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} activeOpacity={0.85}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Guest */}
            <TouchableOpacity
              style={styles.guestRow}
              onPress={() => router.replace("/Dashboard/dashboard")}
            >
              <Text style={styles.guestIcon}>👤</Text>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6eaf8",
  },
  heroSection: {
    height: height * 0.52,
    position: "relative",
    overflow: "hidden",
  },
  skyBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#c8dff5",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 50,
    zIndex: 10,
  },
  logoIcon: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dropEmoji: { fontSize: 28 },
  leafEmoji: { fontSize: 16, marginTop: 4 },
  brandName: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 1,
  },
  brandBlue: { color: "#1565C0" },
  brandGreen: { color: "#2E7D32" },
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  taglineLine: {
    height: 1,
    width: 30,
    backgroundColor: "#666",
  },
  tagline: {
    fontSize: 13,
    color: "#444",
    fontWeight: "500",
  },
  taglineLeaf: {
    fontSize: 14,
    marginTop: 2,
  },
  tankArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 10,
  },
  floatingIcon: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  floatingIconText: { fontSize: 18 },
  floatingIconTopLeft: { left: 60, top: 10 },
  floatingIconTopRight: { right: 60, top: 0 },
  floatingIconMidRight: { right: 40, top: 60 },
  floatingIconBottomRight: { right: 55, bottom: 20 },
  tankContainer: {
    alignItems: "center",
    position: "relative",
  },
  tank: {
    width: 110,
    height: 130,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#aaa",
  },
  tankTop: { height: 10, backgroundColor: "#e0e0e0" },
  tankBodyWhite: { height: 20, backgroundColor: "#f5f5f5" },
  tankWaterLight: { height: 20, backgroundColor: "#90CAF9" },
  tankWaterMid: { height: 35, backgroundColor: "#1E88E5" },
  tankWaterDark: { height: 35, backgroundColor: "#1565C0" },
  tankBottom: { height: 10, backgroundColor: "#0D47A1" },
  tankStand: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
    height: 30,
    marginTop: 0,
  },
  standLeg: {
    width: 8,
    height: 30,
    backgroundColor: "#90A4AE",
  },
  pump: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  pumpBody: {
    width: 30,
    height: 20,
    backgroundColor: "#1565C0",
    borderRadius: 4,
  },
  pumpMotor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1E88E5",
    marginLeft: 4,
  },
  controllerBox: {
    position: "absolute",
    left: -70,
    top: 20,
    width: 52,
    height: 64,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  controllerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    position: "absolute",
    top: 8,
    right: 8,
  },
  controllerDrop: { fontSize: 18 },
  controllerWifi: { fontSize: 10, marginTop: 2 },
  cardWrapper: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 14,
    backgroundColor: "#FAFAFA",
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  eyeIcon: {
    fontSize: 16,
    paddingLeft: 8,
  },
  loginButton: {
    backgroundColor: "#1565C0",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: "#1565C0",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "transparent",
  },
  signUpButtonText: {
    color: "#1565C0",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  forgotPassword: {
    color: "#1565C0",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 14,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 12,
    color: "#999",
    fontSize: 13,
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  guestIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  guestText: {
    color: "#1565C0",
    fontSize: 14,
    fontWeight: "600",
  },
});