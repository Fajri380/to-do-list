import { Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { styles } from "../../style/signin";
import { useRouter } from "expo-router";

export default function Signin() {
    const insets                      = useSafeAreaInsets();
    const router                      = useRouter()
    const [email, setEmail]           = useState("");
    const [password, setPassword]     = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    {paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 24) + 40}
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.topContent}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContainer}>
                            <Image
                            source={require("../../assets/images/shieldCheck.png")}
                            style={styles.avatarImage}
                            resizeMode="cover"
                            />
                        </View>
                    </View>

                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to your account to continue</Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style                   = {styles.input}
                            placeholder             = "Enter your email"
                            placeholderTextColor    = "#A0A0A0"
                            value                   = {email}
                            onChangeText            = {setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style                   = {styles.input}
                            placeholder             = "Enter your password"
                            placeholderTextColor    = "#A0A0A0"
                            value                   = {password}
                            onChangeText            = {setPassword}
                            secureTextEntry
                        />

                        <View style={styles.optionsRow}>
                            <TouchableOpacity
                                style={styles.rememberContainer}
                                activeOpacity={0.7}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.push("/forgot-password")}
                            >
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine}/>
                        <Text style={styles.dividerText}>Or</Text>
                        <View style={styles.dividerLine}/>
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.circleSocialBtn} activeOpacity={0.7}>
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
                            Don&apos;t have an account?{" "}
                            <Text
                                style={styles.signInText}
                                onPress={() => router.push("/create")}
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
