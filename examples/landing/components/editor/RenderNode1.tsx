import { useEditor, useNode } from '@craftjs/core';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import ArrowUp from '../../public/icons/arrow-up.svg';
import Delete from '../../public/icons/delete.svg';
import Move from '../../public/icons/move.svg';

const IndicatorDiv = styled.div`
  line-height: 30px;
  font-size: 12px;
  height: 30px;

  svg {
    fill: #ffffff;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a``;

/**
 * 获取定位的
 * @param dom
 */
const getPos = (dom: HTMLElement) => {
  const { top, left, bottom } = dom
    ? dom.getBoundingClientRect()
    : { top: 0, left: 0, bottom: 0 };
  return {
    top: `${(top > 0 ? top : bottom) - 28}px`,
    left: `${left}px`,
  };
};

/**
 * 自定义节点
 * @param render
 * @constructor
 */
export function RenderNode1({ render }) {
  const {
    id,
    connectors: { drag },
  } = useNode();
  const { isHover, dom, name } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    // moveable:
  }));
  const { left, top } = getPos(dom);

  const currentRef = useRef<HTMLDivElement>();

  // console.log('RenderNode1', { id, isHover }, dom, render);

  useEffect(() => {
    if (dom) {
      if (isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isHover]);

  return (
    <>
      {isHover
        ? // 挂载到容器下，不然会 TODO 待验证 -- 监听这个组件下所有的组件, 导致失去焦点而鬼畜
          ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              className={'flex px-2 bg-primary text-white fixed items-center'}
              style={{ zIndex: 9999, left, top }}
            >
              <h2 className={'flex-1 mr-2'}>{name}</h2>
              <Btn ref={drag} className={'cursor-move mx-2'} title={'移动'}>
                <Move />
              </Btn>
              <Btn
                className={'cursor-pointer'}
                title={'删除'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Delete />
              </Btn>
            </IndicatorDiv>,
            document.querySelector('#page-container')
          )
        : null}
      {render}
    </>
  );
}
