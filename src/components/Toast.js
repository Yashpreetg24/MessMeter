import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/theme';

export default function Toast({ visible, message, type = 'success', onHide }) {
    const opacity = useRef(new Animated.Value(0)).current;
    let translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            let timer = setTimeout(() => {
                hideToast();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide) onHide();
        });
    };

    if (!visible) return null;

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#4CAF50',
                    icon: '✓',
                };
            case 'error':
                return {
                    backgroundColor: colors.danger,
                    icon: '⚠',
                };
            case 'info':
                return {
                    backgroundColor: colors.primary,
                    icon: 'ℹ',
                };
            case 'warning':
                return {
                    backgroundColor: colors.accent,
                    icon: '⚡',
                };
            default:
                return {
                    backgroundColor: '#4CAF50',
                    icon: '✓',
                };
        }
    };

    const toastStyle = getToastStyle();

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: toastStyle.backgroundColor,
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
        >
            <Text style={styles.icon}>{toastStyle.icon}</Text>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: spacing(3),
        right: spacing(3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing(2),
        paddingHorizontal: spacing(2.5),
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 9999,
    },
    icon: {
        fontSize: 20,
        color: '#FFFFFF',
        marginRight: spacing(1.5),
        fontWeight: '700',
    },
    message: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
        lineHeight: 20,
    },
});
