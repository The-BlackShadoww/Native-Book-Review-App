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
    const { category } = props.route.params;
    const navigation = useNavigation();

    useEffect(() => {
        props.fetchBooks();
    }, []);

    const filteredBooks = props.books.filter(
        (book) => book.category === category
    );

    return (
        <View>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBookScreen);
