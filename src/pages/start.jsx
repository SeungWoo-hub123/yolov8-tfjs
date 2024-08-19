import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/style/start.css"

const Start = () => {
        const navigate = useNavigate();
       
        const navigateToMain = () => {
          navigate("/yolov8-tfjs/main");
        };

    return(
    <div>
        <header>
            <div className="container">
                <nav className="main-navigation">
                    <a>종합설계프로젝트1 4조 MEI</a>
                </nav>
            </div>
        </header>

        <main className="hero-bg">
            <div className="video-wrap">
                <img src="static\images\00.png" alt="배경 이미지"></img>
            </div>
            <div className="container">
                <div className="text-wrap">
                    <h2>어서오세요!<br></br>아래의 시작하기 버튼을 눌러주세요</h2>
                    <div className="btn-wrap">
                        <a id="start-button" className="btn" onClick={navigateToMain}>시작하기</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}

export default Start;