import AppLayout from "../../layout/App/AppLayout";
import styles from "./styles.module.scss";
import IconSettings from "../../assets/img/icon-settings.png";
import { useState } from "react";
import { MdNightlightRound } from "react-icons/md";
import { IoSunny } from "react-icons/io5";

export default function Configuracoes() {
  const isDark = localStorage.getItem('isDark') || '';
  const [isDarkMode, setIsDarkMode] = useState(isDark.includes('true'));

  const toggleDarkMode = () => {
    const isDark = localStorage.getItem('isDark') || '';
    localStorage.setItem("isDark", JSON.stringify(!isDark.includes('true')));
    setIsDarkMode(!isDark.includes('true'))
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <AppLayout
      primaryColorBackground="#0896e4"
      secondaryColorBackground="#09a7fd"
      menuColor={"#0897e4b5"}
      imageLayout={IconSettings}
      imageDescription="Ícone de uma engrenagem no centro da tela."
      pageTitle="Configurações"
    >

      <div className={styles.themeWrapper}>
        <div
          className={`${styles.theme}  ${
            isDarkMode ? styles.light : styles.dark
          }`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <IoSunny /> : <MdNightlightRound />}
          {isDarkMode ? <p>Ativar modo claro</p> : <p>Ativar modo escuro</p>}
        </div>
      </div>
    </AppLayout>
  );
}
