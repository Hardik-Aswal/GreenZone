"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaAmazon, FaLeaf } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { change, selectMode } from "../store/modeSlice";

const ToggleWrapper = () => {
  const mode = useAppSelector(selectMode) as "green" | "home";
  const [showTooltip, setShowTooltip] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const handleCheckItOut = () => {
    setShowTooltip(false);

    console.log("Greenzone feature clicked!");
  };

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/gogreen") return;
    if (mode === "green" && pathname !== "/gogreen") {
      router.push("/gogreen");
    } else if (mode === "home" && pathname !== "/") {
      router.push("/");
    }
  }, [mode, pathname, router]);
  return (
    <div className="relative">
      <ModeToggle
        mode={mode}
        setMode={() => {
          dispatch(change());
        }}
      />
      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 min-w-[250px] relative">
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200"></div>

            <div className="text-sm font-medium mb-3">Introducing GreenZone</div>

            <button
              onClick={handleCheckItOut}
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full"
            >
              Check it out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ModeToggle = ({
  mode,
  setMode,
}: {
  mode: "green" | "home";
  setMode: Dispatch<SetStateAction<"green" | "home">>;
}) => {
  return (
    <button
      onClick={() => setMode(mode === "green" ? "home" : "green")}
      className={`p-2 w-28 rounded-full flex shadow-lg relative bg-gradient-to-b ${
        mode === "home" ? "justify-end from-slate-500 to-slate-700" : "justify-start from-green-700 to-green-400"
      }`}
    >
      <Thumb mode={mode} />
      {mode === "home" && <FaAmazon className="absolute right-16 top-3 text-3xl" />}
      {mode === "green" && <Leaf />}
    </button>
  );
};

const Thumb = ({ mode }: { mode: "green" | "home" }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: "spring",
      }}
      className="h-10 w-10 rounded-full overflow-hidden shadow-lg relative"
    >
      <div
        className={`absolute inset-0 ${
          mode === "green"
            ? "animate-pulse bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full"
            : "bg-slate-100"
        }`}
      />
      {mode === "home" && <MoonSpots />}
      {mode === "green" && <SunCenter />}
    </motion.div>
  );
};

const SunCenter = () => <div className="absolute inset-1.5 rounded-full bg-amber-300" />;

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="w-3 h-3 rounded-full bg-slate-300 absolute right-2.5 bottom-1"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-3 h-3 rounded-full bg-slate-300 absolute left-1 bottom-4"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="w-2 h-2 rounded-full bg-slate-300 absolute right-2 top-2"
    />
  </>
);

const Leaf = () => {
  return (
    <>
      <motion.span
        animate={{ x: [-20, -15, -10, -5, 0], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="text-slate-300 text-xs absolute right-10 top-2"
      >
        <FaLeaf />
      </motion.span>
      <motion.span
        animate={{ x: [-10, 0, 10, 20, 30], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        style={{ rotate: "60deg" }}
        className="text-slate-300 text-lg absolute right-4 top-3"
      >
        <FaLeaf />
      </motion.span>
      <motion.span
        animate={{ x: [-20, -15, -10, -5, 0], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="text-slate-300 absolute right-8 top-8 text-lg"
      >
        <FaLeaf />
      </motion.span>
    </>
  );
};

export default ToggleWrapper;
