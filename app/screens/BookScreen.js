import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchBooks } from "../redux/actionCreator";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Books from "../components/Books";

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

const BookScreen = (props) => {
    const navigation = useNavigation();

    useEffect(() => {
        props.fetchBooks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={props.books}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        margin:15,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);
