import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import GameReplay from "./GameReplay";
import { useGameActions } from "../../hooks/useGameActions";
import { GameMode } from "../../types/game";
import ReCAPTCHA from "react-google-recaptcha";

const GameSurvivalWinInfo: FC<{ hasTiming?: boolean }> = ({
  hasTiming = false,
}) =>
{
  const { t } = useTranslation();
  const { replayGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [voucherCode, setVoucherCode] = useState<string>('');
  const handleRecaptcha = async () =>
  {
    const code = await recaptchaRef.current?.executeAsync();
    const response = await fetch(`https://beta.theciu.vn/api/minigame/pikachu/get-gift?turnstile_token=${code}`)
    const data = await response.json();
    setVoucherCode(data.data);
  }
  useEffect(() =>
  {
    handleRecaptcha()
  }, [])
  return (
    <>
      <style>{`
        .loader {
          width: 120px;
          height: 20px;
          -webkit-mask: linear-gradient(90deg,#000 70%,#0000 0) left/20% 100%;
          background:
            linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat
            #ddd;
          animation: l7 1s infinite steps(6);
        }
        @keyframes l7 {
          100% {background-position: right -25% top 0}
        }
      `}</style>
      <div className="game-info" style={{ width: '100%' }}>
        {voucherCode ?
          <div style={{ position: 'relative' }}>
            <img src="win-popup.png" style={{ width: '50%', display: 'block', margin: 'auto' }} alt="" />
            <p style={{
              position: 'absolute',
              bottom: '0%',
              margin: '0',
              left: '50%',
              fontSize: '10px',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #fff',
              padding: '0 16px',
              borderRadius: '16px'
            }}>{voucherCode}</p>
          </div>
        : <div className="loader"></div>}
        <p style={{ textAlign: 'center', fontSize: '12px', width: '220px', fontWeight: 'bold' }}>Vui lòng chụp màn hinh voucher và đưa thu ngân khi thanh toán.</p>
        <GameReplay action={replayGame} />
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
          size="invisible"
          ref={recaptchaRef}
        />
      </div>
    </>
  );
};

export default GameSurvivalWinInfo;
