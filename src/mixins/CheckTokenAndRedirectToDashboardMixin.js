import axios from "@/config/axios/index";

export default {
  mounted() {
    if (localStorage.getItem("jwt_token") !== null) {
      axios
        .post("checkToken", {
          token: this.token,
        })
        .then((response) => {
          if (response) {
            this.$router.push({ name: "dashboard-page" });
          }
        });
    }
  },
};
