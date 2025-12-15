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
                        {/* 날짜 시간 */}
                        <Text style={styles.dateText}>
                            {formatDateTime2(item.createdAt)}
                        </Text>

                        {/* 메뉴명 (강조) */}
                        <Text style={styles.menuText}>
                            {item.menuName}
                        </Text>

                        {/* 가게명 */}
                        <Text style={styles.storeText}>
                            {item.restaurantName}
                        </Text>
                    </View>


                    <Text style={styles.priceText}>
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
        borderRadius: 12,
    },
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 8,
    },
    box: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 7,
        elevation: 7,
    },
    dateText: {
        fontSize: 12,
        color: "#9CA3AF",
        marginBottom: 2,
    },
    menuText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 2,
    },
    storeText: {
        fontSize: 13,
        color: "#6B7280",
    },
    priceText: {
        color: colors.primary,
        fontWeight: "700",
        fontSize: 17,
    },
});
