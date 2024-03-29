export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    dragAndDropFile(event) {
      let file = event.dataTransfer.files[0];
      this.thumbnail = file;

      let reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    toggleActive() {
      this.active = !this.active;
    },
  },
};
