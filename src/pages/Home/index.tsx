import Card from "../../components/Card";
import AppLayout from "../../layout/App/AppLayout";
import styles from "./styles.module.scss";
import IconMultiplicationTable from "../../assets/img/icon-multiplication-table.png";
import IconMemoryGame from "../../assets/img/icon-memory-game.png";
import IconSettings from "../../assets/img/icon-settings.png";
import IconZoo from "../../assets/img/icon-zoo.png";

export default function Home() {
  return (
    <AppLayout
      primaryColorBackground="#0896e4"
      secondaryColorBackground="#09a7fd"
      pageTitle="Painel"
    >
      <div className={styles.cardsContent}>
        <Card
          title="Tabuada"
          image={IconMultiplicationTable}
          link="/tabuada"
          descriptionImage="Icone da tabuada"
        />
        <Card
          title="Jogo da Memória"
          image={IconMemoryGame}
          link="/jogo-da-memoria"
          descriptionImage="Icone do jogo da memoria"
        />
        <Card
          title="Zoológico"
          image={IconZoo}
          link="/zoologico"
          descriptionImage="Icone de elefante"
        />
        <Card
          title="Configurações"
          image={IconSettings}
          link="/configuracoes"
          descriptionImage="Icone de engranagem"
        />
      </div>
    </AppLayout>
  );
}
