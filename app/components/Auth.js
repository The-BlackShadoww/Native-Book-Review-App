import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { tryAuth } from "../redux/actionCreator";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const mapDispatchToProps = (dispatch) => {
    return {
        tryAuth: (email, password, mode) =>
            dispatch(tryAuth(email, password, mode)),
    };
};

const Auth = (props) => {
    const [authStates, setAuthStates] = useState({
        mode: "login",
        inputs: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const isFocused = useIsFocused();
    useEffect(() => {
        setAuthStates({
            ...authStates,
            inputs: {
                email: "",
                password: "",
                confirmPassword: "",
            },
        });
    }, [isFocused]);

    const switchMode = () => {
        setAuthStates({
            ...authStates,
            mode: authStates.mode === "login" ? "signup" : "login",

            inputs: {
                email: "",
                password: "",
                confirmPassword: "",
            },
        });
    };

    const updateInputs = (value, name) => {
        setAuthStates({
            ...authStates,
            inputs: {
                ...authStates.inputs,
                [name]: value,
            },
        });
    };

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleAuth = () => {
        const email = authStates.inputs.email;
        const password = authStates.inputs.password;
        const confirmPassword = authStates.inputs.confirmPassword;

        if (email !== "" && password !== "") {
            if (regex.test(email)) {
                if (authStates.mode === "login") {
                    props.tryAuth(email, password, "login");
                } else {
                    if (password === confirmPassword) {
                        props.tryAuth(email, password, "signUp");
                    } else {
                        alert("Password felids don't match");
                    }
                }
            } else {
                alert("Invalid E-mail");
            }
        } else {
            alert("Input all the fields!");
        }

        setAuthStates({
            ...authStates,
            inputs: {
                email: "",
                password: "",
                confirmPassword: "",
            },
        });
    };

    let confirmPassField = null;
    if (authStates.mode === "signup") {
        confirmPassField = (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={authStates.inputs.confirmPassword}
                onChangeText={(value) => updateInputs(value, "confirmPassword")}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.formVew}>
                <View style={styles.title}>
                    <Text style={{ fontSize: 30, fontWeight: "500" }}>
                        {authStates.mode === "login" ? "Login " : "Sign Up "}
                        Here,
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={authStates.inputs.email}
                    onChangeText={(value) => updateInputs(value, "email")}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={authStates.inputs.password}
                    onChangeText={(value) => updateInputs(value, "password")}
                />
                {confirmPassField}

                <TouchableOpacity style={styles.btn} onPress={handleAuth}>
                    <Text style={styles.btnTxt}>
                        {authStates.mode === "login" ? "Login " : "Sign Up "}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signupCon} onPress={switchMode}>
                    <Text style={styles.signupTxt}>
                        {authStates.mode === "login" ? "Sign Up" : "Login"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        // backgroundColor: "pink",
    },
    title: {
        alignSelf: "flex-start",
        marginBottom: 15,
    },
    formVew: {
        width: "90%",
    },
    input: {
        padding: 10,
        borderBottomWidth: 2,
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        padding: 10,
        borderWidth: 2,
        backgroundColor: "black",
    },
    btnTxt: {
        color: "white",
    },
    signupCon: {
        marginTop: 10,
    },
    signupTxt: {
        color: "blue",
    },
});

export default connect(null, mapDispatchToProps)(Auth);
