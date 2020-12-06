// ******************************************************
// * ONLY FOR TESTING PURPOSES                          *
// * TO BE DELETED OR KEPT AS A FUTURE REFERENCE        *
// ******************************************************

import React, { useState } from 'react';
import { Button, Alert } from 'antd';

// Applies post-initialization of component
import styles from './css/ant_demo.module.css';
import CSS from 'csstype';

// Applies before during initialization of component
const inFileStyle: CSS.Properties = {
  backgroundColor: 'lightblue',
};

const AntTest: React.FC = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  return (
    <div>
      <Button
        className={styles['test-button']}
        style={inFileStyle}
        onClick={() => setShowMessage(showMessage ? false : true)}
      >
        Click me!
      </Button>
      <Alert style={{ display: showMessage ? 'inherit' : 'none' }} message="Button is ON." />
    </div>
  );
};

export default AntTest;
