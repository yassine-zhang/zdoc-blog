import Layout from "./components/Layout.vue";
// import DefaultTheme from "vitepress/theme-without-fonts";
import {
  Timeline,
  Typography,
  Divider,
  Badge,
  Space,
  Card,
  Popover,
  Button,
} from "ant-design-vue";
import "./custom.css";

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(Timeline);
    app.use(Typography);
    app.use(Divider);
    app.use(Badge);
    app.use(Space);
    app.use(Card);
    app.use(Popover);
    app.use(Button);
  },
};
