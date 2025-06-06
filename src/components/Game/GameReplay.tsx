import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import playerState from "../../recoil/atoms/playerState";
import styles from '../../pages/MainPage.module.css';

const GameReplay: FC<{ action: Function }> = ({ action }) => {
  const { t } = useTranslation();
  const { player } = useRecoilValue(playerState);
  return (
    <p style={{ width: '100%', marginTop: '0px' }}>
      <button className={styles.button} style={{ fontSize: '15px', padding: '7px' }} onClick={() => action(player)}>{t("Replay")}</button>
    </p>
  );
};

export default GameReplay;
