import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchBooks } from "../redux/actionCreator";
import { connect } from "react-redux";
import Books from "../components/Books";
import { useNavigation } from "@react-navigation/native";

const mapStateToProps = (state) => {
    return {
        books: state.books,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => dispatch(fetchBooks()),
    };
};

const CategoryBookScreen = (props) => {
    const { category } = props.route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
        props.fetchBooks();
    }, []);

    let content;

    if (category) {
        const filteredBooks = props.books.filter(
            (book) => book.category === category
        );

        content = (
            <View style={styles.container}>
                <Text style={styles.txt}>{category}</Text>

                <FlatList
                    data={filteredBooks}
                    renderItem={({ item }) => (
                        <Books
                            book={item}
                            goToDetails={() =>
                                navigation.navigate("Book Details", {
                                    book: item,
                                })
                            }
                        />
                    )}
                    keyExtractor={(book) => book.id.toString()}
                />
            </View>
        );
    } else {
        content = <Text>No category selected</Text>;
    }

    return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        // backgroundColor: "pink",
    },
    flex1: {
        flex: 1,
    },
    txt: {
        marginBottom: 15,
        fontSize: 35,
        fontWeight: "500",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBookScreen);
