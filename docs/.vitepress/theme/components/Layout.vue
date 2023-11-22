<!-- .vitepress/theme/Layout.vue -->

<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import { nextTick, provide } from "vue";
import Bilibili from "./../icons/bilibili.vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <div class="HomeHeroAfter">
        <div class="max-w-[1152px] mx-auto">
          <a-space class="container w-full">
            <a-button
              class="font-medium flex justify-center items-center gap-2"
              type="primary"
              shape="round"
              size="large"
              target="__blank"
              href="https://space.bilibili.com/483711690?spm_id_from=333.1007.0.0"
            >
              <template #icon>
                <Bilibili />
              </template>
              关注
            </a-button>
            <a-badge dot :offset="[-5, 5]">
              <a-button
                class="font-medium"
                size="large"
                shape="round"
                href="/about"
                >了解作者</a-button
              >
            </a-badge>
          </a-space>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.VPHero {
  padding-bottom: 20px !important;
}
@media (min-width: 640px) {
  .HomeHeroAfter {
    padding: 0 48px;
    padding-bottom: 80px;
  }
  .HomeHeroAfter .container {
    justify-content: center;
  }
}
@media (min-width: 960px) {
  .HomeHeroAfter {
    padding: 0 64px;
    padding-bottom: 80px;
  }
  .HomeHeroAfter .container {
    justify-content: left;
  }
}
@media (max-width: 639px) {
  .HomeHeroAfter {
    padding: 0 24px;
    padding-bottom: 80px;
  }
  .HomeHeroAfter .container {
    justify-content: center;
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
