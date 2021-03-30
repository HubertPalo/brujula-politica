<template>
  <div class="hello">
    <h1>BRÚJULA POLÍTICA</h1>
    <p>
      Primero una prequeña introducción: el fin de esta página es intentar
      ayudar a las personas que aún no han decidido por quién votar dándoles
      sugerencias basadas en sus preferencias sobre algunos puntos.
    </p>
    <p>
      En total son 5 preguntas, y el resultado final se debe mostrar al final,
      con una breve explicación del resultado obtenido.
    </p>
    <p>1. Tabla de comparación de</p>
    <Button label="Submit" icon="pi pi-check" iconPos="right" />
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
// import OMS2030Service from "../services/OMS2030Service";


export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data () {
    return {
      partiesList: [],
      goalsList: [],
      qualificationsList: [],
      userRatingsPerGoal: [0.2, 0.2, 0.2, 0.2, 0.2],
      userRankingsComputed: []
    };
  },
  created() {
    // this.service = new OMS2030Service();
    console.log("CREATED");
  },
  methods: {
    startComputing() {
      this.userRatingsPerGoal = [1, 1, 1, 1, 1];
      for(let i=0; i< this.qualificationsList.length; i++) {
        let qualification = this.qualificationsList[i];
        this.userRankingsComputed[0] = 0;
        if (this.userRankingsComputed[qualification.partyId]==undefined){
          this.userRankingsComputed[qualification.partyId] = 0;
        }
        this.userRankingsComputed[qualification.partyId] += this.userRatingsPerGoal[qualification.goalId-1] * qualification.qualification;
      }
      let maxValue = 0;
      let maxIndex = -1;
      for(let i=1; i<=this.partiesList.length; i++) {
        if(this.userRankingsComputed[i] == maxValue){
          console.log('ENCONTRO UN EMPATE - PARTIDO', i, this.userRankingsComputed[i]);
        }
        if(this.userRankingsComputed[i] > maxValue){
          maxValue = this.userRankingsComputed[i];
          maxIndex = i;
        }
        
      }
      console.log('ID DEL PARTIDO', maxIndex);
    }
  },
  mounted() {
    this.$http.get("data/OMS2030.json")
    .then(
      (response) => {
        this.partiesList = response.data.parties;
        this.goalsList = response.data.goals;
        this.qualificationsList = response.data.data;
        this.startComputing();
        /*console.log(this.partidos, this.metas, this.calificaciones);
        for(let i = 0; i < this.partidos.length ; i++){
          console.log('DATA - ' + i, this.partidos[i]);
        }*/
        });
    // this.service.get().then((data) => console.log(data));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
