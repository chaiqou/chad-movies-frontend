<template>
  <div class="bg-[#11101A] rounded-lg md:w-2/3 mt-6 overflow-hidden">
    <div class="flex flex-col p-4">
      <div class="flex items-center">
        <div class="w-10">
          <img
            v-if="quotedata.user.profile_image"
            :src="backurl + quotedata.user.profile_image"
            alt="user profile"
            class="w-10 h-10 mr-2 object-cover rounded-full"
          />
          <img
            v-else
            src="@/assets/images/vue-profile.jpg"
            alt="vue profile photo"
            class="w-10 h-10 mr-2 object-cover rounded-full"
          />
        </div>
        <div class="ml-6">
          <div class="text-sm text-white font-bold">
            {{ quotedata.user.name }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <p v-if="language === 'english'" class="text-white font-bold text-sm">
          "{{ quotedata.quote.quote.en }}"
          <span class="text-[#DDCCAA]">{{ quotedata.movie.title.en }}</span>
        </p>
        <p v-else class="text-white font-bold text-sm">
          "{{ quotedata.quote.quote.ka }}"
          <span class="text-[#DDCCAA]">{{ quotedata.movie.title.ka }}</span>
        </p>
      </div>
    </div>
    <div class="w-full p-4">
      <img
        :src="backurl + quotedata.thumbnail"
        alt="post image"
        class="w-full rounded-md"
      />
    </div>
    <div class="flex border-1 border-green-500 m-4 space-x-4">
      <button
        class="flex justify-center py-2"
        @click="commentToggle = !commentToggle"
      >
        <p class="mr-2 text-white font-bold">{{ quotedata.comments_count }}</p>
        <IconDashboardComment />
      </button>
      <button class="flex justify-center py-2 rounded-lg" @click="likePost">
        <p class="mr-2 text-white font-bold">{{ likeCount }}</p>
        <IconDashboardHearth :fill="likedPost ? 'red' : 'white'" />
      </button>
    </div>
    <div v-if="commentToggle" class="border-t border-gray-700 p-4 pt-2">
      <div
        v-for="comment in quotedata.comments"
        :key="comment.id"
        class="flex my-4 items-center"
      >
        <div class="w-10">
          <img
            v-if="quotedata.user.profile_image"
            :src="backurl + quotedata.user.profile_image"
            alt="profile"
            class="w-10 h-10 mr-2 mb-10 object-cover rounded-full"
          />
          <img
            v-else
            src="@/assets/images/vue-profile.jpg"
            alt="vue profile photo"
            class="w-10 h-10 mr-2 mb-10 object-cover rounded-full"
          />
        </div>
        <div class="ml-4 flex-1">
          <div class="bg-[#11101A] rounded-lg p-2 text-sm">
            <p class="mb-2 font-bold text-white">
              {{ comment.commentBy }}
            </p>
            <p class="inline text-white">{{ comment.body }}</p>
          </div>
          <div class="border-b border-gray-700 p-4 pt-2"></div>
        </div>
      </div>

      <div class="flex">
        <textarea
          v-model="commentBody"
          type="text"
          name="comment"
          class="w-full pl-4 h-12 border-none text-white focus:outline-none rounded-lg bg-[#24222F] placeholder-[#CED4DA]"
          placeholder="Write a comment"
          @keypress.enter="addComment"
        />
        <input type="submit" hidden />
      </div>
    </div>
  </div>
</template>

<script>
import IconDashboardComment from "@/components/icons/IconDashboardComment.vue";
import IconDashboardHearth from "@/components/icons/IconDashboardHearth.vue";

import { mapWritableState } from "pinia";
import { useMovieListStore } from "@/stores/useMovieListStore";
import { useNotificationsStore } from "@/stores/useNotificationsStore";
import { useLanguageSwitchStore } from "@/stores/useLanguageSwitchStore";

import LikeAndUnlikeMixin from "@/mixins/LikeAndUnlikeMixin";
import ListenToCommentAndLikeMixin from "@/mixins/ListenToCommentAndLikeMixin";
import AddCommentToPostMixin from "@/mixins/AddCommentToPostMixin";

export default {
  components: { IconDashboardComment, IconDashboardHearth },

  mixins: [
    LikeAndUnlikeMixin,
    ListenToCommentAndLikeMixin,
    AddCommentToPostMixin,
  ],

  props: {
    quotedata: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      commentToggle: false,
      commentBody: "",
    };
  },

  computed: {
    ...mapWritableState(useMovieListStore, ["backurl"]),
    ...mapWritableState(useLanguageSwitchStore, ["language"]),
    ...mapWritableState(useNotificationsStore, [
      "read",
      "unread",
      "unreadCount",
    ]),
  },
};
</script>
