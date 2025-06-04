import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import { LEVEL_MAX } from "../../types/game";

const GameLevel = () => {
  const { t } = useTranslation();
  const { level } = useRecoilValue(gameState);
  return (
    <h3 className="game-title" style={{ fontSize: '16px' }}>
      {t("Level")} <span style={{ color: '#A80000', background: '#fff', padding: '4px', borderRadius: '15px' }}>{level} / {LEVEL_MAX}</span>
    </h3>
  );
};

export default GameLevel;
