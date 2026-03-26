import React, { useRef, useCallback } from 'react';
import { Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fonts, borderRadius } from '@/constants/theme';

interface CategoryPillProps {
  label: string;
  isActive: boolean;
  onPress: (label: string) => void;
}

function CategoryPill({ label, isActive, onPress }: CategoryPillProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    Haptics.selectionAsync();
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 6,
      }),
    ]).start();
    onPress(label);
  }, [label, onPress, scaleAnim]);

  return (
    <TouchableWithoutFeedback onPress={handlePress} testID={`category-${label}`}>
      <Animated.View
        style={[
          styles.pill,
          isActive && styles.pillActive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(CategoryPill);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: borderRadius.full,
    backgroundColor: Colors.surface,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: Colors.black,
  },
  pillText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: '500' as const,
  },
  pillTextActive: {
    color: Colors.white,
  },
});
