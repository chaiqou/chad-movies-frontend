<template>
  <Layout />
  <Timeline :header="$t('myprofile')">
    <div
      class="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-[#11101A] w-full shadow-lg rounded-xl mt-16"
    >
      <div class="px-6">
        <div class="flex flex-wrap justify-center">
          <div class="w-full flex justify-center">
            <div class="relative">
              <img
                v-if="profile_image"
                :src="getUserProfilePhoto()"
                alt="profile image"
                class="shadow-xl rounded-full object-cover w-30 h-20 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[10rem]"
              />
              <img
                v-else
                src="@/assets/images/vue-profile.jpg"
                alt="vue profile photo"
                class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[10rem]"
              />
            </div>
          </div>
        </div>
        <FormVee
          enctype="multipart/form-data"
          @submit="onSubmitNormalUserParamsChange"
        >
          <div class="w-full text-center mt-10 cursor-pointer">
            <div class="flex justify-center lg:pt-4 pt-8 pb-0">
              <div class="p-3 text-center">
                <div class="text-lg font-bold block text-white">
                  <label class="p-1 text-white font-bold" for="dropzone">{{
                    $t("uploadphoto")
                  }}</label>
                  <Field
                    id="dropzone"
                    v-model="profile_image"
                    type="file"
                    name="profile_image"
                    class="hidden"
                    @change="selectFile"
                  />
                </div>
              </div>
            </div>
          </div>
          <base-input
            v-model="name"
            :label="$t('firstname')"
            error-name="name"
            rules="min:3|max:255"
            type="text"
            :placeholder="$t('nameplaceholder')"
          />
          <base-input
            v-model="email"
            :label="$t('email')"
            error-name="email"
            rules="email"
            type="email"
            :placeholder="$t('emailplaceholder')"
          />
          <base-input
            v-model="password"
            :label="$t('password')"
            error-name="password"
            name="password"
            rules="min:8|max:15"
            type="password"
            placeholder="At least 8 & max.15 lower case characters"
          />
          <base-input
            v-model="password_confirmation"
            :label="$t('confirmpassword')"
            error-name="confirm"
            rules="confirmed:@password"
            type="password"
            placeholder="Confirm password"
          />
          <button
            :disabled="form_submmiting"
            class="flex w-full justify-center mt-4 rounded-md px-4 py-2 bg-[#E31221] text-base font-medium text-white"
          >
            {{
              form_submmiting ? `${$t("pleasewait")}` : `${$t("savechanges")}`
            }}
          </button>
        </FormVee>
      </div>
    </div>
  </Timeline>
</template>

<script>
import Layout from "@/components/dashboard/Layout.vue";
import Timeline from "@/components/dashboard/Timeline.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import axios from "@/config/axios/index";

import { Form as FormVee, Field } from "vee-validate";
import { mapWritableState } from "pinia";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
import SelectFileForProfilePageMixin from "@/mixins/SelectFileForProfilePageMixin";
import { useMovieListStore } from "@/stores/useMovieListStore";

export default {
  components: { Layout, Timeline, FormVee, BaseInput, Field },
  mixins: [SelectFileForProfilePageMixin],

  computed: {
    ...mapWritableState(useUserProfileStore, [
      "email",
      "name",
      "profile_image",
      "form_submmiting",
      "password",
      "password_confirmation",
    ]),
    ...mapWritableState(useMovieListStore, ["backurl"]),
  },
  methods: {
    onSubmitNormalUserParamsChange() {
      this.form_submmiting = true;

      axios
        .put("profile", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          profile_image: this.profile_image,
        })
        .then(() => {
          this.$router.push({
            name: "dashboard-page",
          });
        })
        .finally(() => {
          this.form_submmiting = false;
        });
    },
  },
};
</script>
