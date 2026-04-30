import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  ClipPath,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function UltraWaveTank({ percent = 70 }) {
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);

  useEffect(() => {
    wave1.value = withRepeat(withTiming(360, { duration: 4000 }), -1, false);
    wave2.value = withRepeat(withTiming(360, { duration: 6000 }), -1, false);
  }, []);

  const createWave = (offset: any, amplitude: number, speedOffset = 0) =>
    useAnimatedProps(() => {
      const height = 220;
      const width = 200;

      const baseY = height - (percent / 100) * height;

      let path = `M 0 ${baseY}`;

      for (let x = 0; x <= width; x += 20) {
        const y =
          baseY +
          amplitude *
            Math.sin((x + offset.value + speedOffset) * Math.PI / 90);
        path += ` L ${x} ${y}`;
      }

      path += ` L ${width} ${height} L 0 ${height} Z`;

      return { d: path };
    });

  const wave1Props = createWave(wave1, 10);
  const wave2Props = createWave(wave2, 15, 40);

  return (
    <View style={styles.container}>
      {/* Tank Image */}
      <Image
        source={require("../../../assets/images/water.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Water Waves */}
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          {/* Clip tank area */}
          <ClipPath id="clip">
            <Rect x="25" y="20" width="150" height="210" rx="30" />
          </ClipPath>

          {/* Water gradient */}
          <LinearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#6EC6FF" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#1E88E5" stopOpacity="0.8" />
          </LinearGradient>

          {/* Light reflection */}
          <LinearGradient id="glassLight" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </LinearGradient>
        </Defs>

        {/* Back Wave */}
        <AnimatedPath
          animatedProps={wave2Props}
          fill="url(#waterGrad)"
          opacity={0.5}
          clipPath="url(#clip)"
        />

        {/* Front Wave */}
        <AnimatedPath
          animatedProps={wave1Props}
          fill="url(#waterGrad)"
          opacity={0.9}
          clipPath="url(#clip)"
        />

        {/* Glass reflection overlay */}
        <Rect
          x="25"
          y="20"
          width="150"
          height="210"
          fill="url(#glassLight)"
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 240,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});