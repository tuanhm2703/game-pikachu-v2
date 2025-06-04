import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import GameBoard from "../components/GameBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import SwitchLanguage from "../components/SwitchLanguage";
import GameSurvivalInfo from "../components/Game/GameSurvivalInfo";
import { GameLevel, GameMode } from "../types/game";
import { Helmet } from "react-helmet";
import { useGameActions } from "../hooks/useGameActions";
import GameReplay from "../components/Game/GameReplay";
import { useEffect, useState } from "react";
import GameSurvivalWinInfo from "../components/Game/GameSurvivalWinInfo";

const SurvivalModePage = () => {
  const { status } = useRecoilValue(gameState);
  const { replayGame, endGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { level } = useRecoilValue(gameState);
  const [isWin, setIsWin] = useState(false);
  useEffect(() => {
    if (level === GameLevel.LEVEL_13) {
      endGame(true);
      setIsWin(true)
    }
  }, [level])
  return (
    <div className="game-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Survival mode board</title>
      </Helmet>
      <div className={`game-board game-${status}`}>
        {isWin ? <GameSurvivalWinInfo /> : <GameSurvivalInfo />}
        <GameOverlay />
        <GameBoard mode={GameMode.SURVIVAL_MODE} />
      </div>
      <div className="sidebar">
        <GameSurvivalInfo hasTiming />
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
       <p style={{ fontSize: '8px', textAlign: 'center' }}>Thời gian sẽ tăng thêm khi chọn 
        khớp một cặp pokemon</p>
        <span>|</span>
        <p style={{ fontSize: '8px', textAlign: 'center' }}>Chọn sai cặp sẽ bị giảm thời gian</p>
       </div>
        <GameReplay action={replayGame} />
      </div>
    </div>
  );
};

export default SurvivalModePage;
