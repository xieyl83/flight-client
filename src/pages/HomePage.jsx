import { useContext, useRef, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import flightImage from '../assets/flight_title.jpg';
import LocationModal from '../components/LocationModal';
import LoginModal from '../components/LoginModal';
import HomePageStyles from '../styles/HomePage.module.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import sleep from '../utils/sleep';
import GlobalContext from '../context/globalContext';

const HomePage = () => {
  const gctx = useContext(GlobalContext);
  const navi = useNavigate();

  const flightImageElement = useRef(null);

  const [exchanged, setExchanged] = useState(false);
  const [lmTitle, setLmTitle] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginElementPos, setLoginElementPos] = useState([-999, -999]);
  const [dep, setDep] = useState(gctx.searchForm.dep || '请选择');
  const [des, setDes] = useState(gctx.searchForm.des || '请选择');
  const [isDep, setIsDep] = useState(true);
  const [depDate, setDepDate] = useState(gctx.searchForm.depDate || new Date());
  const [rtnDate, setRtnDate] = useState(gctx.searchForm.rtnDate || new Date());
  const [pnum, setPnum] = useState(gctx.searchForm.pnum || '1');
  const [roundTrip, setRoundTrip] = useState(gctx.searchForm.roundTrip);

  useLayoutEffect(() => {
    const locate = async () => {
      const rect = flightImageElement.current.getBoundingClientRect();
      if (rect.height < 1) {
        await sleep(0.1);
        locate();
      } else {
        setLoginElementPos([rect.height - 50, rect.left + 30]);
      }
    };
    window.addEventListener('resize', locate);
    locate();
    return () => {
      window.removeEventListener('resize', locate);
    };
  }, []);

  const onExchangeClick = (e) => {
    e.preventDefault();
    setExchanged(!exchanged);
  };

  const onDepatureClick = (e) => {
    e.preventDefault();
    setLmTitle(exchanged ? '请选择出发地' : '请选择到达地');
    setIsDep(!exchanged);
    setShowLocation(true);
  };

  const onDestinationClick = (e) => {
    e.preventDefault();
    setLmTitle(exchanged ? '请选择到达地' : '请选择出发地');
    setIsDep(exchanged);
    setShowLocation(true);
  };

  const onLocationSelect = (val) => {
    if (exchanged && isDep) {
      setDes(val);
    } else if (exchanged && !isDep) {
      setDep(val);
    } else if (!exchanged && isDep) {
      setDep(val);
    } else if (!exchanged && !isDep) {
      setDes(val);
    }
  };

  const onLocationClose = () => {
    setShowLocation(false);
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    if (gctx.isLogin) return;
    setShowLogin(true);
  };

  const onLoginClose = () => {
    setShowLogin(false);
  };

  const onPnumSelChange = (e) => {
    e.preventDefault();
    setPnum(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const form = {
      dep: exchanged ? des : dep,
      des: exchanged ? dep : des,
      depDate,
      rtnDate,
      pnum,
      roundTrip,
    };
    gctx.searchForm = form;
    navi('/search', { state: { returnTrip: false } });
  };

  const onRoundTripChange = (val) => {
    setRoundTrip(val);
  };

  return (
    <>
      <div className='relative'>
        <img
          ref={flightImageElement}
          src={flightImage}
          className='w-80/100 m-auto'
        />
        <div
          className='absolute'
          style={{
            top: `${loginElementPos[0]}px`,
            left: `${loginElementPos[1]}px`,
          }}
        >
          {!gctx.isLogin && (
            <Button variant='primary' onClick={onLoginClick}>
              登 陆
            </Button>
          )}
          {gctx.isLogin && (
            <p className='text-white font-bold'>{gctx.userid}</p>
          )}
        </div>
      </div>
      <div className='w-160 border-2 border-solid border-gray-100 rounded-lg shadow-md'>
        <div className='flex flex-row mt-3'>
          <div className='w-42/100 text-center text-base font-bold leading-6 text-gray-500'>
            出发地
          </div>
          <div className='w-16/100 text-center text-base font-bold leading-6 text-gray-500'>
            &nbsp;
          </div>
          <div className='w-42/100 text-center text-base font-bold leading-6 text-gray-500'>
            到达地
          </div>
        </div>
        <div
          className={`flex ${exchanged ? 'flex-row-reverse' : 'flex-row'} ${
            HomePageStyles['exchange-pos']
          } `}
        >
          <div
            onClick={onDepatureClick}
            className='w-42/100 text-center text-6xl leading-16 text-gray-600 hover:text-gray-400 cursor-pointer'
          >
            {dep}
          </div>
          <div className='w-16/100 text-center text-4xl leading-16 text-gray-600 hover:text-gray-400'>
            <FontAwesomeIcon
              icon={faRefresh}
              className='cursor-pointer'
              onClick={onExchangeClick}
            />
          </div>
          <div
            onClick={onDestinationClick}
            className='w-42/100 text-center text-6xl leading-16 text-gray-600 hover:text-gray-400 cursor-pointer'
          >
            {des}
          </div>
        </div>
        <div className='flex flex-row mt-3 ml-12 text-3xl text-gray-600'>
          <div>行程：</div>
          <ToggleButtonGroup
            name='rtradio'
            type='radio'
            onChange={onRoundTripChange}
            defaultValue={roundTrip}
          >
            <ToggleButton id='tbg-radio-1' value={1}>
              单程
            </ToggleButton>
            <ToggleButton id='tbg-radio-2' value={2}>
              往返
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='flex flex-row mt-3 ml-12 text-3xl text-gray-600'>
          <div>出发日：</div>
          <div>
            <DatePicker
              format='yyyy-MM-dd'
              onChange={setDepDate}
              value={depDate}
              clearIcon={null}
              calendarIcon={
                <FontAwesomeIcon
                  className='mx-2'
                  icon={faCalendarAlt}
                  size='sm'
                />
              }
            />
          </div>
        </div>
        {roundTrip === 2 && (
          <div className='flex flex-row mt-3 ml-12 text-3xl text-gray-600'>
            <div>返程日：</div>
            <div>
              <DatePicker
                format='yyyy-MM-dd'
                onChange={setRtnDate}
                value={rtnDate}
                clearIcon={null}
                calendarIcon={
                  <FontAwesomeIcon
                    className='mx-2'
                    icon={faCalendarAlt}
                    size='sm'
                  />
                }
              />
            </div>
          </div>
        )}
        <div className='flex flex-row mt-3 ml-12 text-3xl text-gray-600'>
          <div>乘客数：</div>
          <div>
            <Form.Select
              aria-label='乘客数'
              value={pnum}
              onChange={onPnumSelChange}
            >
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <option value={num} key={`key_hp_sel_${num}`}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className='mt-3 ml-12 text-3xl'>
          <Button
            variant='primary'
            size='lg'
            onClick={onSearch}
            className='mb-3'
          >
            搜 索
          </Button>
        </div>
      </div>
      <LocationModal
        show={showLocation}
        title={lmTitle}
        onLocationSelect={onLocationSelect}
        onClose={onLocationClose}
      />
      <LoginModal show={showLogin} onClose={onLoginClose} />
    </>
  );
};

export default HomePage;
