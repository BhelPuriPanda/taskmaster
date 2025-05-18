import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";  // Ant Design close icon
import { MdClose } from "react-icons/md";          // Material Design close icon
import { FiX } from "react-icons/fi";               // Feather X icon


export default function TaskManager() {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(
          collection(db, "tasks"),
          where("uid", "==", currentUser.uid)
        );
        const unsubscribeData = onSnapshot(q, (querySnapshot) => {
          let taskList = [];
          querySnapshot.forEach((doc) => {
            taskList.push({ ...doc.data(), id: doc.id });
          });
          setTasks(taskList);
        });

        return () => unsubscribeData();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() === "" || !user) return;
    await addDoc(collection(db, "tasks"), {
      uid: user.uid,
      task: task.trim(),
      completed: false,
      createdAt: new Date(),
    });
    setTask("");
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const toggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, {
      completed: !task.completed,
    });
  };

  return (
    
    <div className="bg-[url('/image2.png')] min-h-screen bg-black text-white flex flex-col items-center p-6 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.92)",
      backgroundBlendMode: "overlay",
    }}>
      {user && (
  <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg shadow-xl/20 shadow-blue-500">
    <h1 className="text-lg font-semibold">
      👋 Welcome, {user.email.split("@")[0]}
    </h1>
    <button
      onClick={() => {
        signOut(auth);
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 pt-2 pb-2 rounded-md"
    >
      Logout
    </button>
  </nav>
)}
      {/* <header className="text-center my-8 max-w-xl">
        <h1 className="text-6xl font-bold text-gray-50 mb-2">
          <span className="text-blue-400">Welcome to</span> TaskMaster
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-light">
          "TaskMaster would hunt you down if you don't finish all your TASKS!!"
        </p>
      </header> */}

        <h1 className="text-6xl font-semibold mt-8 mb-4 text-gray-50  text-center">
        <span className="text-blue-400">Welcome to</span> TaskMaster
        <br />
        <span className="text-sm md:text-base font-extralight mt-2 mb-3 text-gray-300">
          "TaskMaster would hunt you down if you don't finish all your TASKS!!"
        </span>
      </h1>

      <div className="bg-gray-950 p-6 rounded-xl w-full max-w-xl shadow-xl ring-2 ring-blue-400/50 hover:ring-blue-400 hover:shadow-blue-500/40 transition">
        <h2 className="text-3xl font-semibold mb-6 text-center">Your Tasks</h2>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-grow px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <button
            onClick={handleAddTask}
            className="bg-white text-black font-medium px-4 py-2 rounded-xl hover:bg-black  hover:text-white transition hover:cursor-pointer ring"
          >
            Add Task
          </button>
        </div>

        {tasks.length > 0 && (
  <div className="w-0.8 bg-gray-50 rounded-md h-1 mt-6 mb-2">
    <div
      className="bg-green-500 h-1 rounded-md transition-all duration-300"
      style={{
        width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%`,
      }}
    ></div>
  </div>
)}
<p className="text-sm text-gray-700 mb-6">
  {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed (
  {tasks.length === 0
  ? 0
  : Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)}%
)
</p>


        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t)}
                  className="accent-blue-500 w-5 h-5"
                />
                <span
                  className={`text-white ${
                    t.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.task}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(t.id)}
                className="text-red-400 hover:text-red-600 text-lg"
              >
                <FiX/>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
