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
import { GameMode } from "../types/game";
import { Helmet } from "react-helmet";
import styles from './MainPage.module.css';
import { useGameActions } from "../hooks/useGameActions";
import GameReplay from "../components/Game/GameReplay";

const SurvivalModePage = () => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { level } = useParams();
  return (
    <div className="game-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Survival mode board</title>
      </Helmet>
      <div className={`game-board game-${status}`}>
        <GameSurvivalInfo />
        <GameOverlay />
        <GameBoard mode={GameMode.SURVIVAL_MODE} />
      </div>
      <div className="sidebar">
        <GameSurvivalInfo hasTiming />
        <p style={{ textAlign: 'center', fontSize: '10px', border: '1px solid #fff', padding: '0.5rem', borderRadius: '20px', margin: 'auto', marginBottom: '0.5rem' }}>Thời gian sẽ tăng thêm khi chọn 
        khớp một cặp pokemon</p>
        <p style={{ textAlign: 'center', fontSize: '10px', border: '1px solid #fff', padding: '0.5rem', borderRadius: '20px', margin: 'auto' }}>Chọn sai cặp sẽ bị giảm thời gian</p>
        <GameReplay action={replayGame} />
      </div>
    </div>
  );
};

export default SurvivalModePage;
