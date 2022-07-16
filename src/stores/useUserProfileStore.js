import { defineStore } from "pinia";

export const useUserProfileStore = defineStore("useUserProfileStore", {
  state: () => ({
    user: null,
    loading: true,
  }),
});