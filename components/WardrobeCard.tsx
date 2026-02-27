import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fonts, borderRadius, spacing } from '@/constants/theme';
import { WardrobeItem } from '@/mocks/wardrobe';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.72;
const CARD_HEIGHT = CARD_WIDTH * 1.35;

interface WardrobeCardProps {
  item: WardrobeItem;
  onPress: (item: WardrobeItem) => void;
  index: number;
}

function WardrobeCard({ item, onPress, index }: WardrobeCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID={`wardrobe-card-${item.id}`}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }],
            marginLeft: index === 0 ? spacing.lg : spacing.sm,
          },
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.overlay}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={40} tint="light" style={styles.blurContainer}>
              <View style={styles.labelContent}>
                <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.seasonTag}>
                    <Text style={styles.seasonText}>{item.season}</Text>
                  </View>
                </View>
              </View>
            </BlurView>
          ) : (
            <View style={[styles.blurContainer, styles.blurFallback]}>
              <View style={styles.labelContent}>
                <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.seasonTag}>
                    <Text style={styles.seasonText}>{item.season}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(WardrobeCard);

export { CARD_WIDTH, CARD_HEIGHT };

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginRight: spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },
  blurFallback: {
    backgroundColor: Colors.cardOverlay,
  },
  labelContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  brand: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.secondary,
    marginBottom: 4,
    fontWeight: '500' as const,
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
  },
  seasonTag: {
    backgroundColor: 'rgba(200, 169, 126, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  seasonText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '500' as const,
  },
});
