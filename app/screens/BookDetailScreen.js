import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { postReview, fetchReviews } from "../redux/actionCreator";
import { connect } from "react-redux";
import Review from "../components/Review";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (review) => dispatch(postReview(review)),
        fetchReviews: () => dispatch(fetchReviews()),
    };
};
const BookDetailScreen = (props) => {
    const book = props.route.params?.book;

    let content;

    if (book) {
        useEffect(() => {
            props.fetchReviews();
        }, []);

        const [review, setReview] = useState("");

        const handleInput = (value) => {
            setReview(value);
        };

        const sendReview = () => {
            if (review !== "") {
                props.postReview(review);
            }
            setReview("");
        };

        content = (
            <View style={styles.container}>
                <View style={styles.bookContainer}>
                    <View style={styles.w50}>
                        {book.image && (
                            <Image
                                style={styles.img}
                                source={{ uri: book.image }}
                            />
                        )}
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{book.name}</Text>
                        <Text>Author: {book.Author}</Text>
                        <Text>Category: {book.category}</Text>
                        <Text style={styles.desc}>{book.description}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.revwTxt}>Reviews</Text>
                    <View style={styles.reviewVew}>
                        <View style={styles.inputVew}>
                            <TextInput
                                style={styles.input}
                                placeholder="Write a Review"
                                value={review}
                                onChangeText={(value) => handleInput(value)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.btnView}
                            onPress={sendReview}
                        >
                            <Text style={{ color: "white" }}>
                                <MaterialCommunityIcons
                                    name="send"
                                    size={18}
                                    color="white"
                                />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flatVew}>
                    <Text>All reviews</Text>
                    <FlatList
                        data={props.reviews}
                        renderItem={({ item }) => <Review item={item} />}
                        // keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
        );
    } else {
        content = <Text style={{ margin: 15 }}>No book selected</Text>;
    }

    return content;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginVertical: 15,
        // backgroundColor: "red",
    },
    bookContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
        overflow: "hidden",
        // backgroundColor: "pink",
    },
    img: {
        height: 350,
        width: "100%",
    },
    w50: {
        width: "50%",
    },
    info: {
        width: "50%",
        padding: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 10,
    },
    desc: {
        marginTop: 15,
        textAlign: "justify",
        // backgroundColor:'pink'
    },
    revwTxt: {
        marginVertical: 25,
        fontSize: 25,
        fontWeight: "500",
    },
    reviewVew: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15,
    },
    inputVew: {
        width: "80%",
    },
    btnView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        padding: 12,
        backgroundColor: "black",
        borderWidth: 1,
    },
    input: {
        padding: 8,
        borderWidth: 1,
        // borderRadius: 8,
        borderColor: "black",
    },
    flatVew: {
        flex: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
