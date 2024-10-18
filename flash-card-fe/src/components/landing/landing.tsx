import { useNavigate } from 'react-router-dom';
import './landing.css';
import { Button } from 'antd';
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="landing-container">
        <div className="hero-content">
          <h1>Easily create, study and share flash cards.</h1>
          <p>
            Join for free to start your learning journey today, or browse through our collection of public flashcards to
            find engaging content that suits your educational needs.
          </p>
          <div className="buttons">
            <Button
              type="primary"
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
        <div className="card-icon">
          <img alt="generic" className="study-image" src="/image/study.jpg"></img>
        </div>
      </div>
    </>
  );
};

export default Landing;
