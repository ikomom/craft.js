import { Editor, Frame, Element, useNode } from '@craftjs/core';
import { Container } from '@material-ui/core';
import React from 'react';

import { RenderNode, Viewport } from '../components/editor';
import { Text } from '../components/selectors';
import { Combine } from '../components/selectors/Combine';
import Text1 from '../components/selectors/Text1';

const Container1 = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode(() => {
    // console.log('Container', node.id, node.events);
    return {};
  });
  return (
    <div
      ref={(dom) => connect(drag(dom))}
      style={{ border: '2px solid yellow', minHeight: 40, margin: 8 }}
    >
      {children}
    </div>
  );
};

function STest() {
  return (
    <div>
      <Editor
        resolver={{ Container, Container1, Combine, Text, Text1 }}
        onRender={RenderNode}
      >
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
              <Element is={Container1} canvas>
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