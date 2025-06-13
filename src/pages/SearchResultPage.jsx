import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faYenSign,
  faPlane,
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import GlobalContext from '../context/globalContext';
import sortFlights from '../utils/sortFlights';
import getFlights from '../services/getFlights';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartureTrip } from '../stores/departureTripSlice';
import { setReturnTrip } from '../stores/returnTripSlice';
dayjs.extend(duration);

const SearchResultPage = () => {
  // const gctx = useContext(GlobalContext);
  const navi = useNavigate();

  const searchForm = useSelector((state) => state.searchFormReducer.searchForm);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });
  const [pageKey, setPageKey] = useState(1);
  const sortFlag = useRef(1); // 1=出发时间,2=用时,3=到达时间,4=价格

  useEffect(() => {
    if (searchForm.dep === null) {
      navi('/');
      return;
    }

    const fetchData = async () => {
      const response = await getFlights(
        isReturnTrip ? searchForm.des : searchForm.dep,
        isReturnTrip ? searchForm.dep : searchForm.des,
        dayjs(isReturnTrip ? searchForm.rtnDate : searchForm.depDate).format(
          'YYYY-MM-DD'
        )
      );
      if (!response.success) {
        setModalInfo({ title: '错误', message: response.message });
        setShowModal(true);
        return;
      }
      response.data.map((v) => {
        const dep = dayjs(`${v.departure_date} ${v.departure_time}`);
        const des = dayjs(`${v.destination_date} ${v.destination_time}`);
        const dur_ms = des.diff(dep);
        const dur = dayjs.duration(dur_ms);
        v.departure = dep.format('YYYY-MM-DD HH:mm');
        v.destination = des.format('YYYY-MM-DD HH:mm');
        v.stop_over = v.stop_over.split(',').filter((s) => s !== '');
        v.dur_ms = dur_ms;
        v.duration = `${dur.years() > 0 ? dur.years() + '年' : ''}${
          dur.months() > 0 ? dur.months() + '月' : ''
        }${dur.days() > 0 ? dur.days() + '天' : ''}${
          dur.hours() > 0 ? dur.hours() + '小时' : ''
        }${dur.minutes() > 0 ? dur.minutes() + '分' : ''}`;
      });
      sortAndSetFlights(response.data);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  const sortAndSetFlights = (flightArr) => {
    let sortItem = '';
    switch (sortFlag.current) {
      case 4:
        sortItem = 'price';
        break;
      case 3:
        sortItem = 'destination';
        break;
      case 2:
        sortItem = 'dur_ms';
        break;
      case 1:
      default:
        sortItem = 'departure';
        break;
    }
    setFlights(sortFlights(flightArr, sortItem));
  };

  const onCancelClick = (e) => {
    e.preventDefault();
    navi('/');
  };

  const onSortFlights = (sortType) => {
    sortFlag.current = sortType;
    sortAndSetFlights(flights);
  };

  const onBookClick = (flight) => {
    if (isReturnTrip) {
      dispatch(setReturnTrip(flight));
      navi('/booking');
    } else {
      dispatch(setDepartureTrip(flight));
      if (searchForm.isRoundTrip) {
        setIsLoading(true);
        setFlights([]);
        setIsReturnTrip(true);
        setPageKey(pageKey + 1);
      } else {
        navi('/booking');
      }
    }
  };

  const onModalClose = (e) => {
    e.preventDefault();
    setShowModal(false);
    setModalInfo({ title: '', message: '' });
    navi('/');
  };

  return (
    <div key={pageKey}>
      <div className='w-160 my-2'>
        <div className='text-left text-4xl leading-12 text-gray-600'>
          {searchForm.isRoundTrip &&
            (isReturnTrip ? (
              <span className='mr-2'>(返程)</span>
            ) : (
              <span className='mr-2'>(往程)</span>
            ))}
          {isReturnTrip ? searchForm.des : searchForm.dep}
          <FontAwesomeIcon icon={faArrowRightLong} className='ml-2 mr-2' />
          {isReturnTrip ? searchForm.dep : searchForm.des}
        </div>
        <div className='flex flex-row justify-between text-left text-2xl leading-10 text-gray-600'>
          <div>
            <span className='mr-5'>
              {dayjs(
                isReturnTrip ? searchForm.rtnDate : searchForm.depDate
              ).format('YYYY年MM月DD日')}
            </span>
            <span className='mr-1'>{searchForm.pnum}</span>人
          </div>
          <div>
            <Button
              size='sm'
              variant='primary'
              className='me-1'
              onClick={() => onSortFlights(1)}
            >
              最早出发
            </Button>
            <Button
              size='sm'
              variant='primary'
              className='me-1'
              onClick={() => onSortFlights(2)}
            >
              时间最短
            </Button>
            <Button
              size='sm'
              variant='primary'
              className='me-1'
              onClick={() => onSortFlights(3)}
            >
              最早到达
            </Button>
            <Button
              size='sm'
              variant='primary'
              onClick={() => onSortFlights(4)}
            >
              价格最低
            </Button>
          </div>
        </div>
      </div>

      {isLoading &&
        ['1', '2', '3'].map((v) => (
          <Card className='w-160 shadow-md mb-2' key={`key_sr_ph_${v}`}>
            <Card.Body>
              <Placeholder
                as={Card.Title}
                animation='glow'
                className='flex flex-row justify-between'
              >
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Body>
          </Card>
        ))}
      {!isLoading &&
        flights.map((flight) => {
          const key = `key_sr_${flight.flight_id}`;
          const iconPath = `/company_icon/${flight.company_id}.jpg`;
          return (
            <Card
              className='w-160 shadow-md mb-2 flex flex-row items-center'
              key={key}
            >
              <div className='w-145 flex flex-row items-center'>
                <div className='min-w-12 w-12 flex justify-center'>
                  <img src={iconPath} width={'40px'} height={'40px'} />
                </div>
                <div className='w-130 flex flex-col'>
                  <div className='w-130 flex flex-row mt-1'>
                    <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                      <div>{flight.departure_date}</div>
                      <div>{flight.departure_time.substring(0, 5)}</div>
                      <div>
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className='text-gray-400 mr-1'
                        />
                        <span className='text-2xl'>{flight.dep_name}</span>
                      </div>
                    </div>
                    <div className='w-25 flex flex-col items-center text-sm font-bold text-gray-500 leading-6'>
                      <div>{flight.duration}</div>
                      <div className='scale-x-400'>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                      </div>
                      <div>{flight.stop_over.length > 0 ? '经停' : ''}</div>
                    </div>
                    <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                      <div>{flight.destination_date}</div>
                      <div>{flight.destination_time.substring(0, 5)}</div>
                      <div>
                        <FontAwesomeIcon
                          icon={faPlaneArrival}
                          className='text-gray-400 mr-1'
                        />
                        <span className='text-2xl'>{flight.des_name}</span>
                      </div>
                    </div>
                    <div className='w-25 text-red-400 text-2xl font-bold flex items-end justify-end'>
                      <div>
                        <span className='text-base'>
                          <FontAwesomeIcon icon={faYenSign} />
                        </span>
                        {flight.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className='w-130 flex flex-row text-lg font-bold text-gray-600 my-1'>
                    <div className='mr-3'>
                      <FontAwesomeIcon
                        icon={faPlane}
                        className='text-gray-400 mr-1'
                      />
                      {flight.flight_number}
                    </div>
                    <div>{flight.company_name}</div>
                  </div>
                </div>
              </div>
              <div className='w-15 text-center'>
                <Button
                  size='lg'
                  variant='primary'
                  onClick={(e) => {
                    e.preventDefault();
                    onBookClick(flight);
                  }}
                >
                  订
                </Button>
              </div>
            </Card>
          );
        })}
      <div className='flex justify-end mt-3 mr-1'>
        <Button variant='primary' onClick={onCancelClick}>
          取 消
        </Button>
      </div>
      <Modal size='md' show={showModal} backdrop='static' onHide={onModalClose}>
        <Modal.Header className='text-xl font-bold'>
          {modalInfo.title}
        </Modal.Header>
        <Modal.Body>{modalInfo.message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onModalClose}>
            确 定
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchResultPage;
