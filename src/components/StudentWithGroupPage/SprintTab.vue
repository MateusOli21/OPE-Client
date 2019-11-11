<template>
  <KanbanBoard
    :user="user"
  />
</template>

<script>
import { getGoogleUserData } from "../../services/LocalForage";
import KanbanBoard from './KanbanBoard';

export default {
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
  },
  data() {
    return {
      user: {}
    }
  },
  components: {
    KanbanBoard
  }
};
</script>

<style lang="scss">
</style>
