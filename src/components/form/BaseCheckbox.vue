<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        name="remember"
        type="checkbox"
        v-bind="$attrs"
        :checked="modelValue"
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm">
      <span class="text-white">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>
