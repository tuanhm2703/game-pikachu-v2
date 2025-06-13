import { FC } from "react";
import { useTranslation } from "react-i18next";
import GameLevel from "./GameLevel";
import GameSurvivalTiming from "./GameSurvivalTiming";
import GameTitle from "./GameTitle";
import GameReplay from "./GameReplay";
import { useGameActions } from "../../hooks/useGameActions";
import { GameMode } from "../../types/game";

const GameSurvivalLoseInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) => {
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { t } = useTranslation();
    console.log(hasTiming)
  return (
    <div className="game-info" style={{ width: '100%' }}>
      <GameTitle title={t("Pika Pika!")} win={false} />
      <GameLevel />
      <GameSurvivalTiming hasTiming={hasTiming} />
      <GameReplay action={replayGame} />
    </div>
  );
};

export default GameSurvivalLoseInfo;
