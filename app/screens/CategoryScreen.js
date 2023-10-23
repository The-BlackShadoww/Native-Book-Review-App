import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Category from "../components/Category";
import { useNavigation } from "@react-navigation/native";

const categories = [
    "Science",
    "Novel",
    "Psychology",
    "Biography",
    "Productivity",
];

const CategoryScreen = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <Category
                        item={item}
                        selectCategory={() =>
                            navigation.navigate("Category", {
                                category: item,
                            },)
                        }
                    />
                )}
                // keyExtractor={() => toString()}
            />
        </View>
    );
};

export default CategoryScreen;
