import GameBoard from "../components/GameBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import GameSurvivalInfo from "../components/Game/GameSurvivalInfo";
import { GameLevel, GameMode, LEVEL_MAX } from "../types/game";
import { Helmet } from "react-helmet";
import { useGameActions } from "../hooks/useGameActions";
import GameReplay from "../components/Game/GameReplay";
import { useEffect, useState } from "react";
import GameSurvivalWinInfo from "../components/Game/GameSurvivalWinInfo";
import './css/survival-page.css';
import Turnstile from "react-turnstile";
const SurvivalModePage = () => {
  const { status } = useRecoilValue(gameState);
  const { replayGame, endGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { level } = useRecoilValue(gameState);
  const [token, setToken] = useState<string>('')
  const [isWin, setIsWin] = useState(false);
  useEffect(() => {
    if (level === GameLevel.LEVEL_3) {
      endGame(true);
      setIsWin(true)
    }
  }, [level])
  useEffect(() => {
  }, [token])
  return (
    <div className="game-container" style={{ position: 'relative' }}>
        {isWin ? <GameSurvivalWinInfo /> : <GameSurvivalInfo />}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Survival mode board</title>
      </Helmet>
      <div className={`game-board game-${status}`}>
        <GameOverlay />
        <GameBoard mode={GameMode.SURVIVAL_MODE} />
      </div>
      <div className="sidebar">
        <GameSurvivalInfo hasTiming />
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
       <p style={{ fontSize: '7px', textAlign: 'center', color: '#D22128' }}>Thời gian sẽ tăng thêm khi chọn 
        khớp một cặp pokemon</p>
        <span style={{ color: '#D22128' }}>|</span>
        <p style={{ fontSize: '7px', textAlign: 'center', color: '#D22128' }}>Chọn sai cặp sẽ bị giảm thời gian 10s</p>
       </div>
        <GameReplay action={replayGame} />
        {
          level >= GameLevel.LEVEL_2 && <Turnstile
          sitekey={"0x4AAAAAAA16evNl7N_NwrK2"}
          onVerify={token => setToken(token)}
        />
        }
      </div>
    </div>
  );
};

export default SurvivalModePage;
