import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGameActions } from "../../hooks/useGameActions";
import gameOverlayState from "../../recoil/atoms/gameOverlayState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import {
  BASE_START_TIME,
  BASE_START_TIME_EASY,
  BASE_START_TIME_HARD,
  BONUS_TIME,
  GameMode,
  GameStatus,
  PENALTY_TIME,
  PENDING_TIME,
  SUGGEST_TIME,
} from "../../types/game";
import { hasAnyConnectLine } from "../../utils/game";
import { timeConvert } from "../../utils/time";
import styles from './GameSurvivalTiming.module.css';
import { useParams } from "react-router-dom";

const GameStickySurvivalTiming: FC<{ hasTiming: boolean }> = ({
  hasTiming = false,
}) => {
  const { remainingTime } = useRecoilValue(gameState);

  return (
    <>
      <p className={styles.timingText} style={{ margin: '0px', fontSize: '11px' }}>
        <span className={styles.timingInfo}>Còn: {timeConvert(remainingTime)}</span>
      </p>
    </>
  );
};

export default GameStickySurvivalTiming;
