import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';
import { fonts, spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.subtitle}>This screen doesn&apos;t exist in StyleEngine.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Wardrobe</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: spacing.lg,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.black,
    borderRadius: 20,
  },
  linkText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500' as const,
  },
});
