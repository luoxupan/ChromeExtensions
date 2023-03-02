import * as React from "react";
import { createRoot } from "react-dom/client";
import 'antd/dist/antd.less';
import { Options } from './components/index';

createRoot(
  document.body as HTMLElement
).render(
  <Options />
);
