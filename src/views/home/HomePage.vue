<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      me: state => state.users.me,
    })
  },
  created() {
    this.getMe();
  },
  methods: {
    ...mapActions("users", {
      getMe: "getMe",
    }),
  }
};
</script>
