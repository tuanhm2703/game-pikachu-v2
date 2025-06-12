import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import { LEVEL_MAX } from "../../types/game";

const GameLevel = () => {
  const { t } = useTranslation();
  const { level } = useRecoilValue(gameState);
  const currentLevel = Number.parseInt(level) > Number.parseInt(LEVEL_MAX) ? LEVEL_MAX : level
  return (
    <h3 className="game-title" style={{ fontSize: '1.3rem', color: '#D22128', boxShadow: 'none' }}>
      {t("Level")} <span style={{ color: '#D22128', background: '#fff', padding: '4px', borderRadius: '15px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
        {currentLevel} / {LEVEL_MAX}
        </span>
    </h3>
  );
};

export default GameLevel;
