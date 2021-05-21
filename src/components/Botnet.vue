<template>
  <mdb-container id="botnet">
    <mdb-row class="justify-content-center">
      <h1 class="h1-responsive font-weight-bold text-center my-5">Botnet</h1>
    </mdb-row>

    <mdb-row class="justify-content-center">
      <mdb-col md="3" class="mb-5" v-for="(target, index) in targets" v-bind:key="index">
        <mdb-card>
          <mdb-card-body class="text-center">
            <img v-bind:src="target.device.deviceImage" v-bind:alt="target.device.model">
            <mdb-card-text>{{ target.device.ip }} - {{ target.device.port }}</mdb-card-text>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>

    <mdb-row class="justify-content-center">
      <mdb-col md="6" class="mb-5">
        <label>Payload:</label>
        <model-list-select :list="payloads"
                           v-model="payload_select_id"
                           option-value="_id"
                           option-text="name"
                           placeholder="select payload">
        </model-list-select>
      </mdb-col>
      <mdb-col md="6" class="mb-5 full-input">
        <label for="arg">Arg:</label>
        <input class="text-black" id="arg" type="text" v-model="arg">
      </mdb-col>
      <mdb-col md="6" class="mb-5 full-input">
        <label for="polling">Polling rate (ms):</label>
        <input class="text-black" id="polling" type="number" v-model="polling">
      </mdb-col>
      <mdb-col md="6" class="mb-5 full-input">
        <label for="num">Reps:</label>
        <input class="text-black" id="num" type="number" v-model="num">
      </mdb-col>

      <mdb-col md="12" class="mb-5" v-if="payload_select_id">
        <codemirror class="w-100" v-model="payloads.find(value => value._id===payload_select_id).content" :options="cmOptions"></codemirror>
      </mdb-col>

      <mdb-col md="12" class="mb-5 text-center">
        <mdb-btn color="grey-lighten-5" class="btn dark-button grey-lighten-5 text-unique-color-dark ripple-parent"
                 v-on:click="send(targets, payload_select_id, arg, polling, num)">
          Send malware <i class="fas fa-user-secret"></i>
        </mdb-btn>
      </mdb-col>
    </mdb-row>

    <mdb-row class="justify-content-center text-center">
      <mdb-alert v-bind:color="alertColor" v-if="showAlert" @closeAlert="showAlert=false" dismiss>
        {{alertText}}
      </mdb-alert>
    </mdb-row>

  </mdb-container>
</template>

<script>
import DevicesService from "@/services/DevicesService";
import PayloadsService from "@/services/PayloadsService";
import BotnetService from "@/services/BotnetService";
import {ModelListSelect} from "vue-search-select";

import {mdbAlert, mdbBtn, mdbCard, mdbCardBody, mdbCol, mdbContainer, mdbRow, mdbCardText} from 'mdbvue';

// import codemirror
import 'codemirror/theme/darcula.css'
import 'codemirror/lib/codemirror';

export default {
  name: "Botnet",
  components: {
    ModelListSelect,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbAlert,
    mdbBtn,
    mdbCardText
  },
  data() {
    return {
      targets: [],
      payloads: [],
      payload_select_id: null,
      arg: "",
      polling: 1000,
      num: 10,
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-java',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: true
      },
      showAlert: false,
      alertColor: "success",
      alertText: "Empty"
    }
  },
  mounted() {
    this.getPayloads();

    this.getDevices();
  },
  methods: {
    async getPayloads() {
      const response = await PayloadsService.fetchPayloads();
      this.payloads = response.data;
    },
    async getDevices() {
      const response = await DevicesService.fetchDevices();

      let newTargets = []

      response.data.forEach((device) => {
        newTargets.push({device: device});
      });

      this.targets = newTargets;
    },
    async send(devices, payload_id, arg, polling, num) {
      BotnetService.activate(devices, payload_id, arg, polling, num)
          .then((response) => {
            this.showAlert = true;
            this.alertColor = "success";
            this.alertText = "Attack's result: " + JSON.stringify(response.data);
          })
          .catch((error) => {
            this.showAlert = true;
            this.alertColor = "error";
            this.alertText = "Error: " + error;
          });
    }
  }
}
</script>

<style scoped>
.full-input input{
  color:  black !important;
  width: 100%;
}
.full-input label {
  width: 100%;
}
.alert {
  width: 80%;
  word-break: break-all;
}
</style>