import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import SwitchLanguage from "../components/SwitchLanguage";
import { Helmet } from "react-helmet";
import playerState from "../recoil/atoms/playerState";
import Welcome from "../components/Welcome";
import styles from './MainPage.module.css';

const MainPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>THE C.I.U - Pika pika! - Main board</title>
        </Helmet>
        <h1 className={styles.title}>Pika Pika!</h1>
        <nav className={styles.navigation}>
          <Welcome />
          <Link to={Routes.SURVIVAL_MODE_EASY_PAGE}>
            <button className={styles.button} onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Easy")}
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
