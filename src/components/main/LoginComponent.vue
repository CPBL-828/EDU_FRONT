<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChevronLeftSquareIcon } from "@scarlab/icons-vue/outline";
import { UserCircleIcon } from "@scarlab/icons-vue/solid";
import { useRoute, useRouter } from "vue-router";
import { KEYS, USER_KEY } from "../../constant";
import {
  adminInterface,
  defaultInterface,
  parentInterface,
  studentInterface,
  teacherInterface,
} from "../../lib/types";
import { ApiClient } from "../../axios";
import common from "../../lib/common";
/*
@brief 로그인 실행 화면
 */
export default defineComponent({
  name: "LoginComponent",
  components: { ChevronLeftSquareIcon, UserCircleIcon },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userType = ref<string>();
    const whoAmI = ref<defaultInterface>();
    const userId = ref<string>();

    const goBack = () => {
      router.back();
    };

    /*
    @brief 로그인 실행
           유저 데이터(result)를 성공적으로 가져올 시, 현재 유저 타입에 맞춰 userData에 result 저장
    @date 22/10/06
     */
    const doLogin = async () => {
      let data: object = {
        userType: userType.value,
        id: userId.value,
      };

      if (userId.value) {
        const result = await ApiClient(
          "/members/compare/",
          common.makeJson(data)
        );

        if (result) {
          let userData;

          if (userType.value === USER_KEY.STU) {
            userData = result as studentInterface;
          } else if (userType.value === USER_KEY.PAR) {
            userData = result as parentInterface;
          } else if (userType.value === USER_KEY.TEA) {
            userData = result as teacherInterface;
          } else {
            userData = result as adminInterface;
            if (userData.type === "교무") {
              userType.value = USER_KEY.KYO_ADM;
            } else {
              userType.value = USER_KEY.ETC_ADM;
            }
          }

          common.setItem(KEYS.LU, common.makeJson(userData as object));
          common.setItem(KEYS.UK, common.makeJson({ userKey: userType.value }));

          window.alert("로그인 성공. 환영합니다!");
          await router.push("/main");
        } else {
          window.alert(whoAmI.value?.VALUE + " 정보를 찾을 수 없어요!");
        }
      } else {
        window.alert(whoAmI.value?.VALUE + " ID를 입력해 주세요!");
      }
    };

    onMounted(() => {
      /*
      접속하려는 유저 타입 가져오기
       */
      userType.value = route.fullPath
        .split("/")[1]
        .substring(0, 3)
        .toUpperCase();

      if (userType.value === USER_KEY.STU) {
        whoAmI.value = { KEY: USER_KEY.STU, VALUE: "학생" };
      } else if (userType.value === USER_KEY.PAR) {
        whoAmI.value = { KEY: USER_KEY.PAR, VALUE: "학부모" };
      } else if (userType.value === USER_KEY.TEA) {
        whoAmI.value = { KEY: USER_KEY.TEA, VALUE: "강사" };
      } else if (userType.value === USER_KEY.ADM) {
        whoAmI.value = { KEY: USER_KEY.ADM, VALUE: "관리자" };
      }
    });

    return {
      whoAmI,
      userId,
      goBack,
      doLogin,
    };
  },
});
</script>

<template>
  <section class="login-input">
    <div class="login-input">
      <div class="back" @click="goBack">
        <chevron-left-square-icon /> 이전 화면으로 돌아가기
      </div>
      <div class="login-input-box" @keypress.enter="doLogin">
        <div class="login-input-box-section">
          <div class="login-input-box-section-title">LOGIN</div>
          <div class="login-input-box-section-sub">
            {{ whoAmI?.VALUE }} ID 입력해주세요
          </div>
          <user-circle-icon class="login-input-box-section-icon" />
          <input
            type="text"
            class="login-input-box-section-input"
            placeholder="Insert ID"
            v-model="userId"
          />
          <input
            type="button"
            class="login-input-box-section-btn"
            value="로그인 하기"
            @click="doLogin"
          />
        </div>
      </div>
    </div>
  </section>
</template>
