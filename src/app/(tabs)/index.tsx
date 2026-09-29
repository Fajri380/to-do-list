import React from "react";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "../.../../../../style/indexse";

export default function HomeScreen() 
{
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Halo Selamat Datang!</Text>
        <Text style={styles.subtitle}>Di Aplikasi To Do List</Text>
        <Link href="/formPage" style={styles.link}>
            <Text style={styles.linkText}>Go To Form Page</Text>
        </Link>
    </View>
    );
}