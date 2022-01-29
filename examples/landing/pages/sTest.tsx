import { Editor, Frame, Element, useNode } from '@craftjs/core';
import React from 'react';

import { RenderNode, Viewport } from '../components/editor';
import { Text } from '../components/selectors';
import Text1 from '../components/selectors/Text1';

const Container = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode(() => {
    // console.log('Container', node.id, node.events);
    return {};
  });
  return (
    <div
      ref={(dom) => {
        const _drag = drag(dom);
        console.log('_drag', _drag, React.isValidElement(_drag));
        const _connect = connect(_drag);
        console.log('_connect', _connect);
        return _connect;
      }}
      style={{ border: '2px solid yellow', minHeight: 40, margin: 8 }}
    >
      {children}
    </div>
  );
};

function STest() {
  return (
    <div>
      <Editor resolver={{ Container, Text, Text1 }} onRender={RenderNode}>
        <Viewport>
          <Frame>
            <Element
              is="div"
              custom={{ displayName: 'App' }}
              style={{ border: '2px solid green', width: 800, height: 'auto' }}
            >
              {/*<h1 className={'text-2xl'}>主标</h1>*/}
              {/*<Text1 text={'副标题'} />*/}
              {/*<Element*/}
              {/*  is="div"*/}
              {/*  style={{ border: '2px solid red', minHeight: 40, margin: 8 }}*/}
              {/*  canvas*/}
              {/*>*/}
              {/*  <p>Same here</p>*/}
              {/*</Element>*/}
              <Element is={Container} canvas>
                <Text1 />
                {/*<Container>*/}
                {/*  <h2>Hi</h2>*/}
                {/*</Container>*/}
              </Element>
            </Element>
          </Frame>
        </Viewport>
      </Editor>
    </div>
  );
}

export default STest;
