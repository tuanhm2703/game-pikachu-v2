import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RankBoard from "../components/RankBoard";
import { Routes } from "../routes/CONSTANTS";
import { useGameActions } from "../hooks/useGameActions";
import { useEffect } from "react";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useRecoilValue } from "recoil";
import SwitchLanguage from "../components/SwitchLanguage";
import { Helmet } from "react-helmet";
import { GameMode } from "../types/game";
import Welcome from "../components/Welcome";
import styles from './SinglePlayerPage.module.css';

const SinglePlayerPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { resetGame } = useGameActions(GameMode.SURVIVAL_MODE);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Pika pika! - Single player</title>
        </Helmet>
        <h1 className={styles.title}>{t("Single player")}</h1>
        <Welcome />
        <div className={styles.form} style={{marginBottom: 24}}>
          <Link to={Routes.SURVIVAL_MODE_PAGE}>
            <button className={styles.button} onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Survival mode")}
            </button>
          </Link>
          <Link to={Routes.SPEED_MODE_PAGE}>
            <button className={styles.button} onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Speed mode")}
            </button>
          </Link>
          <Link to={Routes.MAIN_PAGE}>
            <button className={styles.button} onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Back")}
            </button>
          </Link>
        </div>
        <RankBoard />
        <SwitchLanguage />
      </div>
    </div>
  );
};

export default SinglePlayerPage;
