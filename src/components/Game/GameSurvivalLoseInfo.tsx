import { FC } from "react";
import { useTranslation } from "react-i18next";
import GameLevel from "./GameLevel";
import GameSurvivalTiming from "./GameSurvivalTiming";
import GameTitle from "./GameTitle";
import GameReplay from "./GameReplay";
import { useGameActions } from "../../hooks/useGameActions";
import { GameMode, GameStatus } from "../../types/game";
import gameState from "../../recoil/atoms/gameState";
import { useRecoilValue } from "recoil";

const GameSurvivalLoseInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) =>
{
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  console.log(status)
  return (
    <div className="game-info" style={{ width: '100%' }}>
      {status === GameStatus.COMPLETED && <div style={{
        background: '#fff',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        borderRadius: '2rem',
        padding: '0.5rem 2rem',
        textAlign: 'center',
        display: 'inline-block',
        margin: '0 auto 1rem auto',
      }}>
        OOPS, VOUCHER 50K HỤT MẤT RỒI!
      </div>}
      <GameLevel color="#fff"/>
      {status !== GameStatus.COMPLETED && <GameSurvivalTiming hasTiming={hasTiming} />}
      <div style={{ marginTop: '1rem' }}></div>
      <GameReplay action={replayGame} />
    </div>
  );
};

export default GameSurvivalLoseInfo;
