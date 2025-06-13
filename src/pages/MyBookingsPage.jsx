import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Placeholder, Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import getMyBookings from '../services/getMyBookings';

const MyBookingsPage = () => {
  // const gctx = useContext(GlobalContext);
  const navi = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyBookings(1, 100, '', 'asc');
      if (!response.success) {
        setModalInfo({ title: '错误', message: response.message });
        setShowModal(true);
        return;
      }
      setBookings(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onBackToTop = (e) => {
    e.preventDefault();
    navi('/');
  };

  const onModalClose = (e) => {
    e.preventDefault();
    setShowModal(false);
    setModalInfo({ title: '', message: '' });
    navi('/');
  };

  return (
    <div className='w-160'>
      <div className='text-2xl text-left leading-12 text-gray-600'>
        我的订票信息
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>订票时间</th>
            <th>航班</th>
            <th>出发</th>
            <th>到达</th>
            <th>票价</th>
            <th>总价</th>
          </tr>
        </thead>
        {isLoading && (
          <tbody>
            {['1', '2', '3'].map((v) => (
              <tr key={`mybookingspage_ph_${v}}`}>
                <td colSpan={6}>
                  <div className='w-full size-12'>
                    <Placeholder as='span' animation='glow'>
                      <Placeholder xs={12} />
                    </Placeholder>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {!isLoading && (
          <tbody>
            {bookings.map((booking) => (
              <tr key={`mybookings_${booking.booking_id}`}>
                <td>
                  <div className='flex flex-col'>
                    <div>
                      {dayjs(booking.booking_time).format('YYYY-MM-DD')}
                    </div>
                    <div>{dayjs(booking.booking_time).format('HH:mm:ss')}</div>
                  </div>
                </td>
                <td>
                  <div className='flex flex-col'>
                    <div>{booking.flight_number}</div>
                    <div>{booking.company_name}</div>
                  </div>
                </td>
                <td>
                  <div className='flex flex-col'>
                    <div>
                      ({booking.dep_city}) {booking.dep_name}
                    </div>
                    <div>
                      {dayjs(
                        `${booking.departure_date} ${booking.departure_time}`
                      ).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='flex flex-col'>
                    <div>
                      ({booking.des_city}) {booking.des_name}
                    </div>
                    <div>
                      {dayjs(
                        `${booking.destination_date} ${booking.destination_time}`
                      ).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </div>
                </td>
                <td>{booking.price}</td>
                <td>{booking.total_price}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <div className='flex flex-row items-end justify-end'>
        <Button variant='primary' onClick={onBackToTop}>
          回到首页
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

export default MyBookingsPage;
