import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActionsList } from "../../ActionsList/ActionsList";
import styles from "./task.less";
import { TaskButton } from "./TaskButton/TaskButton";
import PlusImg from "../../../images/svg/plus.svg";
import MinusImg from "../../../images/svg/minus.svg";
import EditImg from "../../../images/svg/edit.svg";
import BasketImg from "../../../images/svg/basket.svg";
import { tasks } from "../TaskContainer";
import { Modal } from "../../Modal/Modal";
import { CSSTransition } from "react-transition-group";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { changeIsPaused, changeIsStarted } from "../../../store/timerSlice";
import {
  // changeIsPaused,
  // changeIsStarted,
  changeTasksReducer,
  deleteTasksReducer,
  TInitialState,
  TTaskState,
} from "../../../store/slice";

interface ITask {
  index: number;
  taskName: string;
}

export function Task({ index, taskName }: ITask) {
  const dispatch = useDispatch();
  const tasksState = useSelector<TInitialState, Array<TTaskState>>(
    (state) => state.tasks.tasks
  );
  const amount = tasksState[index].amount;

  const [IsOpenActions, setIsOpenActions] = useState(false);
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const [IsEdit, setIsEdit] = useState(true);
  const [taskValue, setTaskValue] = useState(taskName);

  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const deleteTask: (...args: any) => void = (
    index: number,
    tasks: Array<TTaskState>
  ) => {
    dispatch(deleteTasksReducer(index));
    tasks.splice(index - 1, 1);
  };

  const handleKeyUp = (event: any) => {
    if (event.code === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleBlur = (evt: any) => {
    setTaskValue(evt.target.innerHTML);
    dispatch(changeTasksReducer([index, evt.target.innerHTML]));
    setIsEdit(true);
  };

  const handleClick = (event: MouseEvent) => {
    if (
      event.target instanceof Node &&
      listRef.current &&
      !listRef.current.contains(event.target)
    ) {
      setIsOpenActions(false);
    }
  };

  useEffect(() => {
    if (IsOpenActions) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [IsOpenActions]);

  useEffect(() => {
    tasks[index - 1].amount = amount;
  }, [amount]);

  useEffect(() => {
    contentRef.current?.focus();
  }, [IsEdit]);

  const buttons = [
    {
      text: "Увеличить",
      imageIcon: <PlusImg />,
      click: () => {
        dispatch(changeTasksReducer([index, 1]));
      },
    },
    {
      text: "Уменьшить",
      imageIcon: <MinusImg />,
      click: () => {
        if (amount > 1) dispatch(changeTasksReducer([index, -1]));
      },
      IsActive: amount > 1 ? true : false,
    },
    {
      text: "Редактировать",
      imageIcon: <EditImg />,
      click: () => {
        setIsEdit(false);
        setIsOpenActions(false);
      },
    },
    {
      text: "удалить",
      imageIcon: <BasketImg />,
      click: () => {
        setIsOpenModal(true), setIsOpenActions(false);
      },
    },
  ];

  const content = useMemo(() => {
    return (
      <div className={styles.container}>
        <CSSTransition
          in={IsOpenModal}
          timeout={300}
          classNames={"alert"}
          unmountOnExit
        >
          <Modal
            title={"Удалить задачу?"}
            click={() => {
              setIsOpenModal(false);
              deleteTask(index, tasks);
              dispatch(changeIsStarted(false));
              dispatch(changeIsPaused(false));
            }}
            cancelClick={() => setIsOpenModal(false)}
          />
        </CSSTransition>

        <span className={styles.amount}>{amount}</span>

        <ContentEditable
          html={taskValue}
          disabled={IsEdit}
          onKeyDown={handleKeyUp}
          onBlur={handleBlur}
          onChange={() => {}}
          className={styles.taskName}
          innerRef={contentRef}
        />

        <div className={styles.buttonContainer} ref={listRef}>
          <TaskButton
            click={() =>
              IsOpenActions ? setIsOpenActions(false) : setIsOpenActions(true)
            }
          />

          <div className={styles.actionContainer}>
            <CSSTransition
              in={IsOpenActions}
              timeout={300}
              classNames={"alert"}
              unmountOnExit
            >
              <ActionsList buttons={buttons} />
            </CSSTransition>
          </div>
        </div>
      </div>
    );
  }, [IsOpenActions, IsOpenModal, IsEdit, amount]);

  return content;
}
