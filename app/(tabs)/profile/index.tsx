import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  Settings,
  ChevronRight,
  Palette,
  Cloud,
  Bell,
  HelpCircle,
  LogOut,
  Star,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { fonts, spacing, borderRadius } from '@/constants/theme';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onPress?: () => void;
}

function MenuItem({ icon, label, subtitle, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={18} color={Colors.tertiary} strokeWidth={1.5} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>PERSONAL</Text>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' }}
            style={styles.avatar}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alexandra M.</Text>
            <Text style={styles.profileBio}>Fashion Editor & Stylist</Text>
            <View style={styles.profileBadge}>
              <Star size={12} color={Colors.gold} fill={Colors.gold} />
              <Text style={styles.profileBadgeText}>Pro Member</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Wardrobe</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Lookbooks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>AI Outfits</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>PREFERENCES</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon={<Palette size={20} color={Colors.primary} strokeWidth={1.5} />}
              label="Style Profile"
              subtitle="Minimalist, Avant-Garde"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon={<Cloud size={20} color={Colors.primary} strokeWidth={1.5} />}
              label="Cloud Sync"
              subtitle="Supabase connected"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon={<Bell size={20} color={Colors.primary} strokeWidth={1.5} />}
              label="Notifications"
              subtitle="Weekly digest"
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>SUPPORT</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon={<Settings size={20} color={Colors.primary} strokeWidth={1.5} />}
              label="Settings"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon={<HelpCircle size={20} color={Colors.primary} strokeWidth={1.5} />}
              label="Help & Feedback"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon={<LogOut size={20} color={Colors.error} strokeWidth={1.5} />}
              label="Sign Out"
            />
          </View>
        </View>

        <Text style={styles.version}>StyleEngine AI v1.0</Text>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 2,
  },
  profileBio: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: Colors.secondary,
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(184, 150, 78, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 5,
  },
  profileBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '600' as const,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: Colors.divider,
    marginTop: spacing.sm,
  },
  statItem: {
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
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.divider,
    alignSelf: 'center',
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  menuSectionTitle: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.tertiary,
    fontWeight: '600' as const,
    marginBottom: 10,
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.divider,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  menuSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: Colors.tertiary,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 64,
  },
  version: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: Colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
