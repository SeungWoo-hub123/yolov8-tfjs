import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "/src/components/loader";
import ButtonHandler from "/src/components/btn-handler";
import { detect, detectVideo } from "/src/utils/detect";
import "/src/style/main.css";
import { calculate } from "/src/utils/renderBox";
import "/src/style/table.css";

const Main = () => {

  let results = [];

  // 개수 처음 값 설정
  const [bong, setBong] = useState({ num: 0 });
  const [bongs, setBongs] = useState({ num: 0 });
  const [melon, setMelon] = useState({ num: 0 });
  const [melons, setMelons] = useState({ num: 0 });
  const [ppa, setPpa] = useState({ num: 0 });
  const [ppas, setPpas] = useState({ num: 0 });
  const [ssul, setSsul] = useState({ num: 0 });
  const [ssuls, setSsuls] = useState({ num: 0 });
  const [world, setWorld] = useState({ num: 0 });
  const [worlds, setWorlds] = useState({ num: 0 });
  const [total, setTotal] = useState({ num: 0 });
  const [totals, setTotals] = useState({ num: 0 });

  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // 종류별 개수 값 업데이트
  const calAll = () => {
    results = calculate();
    setBong({num: results[0]});
    setBongs({num: results[0]*1800});
    setMelon({num: results[1]});
    setMelons({num: results[1]*600});
    setPpa({num: results[2]});
    setPpas({num: results[2]*800});
    setSsul({num: results[3]});
    setSsuls({num: results[3]*1800});
    setWorld({num: results[4]});
    setWorlds({num: results[4]*1600});
    setTotal({num: results[0]+results[1]+results[2]+results[3]+results[4]});
    setTotals({num: results[0]*1800+results[1]*600+results[2]*800+results[3]*1800+results[4]*1600});
  };

  const setZero = () => {
    setBong({num: 0});
    setBongs({num: 0});
    setMelon({num: 0});
    setMelons({num: 0});
    setPpa({num: 0});
    setPpas({num: 0});
    setSsul({num: 0});
    setSsuls({num: 0});
    setWorld({num: 0});
    setWorlds({num: 0});
    setTotal({num: 0});
    setTotals({num: 0});

  };


  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "best_v2";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);

  return (
    <div className="App">
      {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}
      <div className="header">
        <h1>📷 YOLOv8를 활용한 아이스크림 계산시스템 </h1>
        <p>
          powered by <code>tensorflow.js</code>
        </p>
        <p>
          Serving : <code className="code">{modelName}</code>
        </p>
      </div>

      <div className="content">
        <img
          src="#"
          ref={imageRef}
          onLoad={() => detect(imageRef.current, model, canvasRef.current)}
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current)}
        />
        <video
          autoPlay
          muted
          ref={videoRef}
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
        />
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>

      <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} />
   
      <div name="orderform" id="orderform" className="orderform">
            <div className="basketdiv" id="basket">
                <div className="row head">
                    <div className="subdiv">
                        <div className="img">이미지</div>
                        <div className="pname">상품명</div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">가격</div>
                        <div className="num">수량</div>
                        <div className="sum">합계</div>
                    </div>
                    <div className="subdiv">
    

                    </div>
                    <div className="split"></div>
                </div>
        


                <div className="row data">
                    <div className="subdiv">
                        <div className="img"><img src="static\images\붕어싸만코.jpg" width="60"></img></div>
                        <div className="pname">
                            <span>붕어싸만코</span>
                        </div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">1800원</div>
                        <div className="num">
                            <div className="updown">
                                <span className="p_num">{bong.num}</span>
                            </div>
                        </div>
                        <div className="sum"><span>{bongs.num}원</span></div>
                    </div>
                    <div className="subdiv">
                    </div>
                </div>



                <div className="row data">
                    <div className="subdiv">
                        <div className="img"><img src="static\images\메로나.jpg" width="60"></img></div>
                        <div className="pname">
                            <span>메로나</span>
                        </div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">600원</div>
                        <div className="num">
                            <div className="updown">
                              <span className="p_num">{melon.num}</span>                            </div>
                        </div>
                        <div className="sum"><span>{melons.num}원</span></div>
                    </div>
                    <div className="subdiv">
                    </div>
                </div>




                <div className="row data">
                    <div className="subdiv">
                        <div className="img"><img src="static\images\빠삐코.jpg" width="60"></img></div>
                        <div className="pname">
                            <span>빠삐코</span>
                        </div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">800원</div>
                        <div className="num">
                            <div className="updown">
                              <span className="p_num">{ppa.num}</span>                            
                              </div>
                        </div>
                        <div className="sum"><span>{ppas.num}원</span></div>
                    </div>
                    <div className="subdiv">
                    </div>
                </div>





                <div className="row data">
                    <div className="subdiv">
                        <div className="img"><img src="static\images\설레임.gif" width="60"></img></div>
                        <div className="pname">
                            <span>설레임</span>
                        </div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">1,800원</div>
                        <div className="num">
                            <div className="updown">
                              <span className="p_num">{ssul.num}</span>                            
                              </div>
                        </div>
                        <div className="sum"><span>{ssuls.num}원</span></div>
                    </div>
                    <div className="subdiv">
                    </div>
                </div>




                <div className="row data">
                    <div className="subdiv">
                        <div className="img"><img src="static\images\월드콘.png" width="60"></img></div>
                        <div className="pname">
                            <span>월드콘</span>
                        </div>
                    </div>
                    <div className="subdiv">
                        <div className="basketprice">1,600원</div>
                        <div className="num">
                            <div className="updown">
                              <span className="p_num">{world.num}</span>                            
                              </div>
                        </div>
                        <div className="sum"><span>{worlds.num}원</span></div>
                    </div>
                    <div className="subdiv">
                    </div>
                </div>
            </div>
        </div>


            <div className="basketrowcmd">
                <button className="abutton" onClick={calAll}>계산하기</button>
                  <br></br>
                <button className="abutton" onClick={setZero}>계산초기화</button>
            </div>
    
              <div className="bigtext sumcount"><span>상품갯수: {total.num}개</span></div>
              <div className="bigtext box blue summoney"><span>합계금액: {totals.num}원</span></div>
    
            <div className="buttongroup center-align cmd">
              <a>상품 결제</a>
            </div>
            
        </div>
    
    

  );
};

export default Main;
