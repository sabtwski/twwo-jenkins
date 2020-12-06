import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Colors from '../../constants/colors';

type Props = { size?: number };
const FullscreenSpinner = ({ size }: Props) => {
  const spinnerSize = size || 128;
  return (
    <Layout className="layout" style={{ width: '100%', backgroundColor: Colors.backgroundColor }}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: spinnerSize,
              position: 'absolute',
              left: '50%',
              marginLeft: -(spinnerSize / 2),
              bottom: '50%',
              // tslint:disable-next-line:max-line-length
              marginBottom: -(spinnerSize / 4), // Exact center is not good because of bar at the top
              color: Colors.primaryColor,
            }}
            spin
          />
        }
      />
    </Layout>
  );
};

export default FullscreenSpinner;
