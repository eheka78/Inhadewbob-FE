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
                        isSelected && styles.selectedBox, // ⭐ 핵심
                    ]}
                >
                    <Image
                        source={require('../../assets/TempImg.png')}
                        style={styles.Img}
                        resizeMode="contain"
                    />

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginLeft: 15,
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.menuName}
                            </Text>
                            <Text>{item.location}</Text>
                        </View>

                        <Text
                            style={{
                                color: colors.primary,
                                fontWeight: "bold",
                                fontSize: 17,
                            }}
                        >
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
    selectedBox: {
        borderWidth: 2,
        borderColor: "#5A8EF6", // 파란 테두리
        shadowColor: "#5A8EF6",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 12, // Android 그림자 강화
    },
});