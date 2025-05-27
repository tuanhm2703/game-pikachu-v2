import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";

const GameLevel = () => {
  const { t } = useTranslation();
  const { level } = useRecoilValue(gameState);
  return (
    <h3 className="game-title">
      {t("Level")} <span style={{ color: '#A80000', background: '#fff', padding: '4px', borderRadius: '15px' }}>{level} / 14</span>
    </h3>
  );
};

export default GameLevel;
