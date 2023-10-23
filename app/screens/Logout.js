import React, { useEffect } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { logout } from "../redux/actionCreator";

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

const Logout = (props) => {
    useEffect(() => {
        props.logout();
    });
    return <Text>Logout</Text>;
};

export default connect(null, mapDispatchToProps)(Logout);
