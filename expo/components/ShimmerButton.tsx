import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { fonts, borderRadius, spacing } from '@/constants/theme';
import * as Haptics from 'expo-haptics';

interface ShimmerButtonProps {
  label?: string;
  onPress?: () => void;
  isLoading?: boolean;
}

function ShimmerButton({ label = 'Generate', onPress, isLoading = false }: ShimmerButtonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoading) {
      const loop = Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      );
      loop.start();
      return () => loop.stop();
    } else {
      shimmerAnim.setValue(0);
    }
  }, [isLoading, shimmerAnim]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 6,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress?.();
  }, [onPress]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID="generate-button"
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.content}>
          {isLoading ? (
            <>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerTranslate }] },
                ]}
              />
              <Text style={styles.label}>Generating...</Text>
            </>
          ) : (
            <>
              <Sparkles size={18} color={Colors.white} style={styles.icon} />
              <Text style={styles.label}>{label}</Text>
            </>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(ShimmerButton);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.black,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
  },
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: Colors.white,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: [{ skewX: '-20deg' }],
  },
});
