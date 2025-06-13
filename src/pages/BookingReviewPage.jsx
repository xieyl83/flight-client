import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faYenSign,
  faPlane,
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
// import GlobalContext from '../context/globalContext';
import { useSelector } from 'react-redux';
import bookFlights from '../services/bookFlights';

const BookingReviewPage = () => {
  // const gctx = useContext(GlobalContext);
  const navi = useNavigate();

  const searchForm = useSelector((state) => state.searchFormReducer.searchForm);
  const departureTrip = useSelector(
    (state) => state.departureTripReducer.departureTrip
  );
  const returnTrip = useSelector((state) => state.returnTripReducer.returnTrip);

  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    message: '',
    isError: false,
  });

  const onBookClick = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const response = await toast.promise(
      bookFlights(searchForm, departureTrip, returnTrip),
      { pending: '机票预定中，请稍候...' }
    );
    if (response.success) {
      // console.log(response.data);
      setModalInfo({
        isError: false,
        title: '已完成订票',
        message: '已完成订票。订票信息可在"我的订票信息"中查看',
      });
      setShowModal(true);
    } else {
      toast(response.message, { type: 'error' });
    }
    setProcessing(false);
  };

  const onCancelClick = (e) => {
    e.preventDefault();
    navi('/');
  };

  const onBackToTop = (e) => {
    e.preventDefault();
    navi('/');
  };

  const onGoMyBookings = (e) => {
    e.preventDefault();
    navi('/mybookings');
  };

  return (
    <div className='w-160'>
      <div className='flex flex-col text-left leading-12 text-gray-600 mb-3'>
        <span className='text-2xl'>请确认订票信息</span>
        <span className='text-3xl'>
          {searchForm.isRoundTrip && '(往返)'}
          {searchForm.dep}
          <FontAwesomeIcon icon={faArrowRightLong} className='ml-2 mr-2' />
          {searchForm.des}
          <span className='text-2xl ml-5'>{searchForm.pnum}&nbsp;人</span>
        </span>
      </div>
      <Card className='w-160 shadow-md mb-2 flex flex-row items-center'>
        <div className='w-145 flex flex-row items-center'>
          <div className='min-w-12 w-12 flex justify-center'>
            <img
              src={`/company_icon/${departureTrip.company_id}.jpg`}
              width={'40px'}
              height={'40px'}
            />
          </div>
          <div className='w-130 flex flex-col'>
            <div className='w-130 flex flex-row mt-1'>
              <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                <div>{departureTrip.departure_date}</div>
                <div>{departureTrip.departure_time.substring(0, 5)}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    className='text-gray-400 mr-1'
                  />
                  <span className='text-2xl'>{departureTrip.dep_name}</span>
                </div>
              </div>
              <div className='w-25 flex flex-col items-center text-sm font-bold text-gray-500 leading-6'>
                <div>{departureTrip.duration}</div>
                <div className='scale-x-400'>
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
                <div>{departureTrip.stop_over.length > 0 ? '经停' : ''}</div>
              </div>
              <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                <div>{departureTrip.destination_date}</div>
                <div>{departureTrip.destination_time.substring(0, 5)}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faPlaneArrival}
                    className='text-gray-400 mr-1'
                  />
                  <span className='text-2xl'>{departureTrip.des_name}</span>
                </div>
              </div>
              <div className='w-25 text-red-400 text-2xl font-bold flex items-end justify-end'>
                <div>
                  <span className='text-base'>
                    <FontAwesomeIcon icon={faYenSign} />
                  </span>
                  {departureTrip.price.toFixed(2)}
                </div>
              </div>
            </div>
            <div className='w-130 flex flex-row text-lg font-bold text-gray-600 my-1'>
              <div className='mr-3'>
                <FontAwesomeIcon
                  icon={faPlane}
                  className='text-gray-400 mr-1'
                />
                {departureTrip.flight_number}
              </div>
              <div>{departureTrip.company_name}</div>
            </div>
          </div>
        </div>
      </Card>
      {searchForm.isRoundTrip && (
        <Card className='w-160 shadow-md mb-2 flex flex-row items-center'>
          <div className='w-145 flex flex-row items-center'>
            <div className='min-w-12 w-12 flex justify-center'>
              <img
                src={`/company_icon/${returnTrip.company_id}.jpg`}
                width={'40px'}
                height={'40px'}
              />
            </div>
            <div className='w-130 flex flex-col'>
              <div className='w-130 flex flex-row mt-1'>
                <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                  <div>{returnTrip.departure_date}</div>
                  <div>{returnTrip.departure_time.substring(0, 5)}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faPlaneDeparture}
                      className='text-gray-400 mr-1'
                    />
                    <span className='text-2xl'>{returnTrip.dep_name}</span>
                  </div>
                </div>
                <div className='w-25 flex flex-col items-center text-sm font-bold text-gray-500 leading-6'>
                  <div>{returnTrip.duration}</div>
                  <div className='scale-x-400'>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </div>
                  <div>{returnTrip.stop_over.length > 0 ? '经停' : ''}</div>
                </div>
                <div className='w-25 flex flex-col items-center font-bold text-gray-600'>
                  <div>{returnTrip.destination_date}</div>
                  <div>{returnTrip.destination_time.substring(0, 5)}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faPlaneArrival}
                      className='text-gray-400 mr-1'
                    />
                    <span className='text-2xl'>{returnTrip.des_name}</span>
                  </div>
                </div>
                <div className='w-25 text-red-400 text-2xl font-bold flex items-end justify-end'>
                  <div>
                    <span className='text-base'>
                      <FontAwesomeIcon icon={faYenSign} />
                    </span>
                    {returnTrip.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className='w-130 flex flex-row text-lg font-bold text-gray-600 my-1'>
                <div className='mr-3'>
                  <FontAwesomeIcon
                    icon={faPlane}
                    className='text-gray-400 mr-1'
                  />
                  {returnTrip.flight_number}
                </div>
                <div>{returnTrip.company_name}</div>
              </div>
            </div>
          </div>
        </Card>
      )}
      <div className='flex flex-row items-end justify-end'>
        <span className='text-gray-500 text-lg font-bold mr-3'>合计金额</span>
        <span className='text-red-400 text-base font-bold'>
          <FontAwesomeIcon icon={faYenSign} />
        </span>
        <span className='text-2xl text-red-400 text-2xl font-bold'>
          {(searchForm.isRoundTrip
            ? (departureTrip.price + returnTrip.price) * searchForm.pnum
            : departureTrip.price * searchForm.pnum
          ).toFixed(2)}
        </span>
      </div>
      <div className='flex flex-row items-end justify-end'>
        <Button
          variant='primary'
          className='me-2'
          disabled={processing}
          onClick={onBookClick}
        >
          订票
        </Button>
        <Button variant='primary' disabled={processing} onClick={onCancelClick}>
          取消
        </Button>
      </div>
      <Modal size='md' show={showModal} backdrop='static' onHide={onBackToTop}>
        <Modal.Header className='text-xl font-bold'>
          {modalInfo.title}
        </Modal.Header>
        <Modal.Body>{modalInfo.message}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={onBackToTop}>
            回到首页
          </Button>
          <Button variant='primary' onClick={onGoMyBookings}>
            我的订票信息
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' />
    </div>
  );
};

export default BookingReviewPage;
