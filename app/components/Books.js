import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Books = (props) => {
    return (
        <TouchableOpacity style={styles.center} onPress={props.goToDetails}>
            <View style={styles.card}>
                <View>
                    {props.book.image && (
                        <Image
                            style={styles.image}
                            source={{ uri: props.book.image }}
                        />
                    )}
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.book.name}</Text>
                    <Text style={styles.info}>Author: {props.book.Author}</Text>
                    <Text style={styles.info}>
                        Category: {props.book.category}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
    },
    card: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: "white",
        overflow: "hidden",
        marginVertical: 10,
        elevation: 2,
        // alignItems:'center'
    },
    details: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 565,
        objectFit: "cover",
    },
    title: {
        marginBottom: 7,
        fontSize: 20,
    },
    info: {
        fontSize: 14,
        color: "grey",
    },
    description: {
        marginTop: 5,
    },
});

export default Books;
