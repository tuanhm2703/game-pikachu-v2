import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSetRecoilState } from "recoil";
import playerState from "../recoil/atoms/playerState";
import { FormEventHandler } from "react";
import SwitchLanguage from "../components/SwitchLanguage";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { nanoid } from "nanoid";
import styles from './PlayerPage.module.css';

const PlayerPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const setPlayer = useSetRecoilState(playerState);
  const [_, saveLocalPlayerName] = useLocalStorage("player", "");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const playerName = event.currentTarget.playerName.value;
    if (playerName && playerName.trim() !== "") {
      if (playerName.match(/^[a-zA-Z0-9 ]*$/gim)) {
        const newPlayer = playerName + "-" + nanoid(6);
        saveLocalPlayerName(newPlayer);
        setPlayer({ player: newPlayer, playerTiming: 0 });
        history.push(Routes.SURVIVAL_MODE_EASY_PAGE);
      } else {
        alert(t("Accept alphabet and digit only."));
      }
    } else {
      alert(t("Please enter your name"));
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <h1>
          <img src="game-title.png" alt="" />
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="playerName"
            type="text"
            autoFocus
            color="black"
            placeholder={t("Enter your name here")}
            maxLength={20}
            autoComplete="off"
            className={styles.input}
          />
          <button className={styles.button}>{t("Submit")}</button>
        </form>
      </div>
    </div>
  );
};

export default PlayerPage;
