import * as React from "react";
import { createRoot } from "react-dom/client";
import 'antd/dist/antd.less';
import { Page } from './page';

createRoot(
  document.body as HTMLElement
).render(
  <Page />
);
