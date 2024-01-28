<!-- .vitepress/theme/Layout.vue -->

<script lang="ts" setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import { nextTick, provide } from "vue";

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
  <contextHolder />
  <DefaultTheme.Layout> </DefaultTheme.Layout>
</template>

<style>
.home-hero-bg {
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
.home-hero-bg:after {
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
