<template>
  <mdb-container id="team">
    <mdb-row class="justify-content-center">
      <h1 class="h1-responsive font-weight-bold my-5">Working team</h1>
    </mdb-row>

    <mdb-row class="justify-content-center">
      <mdb-col lg="3" md="6" class="mb-lg-0 mb-5">
        <img class="avatar img-fluid z-depth-1" src="./../assets/francesco-mercaldo.jpg" alt="Francesco Mercaldo"/>
        <h5 class="font-weight-bold mt-4 mb-3">Ing. Francesco Mercaldo</h5>
        <p class="text-uppercase blue-text">Thesis supervisor</p>
      </mdb-col>

      <mdb-col lg="3" md="6" class="mb-lg-0 mb-5">
        <img class="avatar img-fluid z-depth-1" src="./../assets/rosangela-casolare.jpg" alt="Rosangela Casolare"/>
        <h5 class="font-weight-bold mt-4 mb-3">Dott.ssa Rosangela Casolare</h5>
        <p class="text-uppercase blue-text">Thesis co-supervisor</p>
      </mdb-col>

      <mdb-col lg="3" md="6" class="mb-lg-0 mb-5">
        <img class="avatar img-fluid z-depth-1" src="./../assets/marco-russodivito.jpg" alt="Marco Russodivito"/>
        <h5 class="font-weight-bold mt-4 mb-3">Marco Russodivito</h5>
        <p class="text-uppercase blue-text">Developer</p>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {mdbContainer, mdbRow, mdbCol} from 'mdbvue';

export default {
  name: 'Team',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol
  }
}
</script>

<style scoped>
.rounded-circle {
  max-width: 150px;
}

.avatar {
  border-radius: 50%;
}
</style>