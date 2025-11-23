import { Text, View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Toggle from '../components/Toggle'

export default function MyPage({ navigation }) {
    // 주별 예산
    const [weeklyBudget, setWeeklyBudget] = useState('250000');
    // 주별 고정 외식 일수
    const [weeklyEatingOut, setWeeklyEatingOut] = useState('5');
    // 모드 설정
    const [mode, setMode] = useState('EASY');

  return (
    <SafeAreaView style={styles.container}>
      {/*개인 정보*/}
      <View style={styles.profileBox}>
        <View style={styles.avatar} />
        <View>  
          <Text>이름 | 가나디</Text>
          <Text>구글 로그인 | ganadi@gmail.com</Text>
        </View>
      </View>

      {/* 주별 예산 */}
      <View>
        <Text>주별 예산</Text>
        <View style={styles.inlineBox}>
          <Text>₩</Text>
          <TextInput
            value={weeklyBudget}
            onChangeText={setWeeklyBudget}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* 주별 고정 외식 일수 */}
      <View>
        <Text style={styles.label}>주별 고정 외식 일수</Text>
        <TextInput
          style={styles.smallInput}
          value={weeklyEatingOut}
          onChangeText={setWeeklyEatingOut}
          keyboardType="numeric"
        />
      </View>

      {/* 모드 변경 토글 */}
      <View>
        <Text>모드 변경</Text>
        <View>
          <Toggle
            leftLabel="EASY"
            rightLabel="HARD"
            onToggle={(label) => setMode(label)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 16,
  },
  inlineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    minWidth: 150,
    justifyContent: 'space-between',
  },
  smallInput: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 70,
    textAlign: 'center',
  },
});