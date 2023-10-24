import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Review = (props) => {
    return (
        <View>
            <Text style={styles.txt}>{props.item.review}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    txt: {
        marginVertical: 10,
        padding: 12,
        fontSize: 14,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#e5e5e5",
        // backgroundColor: "pink",
    },
});

export default Review;
