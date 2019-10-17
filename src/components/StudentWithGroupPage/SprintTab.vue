<template>
  <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock" style="heigth: 1000px">
    <div v-for="stage in stages" :slot="stage" :key="stage">
      <h2>{{ stage }}</h2>
    </div>
    <div v-for="block in blocks" :slot="block.id" :key="block.id">
      <div>
        <strong>id:</strong>
        {{ block.id }}
      </div>
      <div>{{ block.title }}</div>
      <button style="background: red" @click="finished(block.id)">Mover para sprint</button>
    </div>
  </kanban-board>
</template>

<script>
export default {
  data() {
    return {
      stages: ["Backlog Global", "Backlog da Sprint"],
      blocks: [
        {
          id: 1,
          status: "Backlog Global",
          title: "Desenvolver tela de login",
          responsibleName: 'Saleh',
          responsibleAvatar: 'https://lh6.googleusercontent.com/-XwfxOUTfwG8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3relenkpklx1PIIZnXus3R2pjzZGFQ/s50/photo.jpg',
          priority: 'alta',
          description: 'Sem descrição',
          storyPoints: 8,
          historic: [
            {
              who: 'Saleh',
              when: '16/10/2019',
              what: 'Criou o card'
            }
          ],
          groupId: '5da7c92ea0c1ce1862381f29',
          sprintNumber: 0,
          createdAt: '16/10/2019',
          updatedAt: '16/10/2019'
        },
        {
          id: 2,
          status: "Backlog Global",
          title: "Desenvolver tela de cadastro",
          responsibleName: 'Saleh',
          responsibleAvatar: 'https://lh6.googleusercontent.com/-XwfxOUTfwG8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3relenkpklx1PIIZnXus3R2pjzZGFQ/s50/photo.jpg',
          priority: 'alta',
          description: 'Sem descrição',
          storyPoints: 8,
          historic: [
            {
              who: 'Saleh',
              when: '16/10/2019',
              what: 'Criou o card'
            }
          ],
          groupId: '5da7c92ea0c1ce1862381f29',
          sprintNumber: 0,
          createdAt: '16/10/2019',
          updatedAt: '16/10/2019'
        }
      ]
    };
  },
  methods: {
    updateBlock(cardId, newStage) {
      // método sem implementação ainda, mas a funcionalidade esta ok
      return { cardId, newStage }
    },
    finished() {
      this.blocks[0].status = "Backlog da Sprint"
    }
  }
};
</script>

<style lang="scss">
  @import "node_modules/vue-kanban/src/assets/kanban.scss";
</style>
