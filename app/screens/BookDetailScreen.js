import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import { postReview, fetchReviews } from "../redux/actionCreator";
import { connect } from "react-redux";
import Review from "../components/Review";

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
    useEffect(() => {
        props.fetchReviews();
        console.log(props.reviews);
    }, []);

    const { book } = props.route.params;
    const [review, setReview] = useState("");

    const handleInput = (value) => {
        setReview(value);
    };

    const sendReview = () => {
        props.postReview(review);
        setReview("");
    };

    return (
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
                    <View style={styles.btnView}>
                        <Button title=">" color="black" onPress={sendReview} />
                    </View>
                </View>
            </View>
            <View style={styles.flatVew}>
                <Text>All reviews</Text>
                <FlatList
                    data={props.reviews}
                    renderItem={({ item }) => <Review item={item} />}
                    // keyExtractor={(item) => item.id.toString()}
                />
                {/* {props.reviews.map((r) => (
                    <Text>{r.review}</Text>
                ))} */}
            </View>
        </View>
    );
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
        marginVertical: 15,
        fontSize: 25,
    },
    reviewVew: {
        display: "flex",
        flexDirection: "column",
        marginBottom:15
    },
    inputVew: {
        width: "100%",
    },
    btnView: {
        width: "20%",
        marginTop: 10,
        alignSelf:'flex-end'
    },
    input: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "grey",
    },
    flatVew: {
        flex:1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
