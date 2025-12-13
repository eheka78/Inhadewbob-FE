import { StyleSheet, Text, View, Image } from "react-native";
import { formatPrice3 } from './../utils/FormatPrice3';
import { colors } from "../constants/colors";
import { formatDateTime2 } from "../utils/FormatDateTime2";


export default function MealItem({ item }) {
    return (
        <View style={styles.outerContainer}>
            <View style={[styles.container, styles.box]}>
                <Image
                    source={require('../../assets/TempImg.png')}
                    style={styles.Img}
                    resizeMode="contain"
                />
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 15 }}>
                    <View style={{ justifyContent: "center" }}>
                        <Text>{formatDateTime2(item.createdAt)}</Text>
                        <Text style={{ fontWeight: "bold" }}>{item.menuName}</Text>
                        <Text>{item.restaurantName}</Text>
                    </View>

                    <Text style={{ color: colors.primary, fontWeight: "bold", fontSize: 17, }}>
                        {formatPrice3(item.price)}
                    </Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        width: "100%",
        paddingVertical: 10,
    },
    Img: {
        height: 60,
        width: 60,
    },
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 8,
    },
    box: {  // 그림자 박스
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20, paddingHorizontal: 30,
        shadowColor: "#000", shadowOpacity: 0.12,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 7,
        elevation: 7,
        transform: [{ rotate: "0.02deg" }],
    },
});
