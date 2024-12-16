import { Button } from 'antd';
import { ModalBtn } from '@hbwow/components';

function App() {
  return (
    <>
      <Button
        onClick={() => {
          Modal.confirm({
            title: '确定',
            content: '你确定要删除吗？',
          });
        }}
      >
        Button
      </Button>
      <ModalBtn>modalBtn</ModalBtn>
    </>
  );
}

export default App;
