import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  ArrowLeft,
  Heart,
  Share2,
  Edit3,
  Tag,
  Calendar,
  Palette,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fonts, spacing, borderRadius } from '@/constants/theme';
import { wardrobeItems } from '@/mocks/wardrobe';
import ShimmerButton from '@/components/ShimmerButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const item = wardrobeItems.find(w => w.id === id);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const imageScale = useRef(new Animated.Value(1.05)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, imageScale]);

  const handleLike = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(prev => !prev);
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.3,
        useNativeDriver: true,
        tension: 200,
        friction: 6,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  }, [heartScale]);

  const handleGenerate = useCallback(() => {
    console.log('[ItemDetail] Generate styling suggestions');
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  }, []);

  if (!item) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFoundText}>Item not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imageContainer}>
          <Animated.View style={{ transform: [{ scale: imageScale }] }}>
            <Image
              source={{ uri: item.image }}
              style={styles.heroImage}
              contentFit="cover"
              transition={400}
            />
          </Animated.View>

          <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => router.back()}
              testID="back-button"
            >
              <ArrowLeft size={20} color={Colors.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            <View style={styles.topActions}>
              <TouchableOpacity style={styles.topButton} testID="share-button">
                <Share2 size={20} color={Colors.primary} strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.topButton} onPress={handleLike} testID="like-button">
                <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                  <Heart
                    size={20}
                    color={liked ? '#E74C3C' : Colors.primary}
                    fill={liked ? '#E74C3C' : 'transparent'}
                    strokeWidth={1.5}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>
            <View style={styles.editButton}>
              <Edit3 size={14} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.editText}>Edit</Text>
            </View>
          </View>

          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Palette size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.detailLabel}>Color</Text>
              <Text style={styles.detailValue}>{item.color}</Text>
            </View>
            <View style={styles.detailCard}>
              <Calendar size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.detailLabel}>Season</Text>
              <Text style={styles.detailValue}>{item.season}</Text>
            </View>
            <View style={styles.detailCard}>
              <Tag size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </View>
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.tagsSectionTitle}>TAGS</Text>
            <View style={styles.tagsRow}>
              {item.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.aiSection}>
            <Text style={styles.aiTitle}>Style Suggestions</Text>
            <Text style={styles.aiDesc}>
              Generate outfit combinations featuring this piece
            </Text>
            <ShimmerButton
              label="Generate Outfits"
              onPress={handleGenerate}
              isLoading={isGenerating}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  notFoundText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 12,
  },
  backLink: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.accent,
    fontWeight: '500' as const,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.2,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.2,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 60,
    backgroundColor: Colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -24,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.accent,
    fontWeight: '600' as const,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(200, 169, 126, 0.1)',
  },
  editText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '500' as const,
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 30,
    color: Colors.primary,
    marginBottom: spacing.xl,
    letterSpacing: -0.3,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.xl,
  },
  detailCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: Colors.divider,
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.tertiary,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500' as const,
    textAlign: 'center',
  },
  tagsSection: {
    marginBottom: spacing.xl,
  },
  tagsSectionTitle: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.tertiary,
    fontWeight: '600' as const,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    backgroundColor: Colors.surface,
  },
  tagText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: '500' as const,
  },
  aiSection: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  aiTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 6,
  },
  aiDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});
