<template>
  <a-popover placement="top">
    <template #content>
      <div class="max-w-xs">
        {{ props.content }}
      </div>
    </template>
    <template #title>
      <span>{{ props.title }}</span>
    </template>
    <!-- w-2/4 md:w-1/5，因为a-card-grid样式设置权级问题，只能套父级来实现了 -->
    <div class="w-2/4 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <a-card-grid
        style="width: 100%"
        :hoverable="props.link ? true : false"
        :class="['text-center', 'relative', props.link ? 'cursor-pointer' : '']"
      >
        <img
          v-if="props.img"
          :src="props.img"
          :class="[
            'absolute',
            'top-0 left-0',
            props.extend_img_class
              ? props.extend_img_class
              : 'sm:top-[22px] sm:left-[22px]',
          ]"
          :width="props.img_size ? props.img_size : 48"
          alt=""
        />
        <strong
          :class="['select-none', props.title_class, 'pl-4 truncate block']"
          >{{ props.title }}</strong
        >
        <a
          class="absolute w-full h-full left-0 top-0"
          v-if="props.link"
          :href="props.link"
          target="__blank"
        ></a>
      </a-card-grid>
    </div>
  </a-popover>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps([
  "content",
  "title",
  "img",
  "extend_img_class",
  "img_size",
  "link",
  "title_class",
]);
</script>
