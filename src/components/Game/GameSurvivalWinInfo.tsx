import { FC } from "react";
import { useTranslation } from "react-i18next";
import GameReplay from "./GameReplay";
import { useGameActions } from "../../hooks/useGameActions";
import { GameMode } from "../../types/game";

const GameSurvivalWinInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) => {
  const { t } = useTranslation();
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);

  return (
    <div className="game-info" style={{ width: '100%' }}>
      <img src="win-popup.png" style={{ width: '50%' }} alt="" />
      <GameReplay action={replayGame} />
    </div>
  );
};

export default GameSurvivalWinInfo;
