import styles from '../../styles/main/Character.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ExpHistory from './ExpHistory';
import FoodRecommend from './FoodRecommend';
import Frame from '../../assets/images/main/Frame.svg';
import Frame2 from '../../assets/images/main/Frame2.svg';
import panda from '../../assets/images/main/panda.png';
import carbon from '../../assets/images/main/carbon.svg';
import protein from '../../assets/images/main/protein.svg';
import fat from '../../assets/images/main/fat.svg';
import API from '../../services/main/URL';
import { useSelector } from 'react-redux';
import BodyinfoModify from './BodyinfoModify';

function Character() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [mainUserData, setMainUserData] = useState(null);
  const userCode = useSelector((state) => {
    return state.userCode;
  });
  useEffect(() => {
    axios
      .get(`${API.USER_GET}${userCode}`)
      .then((response) => {
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setMainUserData(response.data);
      })
      .catch((error) => {
        console.error('메인 데이터를 불러오는 중 에러 발생:', error);
      });
  }, []);
  useEffect(() => {
    console.log(1234);
  }, [weight, height]);

  const maxGrowthExp = 200;
  const calculateCircumference = (radius) => 2 * Math.PI * radius;

  const radius = 150; // 반지름 설정
  const circumference = calculateCircumference(radius);

  return (
    <div className={styles.wrapper}>
      {mainUserData && (
        <div>
          <p className={styles.nicknameText}>{mainUserData.nickname}</p>
          {/* <p>{mainUserData.ranking}등</p> */}
          {/* <img src={mainUserData.imgPath} alt="캐릭터 이미지" /> */}

          <svg
            height={radius * 2}
            width={radius * 2}
            className={styles.progressbar2}
          >
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feOffset result="offOut" in="SourceAlpha" dx="-5" dy="-5" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                <feColorMatrix
                  result="matrixOut"
                  in="blurOut"
                  type="matrix"
                  values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.2 0"
                />
                <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
              </filter>

              <filter id="glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              </filter>
            </defs>

            <circle
              className={styles.circle}
              stroke="#ffffff"
              strokeWidth="18"
              fill="transparent"
              r={radius}
              cx={radius}
              cy={radius}
            />
            <image
              href={panda}
              x={radius - 100}
              y={radius - 100}
              width="200"
              height="200"
              className={styles.shineImage}
            />
            <circle
              className={styles.filledcircle}
              stroke="#98FF87"
              strokeWidth="20"
              fill="transparent"
              r={radius}
              cx={radius}
              cy={radius}
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference -
                (mainUserData.growthExp / maxGrowthExp) * circumference
              }
              filter="url(#shadow) url(#glow)"
            />
          </svg>

          {/* <p>성장 경험치: {mainUserData.growthExp}</p>
          <p>스택 경험치: {mainUserData.stackExp}</p> */}

          {/* <Link to="/history">
            <button>경험치 히스토리</button>
          </Link> */}

          <p className={styles.caloryinfo}>
            <span className={styles.boldText}>{mainUserData.calory}</span> /{' '}
            {mainUserData.goalCalory} kcal
          </p>
          <div className={styles.progressbar}>
            <div
              className={styles.remainingbar}
              style={{
                width: `${
                  100 - (mainUserData.calory / mainUserData.goalCalory) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className={styles.nutrienticons}>
            <div className={styles.nutrienticon}>
              <img src={carbon} alt="" />
              <div className={styles.nutrientbar}>
                <div
                  className={styles.remainingbar2}
                  style={{
                    width: `${
                      (mainUserData.carbo / mainUserData.goalCarbo) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <img src={protein} alt="" />
              <div className={styles.nutrientbar}>
                <div
                  className={styles.remainingbar3}
                  style={{
                    width: `${
                      (mainUserData.protein / mainUserData.goalProtein) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <img src={fat} alt="" />
              <div className={styles.nutrientbar}>
                <div
                  className={styles.remainingbar4}
                  style={{
                    width: `${
                      (mainUserData.fat / mainUserData.goalFat) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.nutrientContainer}>
            <p>
              {mainUserData.carbo} / {mainUserData.goalCarbo}g
            </p>
            <p>
              {mainUserData.protein} / {mainUserData.goalProtein}g
            </p>
            <p>
              {mainUserData.fat} / {mainUserData.goalFat}g
            </p>
          </div>

          <div className={`${styles.centeredContainer}`}>
            <div className={styles.infobar}>
              <img src={Frame} alt="" />
              신장: {height}cm 체중: {weight}kg
              <BodyinfoModify setWeight1={setWeight} setHeight1={setHeight} />
            </div>
          </div>
        </div>
      )}

      <div className={styles.foodRecommendIconWrapper}>
        <FoodRecommend />
      </div>

      <Routes>
        <Route path="/history" element={<ExpHistory />} />
      </Routes>
    </div>
  );
}

export default Character;