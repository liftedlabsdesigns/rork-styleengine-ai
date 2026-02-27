import React, { useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Plus, Play, Layers } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fonts, spacing, borderRadius } from '@/constants/theme';
import { lookbookItems } from '@/mocks/lookbooks';
import type { LookbookItem } from '@/mocks/lookbooks';
import ShimmerButton from '@/components/ShimmerButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = 12;
const CARD_W = (SCREEN_WIDTH - spacing.lg * 2 - GRID_GAP) / 2;

export default function LookbookScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showReelPreview, setShowReelPreview] = useState<string | null>(null);
  const reelAnim = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    console.log('[Lookbook] Pull to refresh');
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setShowReelPreview(lookbookItems[0]?.id ?? null);
    Animated.spring(reelAnim, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.spring(reelAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        setShowReelPreview(null);
      });
      setRefreshing(false);
    }, 2500);
  }, [reelAnim]);

  const handleLookbookPress = useCallback((item: LookbookItem) => {
    console.log('[Lookbook] Pressed:', item.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const reelScale = reelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const reelOpacity = reelAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1, 1],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.accent}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerLabel}>CURATED LOOKS</Text>
            <Text style={styles.headerTitle}>Lookbook</Text>
          </View>
          <TouchableOpacity style={styles.addButton} testID="add-lookbook">
            <Plus size={20} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {showReelPreview && (
          <Animated.View
            style={[
              styles.reelPreview,
              {
                opacity: reelOpacity,
                transform: [{ scale: reelScale }],
              },
            ]}
          >
            <Image
              source={{ uri: lookbookItems[0]?.image }}
              style={styles.reelImage}
              contentFit="cover"
            />
            <View style={styles.reelOverlay}>
              <View style={styles.reelPlayButton}>
                <Play size={28} color={Colors.white} fill={Colors.white} />
              </View>
              <Text style={styles.reelText}>AI Video Reel Preview</Text>
              <Text style={styles.reelSubtext}>Pull down to generate</Text>
            </View>
          </Animated.View>
        )}

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => handleLookbookPress(lookbookItems[0]!)}
            activeOpacity={0.85}
            testID="featured-lookbook"
          >
            <Image
              source={{ uri: lookbookItems[0]?.image }}
              style={styles.featuredImage}
              contentFit="cover"
              transition={400}
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredMoodTag}>
                <Text style={styles.featuredMoodText}>{lookbookItems[0]?.mood}</Text>
              </View>
              <Text style={styles.featuredTitle}>{lookbookItems[0]?.title}</Text>
              <Text style={styles.featuredDesc}>{lookbookItems[0]?.description}</Text>
              <View style={styles.featuredMeta}>
                <Layers size={14} color={Colors.white} strokeWidth={1.5} />
                <Text style={styles.featuredCount}>{lookbookItems[0]?.itemCount} pieces</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.gridSection}>
          <View style={styles.gridHeader}>
            <Text style={styles.sectionTitle}>All Lookbooks</Text>
            <Text style={styles.gridCount}>{lookbookItems.length}</Text>
          </View>
          <View style={styles.grid}>
            {lookbookItems.slice(1).map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.gridCard,
                  index % 2 === 0 ? { height: CARD_W * 1.5 } : { height: CARD_W * 1.2 },
                ]}
                onPress={() => handleLookbookPress(item)}
                activeOpacity={0.85}
                testID={`lookbook-${item.id}`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.gridImage}
                  contentFit="cover"
                  transition={300}
                />
                <View style={styles.gridOverlay}>
                  <Text style={styles.gridMood}>{item.mood}</Text>
                  <Text style={styles.gridTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.generateSection}>
          <ShimmerButton label="Create New Lookbook" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.accent,
    fontWeight: '600' as const,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.full,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  reelPreview: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.black,
  },
  reelImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  reelOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelPlayButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  reelText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  reelSubtext: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  featuredSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: Colors.primary,
    marginBottom: spacing.md,
  },
  featuredCard: {
    height: 280,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  featuredMoodTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    marginBottom: 10,
  },
  featuredMoodText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: Colors.white,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: Colors.white,
    marginBottom: 4,
  },
  featuredDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredCount: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500' as const,
  },
  gridSection: {
    paddingHorizontal: spacing.lg,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  gridCount: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.tertiary,
    fontWeight: '500' as const,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  gridCard: {
    width: CARD_W,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gridMood: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600' as const,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  gridTitle: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: Colors.white,
  },
  generateSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
});
