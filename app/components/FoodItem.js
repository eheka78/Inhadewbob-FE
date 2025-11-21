import { Image, StyleSheet, Text, View } from "react-native";


export default function FoodItem({ item }) {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/TempImg.png')}
                    style={styles.Img}
                    resizeMode="contain"
                />
                <View>
                    <Text>{item.store}</Text>
                    <Text>{item.menu}</Text>
                    <Text>₩ {item.price}</Text>
                    <Text>{item.category}</Text>
                </View>
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
    Img:{
        height: "100%",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 10,
    }

});