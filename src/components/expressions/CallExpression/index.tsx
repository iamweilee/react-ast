import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Identifier from '~/components/Identifier';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface CallExpressionProps {
  arguments?: ReactNode;
  debug?: boolean;
  name: string;
}

const CallExpression = forwardRef<BaseElement, CallExpressionProps>(
  (props: CallExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${name}()`;

    function renderArgument(argument: ReactNode) {
      if (typeof argument === 'string') {
        return (
          <ParentBodyPathProvider value="arguments">
            <Identifier>{argument}</Identifier>
          </ParentBodyPathProvider>
        );
      }
      return null;
    }

    function renderArguments() {
      if (typeof props.arguments === 'string') {
        return renderArgument(props.arguments);
      }
      return null;
    }

    return (
      <Smart code={code} ref={mergedRef} scopePath="expression">
        <ParentBodyPathProvider value={undefined}>
          {renderArguments()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

CallExpression.defaultProps = {
  debug: false
};

export default CallExpression;