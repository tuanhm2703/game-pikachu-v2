import GameBoard from "../components/GameBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import GameSurvivalInfo from "../components/Game/GameSurvivalInfo";
import { GameMode, GameStatus, LEVEL_MAX } from "../types/game";
import { Helmet } from "react-helmet";
import { useGameActions } from "../hooks/useGameActions";
import GameReplay from "../components/Game/GameReplay";
import { useEffect, useState } from "react";
import GameSurvivalWinInfo from "../components/Game/GameSurvivalWinInfo";
import GameSurvivalLoseInfo from "../components/Game/GameSurvivalLoseInfo";
import './css/survival-page.css';
import GameStickySurvivalTiming from "../components/Game/GameStickySurvivalTiming";
import styles from '../pages/MainPage.module.css';
import MinimalizeIcon from "../components/MinimalizeIcon";

const SurvivalModePage = () =>
{
  const { status } = useRecoilValue(gameState);
  const { replayGame, endGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { level } = useRecoilValue(gameState);
  const [isWin, setIsWin] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const currentLevel = Number.parseInt(level) > Number.parseInt(LEVEL_MAX) ? LEVEL_MAX : level
  useEffect(() =>
  {
    if (Number.parseInt(level) >= 13)
    {
      endGame(true);
      setIsWin(true)
    } else
    {
      setIsWin(false)
    }
  }, [level])
  const hasTiming = () =>
  {
    if (status === GameStatus.PENDING)
    {
      return false
    }
    return true
  }
  return (
    <div className="game-container" style={{ position: 'relative' }}>
      {isWin ? <GameSurvivalWinInfo isWin={isWin} /> : <GameSurvivalLoseInfo hasTiming={hasTiming()} />}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Survival mode board</title>
      </Helmet>
      <div className={`game-board game-${status} ${hideSidebar ? 'full' : ''}`}>
        <GameOverlay />
        <GameBoard mode={GameMode.SURVIVAL_MODE} />
      </div>
      <div className={`sidebar ${hideSidebar ? 'hide' : ''}`}>
        <GameSurvivalInfo hasTiming />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
          <p style={{ fontSize: '7px', textAlign: 'center', color: '#D22128' }}>Thời gian sẽ tăng thêm khi chọn
            khớp một cặp pokemon</p>
          <span style={{ color: '#D22128' }}>|</span>
          <p style={{ fontSize: '7px', textAlign: 'center', color: '#D22128' }}>Chọn sai cặp sẽ bị giảm thời gian 10s</p>
        </div>
        <GameReplay action={replayGame} />
        <div style={{ width: 'fit-content', display: 'flex', justifyContent: 'center' }}>
          <button style={{ display: 'flex', justifyContent: 'center', fontSize: '15px', padding: '7px', marginTop: '0' }} className={styles.button} onClick={() => setHideSidebar(!hideSidebar)}>
            Tối giản <span style={{ verticalAlign: 'middle', display: 'inline-block', height: '16px', paddingLeft: '4px' }}><MinimalizeIcon fill="#A80000" width={16} height={16} /></span>
          </button>
        </div>
      </div>
      {hideSidebar && (
        <div
          className={`sticky-info sticky-info-card`}
          style={{
            position: 'fixed',
            top: '8px',
            right: '8px',
            zIndex: 1000,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            padding: '4px 5px 3px 5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            transition: 'box-shadow 0.2s, transform 0.2s',
            border: '1px solid #f2f2f2',
            width: '105px',
            minWidth: '105px',
            maxWidth: '105px',
            cursor: 'pointer',
          }}
          onClick={() => setHideSidebar(!hideSidebar)}
          onMouseOver={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(210,33,40,0.12)';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px) scale(1.01)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            (e.currentTarget as HTMLDivElement).style.transform = 'none';
          }}
        >
          <span
            className="game-title"
            style={{
              color: '#D22128',
              boxShadow: 'none',
              marginTop: '0px',
              background: '#fff',
              padding: '1px 3px',
              fontSize: '10px',
              borderRadius: '3px',
              fontWeight: 700,
              letterSpacing: '0.2px',
              marginBottom: '0',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Lv <span>{currentLevel}/{LEVEL_MAX}</span>
          </span>
          <GameStickySurvivalTiming hasTiming={hasTiming()} />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '7px',
                padding: '2px 0',
                marginTop: '0',
                color: '#fff',
                background: '#D22128',
                border: 'none',
                borderRadius: '3px',
                fontWeight: 700,
                boxShadow: '0 1px 2px rgba(210,33,40,0.08)',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'center',
                minWidth: '0'
              }}
              className={styles.button}
              onClick={e => {
                e.stopPropagation();
                setHideSidebar(!hideSidebar);
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#a80000';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(210,33,40,0.12)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#D22128';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 2px rgba(210,33,40,0.08)';
              }}
            >
              Mở rộng <span style={{ verticalAlign: 'middle', display: 'inline-block', height: '7px', paddingLeft: '2px' }}><MinimalizeIcon fill="#fff" width={7} height={7} /></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurvivalModePage;
