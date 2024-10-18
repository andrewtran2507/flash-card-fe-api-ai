import CardItem from '../../components/card-item/cardItem';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { createCard, getAllCardsByUserName } from '../../services/card.services';

import { isNil } from 'lodash';
import { saveCardData } from '../../redux/cardSlice';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [field, setField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cardDataRedux = useAppSelector((state) => state.card.cardData);
  const userNameRedux = useAppSelector((state) => state.user.user_name);
  const handleLearningPage = () => {
    navigate('/learning');
  };

  const handleCreateCard = () => {
    if (!isNil(userNameRedux)) {
      setIsLoading(true);
      createCard(field, userNameRedux).then(() => handleGetData(userNameRedux));
    }
  };

  const handleGetData = (userName: string | null) => {
    if (!isNil(userName)) {
      setIsLoading(true);
      getAllCardsByUserName(userName).then((res) => {
        dispatch(saveCardData(res.data.responseObject));
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    handleGetData(userNameRedux);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameRedux]);

  return (
    <>
      <div className="dashboard-header">
        <div style={{ width: '20%' }}>
          <Input
            value={field}
            onChange={(e) => setField(e.target.value)}
            size="large"
            placeholder="Please enter word!"
          />
        </div>
        <Button loading={isLoading} size="large" type="primary" onClick={() => handleCreateCard()}>
          Add Card
        </Button>
        <Button loading={isLoading} size="large" onClick={handleLearningPage} variant="outlined" color="danger">
          Study Mode
        </Button>
      </div>
      <div className="dasboard-content">
        <div className="card-list">
          <Row gutter={[16, 16]} className="card-list">
            {cardDataRedux.map((item) => (
              <Col key={item._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <CardItem data={item} handleGetData={handleGetData} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
