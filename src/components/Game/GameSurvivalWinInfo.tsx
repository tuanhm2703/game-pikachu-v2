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
      <div style={{ position: 'relative' }}>
      <img src="win-popup.png" style={{ width: '50%', display: 'block', margin: 'auto' }} alt="" />
      <p style={{ position: 'absolute',
        bottom: '0%',
        margin: '0',
        left: '50%',
        fontSize: '10px',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #fff',
        padding: '0 16px',
        borderRadius: '16px' }}>KH123123</p>
      </div>
      <p style={{ textAlign: 'center', fontSize: '12px', width: '220px', fontWeight: 'bold' }}>Vui lòng chụp màn hinh voucher và đưa thu ngân khi thanh toán.</p>
      <GameReplay action={replayGame} />
    </div>
  );
};

export default GameSurvivalWinInfo;
