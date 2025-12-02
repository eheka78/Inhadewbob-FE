// app/screens/MyPage.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /* 전체 화면 */
  container: {
    flex: 1,
    backgroundColor: "#F0F3FA",
  },

  /* 스크롤 안쪽 패딩*/
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20, 
  },

  /* 개인정보 칸 */
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 2,
    width: '100%',
    padding: 20,
    marginBottom: 22,

    // Android 그림자
    elevation: 8
  },

  /* 이미지를 감싸는 wrapper */
  avatarWrapper: {
  width: 68,
  height: 68,
  borderRadius: 50,
  backgroundColor: "#FFFFFF",
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 15,

  // Android 그림자
  elevation: 3
  },

  /* 사용자 사진 */
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
  },

  /* 사용자 이름*/
  userName: {
    color: '#5A8EF6',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 9
  },

  /*사용자 메일*/
  userEmail: {
    color: '#595959',
    fontSize: 12,
  },

  /* 인덱스 */
  settingText: {
    color : '#595959',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },

  /* 설정 카드 전체 */
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 21,
    paddingVertical: 21,
    marginBottom: 20,

    // Android 그림자
    elevation: 8
  },

  /* 공통 스타일*/
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* 주별 예산 칸*/
  rowWeeklyBudget:{
    paddingBottom: 12
  },

  /* 주별 고정 외식 일수 */
  rowWeeklyEatingOut: {
    paddingTop: 12
  },

  /* 연동 계정 */
  rowUserFirst: {
    paddingTop: 7,
    paddingBottom: 23
  },

  /* 이름 변경 / 사진 변경 / 탈퇴하기 */
  rowUserOthers: {
    paddingTop: 23,
    paddingBottom: 23
  },

  /* 라벨 텍스트 */
  text: {
    fontSize: 16
  },

  /* 입력 박스*/
  inlineBox: {
    width: 147,
    height: 38,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    textAlign: 'center'
  },

  /* 섹션 구분선 */
  div: {
    height: 1,
    backgroundColor: '#E5E5EA',
  }
});