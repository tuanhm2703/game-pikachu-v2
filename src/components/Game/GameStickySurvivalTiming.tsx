import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import { timeConvert } from "../../utils/time";
import styles from './GameSurvivalTiming.module.css';

const GameStickySurvivalTiming: FC<{ hasTiming: boolean }> = ({
  hasTiming = false,
}) => {
  const { remainingTime } = useRecoilValue(gameState);
  const [remainTime, setRemainTime] = useState(remainingTime);
  useEffect(() => {
    console.log(remainingTime)
    if (remainingTime >= 0) {
      setRemainTime(remainingTime);
    }
  }, [remainingTime]);
  return (
    <>
      <p className={styles.timingText} style={{ margin: '0px', fontSize: '11px' }}>
        <span className={styles.timingInfo}>Còn: {timeConvert(remainTime)}</span>
      </p>
    </>
  );
};

export default GameStickySurvivalTiming;
