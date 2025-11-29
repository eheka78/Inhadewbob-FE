import { Text, View, Image, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Toggle from '../components/Toggle'
import styles from '../styles/MyPage.styles';

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
        <Image
            source={require('../../assets/ganadi.png')} 
            style={styles.avatar} 
        />
        <View>  
          <Text style={styles.userName}>이름 | 가나디</Text>
          <Text style={styles.userEmail}>구글 로그인 | ganadi@gmail.com</Text>
        </View>
      </View>

      <Text style={styles.settingText}>설정</Text>

      <View style={styles.settingCard}>
        {/* 주별 예산 */}
        <View style={styles.settingRow}>
            <Text>주별 예산</Text>
            <View style={styles.inlineBox}>
            <Text>₩</Text>
            <TextInput
                style={styles.TextInput}
                value={weeklyBudget}
                onChangeText={setWeeklyBudget}
                keyboardType="numeric"
            />    
            </View>
        </View>
        
        <View style={styles.div}/>

      {/* 주별 고정 외식 일수 */}
      <View style={styles.settingRow}>
        <Text>주별 고정 외식 일수</Text>
            <View style={styles.inlineBox}>
            <TextInput
                style= {styles.TextInput}
                value={weeklyEatingOut}
                onChangeText={setWeeklyEatingOut}
                keyboardType="numeric"
            />
            </View>
      </View>

    <View style={styles.div}/>

      {/* 모드 변경 토글 */}
      <View>
        <Text>모드 변경</Text>
        <View>
          <Toggle leftLabel="EASY" rightLabel="HARD" onToggle={(label) => setMode(label)} />
        </View>
      </View>

      </View>
    </SafeAreaView>
  );
}