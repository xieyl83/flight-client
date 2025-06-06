import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Placeholder } from 'react-bootstrap';
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
dayjs.extend(duration);

const SearchResultPage = () => {
  const gctx = useContext(GlobalContext);
  const navi = useNavigate();
  const loc = useLocation();

  const isReturnTrip = loc.state.returnTrip;
  const dep = isReturnTrip ? gctx.searchForm.des : gctx.searchForm.dep;
  const des = isReturnTrip ? gctx.searchForm.dep : gctx.searchForm.des;
  const depDate = isReturnTrip
    ? gctx.searchForm.rtnDate
    : gctx.searchForm.depDate;
  const pnum = gctx.searchForm.pnum;

  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  // const [sortFlag, setSortFlag] = useState(1); // 1=出发时间,2=用时,3=到达时间,4=价格
  const sortFlag = useRef(1); // 1=出发时间,2=用时,3=到达时间,4=价格

  useEffect(() => {
    if (gctx.searchForm.dep === null) {
      navi('/');
      return;
    }

    const fetchData = async () => {
      const response = await getFlights(
        gctx.searchForm.dep,
        gctx.searchForm.des,
        dayjs(gctx.searchForm.depDate).format('YYYY-MM-DD')
      );
      // todo: treat errors
      const arr = response.data;
      arr.map((v) => {
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
      sortAndSetFlights(arr);
      // setFlights(sortFlights(arr, 'departure'));
      setIsLoading(false);
    };
    fetchData();

    // /api/flights
    // setTimeout(() => {
    //   const result = {
    //     success: true,
    //     code: 200,
    //     message: '',
    //     data: {
    //       flights: [
    //         {
    //           flight_id: 1,
    //           flight_number: 'F001',
    //           company_id: 'CA',
    //           departure_airport_id: 1,
    //           destination_airport_id: 2,
    //           departure_date: '2025-07-01',
    //           departure_time: '13:00:00',
    //           destination_date: '2025-07-02',
    //           destination_time: '09:00:00',
    //           stop_over: '',
    //           price: 1234.0,
    //           dep_code: 'bja',
    //           dep_name: '北京A',
    //           dep_city: '北京',
    //           des_code: 'sha',
    //           des_name: '上海A',
    //           des_city: '上海',
    //           name_en: 'Air China Limited',
    //           name_cn: '中国国际航空',
    //         },
    //         {
    //           flight_id: 2,
    //           flight_number: 'F002',
    //           company_id: 'HO',
    //           departure_airport_id: 2,
    //           destination_airport_id: 1,
    //           departure_date: '2025-07-05',
    //           departure_time: '08:00:00',
    //           destination_date: '2025-07-06',
    //           destination_time: '15:00:00',
    //           stop_over: '9,4',
    //           price: 856.0,
    //           dep_code: 'sha',
    //           dep_name: '上海A',
    //           dep_city: '上海',
    //           des_code: 'bja',
    //           des_name: '北京A',
    //           des_city: '北京',
    //           name_en: 'Juneyao Airlines Co., Ltd',
    //           name_cn: '吉祥航空',
    //         },
    //       ],
    //     },
    //   };
    //   const arr = result.data.flights;
    //   arr.map((v) => {
    //     const dep = dayjs(`${v.departure_date} ${v.departure_time}`);
    //     const des = dayjs(`${v.destination_date} ${v.destination_time}`);
    //     const dur_ms = des.diff(dep);
    //     const dur = dayjs.duration(dur_ms);
    //     v.departure = dep.format('YYYY-MM-DD HH:mm');
    //     v.destination = des.format('YYYY-MM-DD HH:mm');
    //     v.stop_over = v.stop_over.split(',').filter((s) => s !== '');
    //     v.dur_ms = dur_ms;
    //     v.duration = `${dur.years() > 0 ? dur.years() + '年' : ''}${
    //       dur.months() > 0 ? dur.months() + '月' : ''
    //     }${dur.days() > 0 ? dur.days() + '天' : ''}${
    //       dur.hours() > 0 ? dur.hours() + '小时' : ''
    //     }${dur.minutes() > 0 ? dur.minutes() + '分' : ''}`;
    //   });
    //   sortAndSetFlights(arr);
    //   // setFlights(sortFlights(arr, 'departure'));
    //   setIsLoading(false);
    // }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onBackClick = (e) => {
    e.preventDefault();
    navi('/');
  };

  const onSortFlights = (sortType) => {
    sortFlag.current = sortType;
    sortAndSetFlights(flights);
  };

  return (
    <>
      <div className='w-160 my-2'>
        <div className='text-left text-4xl leading-12 text-gray-600'>
          {isReturnTrip && <span className='mr-2'>(返程)</span>}
          {dep}
          <FontAwesomeIcon icon={faArrowRightLong} className='ml-2 mr-2' />
          {des}
        </div>
        <div className='flex flex-row justify-between text-left text-2xl leading-10 text-gray-600'>
          <div>
            <span className='mr-5'>
              {dayjs(depDate).format('YYYY年MM月DD日')}
            </span>
            <span className='mr-1'>{pnum}</span>人
          </div>
          <div>
            <Button size='sm' className='me-1' onClick={() => onSortFlights(1)}>
              最早出发
            </Button>
            <Button size='sm' className='me-1' onClick={() => onSortFlights(2)}>
              时间最短
            </Button>
            <Button size='sm' className='me-1' onClick={() => onSortFlights(3)}>
              最早到达
            </Button>
            <Button size='sm' onClick={() => onSortFlights(4)}>
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
        flights.map((flight, idx) => {
          const key = `key_sr_${idx}_${JSON.stringify(flight)}`;
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
                    <div className='w-25 text-red-400 text-3xl font-bold flex items-end justify-end'>
                      <div>
                        <span className='text-base'>
                          <FontAwesomeIcon icon={faYenSign} />
                        </span>
                        {flight.price}
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
                    <div>{flight.name_cn}</div>
                  </div>
                </div>
              </div>
              <div className='w-15 text-center'>
                <Button>订</Button>
              </div>
            </Card>
          );
        })}
      <Button onClick={onBackClick}>back</Button>
    </>
  );
};

export default SearchResultPage;
