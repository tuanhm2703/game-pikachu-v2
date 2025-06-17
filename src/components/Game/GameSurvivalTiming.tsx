import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

const GameSurvivalTiming: FC<{ hasTiming: boolean }> = ({
  hasTiming = false,
}) => {
  const { level } = useParams<{ level: string }>();
  const { t } = useTranslation();
  const { status, pokemons, matrix, row, col } = useRecoilValue(gameState);
  const setGame = useSetRecoilState(gameState);
  const { playRisingPopSound, playGlugSound } = useRecoilValue(gameSoundState);
  const [timingState, setTimingState] = useState(0);
  const timing = useRef(0);
  const time = level === "easy" ? BASE_START_TIME_EASY : BASE_START_TIME_HARD;
  const remainTiming = useRef(time);
  const pendingTiming = useRef(PENDING_TIME);
  const suggestTiming = useRef(0);
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const { endGame, startGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const [{ connectingLinePoints }, setGameOverlay] =
    useRecoilState(gameOverlayState);

  // count timing when running, stop when completed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.PENDING && hasTiming) {
      timing.current = 0;
      remainTiming.current = time;
    }

    if (status === GameStatus.RUNNING) {
      if (hasTiming) {
        if (suggestTiming.current >= SUGGEST_TIME) {
          const { foundConnectLine, fromPoint, toPoint } = hasAnyConnectLine(
            pokemons,
            matrix,
            row,
            col
          );
          if (foundConnectLine) {
            setGameOverlay((gameOverlay) => ({
              ...gameOverlay,
              suggestPoints: [fromPoint, toPoint],
            }));
          }
          suggestTiming.current = 0;
        }
      }
      if (remainTiming.current <= 0) {
        if (hasTiming) {
          endGame();
        }
      } else {
        timeoutId = setTimeout(() => {
          timing.current++;
          suggestTiming.current++;
          remainTiming.current--;
          setGame((prevGame) => ({
            ...prevGame,
            remainingTime: remainTiming.current,
          }));
          setTimingState(timingState + 1);
        }, 1000);
      }
    }

    // update timing to make score
    if (status === GameStatus.COMPLETED) {
      if (timeoutId) clearTimeout(timeoutId);
    }
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [status, timingState]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (status === GameStatus.PENDING) {
      if (hasTiming) {
        setGameOverlay((gameOverlay) => ({
          ...gameOverlay,
          suggestPoints: [undefined, undefined],
        }));
      }
      timing.current = 0;
      pendingTiming.current = PENDING_TIME;
      const countdownEl = document.getElementById("count-down-pending-timing");
      if (countdownEl) countdownEl.innerText = pendingTiming.current.toString();
      intervalId = setInterval(() => {
        if (pendingTiming.current <= 1) {
          intervalId && clearInterval(intervalId);
          pendingTiming.current = PENDING_TIME;
          startGame();
        } else {
          pendingTiming.current--;
        }
        const countdownEl = document.getElementById(
          "count-down-pending-timing"
        );
        if (countdownEl)
          countdownEl.innerText = pendingTiming.current.toString();
      }, 1000);
    }

    if (status === GameStatus.COMPLETED) {
      intervalId && clearInterval(intervalId);
      if (hasTiming) {
        setPlayer({ ...currentPlayer, playerTiming: timing.current });
      }
    }
    return () => {
      pendingTiming.current = PENDING_TIME;
      intervalId && clearInterval(intervalId);
    };
  }, [status]);

  // check rule time
  useEffect(() => {
    if (connectingLinePoints.length === 1) {
      playGlugSound && playGlugSound();
      remainTiming.current -= PENALTY_TIME;
    }
    if (connectingLinePoints.length > 1) {
      playRisingPopSound && playRisingPopSound();
      remainTiming.current += BONUS_TIME;
      suggestTiming.current = 0;
    }
  }, [connectingLinePoints]);

  return (
    <>
      {!hasTiming && (
        <div id="count-down-pending-timing" className="overlay-pending-timing">
          {pendingTiming.current}
        </div>
      )}
      <p className={styles.timingText}>
        <span className={styles.timingInfo}>{t("Your time") + ": " + timeConvert(remainTiming.current)}</span>
      </p>
    </>
  );
};

export default GameSurvivalTiming;
