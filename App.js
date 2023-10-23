import AppNavigator from "./app/AppNavigator";
import { store } from "./app/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        </NavigationContainer>
    );
}
