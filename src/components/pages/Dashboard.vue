<template lang="pug">
    <div>
        Navbar
        Alert
        .container-fluid
            .row
                Sidebar
                main.col-md-9.ml-sm-auto.col-lg-10.px-4(role='main')
                    router-view
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';


export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
