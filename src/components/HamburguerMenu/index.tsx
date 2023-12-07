import { useState } from "react";
import styles from "./styles.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const HamburguerMenu = ({ menuBackground }: { menuBackground?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    {
      name: "Início",
      icon: "fa-home",
      path: "/",
    },
    {
      name: "Jogo da Memória",
      icon: "fa-gamepad",
      path: "/jogo-da-memoria",
    },
    {
      name: "Tabuada",
      icon: "fa-table",
      path: "/tabuada",
    },
    {
      name: "Zoológico",
      icon: "fa-star",
      path: "/zoologico",
    },
    {
      name: "Configurações",
      icon: "fa-gear",
      path: "/configuracoes",
    },
  ];

  return (
    <>
      <div
        className={`${styles.menuBtn} ${isOpen ? "open" : ""}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={styles.menuBtnBurguer}></div>
      </div>

      <section
        className={`${styles.content}`}
        style={{
          display: isOpen ? "flex" : "none",
          background: menuBackground ? menuBackground : "#0897e4b5",
        }}
      >
        <div>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            tabIndex={0}
            className={styles.closeBtn}
          >
            <IoCloseOutline />
          </div>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <i
                  className={`fa ${item.icon}`}
                  style={{
                    marginRight:
                      item.icon === "fa-pie-chart" ? "0.75rem" : "1.125rem",
                  }}
                ></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <p>&copy; Abraca - 2023</p>
          <p>Todos os direitos reservados.</p>
        </footer>
      </section>
    </>
  );
};

export default HamburguerMenu;
