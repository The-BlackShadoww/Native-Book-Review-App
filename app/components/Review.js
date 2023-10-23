import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";

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
        paddingVertical: 5,
        paddingHorizontal:10,
        fontSize: 18,
        borderLeftWidth: 4,
        borderLeftColor:'grey'
        // backgroundColor: "pink",
    },
});

export default Review;
