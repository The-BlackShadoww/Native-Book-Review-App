import React from "react";
import HomeScreen from "./screens/HomeScreen";
import BookDetails from "./screens/BookDetailScreen";
import CategoryBookScreen from "./screens/CategoryBookScreen";
import AuthScreen from "./screens/AuthScreen";
import Logout from "./screens/Logout";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const Drawer = createDrawerNavigator();

const AppNavigator = (props) => {
    if (props.token === null) {
        return (
            <Drawer.Navigator initialRouteName="Login">
                <Drawer.Screen name="Login" component={AuthScreen} />
            </Drawer.Navigator>
        );
    } else {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Category" component={CategoryBookScreen} />
                <Drawer.Screen name="Book Details" component={BookDetails} />
                <Drawer.Screen name="Logout" component={Logout} />
            </Drawer.Navigator>
        );
    }
};

export default connect(mapStateToProps)(AppNavigator);
