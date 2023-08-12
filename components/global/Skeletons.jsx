import { Dimensions, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const TextSkeleton = () => {
  return (
    <MotiView style={styles.skltnsctr}>
      <Skeleton
        width="100%"
        height={32}
        colorMode="dark"
        radius={4}
        transition={{
          translateX: { type: "timing", loop: true },
        }}
      />
    </MotiView>
  );
};

export const SquareSkeleton = () => {
  return (
    <MotiView style={styles.skltnsctr}>
      <Skeleton
        width="98%"
        height={58}
        colorMode="dark"
        radius={4}
        transition={{
          translateX: { type: "timing", loop: true },
        }}
      />
    </MotiView>
  );
};

export const FullwidthSkeleton = () => {
  return (
    <MotiView style={styles.skltnsctr}>
      <Skeleton
        width="100%"
        height={SCREEN_HEIGHT / 3.5 - 12}
        colorMode="dark"
        radius={10}
        transition={{
          translateX: { type: "timing", loop: true },
        }}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  skltnsctr: {
    padding: 8,
    marginVertical: 2,
  },
});
