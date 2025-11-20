import { StyleSheet, Text, View } from "react-native";


export default function MealItem({ item }) {
    console.log(item);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text>{item.t}</Text>
                <Text>{item.store}</Text>
                <Text>
                    {item.category} | {item.menu}  ₩ {item.price}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        width: "100%",
        paddingVertical: 7,
        paddingHorizontal: 15,
    },
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    }
});
