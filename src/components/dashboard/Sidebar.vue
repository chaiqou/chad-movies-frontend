<template>
  <div class="flex-1 ml-8 flex flex-col overflow-y-hidden mt-8">
    <nav class="flex-1 px-2 py-4 space-y-1">
      <li class="text-white space-y-8 list-none">
        <ul v-if="name" class="flex mb-2">
          <div class="flex items-center">
            <img
              v-if="profile_image"
              :src="backurl + profile_image"
              alt="profile"
              class="w-10 h-10 mr-2 object-cover rounded-full"
            />
          </div>
          <div v-if="provider === null">
            <p class="font-bold font-32">
              {{ name }}
            </p>
            <router-link
              class="text-[#CED4DA] text-sm whitespace-nowrap"
              :to="{ name: 'profile-page' }"
              >{{ $t("edityourprofile") }}</router-link
            >
          </div>
          <div v-else>
            <p class="font-bold font-32">
              {{ name }}
            </p>
            <router-link
              class="text-[#CED4DA] text-sm whitespace-nowrap"
              :to="{ name: 'google-profile-page' }"
              >{{ $t("edityourprofile") }}
            </router-link>
          </div>
        </ul>
        <router-link class="flex items-center" :to="{ name: 'dashboard-page' }">
          <IconHome
            class="mr-4"
            :fill="$route.path === '/dashboard' ? 'red' : 'white'"
          ></IconHome>
          {{ $t("dashboard") }}</router-link
        >

        <router-link :to="{ name: 'movies-page' }" class="flex items-center">
          <IconMovie
            class="mr-4"
            :fill="$route.path === '/movies' ? 'red' : 'white'"
          ></IconMovie>
          {{ $t("movies") }}
        </router-link>
      </li>
    </nav>
  </div>
</template>

<script>
import IconMovie from "@/components/icons/IconMovie.vue";
import IconHome from "@/components/icons/IconHome.vue";
import axios from "@/config/axios/index";

import { mapWritableState } from "pinia";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
export default {
  components: { IconMovie, IconHome },
  computed: {
    ...mapWritableState(useUserProfileStore, [
      "loading",
      "email",
      "name",
      "profile_image",
      "provider",
      "backurl",
    ]),
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      await axios
        .get("users/", {
          params: {
            userId: this.$route.params.userId,
          },
        })
        .then((response) => {
          this.email = response.data.data.email;
          this.name = response.data.data.name;
          this.profile_image = response.data.data.profile_image;
          this.provider = response.data.data.provider;
          this.loading = false;
        });
    },
  },
};
</script>
