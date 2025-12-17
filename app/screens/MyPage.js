import { Text, View, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import { getProfile, patchProfile } from '../api/profile';
import styles from '../styles/MyPage.styles';

export default function MyPage({ navigation }) {
    // 이름, 메일, 주별 예산, 외식일수
    const [profile, setProfile] = useState({
    nickname: '', email: '', weeklyBudget: '', weeklyEatingOut: '',
    });

useEffect(() => {
  (async () => {
    try{
      const data = await getProfile();
        setProfile({
          nickname: data?.nickname ?? '',
          email: data?.email ?? '',
          weeklyBudget: String(data?.weeklyBudget ?? ''),
          weeklyEatingOut: String(data?.eatoutCount ?? ''),
        });
    } catch(e) {
      console.log('MyPage FetchProfile 실패')
    }
  })();
  }, []);

  const saveWeeklySetting = async () => {
    try {
      await patchProfile({
        weeklyBudget: profile.weeklyBudget,
        eatoutCount: profile.weeklyEatingOut,
    });
    console.log('설정 저장 완료');
  } catch (e) {
    console.log('saveWeeklySetting 실패');
  }
};

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
            <Text style={styles.userName}>{profile.nickname|| 'User Name'}</Text>
            <Text style={styles.userEmail}>{profile.email|| ''}</Text>
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
                  value={profile.weeklyBudget}
                  onChangeText={(t) => setProfile({ ...profile, weeklyBudget: t.replace(/[^0-9]/g, '') })}
                  keyboardType="numeric"
                  returnKeyType='done'
                  onSubmitEditing={saveWeeklySetting}
                  onEndEditing={saveWeeklySetting}
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
                  value={profile.weeklyEatingOut}
                  onChangeText={(t) => setProfile({ ...profile, weeklyEatingOut: t.replace(/[^0-9]/g, '') })}
                  keyboardType="numeric"
                  returnKeyType='done'
                  onSubmitEditing={saveWeeklySetting}
                  onEndEditing={saveWeeklySetting}
              />
            </View>
        </View>
        </View>

        <Text style={styles.settingText}>사용자 설정</Text>
        <View style={styles.settingCard}>
          {['연동 계정', '사용자 이름 변경', '프로필 사진 변경', '탈퇴하기'].map((menuName, index) => (
            <React.Fragment key={menuName}>
              <View style={[styles.settingRow, index === 0 ? styles.rowUserFirst : styles.rowUserOthers]}>
                <Text style={styles.text}>{menuName}</Text>
                <Image 
                  style={styles.arrowRight} 
                  source={require('../../assets/right-arrow.png')} 
                />
              </View>
              {index < 3 && <View style={styles.div} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>          
    </SafeAreaView>
  );
}