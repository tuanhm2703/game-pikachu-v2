import { FC } from "react";
import { useTranslation } from "react-i18next";
import GameLevel from "./GameLevel";
import GameSurvivalTiming from "./GameSurvivalTiming";
import GameTitle from "./GameTitle";

const GameSurvivalInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="game-info" style={{ width: '100%' }}>
      <GameTitle title={t("Pika Pika!")} />
      <GameLevel />
      <GameSurvivalTiming hasTiming={hasTiming} />
    </div>
  );
};

export default GameSurvivalInfo;
