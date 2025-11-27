import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { colors, spacing } from "../theme/theme";

export default function CustomDrawerContent(props) {
    const { username = "User" } = props;

    const handleLogout = () => {
        props.navigation.replace("Login");
    };

    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            {/* User Info Section */}
            <View style={styles.userSection}>
                <Text style={styles.userName}>{username}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Custom ordered menu items */}
            <DrawerItem
                label="Home"
                labelStyle={styles.drawerLabel}
                onPress={() => props.navigation.navigate("Home")}
                focused={props.state.index === 0}
                activeTintColor={colors.accent}
                inactiveTintColor={colors.text}
            />
            <DrawerItem
                label="Ratings"
                labelStyle={styles.drawerLabel}
                onPress={() => props.navigation.navigate("Ratings")}
                focused={props.state.index === 1}
                activeTintColor={colors.accent}
                inactiveTintColor={colors.text}
            />
            <DrawerItem
                label="Polls"
                labelStyle={styles.drawerLabel}
                onPress={() => props.navigation.navigate("Polls")}
                focused={props.state.index === 2}
                activeTintColor={colors.accent}
                inactiveTintColor={colors.text}
            />
            <DrawerItem
                label="Report Issue"
                labelStyle={styles.drawerLabel}
                onPress={() => props.navigation.navigate("Report Issue")}
                focused={props.state.index === 3}
                activeTintColor={colors.accent}
                inactiveTintColor={colors.text}
            />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
    },
    userSection: {
        padding: spacing(3),
        paddingTop: spacing(4),
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    userName: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
        marginBottom: spacing(2),
    },
    logoutButton: {
        backgroundColor: colors.danger,
        paddingVertical: spacing(1.5),
        paddingHorizontal: spacing(2),
        borderRadius: 8,
        alignItems: "center",
        shadowColor: colors.danger,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing(1),
    },
    drawerLabel: {
        fontSize: 15,
        fontWeight: "500",
    },
});
