<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { useStore } from "vuex";
/*
@brief v-slot을 활용한 모달 팝업 창
       학생 상세, 공지 상세 등 팝업으로 표시할 내용을 위한 모달 창
@props 팝업에 표시할 내용의 제목, 버튼이 필요한 경우 어떤 버튼인지에 대한 상태 값
 */
export default defineComponent({
  name: "ModalPopupComponent",
  props: {
    title: {
      types: String as PropType<string>,
      required: true,
    },
    btnState: {
      types: String as PropType<string>,
      required: false,
    },
  },
  setup() {
    const store = useStore();
    const popupState = ref(false);

    const onClickAway = (e: Event) => {
      if (e.isTrusted) {
        store.commit("setModalState", false);
        popupState.value = false;
      }
    };

    const closeModal = () => {
      store.commit("setModalState", false);
      popupState.value = false;
    };

    /*
    모달 창의 팝업 여부를 외부에서도 공통으로 관리하기 위해 store 사용
     */
    watch(
      () => store.state.modalState,
      () => {
        popupState.value = store.state.modalState;
      }
    );

    return {
      popupState,
      onClickAway,
      closeModal,
    };
  },
});
</script>

<template>
  <section class="modal" v-if="popupState" v-click-away="onClickAway">
    <div class="modal">
      <div v-if="btnState" class="modal-save">
        {{ btnState === "SAVE" ? "저장하기" : "버튼" }}
      </div>
      <span class="modal-title">{{ title }}</span>
      <i class="fa-solid fa-rectangle-xmark" @click="closeModal"></i>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </section>
</template>