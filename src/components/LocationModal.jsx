import { Button, Modal } from 'react-bootstrap';

const cities = [
  '北京',
  '上海',
  '天津',
  '重庆',
  '哈尔滨',
  '长春',
  '沈阳',
  '石家庄',
  '兰州',
  '西宁',
  '西安',
  '郑州',
  '济南',
  '太原',
  '合肥',
  '武汉',
  '长沙',
  '南京',
  '成都',
  '贵阳',
  '昆明',
  '杭州',
  '南昌',
  '广州',
  '福州',
  '台北',
  '海口',
  '乌鲁木齐',
  '呼和浩特',
  '银川',
  '南宁',
  '拉萨',
  '香港',
  '澳门',
];

const LocationModal = (
  props = {
    show: true,
    title: '',
    onLocationSelect: () => {},
    onClose: () => {},
  }
) => {
  const onLocSelect = (loc) => {
    props.onLocationSelect(loc);
  };

  const onModalClose = () => {
    props.onClose();
  };

  return (
    <Modal size='md' show={props.show} backdrop='static' onHide={onModalClose}>
      <Modal.Header className='text-xl font-bold'>{props.title}</Modal.Header>
      <Modal.Body>
        <div className='flex flex-row flex-wrap'>
          {cities.map((city, idx) => {
            return (
              <div
                className='min-w-25/100 text-xl leading-8 text-gray-600 cursor-pointer hover:text-gray-400'
                key={`lm_${idx}_${city}`}
              >
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    onLocSelect(city);
                    onModalClose();
                  }}
                >
                  {city}
                </span>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onModalClose}>
          取 消
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
