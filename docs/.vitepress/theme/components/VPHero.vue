<script setup lang="ts">
import { type Ref, inject } from "vue";
import type { DefaultTheme } from "vitepress/theme";
// import VPButton from '../../../../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue'
// import VPImage from '../../../../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue'
import Bilibili from "../icons/bilibili.vue";

export interface HeroAction {
  theme?: "brand" | "alt";
  text: string;
  link: string;
}

defineProps<{
  name?: string;
  text?: string;
  tagline?: string;
  image?: DefaultTheme.ThemeableImage;
  actions?: HeroAction[];
}>();

const heroImageSlotExists = inject("hero-image-slot-exists") as Ref<boolean>;
</script>

<template>
  <div
    class="VPHero pb-5"
    :class="{ 'has-image': image || heroImageSlotExists }"
  >
    <div class="YZContainer relative">
      <div class="main flex flex-col items-center pt-20 gap-3">
        <slot name="home-hero-info">
          <div class="flex gap-2">
            <h1 v-if="name" class="name">
              <span v-html="name" class="clip"></span>
            </h1>
            <p v-if="text" v-html="text" class="text"></p>
          </div>

          <p
            v-if="tagline"
            v-html="tagline"
            class="tagline indent-2 md:indent-0"
          ></p>

          <div
            aria-label="hero bottom"
            class="mt-5 mb-10 z-20 max-w-[1152px] mx-auto"
          >
            <a-space class="container w-full">
              <a-button
                class="font-medium flex justify-center items-center gap-2"
                type="primary"
                shape="round"
                size="large"
                target="__blank"
                href="https://space.bilibili.com/3493138205247599?spm_id_from=..0.0"
              >
                <template #icon>
                  <Bilibili />
                </template>
                关注
              </a-button>
              <a-badge class="dot" dot :offset="[-5, 5]">
                <a-button
                  class="font-medium more"
                  size="large"
                  shape="round"
                  href="/about"
                  >了解作者</a-button
                >
              </a-badge>
            </a-space>
          </div>
          <code class="mt-10 z-20 underline"
            >Talk is cheap. Show me the code.</code
          >
        </slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  z-index: 0;
  -webkit-animation: 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards b;
  animation: 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards b;
  background:
    linear-gradient(-90deg, #6d6d6d25 1px, transparent 0),
    linear-gradient(#6d6d6d25 1px, transparent 0),
    linear-gradient(-90deg, #6d6d6d25 1px, transparent 0),
    linear-gradient(#6d6d6d25 1px, transparent 0),
    linear-gradient(
      transparent 6px,
      transparent 0,
      transparent 156px,
      transparent 0
    ),
    linear-gradient(-90deg, #6d6d6d25 1px, transparent 0),
    linear-gradient(
      -90deg,
      transparent 6px,
      transparent 0,
      transparent 156px,
      transparent 0
    ),
    linear-gradient(#6d6d6d25 1px, transparent 0),
    0 0;
  background-size:
    32px 32px,
    32px 32px,
    256px 256px,
    256px 256px,
    256px 256px,
    256px 256px,
    256px 256px,
    256px 256px;
}
.main:after {
  background: linear-gradient(transparent, var(--vp-background-surface-color));
  content: "";
  inset: 70% 0 0;
  position: absolute;
}

@keyframes b {
  0% {
    background-position: 0 50px;
  }
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.tagline {
  padding: 0 10px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

html[class*="dark"] .dot sup {
  display: none;
}
html[class*="dark"] .more {
  background-color: #202126;
  border: 1px solid transparent;
  transition: all 200ms;
  color: #95959c;
}
html[class*="dark"] .more:hover {
  color: #fff;
  border: 1px solid #4874ee;
}
</style>
