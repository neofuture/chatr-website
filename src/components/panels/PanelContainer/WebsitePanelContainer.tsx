'use client';

import { usePanels, ActionIcon } from '@/contexts/PanelContext';
import { useEffect, useState } from 'react';
import styles from './PanelContainer.module.css';

interface PanelProps {
  id: string;
  title: string;
  children: React.ReactNode;
  level: number;
  effectiveMaxLevel: number;
  isClosing?: boolean;
  titlePosition?: 'center' | 'left' | 'right';
  fullWidth?: boolean;
  actionIcons?: ActionIcon[];
}

function Panel({ id, title, children, level, effectiveMaxLevel, isClosing, titlePosition = 'center', fullWidth = false, actionIcons }: PanelProps) {
  const { closePanel } = usePanels();
  const [isAnimating, setIsAnimating] = useState(false);
  const isCovered = level < effectiveMaxLevel;

  useEffect(() => {
    if (isClosing) { setIsAnimating(false); return; }
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, [isClosing]);

  const handleClose = () => closePanel(id);
  const zIndex = 9999 + level;

  let transform: string;
  if (!isAnimating) transform = 'translateX(100%)';
  else if (isCovered) transform = 'translateX(-50%) scale(0.9)';
  else transform = 'translateX(0) scale(1)';

  return (
    <>
      <div
        className={`auth-panel-backdrop ${isAnimating && !isClosing ? 'active' : ''}`}
        onClick={handleClose}
        style={{ zIndex: zIndex - 1 }}
      />
      <div
        className="auth-panel"
        data-fullwidth={fullWidth ? 'true' : undefined}
        style={{
          zIndex,
          transform,
          transformOrigin: 'center right',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(fullWidth && {
            width: '100vw',
            maxWidth: '100vw',
            left: 0,
          }),
        }}
      >
        <div className="auth-panel-header">
          <button onClick={handleClose} className="auth-panel-back">&#x2039;</button>
          <div
            className={`auth-panel-title ${titlePosition === 'center' ? styles.titleBlockCenter : styles.titleBlockLeft} ${styles.titleBlock}`}
          >
            <div className={styles.titleText}>
              <span className={styles.titleName}>{title}</span>
            </div>
          </div>
          <div className={styles.actions}>
            {actionIcons && actionIcons.map((action, index) => (
              <button key={index} onClick={action.onClick} aria-label={action.label} className={styles.actionBtn}>
                <i className={action.icon}></i>
              </button>
            ))}
          </div>
        </div>
        <div className="auth-panel-content">{children}</div>
      </div>
    </>
  );
}

export default function WebsitePanelContainer() {
  const { panels, maxLevel, effectiveMaxLevel } = usePanels();
  if (panels.length === 0) return null;

  return (
    <>
      {panels.map((panel) => (
        <Panel
          key={panel.id}
          id={panel.id}
          title={panel.title}
          level={panel.level}
          effectiveMaxLevel={effectiveMaxLevel}
          isClosing={panel.isClosing}
          titlePosition={panel.titlePosition}
          fullWidth={panel.fullWidth}
          actionIcons={panel.actionIcons}
        >
          {panel.component}
        </Panel>
      ))}
    </>
  );
}
