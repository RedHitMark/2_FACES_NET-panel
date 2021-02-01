<template>
  <mdb-footer class="page-footer font-small mt-0 pt-0" id="footer">
    <mdb-container class="footer-main py-3 text-center text-md-left">
      <mdb-row class="mt-3">
        <mdb-col md="12" lg="3" xl="3" class="mb-4">
          <h6 class="h6-responsive color-white text-uppercase font-weight-bold"><strong>2_FACES_NET</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px"/>
          <p>This is a university project about a new model of DDoS with a botnet of Android devices infected by an Android malware based on reflection, dynamic compiling and
            dynamic loading in order to execute malicious code not in the device at compile-time</p>
        </mdb-col>

        <mdb-col md="3" lg="3" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>Publications</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px"/>
          <p>
            <a href="https://www.researchgate.net/publication/279952811_Composition-Malware_Building_Android_Malware_at_Run_Time">Composition
              Malware</a>
          </p>
          <p><a href="#">2Faces Malware (WIP)</a></p>
        </mdb-col>

        <mdb-col md="3" lg="3" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>Useful links</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px"/>
          <p><a href="https://github.com/RedHitMark/2_FACES_NET-backend">GitHub Backend Repository</a></p>
          <p><a href="https://github.com/RedHitMark/2_FACES_NET-panel">GitHub Panel Repository</a></p>
          <p><a href="https://github.com/RedHitMark/2_FACES_NET-android">GitHub Android Repository</a></p>
        </mdb-col>

        <mdb-col md="6" lg="3" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>Contact</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px"/>
          <p>
            <i class="fas fa-chalkboard-teacher mr-3"></i>
            <a href="https://scholar.google.com/citations?user=PHZc7DsAAAAJ&hl=it&oi=ao">Prof. Francesco Mercaldo</a>
          </p>
          <p>
            <i class="fas fa-chalkboard-teacher mr-3"></i>
            <a href="https://scholar.google.com/citations?hl=it&user=wEFxXI0AAAAJ">Dott.ssa Rosangela Casolare</a>
          </p>
          <p>
            <i class="fas fa-envelope mr-3"></i>
            <a href="mailto:m.russodivito@studenti.unimol.it">m.russodivito@studenti.unimol.it</a>
          </p>
          <p>
            <i class="fab fa-github white-text mr-3"></i>
            <a href="https://github.com/RedHitMark">RedHitMark</a>
          </p>
          <p>
            <i class="fab fa-facebook white-text mr-3"></i> <a href="https://www.facebook.com/marco.russodivito/">Marco
            Russodivito</a>
          </p>
          <p>
            <i class="fab fa-instagram white-text mr-3"></i>
            <a href="https://www.instagram.com/marco.russodivito">@marco.russodivito</a>
          </p>
          <p>
            <i class="fab fa-twitter white-text mr-3"></i>
            <a href="https://twitter.com/RedHitMark98">@RedHitMark98</a>
          </p>
          <p>
            <i class="fab fa-linkedin-in white-text mr-3"></i>
            <a href="https://www.linkedin.com/in/marco-russodivito-918459174">Marco Russodivito</a>
          </p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container fluid class="footer-copyright text-center py-3">
      &copy; 2020 Copyright: <a href="http://redhitmark.ddns.net"> RedHitMark</a>
    </mdb-container>
  </mdb-footer>
</template>

<script>
import {mdbFooter, mdbContainer, mdbRow, mdbCol} from 'mdbvue';

export default {
  name: 'Footer',
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol
  }
}
</script>

<style scoped>
#footer {
  margin-top: 0 !important;
  background: #212121 !important;
}
h6 {
  color: white;
}
.footer-main {
  background: #212121 !important;
}
.footer-copyright {
  background: #000 !important;
}
</style>
