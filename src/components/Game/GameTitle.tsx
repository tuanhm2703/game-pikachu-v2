import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import { GameStatus } from "../../types/game";
import { getPlayerName } from "../../utils/game";

const GameTitle: FC<{ title: string, win: boolean }> = ({ title, win = true }) => {
  const { t } = useTranslation();
  const { player } = useRecoilValue(playerState);
  const { status } = useRecoilValue(gameState);

  return (
    <h1 className="game-title" style={{ fontSize: '50px' }}>
      <img src={win === true ? "game-title-2.png" : "game-title-3.png"} alt="" />
    </h1>
  );
};

export default GameTitle;
