import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { fonts, spacing, borderRadius } from '@/constants/theme';
import { wardrobeItems, categories } from '@/mocks/wardrobe';
import type { WardrobeItem } from '@/mocks/wardrobe';
import WardrobeCard from '@/components/WardrobeCard';
import CategoryPill from '@/components/CategoryPill';
import ShimmerButton from '@/components/ShimmerButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WardrobeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const filteredItems = selectedCategory === 'All'
    ? wardrobeItems
    : wardrobeItems.filter(item => item.category === selectedCategory);

  const handleCardPress = useCallback((item: WardrobeItem) => {
    console.log('[Wardrobe] Card pressed:', item.id);
    router.push(`/item/${item.id}`);
  }, [router]);

  const handleCategoryPress = useCallback((label: string) => {
    console.log('[Wardrobe] Category selected:', label);
    setSelectedCategory(label);
  }, []);

  const handleGenerate = useCallback(() => {
    console.log('[Wardrobe] Generate pressed');
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  }, []);

  const renderCard = useCallback(({ item, index }: { item: WardrobeItem; index: number }) => (
    <WardrobeCard item={item} onPress={handleCardPress} index={index} />
  ), [handleCardPress]);

  const keyExtractor = useCallback((item: WardrobeItem) => item.id, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerLabel}>YOUR COLLECTION</Text>
              <Text style={styles.headerTitle}>Wardrobe</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} testID="search-button">
                <Search size={20} color={Colors.primary} strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} testID="add-button">
                <Plus size={20} color={Colors.primary} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{wardrobeItems.length}</Text>
              <Text style={styles.statLabel}>Pieces</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{new Set(wardrobeItems.map(i => i.category)).size}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{new Set(wardrobeItems.map(i => i.brand)).size}</Text>
              <Text style={styles.statLabel}>Brands</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map(cat => (
              <CategoryPill
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onPress={handleCategoryPress}
              />
            ))}
          </ScrollView>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fluid Wardrobe</Text>
          <Text style={styles.sectionCount}>{filteredItems.length} items</Text>
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH * 0.72 + spacing.sm}
          decelerationRate="fast"
          contentContainerStyle={styles.cardList}
          scrollEnabled
          nestedScrollEnabled
        />

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <View style={styles.recentGrid}>
            {wardrobeItems.slice(0, 4).map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentCard}
                onPress={() => handleCardPress(item)}
                testID={`recent-${item.id}`}
                activeOpacity={0.7}
              >
                <View style={styles.recentImageContainer}>
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={styles.recentImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.recentBrand}>{item.brand.toUpperCase()}</Text>
                <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.generateSection}>
          <Text style={styles.generateTitle}>AI Styling</Text>
          <Text style={styles.generateDesc}>
            Let our neural engine curate outfits from your wardrobe
          </Text>
          <ShimmerButton
            label="Generate Outfit"
            onPress={handleGenerate}
            isLoading={isGenerating}
          />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: Colors.tertiary,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.divider,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: Colors.primary,
  },
  sectionCount: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.tertiary,
    fontWeight: '500' as const,
  },
  cardList: {
    paddingRight: spacing.lg,
    paddingBottom: spacing.sm,
  },
  recentSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  recentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: spacing.md,
  },
  recentCard: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - 12) / 2,
  },
  recentImageContainer: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 8,
  },
  recentImage: {
    width: '100%',
    height: '100%',
  },
  recentBrand: {
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.tertiary,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  recentName: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  generateSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
  generateTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 8,
  },
  generateDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
});
