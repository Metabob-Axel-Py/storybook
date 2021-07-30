import { ModuleExports, WebGlobalMeta } from '@storybook/client-api/dist/ts3.4/new/types';
import { combineParameters } from '@storybook/client-api';

function getField(moduleExportList: ModuleExports[], field: string): any[] {
  return moduleExportList.map((xs) => xs[field]).filter(Boolean);
}

function getArrayField(moduleExportList: ModuleExports[], field: string): any[] {
  return getField(moduleExportList, field).reduce((a, b) => [...a, ...b], []);
}

function getObjectField(moduleExportList: ModuleExports[], field: string): Record<string, any> {
  return Object.assign({}, ...getField(moduleExportList, field));
}

function getSingletonField(moduleExportList: ModuleExports[], field: string): any {
  return getField(moduleExportList, field)[0];
}

export function getGlobalsFromEntries<StoryFnReturnType>(
  moduleExportList: ModuleExports[]
): WebGlobalMeta<StoryFnReturnType> {
  return {
    parameters: combineParameters(...getField(moduleExportList, 'parameters')),
    decorators: getArrayField(moduleExportList, 'decorators'),
    args: getObjectField(moduleExportList, 'args'),
    argsEnhancers: getArrayField(moduleExportList, 'argsEnhancers'),
    argTypes: getObjectField(moduleExportList, 'argTypes'),
    argTypesEnhancers: getArrayField(moduleExportList, 'argTypesEnhancers'),
    globals: getObjectField(moduleExportList, 'globals'),
    globalTypes: getObjectField(moduleExportList, 'globalTypes'),
    loaders: getArrayField(moduleExportList, 'loaders'),
    render: getSingletonField(moduleExportList, 'render'),
    play: getSingletonField(moduleExportList, 'play'),
    renderToDOM: getSingletonField(moduleExportList, 'renderToDOM'),
    applyDecorators: getSingletonField(moduleExportList, 'applyDecorators'),
  };
}