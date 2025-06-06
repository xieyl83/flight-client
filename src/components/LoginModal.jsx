import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';

const LoginModal = (props = { show: true, onClose: () => {} }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [valPassword, setValPassword] = useState('');
  const [useridErr, setUseridErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [valPasswordErr, setValPasswordErr] = useState('');

  const onDoLogin = (e) => {
    e.preventDefault();
    const valid = (() => {
      const f1 = validUserid(userid);
      const f2 = validPassword(password);
      return f1 && f2;
    })();
    if (!valid) {
      toast('请检查各项输入', { position: 'top-center', type: 'error' });
      return;
    }
    // do login
  };

  const onGoLogin = (e) => {
    setIsRegister(false);
    e.preventDefault();
  };
  const onGoRegister = (e) => {
    setIsRegister(true);
    e.preventDefault();
  };

  const onDoRegister = (e) => {
    e.preventDefault();
    const valid = (() => {
      const f1 = validUserid(userid);
      const f2 = validPassword(password);
      const f3 = validValPassword(valPassword);
      return f1 && f2 && f3;
    })();
    if (!valid) {
      toast('请检查各项输入', { position: 'top-center', type: 'error' });
      return;
    }
    // do register
  };

  const validUserid = (v) => {
    if (!v || v.trim() === '') {
      setUseridErr('请输入你的账户');
      return false;
    }
    if (!validator.isEmail(v.trim())) {
      setUseridErr('账户应为邮箱格式');
      return false;
    }
    setUseridErr('');
    return true;
  };

  const validPassword = (v) => {
    if (!v || v === '') {
      setPasswordErr('请输入你的密码');
      return false;
    }
    if (isRegister) {
      if (v.length < 8) {
        setPasswordErr('密码长度需至少8位');
        return false;
      }
      if (
        !validator.isStrongPassword(v.toLowerCase(), {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false,
          pointsPerUnique: 0,
          pointsPerRepeat: 0,
          pointsForContainingLower: 0,
          pointsForContainingUpper: 0,
          pointsForContainingNumber: 0,
          pointsForContainingSymbol: 0,
        })
      ) {
        setPasswordErr('密码必须包含至少一个字母和一个数字');
        return false;
      }
    }
    setPasswordErr('');
    return true;
  };

  const validValPassword = (v) => {
    if (v !== password) {
      setValPasswordErr('两次密码不一致');
      return false;
    }
    setValPasswordErr('');
    return true;
  };

  const onUseridInput = (e) => {
    setUserid(e.target.value);
    validUserid(e.target.value);
  };

  const onPasswordInput = (e) => {
    setPassword(e.target.value);
    validPassword(e.target.value);
  };

  const onValPasswordInput = (e) => {
    setValPassword(e.target.value);
    if (isRegister) {
      validValPassword(e.target.value);
    }
  };

  const onModalClose = (e) => {
    e.preventDefault();
    setIsRegister(false);
    setUserid('');
    setPassword('');
    setValPassword('');
    setUseridErr('');
    setPasswordErr('');
    setValPasswordErr('');
    props.onClose();
  };

  return (
    <>
      <Modal
        size='md'
        show={props.show}
        backdrop='static'
        onHide={onModalClose}
      >
        <Modal.Header className='text-xl font-bold'>登陆</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label className='font-bold'>账户</Form.Label>
              <Form.Control
                type='email'
                placeholder='请输入你的账户'
                value={userid}
                onChange={onUseridInput}
                aria-describedby='useridText'
              />
              <Form.Text id='useridText' className='text-red-500!'>
                {useridErr}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='font-bold'>密码</Form.Label>
              <Form.Control
                type='password'
                placeholder='请输入你的账户密码'
                value={password}
                onChange={onPasswordInput}
                aria-describedby='passwordText'
              />
              <Form.Text id='passwordText' className='text-red-500!'>
                {passwordErr}
              </Form.Text>
            </Form.Group>
            {isRegister && (
              <Form.Group className='mb-3'>
                <Form.Label className='font-bold'>验证密码</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='请再次输入账户密码'
                  value={valPassword}
                  onChange={onValPasswordInput}
                  aria-describedby='valPasswordText'
                />
                <Form.Text id='valPasswordText' className='text-red-500!'>
                  {valPasswordErr}
                </Form.Text>
              </Form.Group>
            )}
          </Form>
          {!isRegister && (
            <div className='whitespace-nowrap text-end'>
              没有账户?
              <Button variant='link' onClick={onGoRegister}>
                点我注册
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isRegister && (
            <Button variant='primary' onClick={onDoLogin}>
              登 陆
            </Button>
          )}
          {isRegister && (
            <>
              <Button variant='primary' onClick={onDoRegister}>
                注 册
              </Button>
              <Button variant='secondary' onClick={onGoLogin}>
                返 回
              </Button>
            </>
          )}
          <Button variant='secondary' onClick={onModalClose}>
            取 消
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default LoginModal;
