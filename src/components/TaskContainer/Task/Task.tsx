import React, { useEffect, useState } from "react";
import { ActionsList } from "../../ActionsList/ActionsList";
import styles from "./task.less";
import { TaskButton } from "./TaskButton/TaskButton";
import PlusImg from "../../../images/svg/plus.svg";
import MinusImg from "../../../images/svg/minus.svg";
import EditImg from "../../../images/svg/edit.svg";
import BasketImg from "../../../images/svg/basket.svg";
import { tasks } from "../TaskContainer";
import { Modal } from "../../Modal/Modal";

interface ITask {
  number: number;
  taskName: string;
  deleteFunc: (...args: any) => void;
}

export function Task({ number, taskName, deleteFunc }: ITask) {
  const [IsOpenActions, setIsOpenActions] = useState(false);
  const [IsOpenModal, setIsOpenModal] = useState(false);

  const buttons = [
    {
      text: "Увеличить",
      imageIcon: <PlusImg />,
      click: () => {},
    },
    {
      text: "Уменьшить",
      imageIcon: <MinusImg />,
      click: () => {},
      IsActive: false,
    },
    {
      text: "Редактировать",
      imageIcon: <EditImg />,
      click: () => {},
    },
    {
      text: "удалить",
      imageIcon: <BasketImg />,
      click: () => {
        setIsOpenModal(true), setIsOpenActions(false);
      },
    },
  ];

  return (
    <div className={styles.container}>
      {IsOpenModal && (
        <Modal
          title={"Удалить задачу?"}
          click={() => {
            setIsOpenModal(false);
            deleteFunc(number, tasks);
          }}
          cancelClick={() => setIsOpenModal(false)}
        />
      )}
      <span className={styles.number}>{number}</span>
      <span className={styles.taskName}>{taskName}</span>
      <div className={styles.buttonContainer}>
        <TaskButton
          click={() =>
            IsOpenActions ? setIsOpenActions(false) : setIsOpenActions(true)
          }
        />
        {IsOpenActions && (
          <div className={styles.actionContainer}>
            <ActionsList buttons={buttons} />
          </div>
        )}
      </div>
    </div>
  );
}
