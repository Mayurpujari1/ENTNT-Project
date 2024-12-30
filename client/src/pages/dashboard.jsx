import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  const getTasksForDate = (date) => {
    return summary.last10Task.filter((task) =>
      moment(task.date).isSame(moment(date), "day")
    );
  };

  const randomizeTaskDates = () => {
    const daysInMonth = moment().daysInMonth();
    summary.last10Task.forEach((task) => {
      const randomDay = Math.ceil(Math.random() * daysInMonth);
      task.date = moment().startOf("month").date(randomDay).toISOString();
    });
  };

  randomizeTaskDates();

  const renderCalendarGrid = () => {
    const daysInMonth = moment().daysInMonth();
    const firstDayOfMonth = moment().startOf("month").day();
    const weeks = [];
    let currentDay = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<div key={`empty-${j}`} className="w-full h-20 border"></div>);
        } else if (currentDay <= daysInMonth) {
          const date = moment().startOf("month").date(currentDay);
          const tasks = getTasksForDate(date);

          week.push(
            <div key={`day-${currentDay}`} className="w-full h-20 border p-1">
              <div className="text-sm font-bold">{currentDay}</div>
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-blue-200 text-xs rounded px-1 mt-1 overflow-hidden text-ellipsis"
                  title={task.title}
                >
                  {task.title}
                </div>
              ))}
            </div>
          );
          currentDay++;
        } else {
          week.push(<div key={`empty-${j}`} className="w-full h-20 border"></div>);
        }
      }
      weeks.push(
        <div key={`week-${i}`} className="grid grid-cols-7 w-full">
          {week}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>Task Calendar</h4>
        <div className="grid grid-rows-6 gap-2 w-full border">{renderCalendarGrid()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
