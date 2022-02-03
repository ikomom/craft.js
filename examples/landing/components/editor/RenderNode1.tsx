import { ROOT_NODE, useEditor, useNode } from '@craftjs/core';
import React, { useCallback, useEffect, useRef } from 'react';
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
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, _query) => ({
    isActive: _query.getEvent('selected').contains(id),
  }));
  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    parent,
    connectors: { drag },
  } = useNode((node) => {
    const cur = query.node(node.id);
    return {
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      isLinkNode: cur.isLinkedNode(),
      moveable: cur.isDraggable(),
      deletable: cur.isDeletable(),
      parent: node.data.parent,
    };
  });

  const { left, top } = getPos(dom);

  const currentRef = useRef<HTMLDivElement>();

  // console.log('RenderNode1', { id, isHover }, dom, render);

  useEffect(() => {
    if (dom) {
      if (isHover || isActive) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;
    if (!currentDOM) return;
    const { left, top } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  useEffect(() => {
    const renderContainer = document.querySelector('#craftjs-renderer');
    renderContainer && renderContainer.addEventListener('scroll', scroll);
    return () => {
      renderContainer && renderContainer.removeEventListener('scroll', scroll);
    };
  }, [name, scroll]);

  return (
    <>
      {isHover || isActive
        ? // 挂载到容器下，不然会 TODO 待验证 -- 监听这个组件下所有的组件, 导致失去焦点而鬼畜
          ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              className={'flex px-2 bg-primary text-white fixed items-center'}
              style={{ zIndex: 9999, left, top }}
            >
              <h2 className={'flex-1 mr-4'}>{name}</h2>
              {moveable ? (
                <Btn ref={drag} className={'cursor-move mr-2'}>
                  <Move />
                </Btn>
              ) : null}
              {id !== ROOT_NODE ? (
                <Btn
                  className={'cursor-pointer mr-2'}
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  <ArrowUp />
                </Btn>
              ) : null}
              {deletable ? (
                <Btn
                  className={'cursor-pointer'}
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Delete />
                </Btn>
              ) : null}
            </IndicatorDiv>,
            document.querySelector('#page-container')
          )
        : null}
      {render}
    </>
  );
}
