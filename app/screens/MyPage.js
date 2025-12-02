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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*개인 정보*/}
        <View style={styles.profileBox}>
          <View style={styles.avatarWrapper}>
            <Image
                source={require('../../assets/ganadi.png')} 
                style={styles.avatar} 
            />
          </View>

          <View>  
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.userEmail}>adcdefg@gmail.com</Text>
          </View>
        </View>
        
        <Text style={styles.settingText}>주별 설정</Text>

        <View style={styles.settingCard}>
          {/* 주별 예산 */}
          <View style={[styles.settingRow, styles.rowWeeklyBudget]}>
              <Text style={styles.text}>주별 예산</Text>
              <View style={styles.inlineBox}>
              <TextInput
                  style={styles.textInput}
                  value={weeklyBudget}
                  onChangeText={setWeeklyBudget}
                  keyboardType="numeric"
              />    
              </View>
          </View>

          <View style={styles.div}/>

          {/* 주별 고정 외식 일수 */}
          <View style={[styles.settingRow, styles.rowWeeklyEatingOut]}>
            <Text style={styles.text}>주별 고정 외식 일수</Text>
            <View style={styles.inlineBox}>
              <TextInput
                  style= {styles.textInput}
                  value={weeklyEatingOut}
                  onChangeText={setWeeklyEatingOut}
                  keyboardType="numeric"
              />
            </View>
        </View>
        </View>

        <Text style={styles.settingText}>사용자 설정</Text>
        <View style={styles.settingCard}>
          {/*연동 계정*/}
          <View style={[styles.settingRow, styles.rowUserFirst]}>
            <Text style={styles.text}>연동 계정</Text>
              <Image
                style={styles.arrowRight}
                source={require('../../assets/arrow-right.png')}
              />
          </View>

          <View style={styles.div}/>

          {/*사용자 이름 변경*/}
          <View style={[styles.settingRow, styles.rowUserOthers]}>
            <Text style={styles.text}>사용자 이름 변경</Text>
              <Image
                style={styles.arrowRight}
                source={require('../../assets/arrow-right.png')}
              />            
          </View>

          <View style={styles.div}/>

          {/* 프로필 사진 변경 */}
          <View style={[styles.settingRow, styles.rowUserOthers]}>
            <Text style={styles.text}>프로필 사진 변경</Text>
              <Image
                style={styles.arrowRight}
                source={require('../../assets/arrow-right.png')}
              />              
          </View>

          <View style={styles.div}/>

          {/*탈퇴하기 계정*/}
          <View style={[styles.settingRow, styles.rowUserOthers]}>
            <Text style={styles.text}>탈퇴하기</Text>
              <Image
                style={styles.arrowRight}
                source={require('../../assets/arrow-right.png')}
              />
          </View>
        </View>

      </ScrollView>          
    </SafeAreaView>
  );
}