import * as React from "react";
import 'antd/dist/antd.less';
import './page.less';
import { MapRemote, Proxy } from './components/index';

export function Page(props: any) {
  return (
    <div className="page">
      <MapRemote />
      <hr/>
      <Proxy />
    </div>
  );
}
