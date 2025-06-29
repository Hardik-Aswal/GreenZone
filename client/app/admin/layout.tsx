'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IconType } from 'react-icons';

import {
  FiBox,
  FiChevronsRight,
  FiHome,
  FiLogOut,
  FiPlus,
  FiUser,
} from 'react-icons/fi';
import { MdLeaderboard } from "react-icons/md";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { log } from 'console';
import { FaBook, FaDollarSign, FaHistory, FaLeaf, FaLessThan, FaTree } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { LucideBadgePercent } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/userSlice';


export default function Example({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">{children}</div>
    </div>
  );
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('Add Product');
const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? '15%' : 'fit-content',
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiPlus}
          title="Add Product"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/addProduct"
        />
        <Option
          Icon={FaTree}
          title="Order Management"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/pincodes"
        />
  
        <Option
          Icon={FaBook}
          title="Learn"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/learn"
        />
        <Option
                   Icon={MdLeaderboard}
          title="Leaderboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/leaderboard"
        />
        <Option
                   Icon={FaDollarSign}
          title="Rewards"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/rewards"
        />
  
        <Option
          Icon={FiLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
          onClick={() => {
            router.push('/');
            dispatch(logout());
            
          }}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  href,
  onClick,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  href?: string;
  onClick?: () => void;
}) => {
  return (
    <>
      {title === 'Logout' ? (
        <motion.button
          layout
          onClick={() => {}}
          className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
            selected === title
              ? 'bg-indigo-100 text-indigo-800'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <motion.div
            layout
            className={`grid  h-full w-10 place-content-center text-lg ${
              title === 'Logout' ? 'text-red-500' : ''
            }`}
          >
            <Icon />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className={`text-xs font-medium ${
                title === 'Logout' ? 'text-red-500' : ''
              }`}
              onClick={onClick}
            >
              {title}
            </motion.span>
          )}
        </motion.button>
      ) : (
        <Link href={href as string}>
          <motion.button
            layout
            onClick={() => setSelected(title)}
            className={`relative flex h-10 w-full items-center rounded-md cursor-pointer transition-colors ${
              selected === title
                ? 'bg-green-100 text-green-800'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <motion.div
              layout
              className={`grid h-full w-10 place-content-center text-lg ${
                title === 'Logout' ? 'text-red-500 ' : ''
              }`}
            >
              <Icon />
            </motion.div>
            {open && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className={`text-xs font-medium ${
                  title === 'Logout' ? 'text-red-500' : ''
                }`}
                onClick={onClick}
              >
                {title}
              </motion.span>
            )}
          </motion.button>
        </Link>
      )}
    </>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center justify-center gap-2">
          {
            open ? 
            <p className="text-green-700 text-xl font-bold">Admin Dashboard </p>
            : <></>
        }
          <FaLeaf className="text-green-700 text-xl font-bold" />
        </div>
      </div>
    </div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && 'rotate-180'}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

