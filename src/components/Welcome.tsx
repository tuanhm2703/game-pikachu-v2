import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import playerState from "../recoil/atoms/playerState";
import { getPlayerID, getPlayerName } from "../utils/game";

const Welcome = () => {
  const { t } = useTranslation();

  const { player } = useRecoilValue(playerState);
  return (
    <>
      <h2 className="text-center" style={{ color: '#A80000' }}>
        {t("Welcome")}, {getPlayerName(player)}
      </h2>
    </>
  );
};

export default Welcome;
