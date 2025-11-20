import { Pressable, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { FoodCategory } from './../../assets/FoodCategory';


export default function BudgetCategoryBottomSheet({ setSelectedBudget, checked, setChecked }) {
    // 체크했을 때, 체크하는 함수
    const toggle = (id) => {
        setChecked((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };


    return (
        <View style={{ padding: 16 }}>
            <Text style={styles.title}>오늘의 예산과 카테고리 설정해듀</Text>

            {/* 예산 */}
            <View style={{ marginVertical: 12 }}>
                <Text>한 끼 예산</Text>
                <TextInput
                    placeholder="₩ 55,000"
                    style={styles.input}
                    onChange={setSelectedBudget}
                />
            </View>

            {/* 카테고리 */}
            <View>
                <Text style={styles.subTitle}>카테고리</Text>
                <View style={styles.categoryContainer}>
                    {FoodCategory.map((item) => {
                        const isChecked = checked.includes(item.id);
                        return (
                            <Pressable
                                key={item.id}
                                style={[
                                    styles.tag,
                                    isChecked && styles.tagSelected
                                ]}
                                onPress={() => toggle(item.id)}
                            >
                                <Text style={[
                                    styles.tagText,
                                    isChecked && styles.tagSelectedText
                                ]}>
                                    #{item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            <View>
                <Button title="설정" />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        marginTop: 8,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },
    tag: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#F0F0F0",
    },
    tagSelected: {
        backgroundColor: "#5860ffff",
    },
    tagText: {
        fontSize: 15,
        color: "#333"
    },
    tagSelectedText: {
        color: "#fff",
        fontWeight: "bold"
    }
});
