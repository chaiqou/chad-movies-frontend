<template>
  <div class="md:w-[600px] w-[90vw]">
    <Field
      v-bind="$attrs"
      :name="errorName"
      :placeholder="placeholder"
      class="bg-[#11101A] w-full rounded-md p-30 inline-block md:w-full py-2 px-4 placeholder-white text-white"
      type="text"
    />
    <p class="mt-2 text-sm text-red-500">
      <ErrorMessage :name="errorName" />
    </p>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  components: { Field, ErrorMessage },
  props: {
    errorName: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
