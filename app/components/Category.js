import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Category = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cat} onPress={props.selectCategory}>
                <Text style={styles.txt}>{props.item} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:'pink'
    },
    cat: {
        width: "85%",
        padding: 15,
        marginVertical: 15,
        borderRadius: 5,
        backgroundColor: "#e5e5e5",
    },
    txt: {
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
    },
});

export default Category;
