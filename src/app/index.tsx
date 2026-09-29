import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../style/index";
import { useRouter } from "expo-router";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 24, paddingBottom: Math.max(insets.bottom, 24) + 32 },
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.topContent}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/Landing.png")}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome To Finora</Text>
        <Text style={styles.subtitle}>
          Explore a modern experience built for speed and simplicity
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => router.push("/create")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.ButtonGroup}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/google-icon.png")}
            style={styles.socialIconImage}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/apple-icon.png")}
            style={styles.socialIconImage}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/facebook-logo.png")}
            style={styles.socialIconImage}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.signInText} onPress={() => router.push("/signin")}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
