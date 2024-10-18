import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './learning.css';
import { useAppSelector } from '../../hook/hooks';
const Learning = () => {
  const cardDataRedux = useAppSelector((state) => state.card.cardData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex !== cardDataRedux.length - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardDataRedux.length);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cardDataRedux.length) % cardDataRedux.length);
      setFlipped(false);
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <div className="learning-page">
        <div className="previous-btn">
          <FontAwesomeIcon
            className={`previous ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrevious}
            icon={faAngleLeft}
          />
        </div>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div style={{ width: '50%' }}>
                <img
                  src={`data:image/png;base64,${cardDataRedux[currentIndex].image_base64}`}
                  alt={cardDataRedux[currentIndex].text}
                  className="image"
                />
              </div>
              <div style={{ width: '50%' }}>
                <p style={{ padding: 20 }}>{cardDataRedux[currentIndex].description}</p>
              </div>
            </div>
            <div className="flashcard-back">
              <p className="word">{cardDataRedux[currentIndex].text}</p>
            </div>
          </div>
        </div>
        <div className="next-btn">
          <FontAwesomeIcon
            className={`next ${currentIndex === cardDataRedux.length - 1 ? 'disabled' : ''}`}
            onClick={handleNext}
            icon={faAngleRight}
          />
        </div>
      </div>
      <div className="card-index">
        <p>
          {currentIndex + 1}/{cardDataRedux.length}
        </p>
      </div>
    </>
  );
};

export default Learning;
