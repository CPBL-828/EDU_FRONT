<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import common from "../../lib/common";
import {
  defaultInterface,
  roomInterface,
  scheduleInterface,
} from "../../lib/types";
import TimetableComponent from "../custom/TimetableComponent.vue";
import { KEYS, USER_KEY } from "../../constant";
import { ApiClient } from "../../axios";
import SelectButtonComponent from "../custom/SelectButtonComponent.vue";
import { useStore } from "vuex";
import ModalPopupComponent from "../custom/ModalPopupComponent.vue";
import SelectListComponent from "../custom/SelectListComponent.vue";
/*
@brief [강사, 학생, 학부모, 관리자] [Main]시간표 관리
       [Sub]현재 시간표 접근 시 해당 유저의 현재 시간표 표시
       관리자의 경우, 강의실별 현재 시간표를 표시
 */
export default defineComponent({
  name: "CurrentScheduleComponent.vue",
  components: {
    SelectListComponent,
    ModalPopupComponent,
    SelectButtonComponent,
    TimetableComponent,
  },
  props: {
    adminState: {
      types: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const category = ref<Array<defaultInterface> | undefined>(undefined);
    const teacherKey = ref<string>("");
    const selectLectureState = ref(false);
    const roomKey = ref<string>("");
    const scheduleList = ref<Array<scheduleInterface>>([]);
    const scheduleInfo = ref<scheduleInterface | undefined>(undefined);
    const selectItem: defaultInterface[] = [
      { KEY: "pm", VALUE: "오후" },
      { KEY: "am", VALUE: "오전" },
    ];
    const selectState = ref("pm");

    const getScheduleList = async () => {
      if (common.getItem(KEYS.UK).userKey === USER_KEY.TEA) {
        teacherKey.value = common.getItem(KEYS.LU).teacherKey;
      }

      let data = {
        userKey: teacherKey.value,
        // search: "",
        roomKey: roomKey.value,
        target: "",
        roomName: "",
        lectureName: "",
      };

      const result = await ApiClient(
        "/lectures/getLectureList/",
        common.makeJson(data)
      );

      if (result) {
        scheduleList.value = [];
        if (result.count > 0) {
          result.resultData.map((item: scheduleInterface) => {
            item.start = Number(item.startTime?.substring(0, 2));
            item.minute = Number(item.startTime?.substring(3, 5));

            if (item.progress === "등록") {
              scheduleList.value.push(item as scheduleInterface);
            }
          });
        }
      } else {
        scheduleList.value = [];
      }
    };

    const selectLecture = async (r: roomInterface) => {
      roomKey.value = r.roomKey;
      await getScheduleList();
      selectLectureState.value = true;
    };

    const changeState = (s: string) => {
      selectState.value = s;
    };

    const selectSchedule = (i: scheduleInterface) => {
      scheduleInfo.value = i;
    };

    const openModal = () => {
      store.commit("setModalState", true);
    };

    onMounted(async () => {
      category.value = common.findCategory();

      await getScheduleList();
    });

    return {
      category,
      selectLectureState,
      scheduleList,
      scheduleInfo,
      selectItem,
      selectState,
      selectLecture,
      changeState,
      selectSchedule,
      openModal,
    };
  },
});
</script>

<template>
  <section class="current-schedule">
    <div class="current-schedule">
      <div class="current-schedule-section">
        <div class="current-schedule-section-tag">
          {{
            category
              ? category[1]["VALUE"]
                ? category[1]["VALUE"]
                : category[0]["VALUE"]
              : ""
          }}
        </div>
        <div class="current-schedule-section-body">
          <div class="current-schedule-section-body-today">
            <i class="fa-regular fa-calendar"></i> TODAY :
            {{ new Date().toISOString().substring(0, 4) }}년
            {{ new Date().toISOString().substring(5, 7) }}월
            {{ new Date().toISOString().substring(8, 10) }}일
            {{ new Date().toString().substring(0, 4) }}
          </div>
          <div
            class="current-schedule-section-body-button"
            v-if="!adminState || selectLectureState"
          >
            <div class="current-schedule-section-body-button-state">
              <select-button-component
                :state-value="selectItem"
                :select-value="selectState"
                @changeState="changeState"
              ></select-button-component>
            </div>
            <div class="current-schedule-section-body-button-past">
              이전 시간표 조회
            </div>
          </div>
          <div class="current-schedule-section-body-lecture" v-if="adminState">
            <select-list-component
              v-if="!selectLectureState"
              list-type="ROOM"
              @selectRoom="selectLecture"
            ></select-list-component>
          </div>
          <div
            class="current-schedule-section-body-timetable"
            v-if="!adminState || selectLectureState"
          >
            <timetable-component
              :schedule-list="scheduleList"
              :select-type="selectState"
              @clickSchedule="selectSchedule"
            ></timetable-component>
          </div>

          <div
            class="current-schedule-section-body-info"
            v-if="!adminState || selectLectureState"
          >
            <div class="current-schedule-section-body-info-container">
              <div class="info" v-if="!scheduleInfo">
                <div class="info-no-data">강의를 선택해 주세요</div>
                <div class="info-underline"></div>
              </div>
              <div class="info" v-if="scheduleInfo">
                <div class="info-name">{{ scheduleInfo.lectureName }}</div>
                <div class="info-underline"></div>
                <div class="info-teacher">
                  <div class="label">강사명</div>
                  {{ scheduleInfo.teacherName }}
                </div>
                <div class="info-book">
                  <div class="label">교재</div>
                  {{ scheduleInfo.book }}
                </div>
                <div class="info-grade">
                  <div class="label">학년</div>
                  {{ scheduleInfo.target }}
                </div>
                <div class="info-room">
                  <div class="label">강의실</div>
                  {{ scheduleInfo.roomName }}
                </div>
                <div class="info-progress">
                  <div class="label">강의 진행표</div>
                  <div class="progress-btn" @click="openModal">열람하기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-popup-component title="강의 진행표"> </modal-popup-component>
  </section>
</template>
