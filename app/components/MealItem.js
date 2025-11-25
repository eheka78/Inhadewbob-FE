import { StyleSheet, Text, View, Image } from "react-native";


export default function MealItem({ item }) {
    console.log(item);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/TempImg.png')}
                    style={styles.Img}
                    resizeMode="contain"
                />
                <View>
                    <Text>{item.t}</Text>
                    <Text>{item.store}</Text>
                    <Text>
                        {item.category} | {item.menu}  ₩ {item.price}
                    </Text>
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
