import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, MenuProps, Spin } from 'antd';
import { getAll, getBoolean } from '@firebase/remote-config';

import { remoteConfig } from 'src/utils/firebase';
import 'antd/dist/antd.css';
import './App.css';
import { fetchAndActivate, Value } from 'firebase/remote-config';

const { Header, Content } = Layout

const commonStyle = {
  margin: 24,
  height: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

function App() {
  const [initialized, setInitialized] = useState(false)
  const [config, setConfig] = useState<Record<string, Value>>({})

  useEffect(() => {
    // const config = firebase.getAll(remoteConfig)
    (async () => {
      await fetchAndActivate(remoteConfig)
      const fetched = getAll(remoteConfig)
      console.log(fetched)
      setConfig(fetched)
      setInitialized(true)
    })()
  }, [])

  const items1: MenuProps['items'] = useMemo(() => ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
  })), []);
  
  if (!initialized) {
    return (
      <div style={{ margin: 16, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin />
      </div>
    )
  }

  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Content>
        {config['FEATURE_1_ENABLED']?.asBoolean() && (
          <div style={{ ...commonStyle, backgroundColor: '#aa2222' }}>Feature 1</div>
        )}
        {config['FEATURE_2_ENABLED']?.asBoolean() && (
          <div style={{ ...commonStyle, backgroundColor: '#22aa22'  }}>Feature 2</div>
        )}
        <div style={{ ...commonStyle, backgroundColor: '#aaaa22'  }}>Core</div>
      </Content>
    </Layout>
  );
}

export default App;
