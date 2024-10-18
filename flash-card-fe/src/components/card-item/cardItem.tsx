import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import { deleteCard, updateCard } from '../../services/card.services';
import { useAppSelector } from '../../hook/hooks';
import { isNil } from 'lodash';
import './cardItem.css';

type propsType = {
  data: {
    _id: string;
    text: string;
    description: string;
  };
  handleGetData: (username: string | null) => void;
};

const CardItem = ({ data, handleGetData }: propsType) => {
  const userNameRedux = useAppSelector((state) => state.user.user_name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [term, setTerm] = useState(data.text);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      if (!isNil(userNameRedux)) await updateCard(term, userNameRedux, data._id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      handleGetData(userNameRedux);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    showModal();
  };

  const handleDelete = async () => {
    try {
      await deleteCard(data._id);
    } catch (error) {
      console.error(error);
    } finally {
      handleGetData(userNameRedux);
    }
  };

  const content = (
    <div>
      <p onClick={handleEdit} className="popover-option">
        Edit
      </p>
      <p onClick={handleDelete} className="popover-option">
        Delete
      </p>
    </div>
  );

  return (
    <div className="card-container">
      <div className="card-content">
        <p className="word">{data.text}</p>
        <p className="des">{data.description}</p>
      </div>

      <Popover content={content}>
        <FontAwesomeIcon className="icon-detail" icon={faBars} />
      </Popover>

      <Modal
        destroyOnClose
        title="Edit Card"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
      >
        <div>
          <label htmlFor="term">Term:</label>
          <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
};

export default CardItem;
