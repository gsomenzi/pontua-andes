import React from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated, useTransition } from 'react-spring';

type Props = {
    open: boolean;
    setOpen: Function;
    children?: any;
};

export default function Drawer(props: Props) {
    const { open, setOpen, children } = props;
    const el = document.querySelector('#root');
    const overlayStyles = useSpring({ opacity: open ? 1 : 0 });
    return open && el
        ? ReactDOM.createPortal(
              <div className="drawer-wrapper">
                  <animated.div
                      style={overlayStyles}
                      className="drawer-overlay"
                      onClick={() => setOpen(false)}
                  ></animated.div>
                  <div className="drawer-panel">{children}</div>
              </div>,
              el
          )
        : null;
}
