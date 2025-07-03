import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[];
  className?: string;
}

const FloatingNavbar = ({ navItems, className, ...props }: FloatingNavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Set active index based on current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const index = navItems.findIndex((item) => item.path === currentPath);
    setActiveIndex(index !== -1 ? index : null);
  }, [navItems]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
        "px-4 py-3 rounded-full border border-border/40",
        "bg-background/80 backdrop-blur-xl shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 relative">
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <React.Fragment key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive: navActive }) =>
                  cn(
                    "relative px-4 py-2 rounded-full transition-all",
                    "flex items-center gap-2 z-10",
                    "text-sm font-medium",
                    navActive
                      ? "text-white"
                      : "text-foreground/70 hover:text-foreground"
                  )
                }
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(idx)}
              >
                {item.icon && (
                  <div className={cn(
                    "transition-all",
                    isActive ? "text-white" : "text-foreground/70"
                  )}>
                    {item.icon}
                  </div>
                )}
                <span>{item.name}</span>
              </NavLink>
            </React.Fragment>
          );
        })}
        
        {/* Animated background for active item */}
        {activeIndex !== null && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full z-0"
            initial={false}
            animate={{
              x: navItems.reduce((acc, _, i) => {
                if (i < activeIndex!) {
                  // Calculate width of previous items plus gaps
                  const itemWidth = 
                    document.querySelector(`a[href="${navItems[i].path}"]`)?.clientWidth || 0;
                  return acc + itemWidth + 8; // 8px is gap
                }
                return acc;
              }, 0),
              width: document.querySelector(`a[href="${navItems[activeIndex].path}"]`)?.clientWidth || "auto",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}
        
        {/* Hover effect */}
        {hoveredIndex !== null && hoveredIndex !== activeIndex && (
          <motion.div
            className="absolute inset-0 bg-muted rounded-full z-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.5,
              x: navItems.reduce((acc, _, i) => {
                if (i < hoveredIndex!) {
                  const itemWidth = 
                    document.querySelector(`a[href="${navItems[i].path}"]`)?.clientWidth || 0;
                  return acc + itemWidth + 8;
                }
                return acc;
              }, 0),
              width: document.querySelector(`a[href="${navItems[hoveredIndex].path}"]`)?.clientWidth || "auto",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default FloatingNavbar;
