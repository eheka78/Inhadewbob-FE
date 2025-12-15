import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { formatPrice3 } from '../utils/FormatPrice3';


export default function FoodItem({ item, setSelectedMenu, selectedMenu }) {
    const isSelected = item.menuId === selectedMenu.menuId;

    return (
        <View style={styles.outerContainer}>
            <Pressable onPress={() => setSelectedMenu(item)}>
                <View
                    style={[
                        styles.container,
                        styles.box,
                        isSelected && styles.selectedBox,
                    ]}
                >
                    <Image
                        source={require('../../assets/TempImg.png')}
                        style={styles.Img}
                        resizeMode="contain"
                    />

                    <View style={styles.textRow}>
                        <View>
                            <Text style={styles.menuText}>
                                {item.menuName}
                            </Text>
                            <Text style={styles.locationText}>
                                {item.location}
                            </Text>
                        </View>

                        <Text style={styles.priceText}>
                            {formatPrice3(item.price)}
                        </Text>
                    </View>
                </View>
            </Pressable>
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
    },

    box: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 7,
        elevation: 7,
    },

    textRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 14,
    },

    /* 🔥 텍스트 위계 */
    menuText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 2,
    },

    locationText: {
        fontSize: 13,
        color: "#6B7280",
    },

    priceText: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.primary,
    },

    /* ⭐ 선택 상태 */
    selectedBox: {
        borderWidth: 2,
        borderColor: colors.primary,
        shadowColor: colors.primary,
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 12,
    },
});
