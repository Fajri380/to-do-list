import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Platform, ScrollView } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../style/create";
import { useRouter } from "expo-router";

export default function Register() {
    const router                    = useRouter();
    const insets                    = useSafeAreaInsets();
    const [fullName, setFullname]   = useState("");
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 24) + 40 },
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.topContent}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require("../../assets/images/Landing.png")}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        </View>
                        <TouchableOpacity style={styles.plusBadge}>
                            <Text style={styles.plusText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Sign up to get started with your dashboard.
                    </Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Name"
                            placeholderTextColor="#A0A0A0"
                            value={fullName}
                            onChangeText={setFullname}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Email"
                            placeholderTextColor="#A0A0A0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Password"
                            placeholderTextColor="#A0A0A0"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <Text style={styles.primaryButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Or</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.circleSocialBtn} activeOpacity={0.7} onPress={() => router.push("/formPage")}>
                        <Image
                            source={require("../../assets/images/google-icon.png")}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleSocialBtn} activeOpacity={0.7}>
                        <Image
                            source={require("../../assets/images/apple-icon.png")}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleSocialBtn} activeOpacity={0.7}>
                        <Image
                            source={require("../../assets/images/facebook-logo.png")}
                            style={styles.socialIconImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Text
                            style={styles.signInText}
                            onPress={() => router.push("/signin")}
                        >
                            Sign In
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}