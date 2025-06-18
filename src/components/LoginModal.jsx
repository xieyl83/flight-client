import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import validator from 'validator';
import { useGlobalContext } from '../context/globalContext';
import { createUser } from '../services/user';
import postLogin from '../services/login';

const LoginModal = (
  props = {
    show: true,
    onClose: () => {},
    afterLogin: () => {},
    toast: () => {},
    setUserInfo: () => {},
  }
) => {
  const { login } = useGlobalContext();
  const toast = props.toast;

  const [isRegister, setIsRegister] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [valPassword, setValPassword] = useState('');
  const [useridErr, setUseridErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [valPasswordErr, setValPasswordErr] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [country, setCountry] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [processing, setProcessing] = useState(false);

  const clearInputs = () => {
    setUserid('');
    setPassword('');
    setValPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setCountry('');
  };

  const clearErrors = () => {
    setUseridErr('');
    setPasswordErr('');
    setValPasswordErr('');
    setFirstNameErr('');
    setLastNameErr('');
    setPhoneErr('');
    setCountryErr('');
  };

  const onDoLogin = async (e) => {
    e.preventDefault();
    const valid = (() => {
      const f1 = validUserid(userid);
      const f2 = validPassword(password);
      return f1 && f2;
    })();
    if (!valid) {
      toast('请检查各项输入', { type: 'error' });
      return;
    }
    setProcessing(true);
    const response = await postLogin(userid, password);
    if (!response.success) {
      toast(response.message, { type: 'error' });
      setProcessing(false);
      return;
    }
    login({
      token: response.data.token,
      userId: response.data.userId,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      phone: response.data.phone,
      country: response.data.country,
    });
    if (props.setUserInfo) {
      props.setUserInfo({
        userId: response.data.userId,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
        country: response.data.country,
      });
    }
    setProcessing(false);
    props.afterLogin();
  };

  const onGoLogin = (e) => {
    e.preventDefault();
    clearInputs();
    clearErrors();
    setIsRegister(false);
  };

  const onGoRegister = (e) => {
    e.preventDefault();
    clearInputs();
    clearErrors();
    setIsRegister(true);
  };

  const onDoRegister = async (e) => {
    e.preventDefault();
    const valid = (() => {
      const f1 = validUserid(userid);
      const f2 = validPassword(password);
      const f3 = validValPassword(valPassword);
      const f4 = validFirstName(firstName);
      const f5 = validLastName(lastName);
      const f6 = validPhone(phone);
      const f7 = validCountry(country);
      return f1 && f2 && f3 && f4 && f5 && f6 && f7;
    })();
    if (!valid) {
      toast('请检查各项输入', { type: 'error' });
      return;
    }

    setProcessing(true);
    const response = await createUser(
      userid,
      password,
      firstName,
      lastName,
      phone,
      country
    );
    if (!response.success) {
      toast(response.message, { type: 'error' });
    } else {
      toast('账号注册成功，请登陆。', { type: 'success' });
      clearInputs();
      clearErrors();
      setIsRegister(false);
    }
    setProcessing(false);
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

  const validFirstName = (v) => {
    if (v.length > 20) {
      setFirstNameErr('最大可输入20文字');
      return false;
    }
    setFirstNameErr('');
    return true;
  };

  const validLastName = (v) => {
    if (v.length > 20) {
      setLastNameErr('最大可输入20文字');
      return false;
    }
    setLastNameErr('');
    return true;
  };

  const validPhone = (v) => {
    if (v.length > 20) {
      setPhoneErr('最大可输入20文字');
      return false;
    }
    setPhoneErr('');
    return true;
  };

  const validCountry = (v) => {
    if (v.length > 50) {
      setCountryErr('最大可输入50文字');
      return false;
    }
    setCountryErr('');
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

  const onFirstNameInput = (e) => {
    setFirstName(e.target.value);
    if (isRegister) {
      validFirstName(e.target.value);
    }
  };

  const onLastNameInput = (e) => {
    setLastName(e.target.value);
    if (isRegister) {
      validLastName(e.target.value);
    }
  };

  const onPhoneInput = (e) => {
    setPhone(e.target.value);
    if (isRegister) {
      validPhone(e.target.value);
    }
  };

  const onCountryInput = (e) => {
    setCountry(e.target.value);
    if (isRegister) {
      validCountry(e.target.value);
    }
  };

  const onModalClose = (e) => {
    e.preventDefault();
    setIsRegister(false);
    clearInputs();
    clearErrors();
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
              <Form.Label className='font-bold'>账户(邮箱)</Form.Label>
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
              <>
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
                <Form.Group className='mb-3'>
                  <Form.Label className='font-bold'>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={onFirstNameInput}
                    aria-describedby='firstNameText'
                  />
                  <Form.Text id='firstNameText' className='text-red-500!'>
                    {firstNameErr}
                  </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label className='font-bold'>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={onLastNameInput}
                    aria-describedby='lastNameText'
                  />
                  <Form.Text id='lastNameText' className='text-red-500!'>
                    {lastNameErr}
                  </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label className='font-bold'>电话</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='电话号码'
                    value={phone}
                    onChange={onPhoneInput}
                    aria-describedby='phoneText'
                  />
                  <Form.Text id='phoneText' className='text-red-500!'>
                    {phoneErr}
                  </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label className='font-bold'>国别</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='国别'
                    value={country}
                    onChange={onCountryInput}
                    aria-describedby='countryText'
                  />
                  <Form.Text id='countryText' className='text-red-500!'>
                    {countryErr}
                  </Form.Text>
                </Form.Group>
              </>
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
            <Button variant='primary' disabled={processing} onClick={onDoLogin}>
              登 陆
            </Button>
          )}
          {isRegister && (
            <>
              <Button
                variant='primary'
                disabled={processing}
                onClick={onDoRegister}
              >
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
    </>
  );
};

export default LoginModal;
