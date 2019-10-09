<template>
  <v-container fluid>
    <v-flex xs12 sm12 md12 lg12>
      <v-row align="center" justify="center" style="height: 350px;" class="mt-10">
        <v-card class="zoom pa-6 mx-12">
          <v-responsive>
            <v-img src="@/assets/add-user2.png" class="image-style mb-10"></v-img>
          </v-responsive>

          <JoinGroup />
        </v-card>

        <v-card class="zoom pa-6 ma-3">
          <v-img src="@/assets/add-group1.png" class="image-style mb-10"></v-img>
          <v-spacer></v-spacer>

          <CreateGroup />
        </v-card>
      </v-row>
    </v-flex>
  </v-container>
</template>


<script>
import CreateGroup from "../components/StudentWithoutGroupPage/CreateGroup";
import JoinGroup from "../components/StudentWithoutGroupPage/JoinGroup";

export default {
  name: "StudentWithoutGroupPage",
  components: {
    CreateGroup,
    JoinGroup
  }
};
</script>

<style scoped>
.image-style {
  width: 300px;
  max-width: 250px;
  max-height: 250px;
}

.zoom {
  padding: 50px;
  background-color: #e0e0e0;
  transition: transform 0.2s; /* Animation */
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.1);
}
</style>
