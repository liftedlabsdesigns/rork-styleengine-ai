import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  RotateCcw,
  Zap,
  Grid3x3,
  Circle,
  ImagePlus,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fonts, spacing, borderRadius } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const VIEWFINDER_SIZE = SCREEN_WIDTH - spacing.lg * 2;

export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const shutterScale = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  const handleShutter = useCallback(() => {
    console.log('[Camera] Shutter pressed');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    Animated.sequence([
      Animated.spring(shutterScale, {
        toValue: 0.85,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.spring(shutterScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 6,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shutterScale, overlayOpacity]);

  const toggleGrid = useCallback(() => {
    Haptics.selectionAsync();
    setShowGrid(prev => !prev);
  }, []);

  const toggleFlash = useCallback(() => {
    Haptics.selectionAsync();
    setFlashOn(prev => !prev);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>FLAT-LAY CAPTURE</Text>
        <Text style={styles.headerTitle}>Studio</Text>
      </View>

      <View style={styles.viewfinderContainer}>
        <View style={styles.viewfinder}>
          <View style={styles.cameraPlaceholder}>
            <Camera size={48} color={Colors.tertiary} strokeWidth={1} />
            <Text style={styles.placeholderText}>Camera Preview</Text>
            <Text style={styles.placeholderSub}>Tap capture to take a flat-lay photo</Text>
          </View>

          <Animated.View style={[styles.overlayGuide, { opacity: overlayOpacity }]}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />

            {showGrid && (
              <>
                <View style={[styles.gridLine, styles.gridH1]} />
                <View style={[styles.gridLine, styles.gridH2]} />
                <View style={[styles.gridLine, styles.gridV1]} />
                <View style={[styles.gridLine, styles.gridV2]} />
              </>
            )}

            <View style={styles.centerMark}>
              <View style={styles.centerDot} />
            </View>
          </Animated.View>

          <View style={styles.guideBadge}>
            <Text style={styles.guideBadgeText}>OVERLAY GUIDE</Text>
          </View>
        </View>
      </View>

      <View style={styles.toolBar}>
        <TouchableOpacity
          style={[styles.toolButton, flashOn && styles.toolButtonActive]}
          onPress={toggleFlash}
          testID="flash-toggle"
        >
          <Zap size={20} color={flashOn ? Colors.black : Colors.secondary} strokeWidth={1.5} />
          <Text style={[styles.toolLabel, flashOn && styles.toolLabelActive]}>Flash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolButton, showGrid && styles.toolButtonActive]}
          onPress={toggleGrid}
          testID="grid-toggle"
        >
          <Grid3x3 size={20} color={showGrid ? Colors.black : Colors.secondary} strokeWidth={1.5} />
          <Text style={[styles.toolLabel, showGrid && styles.toolLabelActive]}>Grid</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} testID="rotate-button">
          <RotateCcw size={20} color={Colors.secondary} strokeWidth={1.5} />
          <Text style={styles.toolLabel}>Rotate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.galleryButton} testID="gallery-button">
          <ImagePlus size={24} color={Colors.primary} strokeWidth={1.5} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShutter} testID="shutter-button" activeOpacity={1}>
          <Animated.View style={[styles.shutterOuter, { transform: [{ scale: shutterScale }] }]}>
            <View style={styles.shutterInner} />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.galleryButton}>
          <Text style={styles.tipText}>Tips</Text>
        </View>
      </View>

      <View style={styles.tipsRow}>
        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipCardText}>Use natural light from a window</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>📐</Text>
          <Text style={styles.tipCardText}>Shoot from directly above</Text>
        </View>
      </View>
    </View>
  );
}

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 2.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.accent,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    color: Colors.primary,
  },
  viewfinderContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  viewfinder: {
    width: VIEWFINDER_SIZE,
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  cameraPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeholderText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: Colors.tertiary,
    fontWeight: '500' as const,
    marginTop: 8,
  },
  placeholderSub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: 'rgba(163, 163, 163, 0.6)',
  },
  overlayGuide: {
    ...StyleSheet.absoluteFillObject,
  },
  cornerTL: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
    borderBottomRightRadius: 4,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(200, 169, 126, 0.25)',
  },
  gridH1: {
    top: '33.33%',
    left: 20,
    right: 20,
    height: 0.5,
  },
  gridH2: {
    top: '66.66%',
    left: 20,
    right: 20,
    height: 0.5,
  },
  gridV1: {
    left: '33.33%',
    top: 20,
    bottom: 20,
    width: 0.5,
  },
  gridV2: {
    left: '66.66%',
    top: 20,
    bottom: 20,
    width: 0.5,
  },
  centerMark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -4,
    marginLeft: -4,
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(200, 169, 126, 0.5)',
  },
  guideBadge: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(200, 169, 126, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  guideBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.accent,
    fontWeight: '700' as const,
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  toolButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: Colors.surface,
    gap: 4,
  },
  toolButtonActive: {
    backgroundColor: Colors.accentLight,
  },
  toolLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: Colors.secondary,
    fontWeight: '500' as const,
  },
  toolLabelActive: {
    color: Colors.black,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.lg,
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.black,
  },
  tipText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '500' as const,
  },
  tipsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  tipCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: borderRadius.md,
    gap: 8,
  },
  tipEmoji: {
    fontSize: 16,
  },
  tipCardText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: Colors.secondary,
    flex: 1,
  },
});
