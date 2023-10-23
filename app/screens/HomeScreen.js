import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BookScreen from "./BookScreen";
import CategoryScreen from "./CategoryScreen";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator
        // screenOptions={{
        //     tabBarLabelStyle: {
        //         fontSize: 18,
        //         fontWeight: "500",
        //     },
        //     tabBarStyle: { backgroundColor: "#e5e5e5" },
        //     tabBarActiveTintColor: "#000",
        // }}
        >
            <Tab.Screen name="books" component={BookScreen} />
            <Tab.Screen name="categories" component={CategoryScreen} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
