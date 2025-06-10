import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import GameReplay from "./GameReplay";
import { useGameActions } from "../../hooks/useGameActions";
import { GameMode } from "../../types/game";
import ReCAPTCHA from "react-google-recaptcha";

const GameSurvivalWinInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) => {
  const { t } = useTranslation();
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [voucherCode, setVoucherCode] = useState<string>('');
  const handleRecaptcha = async () => {
    const code = await recaptchaRef.current?.executeAsync();
    const response = await fetch(`https://beta.theciu.vn/api/minigame/pikachu/get-gift?turnstile_token=${code}`)
    const data = await response.json();
    console.log(data)
    setVoucherCode(data.data);
  }
  useEffect(() => {
    handleRecaptcha()
  }, [])
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
        borderRadius: '16px' }}>{voucherCode}</p>
      </div>
      <p style={{ textAlign: 'center', fontSize: '12px', width: '220px', fontWeight: 'bold' }}>Vui lòng chụp màn hinh voucher và đưa thu ngân khi thanh toán.</p>
      <GameReplay action={replayGame} />
      <ReCAPTCHA
          sitekey={'6Ldz-1srAAAAAIk7s-ELUU0SHn4QTVSx9-seepkW'}
          size="invisible"
          ref={recaptchaRef}
        />
    </div>
  );
};

export default GameSurvivalWinInfo;
