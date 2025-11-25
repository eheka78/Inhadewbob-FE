// app/screens/MyPage.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /* 전체 화면 */
  container: {
    flex: 1,
    padding: 20
  },

  /* 개인정보 카드 */
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  },

  /*사용자 사진*/
  avatar: {
    width: 60,
    height: 60
  },

  /* 사용자 이름*/
  userName: {
    fontWeight: '700'
  },

  /*사용자 메일*/
  userEmail: {
    color: '#777'
  },

  settingText: {
    fontWeight: '700'
  },

  /* 설정 카드 전체 */
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  /* 입력 박스*/
  inlineBox: {
    width: 150,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },

  TextInput: {
    flex: 1,
    textAlign: 'center'
  },

  /* 섹션 구분선 */
  div: {
    height: 1,
    backgroundColor: '#E5E5EA',
  }
});